import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { LoginContextProvider } from "./components/LoginContext";
import { CartProvider } from "react-use-cart";


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <LoginContextProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </LoginContextProvider>
  </BrowserRouter>
  // </React.StrictMode>,
)
