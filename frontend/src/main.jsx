import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { hydratePublic } from './data/sync.js';
import './index.css';

/* One-time reset: clear any cart items saved by an earlier version so the
   cart starts empty. Guarded by a flag, so it only runs once and never
   touches carts created afterwards. */
try {
  const CART_RESET_FLAG = 'lumiere-cart-reset';
  if (window.localStorage.getItem(CART_RESET_FLAG) !== 'v1') {
    window.localStorage.removeItem('lumiere-bag');
    window.localStorage.setItem(CART_RESET_FLAG, 'v1');
  }
} catch {
  /* storage unavailable — nothing to reset */
}

hydratePublic();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
