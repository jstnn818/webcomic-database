import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SeriesContextProvider } from './context/SeriesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SeriesContextProvider>
      <App />
    </SeriesContextProvider>
  </React.StrictMode>
);

