// 🔌 POINT DE BRANCHEMENT n°4 : le paiement avec DANI
//
// `sendPayment` reçoit la commande et renvoie la transaction confirmée.
// Flow :
// 1. Vérifier le solde du client
// 2. Appeler approve() sur DaniellaCoin
// 3. Appeler acheterPanier() sur DaniellaBoutique
// 4. Gérer les erreurs (stock, solde, refus, réseau)

import { ethers } from 'ethers';
import { getProductContract, getTokenContract } from '../config/web3.js';
import { TOKEN } from '../config/token.js';

export async function sendPayment({ items, total, buyer }) {
  try {
    console.log('💳 Début du processus de paiement...');

    // 1. Créer le provider et le signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Vérifier le réseau (optionnel : vous pouvez spécifier un chainId attendu)
    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);
    console.log('🌐 Réseau actuel:', chainId);

    // 2. Vérifier le solde du client
    const tokenContract = getTokenContract(provider); // provider pour les appels view
    const balanceWei = await tokenContract.balanceOf(buyer);
    const balance = Number(ethers.formatUnits(balanceWei, TOKEN.decimals));
    console.log('💰 Solde du client:', balance, TOKEN.symbol);

    if (balance < total) {
      throw new Error(`Solde insuffisant. Vous avez ${balance} ${TOKEN.symbol} mais la commande coûte ${total} ${TOKEN.symbol}`);
    }

    // 3. Convertir le total en wei
    const totalWei = ethers.parseUnits(String(total), TOKEN.decimals);
    console.log('💵 Montant à payer (wei):', totalWei.toString());

    // 4. Vérifier l'allowance actuelle
    const { contract: productContract } = getProductContract();
    const currentAllowance = await tokenContract.allowance(buyer, await productContract.getAddress());
    console.log('📋 Allowance actuelle:', currentAllowance.toString());

    // 5. Approuver le contrat de boutique si nécessaire
    if (currentAllowance < totalWei) {
      console.log('✍️ Approbation nécessaire...');
      const tokenContractWithSigner = getTokenContract(signer);
      const approveTx = await tokenContractWithSigner.approve(
        await productContract.getAddress(),
        totalWei
      );
      console.log('⏳ Transaction d\'approbation en cours...');
      await approveTx.wait();
      console.log('✅ Approbation confirmée');
    } else {
      console.log('✅ Allowance suffisante, pas d\'approbation nécessaire');
    }

    // 6. Préparer les données pour acheterPanier
    const productIds = items.map((i) => i.product.id);
    const quantities = items.map((i) => i.qty);

    // Générer un commandeId unique (bytes32)
    const commandeId = ethers.keccak256(
      ethers.AbiCoder.defaultAbiCoder().encode(
        ['address', 'uint256', 'uint256[]'],
        [buyer, Date.now(), productIds]
      )
    );
    console.log('🆔 Commande ID:', commandeId);

    // 7. Appeler acheterPanier
    const productContractWithSigner = productContract.connect(signer);
    console.log('🛒 Appel de acheterPanier...');

    const buyTx = await productContractWithSigner.acheterPanier(
      productIds,
      quantities,
      commandeId,
      totalWei
    );

    console.log('⏳ Transaction d\'achat en cours...');
    const receipt = await buyTx.wait();
    console.log('✅ Achat confirmé ! Hash:', receipt.hash);

    // 8. Retourner la transaction au format attendu
    return {
      hash: receipt.hash,
      buyer,
      items: items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        qty: i.qty,
        price: i.product.price,
      })),
      total,
      date: new Date().toISOString(),
      status: 'confirmed',
    };

  } catch (error) {
    console.error('❌ Erreur lors du paiement:', error);

    // Gestion des erreurs spécifiques
    if (error.code === 4001) {
      throw new Error('Transaction refusée par l\'utilisateur');
    }

    if (error.message.includes('insufficient allowance')) {
      throw new Error('Erreur lors de l\'approbation. Veuillez réessayer.');
    }

    if (error.message.includes('insufficient balance')) {
      throw new Error('Solde insuffisant pour effectuer cet achat');
    }

    if (error.message.includes('reverted')) {
      // Erreur de revert du smart contract (stock insuffisant, etc.)
      throw new Error('Transaction échouée : ' + error.message);
    }

    // Erreur générique
    throw new Error('Erreur lors du paiement : ' + error.message);
  }
}
