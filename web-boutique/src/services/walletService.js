// 🔌 POINT DE BRANCHEMENT n°3 : connexion du wallet MetaMask
export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error('MetaMask n\'est pas installé');
  }

  const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return account;
}

// Vérifier si MetaMask est installé
export function isMetaMaskInstalled() {
  return typeof window.ethereum !== 'undefined';
}
