import { useState } from 'react'
import './App.css'

function App() {
  // Estados para controlar si el Login y el Menú están abiertos o cerrados
  const [showLogin, setShowLogin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="app-container">
      
      {/* --- HEADER --- */}
      <header className="main-header">
        <div className="header-left">
          <img src="/confedec.png" alt="Logo Confedec" className="header-logo" />
          <div className="brand-text">
            <h1>CONFEDEC</h1>
            <p>REGISTRO DE INFORMACION</p>
          </div>
        </div>

        {/* --- NAVEGACIÓN NUEVA --- */}
        <nav className="nav-menu">
          
          {/* 1. Botón de LOGIN */}
          <button 
            className="nav-btn login-btn" 
            onClick={() => setShowLogin(true)}
          >
            INICIO SESIÓN
          </button>

          {/* 2. Menú Desplegable (Dropdown) */}
          <div className="dropdown-container">
            <button 
              className="nav-btn menu-btn" 
              onClick={() => setShowMenu(!showMenu)}
            >
              MENÚ OPCIONES ▼
            </button>

            {/* Lista que aparece/desaparece */}
            {showMenu && (
              <div className="dropdown-content">
                <a href="#info">INFORMACIÓN</a>
                <a href="#ubicacion">UBICACIÓN</a>
                <a href="#directivo">DIRECTIVO</a>
                <a href="#estudiantes">ESTUDIANTES</a>
                <a href="#paralelos">PARALELOS</a>
                <a href="#personal">PERSONAL</a>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* --- VENTANA MODAL DE LOGIN (DISEÑO FINAL) --- */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal-box">
            
            {/* Cabecera del Login con Logo */}
            <div className="login-header">
              <div className="login-logo-circle">
                <img src="/confedec.png" alt="Logo" />
              </div>
              <h2>Bienvenido</h2>
              <p>Ingresa tus credenciales</p>
            </div>

            {/* Formulario */}
            <form className="login-form">
              <div className="input-group">
                <label>Código AMIE</label>
                <input type="text" placeholder="Ej: 17H00000" />
              </div>

              <div className="input-group">
                <label>Contraseña</label>
                <input type="password" placeholder="••••••••" />
              </div>

              <div className="options-row">
                <label className="checkbox-container">
                  <input type="checkbox" /> Recordarme
                </label>
                <a href="#" className="forgot-pass">¿Olvidaste tu contraseña?</a>
              </div>

              <button type="submit" className="confirm-btn">INGRESAR</button>
            </form>

            {/* Botón de Regresar */}
            <button className="back-btn" onClick={() => setShowLogin(false)}>
              ← Regresar a Registro de información
            </button>

          </div>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="hero-overlay">
          {/* NOTA: Si tu imagen ya tiene texto, deja este div vacío */}
          <div className="hero-content">
            <h1>CONFEDEC</h1>
            <h2>Confederación Ecuatoriana de Establecimientos de Educación Católica</h2>
          </div>
        </div>
      </section>

      {/* --- INFO SECTION --- */}
      <section className="info-section">
        <div className="info-container">
          <div className="info-left">
            <h3>¿Qué es la CONFEDEC?</h3>
            <div className="circle-logo-container">
               <img src="/confedec.png" alt="Logo Circular" />
            </div>
          </div>
          <div className="info-right">
            <p>
              La Confederación Ecuatoriana de Establecimientos de Educación Católica, es una institución de derecho privado, con finalidad de servicio social y sin fines de lucro, está integrada por 22 Federaciones Provinciales.
            </p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="main-footer">
        <p>Contacto - redes sociales</p>
      </footer>

    </div>
  )
}

export default App