import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './store/AuthStore.jsx'
import { ProductProvider } from './store/ProductStore.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
            <App />
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
