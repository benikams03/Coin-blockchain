import { getProductContract } from '../config/web3.js';
import { getProductMetadata } from '../config/productMetadata.js';
import { TOKEN } from '../config/token.js';
import { ethers } from 'ethers';

// 🔌 POINT DE BRANCHEMENT n°1 : produits depuis le smart contract
// Récupère les produits en appelant nombreProduits() et obtenirProduitParIndex()
export async function getProducts() {
  try {
    console.log('🔍 Début de la récupération des produits...');

    const { contract, provider } = getProductContract();

    // Vérifier le réseau
    const network = await provider.getNetwork();
    console.log('🌐 Réseau connecté:', network.name, '(chainId:', Number(network.chainId), ')');

    // Récupérer le nombre total de produits
    const count = await contract.nombreProduits();
    const productCount = Number(count);
    console.log('📦 Nombre de produits dans le contrat:', productCount);

    if (productCount === 0) {
      console.log('⚠️ Aucun produit trouvé dans le contrat');
      return [];
    }

    // Récupérer chaque produit par son index
    const products = [];
    for (let i = 0; i < productCount; i++) {
      console.log(`📋 Récupération du produit à l'index ${i}...`);
      const productData = await contract.obtenirProduitParIndex(i);

      // productData = [produitId, prixUnitaire, stock, actif]
      const productId = Number(productData.produitId);
      const price = Number(productData.prixUnitaire);
      const stock = Number(productData.stock);
      const active = productData.actif;

      console.log(`Produit ${i}: ID=${productId}, Prix=${price}, Stock=${stock}, Actif=${active}`);

      // Ne pas inclure les produits inactifs
      if (!active) {
        console.log(`⏭️ Produit ${productId} ignoré (inactif)`);
        continue;
      }

      // Convertir le prix de wei vers l'unité du token
      const priceInToken = Number(ethers.formatUnits(price, TOKEN.decimals));
      console.log(`💰 Prix converti: ${priceInToken} ${TOKEN.symbol}`);

      // Récupérer les métadonnées (nom, description, icône)
      const metadata = getProductMetadata(productId);

      products.push({
        id: productId,
        name: metadata.name,
        description: metadata.description,
        price: priceInToken,
        stock: stock,
        icon: metadata.icon
      });
    }

    console.log('✅ Produits récupérés avec succès:', products);
    return products;
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des produits:', error);
    // En cas d'erreur (MetaMask non installé, contrat injoignable, etc.),
    // on retourne un tableau vide pour ne pas casser l'interface
    return [];
  }
}
