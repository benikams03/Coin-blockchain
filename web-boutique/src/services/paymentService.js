// 🔌 POINT DE BRANCHEMENT n°4 : le paiement (le plus important)
//
// `sendPayment` reçoit la commande et renvoie la transaction confirmée.
// Le reste de l'application ne sait PAS comment le paiement est fait :
// il suffit de remplacer le corps de cette fonction.

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const fakeHash = () =>
  '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

export async function sendPayment({ items, total, buyer }) {
  // ---------- MOCK (actuel) ----------
  await delay(1800); // simule l'attente de confirmation sur la blockchain
  return {
    hash: fakeHash(),
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

  // ---------- VRAI MetaMask + token ERC-20 (exemple avec ethers v6) ----------
  // import { BrowserProvider, Contract, parseUnits } from 'ethers';
  // import { TOKEN, STORE } from '../config/token.js';
  //
  // const ERC20_ABI = ['function transfer(address to, uint256 amount) returns (bool)'];
  // const provider = new BrowserProvider(window.ethereum);
  // const signer = await provider.getSigner();          // MetaMask s'ouvre ici
  // const token = new Contract(TOKEN.contractAddress, ERC20_ABI, signer);
  // const tx = await token.transfer(STORE.walletAddress, parseUnits(String(total), TOKEN.decimals));
  // const receipt = await tx.wait();                     // attend la confirmation
  // return { hash: receipt.hash, buyer, items: [...], total, date: new Date().toISOString(), status: 'confirmed' };
}
