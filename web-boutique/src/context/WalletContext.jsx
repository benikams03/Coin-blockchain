import { createContext, useContext, useState } from 'react';
import { connectWallet } from '../services/walletService.js';

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  // Avec le vrai MetaMask, on démarre déconnecté (null)
  // L'utilisateur doit cliquer sur "Connecter MetaMask" pour se connecter
  const [address, setAddress] = useState(null);

  const connect = async () => {
    try {
      const walletAddress = await connectWallet();
      setAddress(walletAddress);
    } catch (error) {
      console.error('Erreur de connexion du wallet:', error);
      throw error;
    }
  };

  return <WalletContext.Provider value={{ address, connect }}>{children}</WalletContext.Provider>;
}

export const useWallet = () => useContext(WalletContext);
