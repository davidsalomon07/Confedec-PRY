import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

function Estudiantes() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => navigate('/');

  // 🔒 BLOQUEO DE EDICIÓN
  const [isLocked, setIsLocked] = useState(true);

  // 📚 ESTADOS
  const [nivel, setNivel] = useState('');
  const [curso, setCurso] = useState('');
  const [hombres, setHombres] = useState('');
  const [mujeres, setMujeres] = useState('');

  // 🎯 CURSOS SEGÚN NIVEL
  const cursosPorNivel = {
    Inicial: ['Inicial 3 años', 'Inicial 4 años'],
    Preparatoria: ['1° EGB'],
    'Básica Elemental': ['2° EGB', '3° EGB', '4° EGB'],
    'Básica Media': ['5° EGB', '6° EGB', '7° EGB'],
    'Básica Superior': ['8° EGB', '9° EGB', '10° EGB']
  };

  // 🧼 LIMPIAR CUANDO CAMBIA NIVEL
  const handleNivelChange = (e) => {
    setNivel(e.target.value);
    setCurso('');
    setHombres('');
    setMujeres('');
  };

  const handleGuardar = () => {
    alert('Cambios guardados correctamente');
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
          <NavLink to="/estudiantes" className="nav-tab-link active">ESTUDIANTES</NavLink>
          <NavLink to="/paralelos" className="nav-tab-link">PARALELOS</NavLink>
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
          <h1>ESTUDIANTES</h1>
          <p>Gestión de estudiantes por nivel y curso</p>
        </div>
      </div>

      {/* CONTENIDO */}
      <main className="students-section">
        <div className="students-left">

          <label>Nivel de Educación</label>
          <select
            className="data-select"
            value={nivel}
            onChange={handleNivelChange}
            disabled={isLocked}
          >
            <option value="">Seleccione un nivel</option>
            <option>Inicial</option>
            <option>Preparatoria</option>
            <option>Básica Elemental</option>
            <option>Básica Media</option>
            <option>Básica Superior</option>
          </select>

          {nivel && (
            <>
              <label>Curso</label>
              <select
                className="data-select"
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                disabled={isLocked}
              >
                <option value="">Seleccione un curso</option>
                {cursosPorNivel[nivel].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </>
          )}

          {curso && (
            <>
              <label>Hombres</label>
              <input
                type="number"
                className="data-input"
                value={hombres}
                onChange={(e) => setHombres(e.target.value)}
                disabled={isLocked}
              />

              <label>Mujeres</label>
              <input
                type="number"
                className="data-input"
                value={mujeres}
                onChange={(e) => setMujeres(e.target.value)}
                disabled={isLocked}
              />
            </>
          )}

          <button
            className="update-data-btn"
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

export default Estudiantes;
