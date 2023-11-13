import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/tailwind.css';
import App from './App';
import { PrimeReactProvider } from 'primereact/api';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PrimeReactProvider value={{ unstyled: true, pt: { }}} >
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);


