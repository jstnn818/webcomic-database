import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import { SeriesContextProvider } from './context/SeriesContext'
import { ChaptersContextProvider } from './context/ChaptersContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <SeriesContextProvider>
      <ChaptersContextProvider>
        <App />
      </ChaptersContextProvider>
    </SeriesContextProvider>
  </React.StrictMode>
);

