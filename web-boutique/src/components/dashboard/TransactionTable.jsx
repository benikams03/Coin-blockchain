import { formatAmount, formatDate, shortAddress } from '../../lib/format.js';

const summary = (items) => items.map((i) => `${i.qty}× ${i.name}`).join(', ');

export default function TransactionTable({ transactions }) {
  if (transactions.length === 0) {
    return <p className="py-8 text-center text-sm text-slate-600">Aucune transaction pour le moment.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <caption className="sr-only">Transactions récentes</caption>
        <thead className="border-b border-slate-200 text-xs uppercase text-slate-600">
          <tr>
            <th scope="col" className="py-2 pr-4 font-medium">Hash</th>
            <th scope="col" className="py-2 pr-4 font-medium">Acheteur</th>
            <th scope="col" className="py-2 pr-4 font-medium">Produits</th>
            <th scope="col" className="py-2 pr-4 text-right font-medium">Montant</th>
            <th scope="col" className="py-2 pr-4 font-medium">Date</th>
            <th scope="col" className="py-2 font-medium">Statut</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {transactions.map((t) => (
            <tr key={t.hash}>
              <td className="py-3 pr-4 font-mono text-xs">{shortAddress(t.hash)}</td>
              <td className="py-3 pr-4 font-mono text-xs">{shortAddress(t.buyer)}</td>
              <td className="max-w-[220px] truncate py-3 pr-4" title={summary(t.items)}>{summary(t.items)}</td>
              <td className="py-3 pr-4 text-right font-semibold">{formatAmount(t.total)}</td>
              <td className="py-3 pr-4 text-slate-600">{formatDate(t.date)}</td>
              <td className="py-3">
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Confirmée</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
