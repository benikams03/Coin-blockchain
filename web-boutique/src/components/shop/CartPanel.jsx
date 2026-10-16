import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import ProductIcon from './ProductIcon.jsx';
import { formatAmount } from '../../lib/format.js';

const iconBtn =
  'grid h-9 w-9 cursor-pointer place-items-center rounded-md border border-slate-300 bg-white text-slate-700 transition-colors duration-200 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40';

export default function CartPanel({ onValidate }) {
  const { items, total, addItem, decrementItem, removeItem } = useCart();

  return (
    <section aria-labelledby="cart-title" className="flex h-full flex-col">
      <h2 id="cart-title" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
        <ShoppingCart className="h-5 w-5" aria-hidden="true" />
        Panier
      </h2>

      {items.length === 0 ? (
        <p className="mt-10 flex-1 text-center text-sm text-slate-600">
          Votre panier est vide.
          <br />
          Ajoutez un produit depuis la liste.
        </p>
      ) : (
        <ul className="mt-4 flex-1 divide-y divide-slate-200">
          {items.map(({ product, qty }) => (
            <li key={product.id} className="py-3">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-brand-50 text-brand-700">
                  <ProductIcon name={product.icon} className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">{product.name}</p>
                  <p className="text-xs text-slate-600">{formatAmount(product.price)} / unité</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">{formatAmount(product.price * qty)}</p>
              </div>

              <div className="mt-2 flex items-center justify-between pl-[52px]">
                <div className="flex items-center gap-2">
                  <button type="button" className={iconBtn} onClick={() => decrementItem(product.id)} aria-label={`Retirer une unité de ${product.name}`}>
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="w-6 text-center text-sm" aria-live="polite">{qty}</span>
                  <button type="button" className={iconBtn} onClick={() => addItem(product)} disabled={qty >= product.stock} aria-label={`Ajouter une unité de ${product.name}`}>
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <button type="button" onClick={() => removeItem(product.id)} aria-label={`Supprimer ${product.name} du panier`} className="grid h-9 w-9 cursor-pointer place-items-center rounded-md text-red-600 transition-colors duration-200 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 border-t border-slate-200 pt-4">
        <div className="flex items-center justify-between text-base font-semibold text-slate-900">
          <span>Total</span>
          <span>{formatAmount(total)}</span>
        </div>
        <button
          type="button"
          onClick={onValidate}
          disabled={items.length === 0}
          className="mt-4 min-h-[48px] w-full cursor-pointer rounded-lg bg-brand-600 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Valider l'achat
        </button>
      </div>
    </section>
  );
}
