import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' // <--- Esto es vital
import App from './App.jsx'
import Profile from './Profile.jsx'
import './index.css' // O './App.css' si usas ese para los estilos globales

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* AQUÍ está la solución: BrowserRouter envuelve a todo */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/perfil" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)