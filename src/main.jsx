import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Profile from './Profile.jsx'
import Ubicacion from './Ubicacion.jsx' // <--- 1. Importa el nuevo archivo
import Informacion from './Informacion.jsx'
import Directivo from './Directivos.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/ubicacion" element={<Ubicacion />} /> {/* <--- 2. Añade esta ruta */}
        <Route path="/informacion" element={<Informacion />} />
        <Route path="/directivo" element={<Directivo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)