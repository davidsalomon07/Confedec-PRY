import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css' // Aquí está cargado Tailwind

// 1. IMPORTAR EL CONTEXTO DEL TEMA (¡Nuevo!) 🌑☀️
import { ThemeProvider } from './context/ThemeContext'

// 2. IMPORTAR EL LAYOUT
import DashboardLayout from './layout/DashboardLayout.jsx'

// 3. IMPORTAR LA LANDING PAGE (Login)
import App from './App.jsx'

// 4. IMPORTAR TUS PÁGINAS
import Profile from './pages/Profile.jsx'
import Informacion from './pages/Informacion.jsx'
import Ubicacion from './pages/Ubicacion.jsx'
import Directivo from './pages/Directivos.jsx'
import Estudiantes from './pages/Estudiantes.jsx'
import Paralelos from './pages/Paralelos.jsx'
import Personal from './pages/Personal.jsx'
import Consultas from './pages/Consultas.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 👇 ENVOLVEMOS TODO AQUÍ PARA QUE EL MODO OSCURO FUNCIONE GLOBALMENTE */}
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          
          {/* RUTA PÚBLICA (Login / Landing) */}
          <Route path="/" element={<App />} />

          {/* RUTAS PRIVADAS (Con el nuevo diseño que haremos) */}
          <Route element={<DashboardLayout />}>
             <Route path="/perfil" element={<Profile />} />
             <Route path="/informacion" element={<Informacion />} />
             <Route path="/ubicacion" element={<Ubicacion />} />
             <Route path="/directivo" element={<Directivo />} />
             <Route path="/estudiantes" element={<Estudiantes />} />
             <Route path="/paralelos" element={<Paralelos />} />
             <Route path="/personal" element={<Personal />} />
             <Route path="/consultas" element={<Consultas />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)