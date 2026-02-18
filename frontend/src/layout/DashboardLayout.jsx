import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../App.css'; 

const DashboardLayout = () => {
  const navigate = useNavigate();
  
  // Estados para el candado y el menú móvil
  const [isLocked, setIsLocked] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => navigate('/');

  return (
    <div className="profile-wrapper">
      
      {/* --- HEADER --- */}
      <header className="profile-navbar-blue">
        <div className="navbar-left">
          <img src="/confedec.png" alt="Logo" className="nav-logo" />
          <div className="nav-text-block">
            <h1 className="brand-title">CONFEDEC</h1>
            <p className="brand-subtitle">REGISTRO DE INFORMACIÓN</p>
          </div>
        </div>

        {/* --- BOTÓN HAMBURGUESA (Solo visible en móvil según tu CSS) --- */}
        <button 
          className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* --- BARRA DE NAVEGACIÓN (Una sola, limpia) --- */}
        <nav className={`navbar-tabs-container ${isMenuOpen ? 'menu-visible' : ''}`}>
          <NavLink to="/perfil" className="nav-tab-link" onClick={() => setIsMenuOpen(false)} end>PERFIL</NavLink>
          <NavLink to="/informacion" className="nav-tab-link" onClick={() => setIsMenuOpen(false)}>INFORMACIÓN</NavLink>
          <NavLink to="/ubicacion" className="nav-tab-link" onClick={() => setIsMenuOpen(false)}>UBICACIÓN</NavLink>
          <NavLink to="/directivo" className="nav-tab-link" onClick={() => setIsMenuOpen(false)}>DIRECTIVO</NavLink>
          <NavLink to="/estudiantes" className="nav-tab-link" onClick={() => setIsMenuOpen(false)}>ESTUDIANTES</NavLink>
          <NavLink to="/paralelos" className="nav-tab-link" onClick={() => setIsMenuOpen(false)}>PARALELOS</NavLink>
          <NavLink to="/personal" className="nav-tab-link" onClick={() => setIsMenuOpen(false)}>PERSONAL</NavLink>
          
          {/* Tu nuevo botón */}
          <NavLink to="/consultas" className="nav-tab-link" onClick={() => setIsMenuOpen(false)}>CONSULTAS</NavLink>
        </nav>

        {/* --- BOTÓN CERRAR SESIÓN --- */}
        <div className="navbar-right-logout">
          <button className="logout-circle-btn" onClick={handleLogout} title="Cerrar Sesión">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
          <span className="logout-label">CERRAR SESIÓN</span>
        </div>
      </header>

      {/* --- CONTENIDO DE LAS PÁGINAS --- */}
      <div className="dashboard-content">
        <Outlet context={[isLocked, setIsLocked]} />
      </div>

      <footer className="profile-footer">
        © 2026 CONFEDEC - Sistema de Gestión de Información Educativa
      </footer>

    </div>
  );
};

export default DashboardLayout;