import { mockTransactions } from '../data/mockTransactions.js';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// 🔌 POINT DE BRANCHEMENT n°2 : historique des ventes
// Plus tard : fetch('/api/transactions') ou lecture des events "Transfer"
// de ton token ERC-20 envoyés vers le wallet de la boutique.
export async function getTransactions() {
  await delay(300);
  return mockTransactions;
}
