import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  // --- NUEVOS ESTADOS AÑADIDOS ---
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 1. Función para el Scroll Suave (Faltaba esto)
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 2. Función del Login (MODIFICADA PARA CONECTAR AL BACKEND)
  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError(''); 

    try {
      // Petición al servidor local de Node.js que configuramos
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password })
      });

      const data = await response.json();

      if (response.ok) {
        // --- GUARDAMOS LOS DATOS DE LA BD PARA QUE SE REFLEJEN EN EL PERFIL ---
        localStorage.setItem('user_data', JSON.stringify(data.user)); 
        
        setShowLogin(false); 
        navigate('/perfil');
      } else {
        setError(data.error || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error al conectar con el servidor. ¿Está encendido el backend?');
    }
  };

  return (
    <div className="app-container">
      
      {/* --- HEADER --- */}
      <header className="main-header">
        <div className="header-left">
          <img src="/confedec.png" alt="Logo Confedec" className="header-logo" />
          <div className="brand-text">
            <h1>CONFEDEC</h1>
            <p>REGISTRO DE INFORMACIÓN</p>
          </div>
        </div>

        {/* --- NAVEGACIÓN Y LOGIN --- */}
        <div className="header-right">
          <nav className="nav-tabs">
            <button onClick={() => scrollToSection('informacion')}>INFORMACIÓN</button>
            <button onClick={() => scrollToSection('directivo')}>DIRECTIVO</button>
            <button onClick={() => scrollToSection('ubicacion')}>UBICACIÓN</button>
          </nav>

          <button 
            className="login-btn-flashy" 
            onClick={() => {
              setShowLogin(true);
              setError(''); // Limpia errores al abrir
            }}
          >
            INICIO SESIÓN
          </button>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>CONFEDEC</h1>
            <h2>Confederación Ecuatoriana de Establecimientos de Educación Católica</h2>
            
            <button 
              className="explore-btn" 
              onClick={() => scrollToSection('informacion')}
            >
              CONOCER MÁS ↓
            </button>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 1: INFORMACIÓN --- */}
      <section id="informacion" className="section-content info-section">
        <div className="container">
          <div className="info-grid">
            <div className="info-text">
              <h3>¿Quiénes Somos?</h3>
              <p>
                La Confederación Ecuatoriana de Establecimientos de Educación Católica es una institución de derecho privado, con finalidad de servicio social y sin fines de lucro. Integramos a 22 Federaciones Provinciales y buscamos la excelencia en la educación basada en valores.
              </p>
            </div>
            <div className="info-image">
               <div className="circle-logo-container">
                  <img src="/confedec.png" alt="Logo" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 2: DIRECTIVO --- */}
      <section id="directivo" className="section-content directivo-section">
        <div className="container">
          <div className="directivo-header">
            <h3>Autoridades Institucionales</h3>
            <p className="directivo-intro">
              Conozca a quienes encabezan nuestra estructura organizacional.
            </p>
          </div>

          <div className="directivo-layout">
            <p className="directivo-text-main">
              Este apartado está dedicado a nuestro equipo de liderazgo, 
              <span className="highlight-text"> pilares fundamentales de nuestra gestión.</span>
            </p>

            <div className="roles-minimal-grid">
              <div className="role-item">
                <span className="role-line"></span>
                <h4>Dirección General</h4>
              </div>
              <div className="role-item">
                <span className="role-line"></span>
                <h4>Rectorado</h4>
              </div>
              <div className="role-item">
                <span className="role-line"></span>
                <h4>Vicerrectorado</h4>
              </div>
              <div className="role-item">
                <span className="role-line"></span>
                <h4>Secretaría</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 3: UBICACIÓN --- */}
      <section id="ubicacion" className="section-content ubicacion-section">
        <div className="container">
          <h3>Nuestra Ubicación</h3>
          <p className="subtitle">Visítanos en nuestra sede central</p>
          
          <div className="location-grid">
            <div className="location-info">
              <div className="info-item">
                <div>
                  <h4>Dirección</h4>
                  <p>Calle Andalucía N24-63 y Madrid</p>
                  <p>Sector La Floresta, Quito - Ecuador</p>
                </div>
              </div>
              
              <div className="info-item">
                <div>
                  <h4>Teléfono</h4>
                  <p>(02) 222-1986</p>
                </div>
              </div>

              <div className="info-item">
                <div>
                  <h4>Email</h4>
                  <p>confedec.comunicaciones@confedec.org</p>
                </div>
              </div>
              
              <button className="map-btn-link" onClick={() => window.open('https://www.google.com/maps', '_blank')}>
                Abrir en Google Maps ↗
              </button>
            </div>

            <div className="map-container">
              <iframe 
                title="Mapa Confedec"
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.790251745486!2d-78.4891244!3d-0.2131908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a107663276d%3A0x63319077227448d3!2sAndaluc%C3%ADa%20N24-63%2C%20Quito%20170143!5e0!3m2!1ses!2sec!4v1700000000000!5m2!1ses!2sec"
                allowFullScreen
              >
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="main-footer">
        <p>© 2026 CONFEDEC - Todos los derechos reservados</p>
        <div className="social-links">Facebook | Instagram | Twitter</div>
      </footer>

      {/* --- MODAL LOGIN CORREGIDO --- */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="login-logo-circle"><img src="/confedec.png" alt="Logo" /></div>
            <h2>Bienvenido</h2>
            <p>Plataforma de Gestión</p>
            
            <form className="login-form" onSubmit={handleLogin}>
              <input 
                type="text" 
                placeholder="Usuario / Código AMIE" 
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required 
              />
              <input 
                type="password" 
                placeholder="Contraseña" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />

              {/* Mensaje de error visual si falla el login */}
              {error && <p style={{ color: 'red', fontSize: '13px', margin: '10px 0' }}>{error}</p>}

              <button type="submit" className="confirm-btn">ACCEDER</button>
            </form>
            
            <button className="back-btn" onClick={() => setShowLogin(false)}>Cerrar</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default App