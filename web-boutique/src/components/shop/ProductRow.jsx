import { Plus } from 'lucide-react';
import ProductIcon from './ProductIcon.jsx';
import { formatAmount } from '../../lib/format.js';

export default function ProductRow({ product, inCartQty, onAdd }) {
  const remaining = product.stock - inCartQty;
  const lowStock = product.stock <= 5;

  return (
    <li className="flex items-center gap-4 py-4">
      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
        <ProductIcon name={product.icon} className="h-8 w-8" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900">{product.name}</p>
        <p className="text-xs text-slate-600">{product.description}</p>
        <p className={`mt-1 text-xs ${lowStock ? 'text-red-600' : 'text-slate-600'}`}>
          {lowStock ? `Plus que ${product.stock} en stock` : `${product.stock} en stock`}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="text-sm font-semibold text-slate-900">{formatAmount(product.price)}</span>
        <button
          type="button"
          onClick={() => onAdd(product)}
          disabled={remaining <= 0}
          aria-label={`Ajouter ${product.name} au panier`}
          className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-lg border border-brand-600 px-3 text-sm font-medium text-brand-700 transition-colors duration-200 hover:bg-brand-50 disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-400 disabled:hover:bg-transparent"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          {remaining <= 0 ? 'Max atteint' : 'Ajouter'}
        </button>
      </div>
    </li>
  );
}
