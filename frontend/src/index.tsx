import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SeriesContextProvider } from './context/SeriesContext'
import { AuthContextProvider } from './context/AuthContext'

import './css/index.css'

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <AuthContextProvider>
        <SeriesContextProvider>
          <App />
        </SeriesContextProvider>
      </AuthContextProvider> 
    </React.StrictMode>
  )
} 
else {
  console.error("Root element with id 'root' not found.")
}

