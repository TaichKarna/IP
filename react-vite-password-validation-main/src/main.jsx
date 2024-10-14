import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ReactTSParticles } from './components/ReactTSParticles.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReactTSParticles />
    <App />
  </React.StrictMode>
);
