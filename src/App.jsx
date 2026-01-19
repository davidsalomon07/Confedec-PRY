import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import Personal from './Personal';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  // 1. Función para el Scroll Suave (Faltaba esto)
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 2. Función del Login
  const handleLogin = (e) => {
    e.preventDefault(); 
    // Aquí iría la validación real. Por ahora redirige al perfil:
    setShowLogin(false); // Cerramos el modal
    navigate('/perfil');
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
            <button onClick={() => scrollToSection('personal')}>PERSONAL</button>
          </nav>

          <button 
            className="login-btn-flashy" 
            onClick={() => setShowLogin(true)}
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
              
              <button className="map-btn-link" onClick={() => window.open('https://www.google.com/maps/place/CONFEDEC/@-0.2075885,-78.4884672,17z/data=!3m1!4b1!4m6!3m5!1s0x91d59a05dd7c38af:0x80d5cd75fc27cbf!8m2!3d-0.2075939!4d-78.4858923!16s%2Fg%2F11cks2mkf6?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoASAFQAw%3D%3D', '_blank')}>
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
                src="https://maps.google.com/maps?q=Calle+Andalucia+N24-63+y+Madrid+Quito&t=&z=15&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
              >
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 4: PERSONAL --- */}
<section id="personal" className="section-content personal-section">
  <div className="container">
    <div className="personal-header">
      <h3>Personal Institucional</h3>
      <p className="personal-intro">
        Conozca las diferentes categorías de personal que forman parte de nuestra comunidad educativa.
      </p>
    </div>

    <div className="personal-grid">
      <div className="personal-item">
        <span className="personal-line"></span>
        <h4>Docentes Particulares</h4>
      </div>
      <div className="personal-item">
        <span className="personal-line"></span>
        <h4>Administrativos Particulares</h4>
      </div>
      <div className="personal-item">
        <span className="personal-line"></span>
        <h4>Mantenimiento / Servicio</h4>
      </div>
      <div className="personal-item">
        <span className="personal-line"></span>
        <h4>Docentes Fiscales</h4>
      </div>
      <div className="personal-item">
        <span className="personal-line"></span>
        <h4>Administrativos Fiscales</h4>
      </div>
    </div>

    <div className="personal-footer">
      <a href="#">Contacto - redes sociales</a>
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
            
            {/* Formulario limpio y conectado */}
            <form className="login-form" onSubmit={handleLogin}>
              <input type="text" placeholder="Usuario / Código AMIE" required />
              <input type="password" placeholder="Contraseña" required />
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