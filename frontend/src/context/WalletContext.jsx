import { createContext, useContext, useState } from 'react';
import { connectWallet, getMockAddress } from '../services/walletService.js';

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  // Mock : on démarre "connecté". Avec le vrai MetaMask, démarre à null
  // et appelle connect() depuis un bouton.
  const [address, setAddress] = useState(getMockAddress());

  const connect = async () => setAddress(await connectWallet());

  return <WalletContext.Provider value={{ address, connect }}>{children}</WalletContext.Provider>;
}

export const useWallet = () => useContext(WalletContext);
