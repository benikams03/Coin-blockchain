import { mockProducts } from '../data/mockProducts.js';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// 🔌 POINT DE BRANCHEMENT n°1 : produits
// Plus tard : fetch('/api/products') ou lecture d'un smart contract.
export async function getProducts() {
  await delay(300);
  return mockProducts;
}
