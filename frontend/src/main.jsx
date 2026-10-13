import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { WalletProvider } from './context/WalletContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { TransactionsProvider } from './context/TransactionsContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <TransactionsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </TransactionsProvider>
      </WalletProvider>
    </BrowserRouter>
  </React.StrictMode>
);
