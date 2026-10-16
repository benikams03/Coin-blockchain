import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getTransactions } from '../services/transactionService.js';
import { computeStats } from '../lib/stats.js';

const TransactionsContext = createContext(null);

// Partagé entre la boutique et le dashboard : un achat réussi dans la
// boutique apparaît tout de suite dans le dashboard.
export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTransactions().then((data) => {
      setTransactions(data);
      setLoading(false);
    });
  }, []);

  const value = useMemo(
    () => ({
      transactions,
      loading,
      stats: computeStats(transactions),
      addTransaction: (tx) => setTransactions((prev) => [tx, ...prev]),
    }),
    [transactions, loading]
  );

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}

export const useTransactions = () => useContext(TransactionsContext);
