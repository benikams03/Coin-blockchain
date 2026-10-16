import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2, X, Wallet } from 'lucide-react';
import { sendPayment } from '../../services/paymentService.js';
import { useWallet } from '../../context/WalletContext.jsx';
import { formatAmount, shortAddress } from '../../lib/format.js';

// Étapes : review → processing → success | rejected
export default function PaymentModal({ order, onClose, onSuccess }) {
  const { address } = useWallet();
  const [step, setStep] = useState('review');
  const [tx, setTx] = useState(null);
  const [error, setError] = useState('');
  const dialogRef = useRef(null);

  useEffect(() => {
    dialogRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && step !== 'processing' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, onClose]);

  async function handleConfirm() {
    setStep('processing');
    try {
      const result = await sendPayment({ items: order.items, total: order.total, buyer: address });
      setTx(result);
      onSuccess(result);
      setStep('success');
    } catch (e) {
      setError(e?.message ?? 'Erreur inconnue');
      setStep('rejected');
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4" onMouseDown={(e) => e.target === e.currentTarget && step !== 'processing' && onClose()}>
      <div ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="pay-title" className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <h2 id="pay-title" className="text-lg font-semibold text-slate-900">
            {step === 'success' ? 'Paiement effectué' : 'Paiement avec MetaMask'}
          </h2>
          {step !== 'processing' && (
            <button type="button" onClick={onClose} aria-label="Fermer" className="grid h-9 w-9 cursor-pointer place-items-center rounded-md text-slate-600 hover:bg-slate-100">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>

        {step === 'review' && (
          <>
            <ul className="mt-4 divide-y divide-slate-200 text-sm">
              {order.items.map(({ product, qty }) => (
                <li key={product.id} className="flex justify-between py-2">
                  <span>{qty} × {product.name}</span>
                  <span className="font-medium">{formatAmount(product.price * qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 font-semibold">
              <span>Total à payer</span>
              <span>{formatAmount(order.total)}</span>
            </div>
            <p className="mt-2 flex items-center gap-2 text-xs text-slate-600">
              <Wallet className="h-4 w-4" aria-hidden="true" /> Wallet : <span className="font-mono">{shortAddress(address)}</span>
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button type="button" onClick={onClose} className="min-h-[46px] cursor-pointer rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-100">Annuler</button>
              <button type="button" onClick={handleConfirm} className="min-h-[46px] cursor-pointer rounded-lg bg-brand-600 text-sm font-semibold text-white hover:bg-brand-700">Payer avec MetaMask</button>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="py-10 text-center" role="status">
            <Loader2 className="mx-auto h-10 w-10 motion-safe:animate-spin text-brand-600" aria-hidden="true" />
            <p className="mt-4 text-sm text-slate-700">Transaction en cours de confirmation sur la blockchain…</p>
          </div>
        )}

        {step === 'success' && (
          <div className="py-4 text-center" role="status">
            <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" aria-hidden="true" />
            <p className="mt-3 text-base font-semibold text-slate-900">Paiement effectué avec succès !</p>
            <p className="mt-1 text-sm text-slate-600">{formatAmount(tx.total)} payés</p>

            <div className="mt-4 rounded-lg bg-slate-50 p-4 text-left">
              <p className="mb-2 text-xs font-semibold text-slate-700 uppercase">Produits achetés</p>
              <ul className="space-y-1 text-sm">
                {tx.items.map((item) => (
                  <li key={item.productId} className="flex justify-between text-slate-600">
                    <span>{item.qty} × {item.name}</span>
                    <span className="font-medium">{formatAmount(item.price * item.qty)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <p className="mb-1 text-xs font-semibold text-slate-700 uppercase">Transaction blockchain</p>
              <p className="break-all rounded-lg bg-slate-100 p-2 font-mono text-xs text-slate-700">{tx.hash}</p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button type="button" onClick={onClose} className="min-h-[46px] cursor-pointer rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-100">Continuer</button>
              <Link to="/dashboard" onClick={onClose} className="grid min-h-[46px] place-items-center rounded-lg bg-brand-600 text-sm font-semibold text-white hover:bg-brand-700">Voir le dashboard</Link>
            </div>
          </div>
        )}

        {step === 'rejected' && (
          <div className="py-4 text-center" role="alert">
            <XCircle className="mx-auto h-14 w-14 text-red-600" aria-hidden="true" />
            <p className="mt-3 text-base font-semibold text-slate-900">Paiement non effectué</p>
            <p className="mt-1 text-sm text-slate-600">{error}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button type="button" onClick={onClose} className="min-h-[46px] cursor-pointer rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-100">Fermer</button>
              <button type="button" onClick={() => setStep('review')} className="min-h-[46px] cursor-pointer rounded-lg bg-brand-600 text-sm font-semibold text-white hover:bg-brand-700">Réessayer</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
