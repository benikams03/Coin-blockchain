import { Receipt, Coins, PackageCheck } from 'lucide-react';
import { useTransactions } from '../context/TransactionsContext.jsx';
import StatCard from '../components/dashboard/StatCard.jsx';
import TransactionTable from '../components/dashboard/TransactionTable.jsx';
import { formatAmount } from '../lib/format.js';

export default function DashboardPage() {
  const { transactions, stats, loading } = useTransactions();
  const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">Dashboard des ventes</h1>

      {loading ? (
        <p className="text-sm text-slate-600" role="status">Chargement…</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard icon={Receipt} label="Nombre de ventes" value={stats.salesCount} />
            <StatCard icon={Coins} label="Argent gagné" value={formatAmount(stats.revenue)} />
            <StatCard icon={PackageCheck} label="Produits vendus" value={stats.productsSold} />
          </div>

          <section aria-labelledby="tx-title" className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <h2 id="tx-title" className="mb-3 text-base font-semibold text-slate-900">Transactions récentes</h2>
            <TransactionTable transactions={recent} />
          </section>
        </>
      )}
    </div>
  );
}
