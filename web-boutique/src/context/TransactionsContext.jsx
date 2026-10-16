import { createContext, useContext, useMemo, useState } from 'react';

const TransactionsContext = createContext(null);

// Utilisé pour stocker les transactions effectuées pendant la session
// (utile pour le payment flow, même sans dashboard)
export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  const value = useMemo(
    () => ({
      transactions,
      addTransaction: (tx) => setTransactions((prev) => [tx, ...prev]),
    }),
    [transactions]
  );

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}

export const useTransactions = () => useContext(TransactionsContext);
