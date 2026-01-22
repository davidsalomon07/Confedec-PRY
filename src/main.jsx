import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// 1. IMPORTA EL LAYOUT (Carpeta layout)
import DashboardLayout from './layout/DashboardLayout.jsx'

// 2. IMPORTA LA LANDING PAGE (Carpeta raíz)
import App from './App.jsx'

// 3. IMPORTA TUS PÁGINAS (Carpeta pages)
// 👇 AQUÍ ESTABA EL ERROR: Ahora le decimos que busque dentro de "pages/"
import Profile from './pages/Profile.jsx'
import Informacion from './pages/Informacion.jsx'
import Ubicacion from './pages/Ubicacion.jsx'
import Directivo from './pages/Directivos.jsx'
import Estudiantes from './pages/Estudiantes.jsx'
import Paralelos from './pages/Paralelos.jsx'
import Personal from './pages/Personal.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        
        {/* RUTA PÚBLICA (Login) */}
        <Route path="/" element={<App />} />

        {/* RUTAS PRIVADAS (Con Menú y Candado) */}
        <Route element={<DashboardLayout />}>
           <Route path="/perfil" element={<Profile />} />
           <Route path="/informacion" element={<Informacion />} />
           <Route path="/ubicacion" element={<Ubicacion />} />
           <Route path="/directivo" element={<Directivo />} />
           <Route path="/estudiantes" element={<Estudiantes />} />
           <Route path="/paralelos" element={<Paralelos />} />
           <Route path="/personal" element={<Personal />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)