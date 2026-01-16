import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

function Paralelos() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => navigate('/');

  // 🔒 CONTROL DE EDICIÓN
  const [isLocked, setIsLocked] = useState(true);

  // 📚 PARALELOS POR NIVEL
  const [paralelos, setParalelos] = useState({
    inicial: '',
    preparatoria: '',
    basicaElemental: '',
    basicaMedia: '',
    basicaSuperior: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParalelos({ ...paralelos, [name]: value });
  };

  const handleGuardar = () => {
    alert('Paralelos guardados correctamente');
    setIsLocked(true);
  };

  return (
    <div className="profile-wrapper">

      {/* HEADER */}
      <header className="profile-navbar-blue">
        <div className="navbar-left">
          <img src="/confedec.png" alt="Logo" className="nav-logo" />
          <div className="nav-text-block">
            <h1 className="brand-title">CONFEDEC</h1>
            <p className="brand-subtitle">REGISTRO DE INFORMACIÓN</p>
          </div>
        </div>

        <nav className="navbar-tabs-container">
          <NavLink to="/perfil" className="nav-tab-link">PERFIL</NavLink>
          <NavLink to="/informacion" className="nav-tab-link">INFORMACIÓN</NavLink>
          <NavLink to="/ubicacion" className="nav-tab-link">UBICACIÓN</NavLink>
          <NavLink to="/directivo" className="nav-tab-link">DIRECTIVO</NavLink>
          <NavLink to="/estudiantes" className="nav-tab-link">ESTUDIANTES</NavLink>
          <NavLink to="/paralelos" className="nav-tab-link active">PARALELOS</NavLink>
          <NavLink to="/personal" className="nav-tab-link">PERSONAL</NavLink>
        </nav>

        {/* 🔴 CERRAR SESIÓN (SVG CORRECTO) */}
        <div className="navbar-right-logout">
          <button
            className="logout-circle-btn"
            onClick={handleLogout}
            title="Cerrar Sesión"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
          <span className="logout-label">CERRAR SESIÓN</span>
        </div>
      </header>

      {/* 🔐 BARRA DE SEGURIDAD */}
      <div className="security-bar">
        <button
          className={`lock-toggle-btn ${isLocked ? 'locked' : 'unlocked'}`}
          onClick={() => setIsLocked(!isLocked)}
        >
          {isLocked ? 'DESBLOQUEAR EDICIÓN' : 'EDICIÓN ACTIVADA'}
        </button>
      </div>

      {/* BANNER */}
      <div className="profile-hero-banner">
        <div className="hero-content">
          <img src="/confedec.png" alt="Logo" className="hero-logo-large" />
          <h1>PARALELOS</h1>
          <p>Gestión de paralelos por nivel educativo</p>
        </div>
      </div>

      {/* CONTENIDO */}
      <main className="paralelos-section">
        <div className="paralelos-card">

          <h2 className="paralelos-title">Paralelos por Nivel Educativo</h2>

          <div className="paralelos-grid">

            <div className="paralelo-item">
              <label>INICIAL</label>
              <input
                type="number"
                name="inicial"
                value={paralelos.inicial}
                onChange={handleChange}
                disabled={isLocked}
                placeholder="Cantidad de paralelos"
              />
            </div>

            <div className="paralelo-item">
              <label>PREPARATORIA</label>
              <input
                type="number"
                name="preparatoria"
                value={paralelos.preparatoria}
                onChange={handleChange}
                disabled={isLocked}
              />
            </div>

            <div className="paralelo-item">
              <label>BÁSICA ELEMENTAL</label>
              <input
                type="number"
                name="basicaElemental"
                value={paralelos.basicaElemental}
                onChange={handleChange}
                disabled={isLocked}
              />
            </div>

            <div className="paralelo-item">
              <label>BÁSICA MEDIA</label>
              <input
                type="number"
                name="basicaMedia"
                value={paralelos.basicaMedia}
                onChange={handleChange}
                disabled={isLocked}
              />
            </div>

            <div className="paralelo-item">
              <label>BÁSICA SUPERIOR</label>
              <input
                type="number"
                name="basicaSuperior"
                value={paralelos.basicaSuperior}
                onChange={handleChange}
                disabled={isLocked}
              />
            </div>

          </div>

          <button
            className="paralelos-save-btn"
            disabled={isLocked}
            onClick={handleGuardar}
          >
            GUARDAR CAMBIOS
          </button>

        </div>
      </main>

      <footer className="profile-footer">
        © 2026 CONFEDEC - Sistema de Gestión de Información Educativa
      </footer>

    </div>
  );
}

export default Paralelos;
