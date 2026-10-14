import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { hydratePublic } from './data/sync.js';
import './index.css';

hydratePublic();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
