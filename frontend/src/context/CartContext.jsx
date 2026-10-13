import { createContext, useContext, useMemo, useReducer } from 'react';

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { product } = action;
      const existing = state.find((i) => i.product.id === product.id);
      if (existing) {
        if (existing.qty >= product.stock) return state; // pas plus que le stock
        return state.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return product.stock > 0 ? [...state, { product, qty: 1 }] : state;
    }
    case 'DECREMENT':
      return state
        .map((i) => (i.product.id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
    case 'REMOVE':
      return state.filter((i) => i.product.id !== action.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((s, i) => s + i.qty * i.product.price, 0),
      addItem: (product) => dispatch({ type: 'ADD', product }),
      decrementItem: (id) => dispatch({ type: 'DECREMENT', id }),
      removeItem: (id) => dispatch({ type: 'REMOVE', id }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
