// 🔗 Configuration Web3 pour le smart contract de produits
import { ethers } from 'ethers';

// Adresse du smart contract de produits déployé
export const PRODUCT_CONTRACT_ADDRESS = '0x09074e33B392D915eeDB068F2eF13772f69530e8';

// ABI du smart contract (fonctions de lecture utiles)
export const PRODUCT_CONTRACT_ABI = [
  // Fonction pour obtenir le nombre total de produits
  {
    "inputs": [],
    "name": "nombreProduits",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // Fonction pour obtenir un produit par son index
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "obtenirProduitParIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "produitId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "prixUnitaire",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "stock",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "actif",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // Fonction pour obtenir l'ID d'un produit par son index
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "obtenirProduitId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // Fonction pour acheter un panier (utilisée pour le paiement)
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "produitIds",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "quantites",
        "type": "uint256[]"
      },
      {
        "internalType": "bytes32",
        "name": "commandeId",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "montantMaximum",
        "type": "uint256"
      }
    ],
    "name": "acheterPanier",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Fonction utilitaire pour créer un provider et un contrat
export function getProductContract() {
  if (!window.ethereum) {
    throw new Error('MetaMask n\'est pas installé');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(
    PRODUCT_CONTRACT_ADDRESS,
    PRODUCT_CONTRACT_ABI,
    provider
  );

  return { provider, contract };
}
