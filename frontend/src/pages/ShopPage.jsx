import { useEffect, useState, useCallback } from 'react';
import { getProducts } from '../services/productService.js';
import { useCart } from '../context/CartContext.jsx';
import { useTransactions } from '../context/TransactionsContext.jsx';
import ProductRow from '../components/shop/ProductRow.jsx';
import CartPanel from '../components/shop/CartPanel.jsx';
import PaymentModal from '../components/payment/PaymentModal.jsx';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null); // copie du panier au moment de valider
  const { items, total, addItem, clear } = useCart();
  const { addTransaction } = useTransactions();

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const closeModal = useCallback(() => setOrder(null), []);

  const handleSuccess = (tx) => {
    addTransaction(tx); // apparaît dans le dashboard
    clear(); // vide le panier
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm lg:grid lg:grid-cols-[1fr_380px]">
        <section aria-labelledby="products-title" className="p-5 sm:p-8">
          <h1 id="products-title" className="text-lg font-semibold text-slate-900">Produits</h1>
          {loading ? (
            <p className="py-10 text-center text-sm text-slate-600" role="status">Chargement des produits…</p>
          ) : (
            <ul className="mt-2 divide-y divide-slate-200">
              {products.map((p) => (
                <ProductRow
                  key={p.id}
                  product={p}
                  inCartQty={items.find((i) => i.product.id === p.id)?.qty ?? 0}
                  onAdd={addItem}
                />
              ))}
            </ul>
          )}
        </section>

        <aside className="border-t border-slate-200 bg-slate-50 p-5 sm:p-8 lg:border-l lg:border-t-0">
          <CartPanel onValidate={() => setOrder({ items, total })} />
        </aside>
      </div>

      {order && <PaymentModal order={order} onClose={closeModal} onSuccess={handleSuccess} />}
    </>
  );
}
