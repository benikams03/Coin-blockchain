// ⚙️ Configuration de TA cryptomonnaie et de la boutique.
// Change ici le nom / symbole, tout le site se met à jour.
export const TOKEN = {
  name: 'ShopCoin',
  symbol: 'SHC',
  decimals: 18,
  // TODO (vrai MetaMask) : adresse du smart contract ERC-20 de ta monnaie
  contractAddress: '0x0000000000000000000000000000000000000000',
};

export const STORE = {
  name: 'CryptoShop',
  // Adresse du wallet du vendeur qui reçoit les paiements (mock)
  walletAddress: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
};
