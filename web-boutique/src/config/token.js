// ⚙️ Configuration de TA cryptomonnaie et de la boutique.
// Change ici le nom / symbole, tout le site se met à jour.
export const TOKEN = {
  name: 'DANI',
  symbol: 'DANI',
  decimals: 3,
  // Adresse du smart contract ERC-20 DaniellaCoin
  contractAddress: '0xdE848f33a134CAE9E841737A26891C31B3Fa9606',
};

export const STORE = {
  name: 'CryptoShop',
  // Adresse du wallet du vendeur qui reçoit les paiements (mock)
  walletAddress: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
};
