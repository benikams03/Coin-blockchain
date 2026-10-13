const MOCK_ADDRESS = '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2';

// 🔌 POINT DE BRANCHEMENT n°3 : connexion du wallet
export async function connectWallet() {
  // MOCK : on renvoie une adresse fixe.
  return MOCK_ADDRESS;

  // VRAI MetaMask :
  // if (!window.ethereum) throw new Error('MetaMask non installé');
  // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
  // return account;
}

export const getMockAddress = () => MOCK_ADDRESS;
