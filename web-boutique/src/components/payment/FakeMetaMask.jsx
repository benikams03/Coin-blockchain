import { Wallet } from 'lucide-react';
import { formatAmount, shortAddress } from '../../lib/format.js';
import { STORE } from '../../config/token.js';

// 🧪 SIMULATION de la fenêtre MetaMask.
// ➜ À SUPPRIMER quand tu branches le vrai MetaMask : la vraie fenêtre
//   s'ouvre toute seule quand paymentService appelle signer / eth_sendTransaction.
export default function FakeMetaMask({ total, buyer, onConfirm, onReject }) {
  return (
    <div className="rounded-xl border border-slate-300 bg-white shadow-lg" role="group" aria-label="Simulation de la fenêtre MetaMask">
      <div className="flex items-center justify-between rounded-t-xl bg-slate-900 px-4 py-3 text-white">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Wallet className="h-4 w-4 text-orange-400" aria-hidden="true" />
          MetaMask
        </span>
        <span className="rounded bg-amber-400 px-2 py-0.5 text-[11px] font-bold text-slate-900">SIMULATION</span>
      </div>

      <dl className="space-y-2 px-4 py-4 text-sm">
        <div className="flex justify-between gap-4"><dt className="text-slate-600">De</dt><dd className="font-mono">{shortAddress(buyer)}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-slate-600">Vers</dt><dd className="font-mono">{shortAddress(STORE.walletAddress)}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-slate-600">Montant</dt><dd className="font-semibold">{formatAmount(total)}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-slate-600">Frais de réseau (estimés)</dt><dd>0,0004 ETH</dd></div>
      </dl>

      <div className="grid grid-cols-2 gap-3 border-t border-slate-200 p-4">
        <button type="button" onClick={onReject} className="min-h-[44px] cursor-pointer rounded-full border border-brand-600 text-sm font-semibold text-brand-700 transition-colors duration-200 hover:bg-brand-50">
          Rejeter
        </button>
        <button type="button" onClick={onConfirm} className="min-h-[44px] cursor-pointer rounded-full bg-brand-600 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-700">
          Confirmer
        </button>
      </div>
    </div>
  );
}
