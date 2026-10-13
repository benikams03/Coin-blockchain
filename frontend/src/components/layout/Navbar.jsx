import { NavLink, Link } from 'react-router-dom';
import { ShoppingBag, LayoutDashboard, Store, Wallet } from 'lucide-react';
import { STORE } from '../../config/token.js';
import { useWallet } from '../../context/WalletContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { shortAddress } from '../../lib/format.js';

const linkClass = ({ isActive }) =>
  `inline-flex min-h-[44px] items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors duration-200 cursor-pointer ${
    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
  }`;

export default function Navbar() {
  const { address } = useWallet();
  const { count } = useCart();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <Link to="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
            <Store className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="hidden sm:inline">{STORE.name}</span>
        </Link>

        <nav aria-label="Navigation principale" className="flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            Boutique
            {count > 0 && (
              <span className="rounded-full bg-brand-600 px-1.5 text-xs text-white" aria-label={`${count} articles dans le panier`}>
                {count}
              </span>
            )}
          </NavLink>
          <NavLink to="/dashboard" className={linkClass}>
            <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
            Dashboard
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700">
          <Wallet className="h-4 w-4 text-orange-600" aria-hidden="true" />
          <span className="font-mono">{shortAddress(address)}</span>
          <span className="hidden rounded bg-amber-100 px-1.5 py-0.5 font-medium text-amber-800 md:inline">Mock</span>
        </div>
      </div>
    </header>
  );
}
