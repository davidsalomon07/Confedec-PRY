import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

function Directivo() {
  const navigate = useNavigate();

  // 1. Scroll al inicio
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // 2. Candado de seguridad
  const [isLocked, setIsLocked] = useState(true);

  // --- ESTADOS PARA DIRECTOR GENERAL ---
  const [dirNombre, setDirNombre] = useState("");
  const [dirEmail, setDirEmail] = useState("");
  const [dirTelf, setDirTelf] = useState("");
  const [dirCedula, setDirCedula] = useState("");

  // --- ESTADOS PARA RECTORADO ---
  const [rectNombre, setRectNombre] = useState("");
  const [rectEmail, setRectEmail] = useState("");
  const [rectTelf, setRectTelf] = useState("");
  const [rectCedula, setRectCedula] = useState("");

  // --- ESTADOS PARA VICERRECTORADO ---
  const [viceNombre, setViceNombre] = useState("");
  const [viceEmail, setViceEmail] = useState("");
  const [viceTelf, setViceTelf] = useState("");
  const [viceCedula, setViceCedula] = useState("");

  // --- ESTADOS PARA SECRETARÍA (CONTACTO) ---
  const [secNombre, setSecNombre] = useState("");
  const [secEmail, setSecEmail] = useState("");
  const [secTelf, setSecTelf] = useState("");
  const [secCedula, setSecCedula] = useState("");

  const handleLogout = () => navigate('/');
  const toggleLock = () => setIsLocked(!isLocked);

  const handleUpdate = () => {
    alert("¡Datos de autoridades guardados correctamente!");
    setIsLocked(true); 
  };

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

        <nav className="navbar-tabs-container">
          <NavLink to="/perfil" className="nav-tab-link">IDENTIFICACIÓN</NavLink>
          <NavLink to="/informacion" className="nav-tab-link">INFORMACIÓN</NavLink>
          <NavLink to="/ubicacion" className="nav-tab-link">UBICACIÓN</NavLink>
          <NavLink to="/directivo" className={({ isActive }) => isActive ? "nav-tab-link active" : "nav-tab-link"}>DIRECTIVO</NavLink>
          <NavLink to="/estudiantes" className="nav-tab-link">ESTUDIANTES</NavLink>
          <NavLink to="/paralelos" className="nav-tab-link">PARALELOS</NavLink>
          <NavLink to="/personal" className="nav-tab-link">PERSONAL</NavLink>
        </nav>

        <div className="navbar-right-logout">
          <button className="logout-circle-btn" onClick={handleLogout} title="Cerrar Sesión">
             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
          <span className="logout-label">CERRAR SESIÓN</span>
        </div>
      </header>

      {/* --- BARRA DE SEGURIDAD --- */}
      <div className="security-bar">
        <button className={`lock-toggle-btn ${isLocked ? 'locked' : 'unlocked'}`} onClick={toggleLock}>
          {isLocked ? 'DESBLOQUEAR EDICIÓN' : 'EDICIÓN ACTIVADA'}
        </button>
      </div>

      <div className="profile-hero-banner">
        <div className="hero-content">
          <img src="/confedec.png" alt="Logo" className="hero-logo-large" />
          <h1>CUADRO DIRECTIVO</h1>
          <p>Datos de Contacto de las Autoridades Institucionales</p>
        </div>
      </div>

      <main className="profile-data-grid">
        <div className="data-container">
          
          {/* BLOQUE 1: DIRECTOR GENERAL */}
          <div className="data-column">
            <div className="section-label">DIRECTOR GENERAL</div>
            
            <label>Nombres Completos</label>
            <input type="text" className="data-input" value={dirNombre} onChange={(e) => setDirNombre(e.target.value)} disabled={isLocked} />

            <label>Cédula de Identidad</label>
            <input type="text" className="data-input" value={dirCedula} onChange={(e) => setDirCedula(e.target.value)} disabled={isLocked} placeholder="10 dígitos" />

            <label>Correo Electrónico</label>
            <input type="email" className="data-input" value={dirEmail} onChange={(e) => setDirEmail(e.target.value)} disabled={isLocked} />

            <label>Número de Contacto</label>
            <input type="tel" className="data-input" value={dirTelf} onChange={(e) => setDirTelf(e.target.value)} disabled={isLocked} />
          </div>

          {/* BLOQUE 2: RECTORADO */}
          <div className="data-column">
            <div className="section-label">RECTOR(A)</div>

            <label>Nombres Completos</label>
            <input type="text" className="data-input" value={rectNombre} onChange={(e) => setRectNombre(e.target.value)} disabled={isLocked} />

            <label>Cédula de Identidad</label>
            <input type="text" className="data-input" value={rectCedula} onChange={(e) => setRectCedula(e.target.value)} disabled={isLocked} />

            <label>Correo Electrónico</label>
            <input type="email" className="data-input" value={rectEmail} onChange={(e) => setRectEmail(e.target.value)} disabled={isLocked} />

            <label>Número de Contacto</label>
            <input type="tel" className="data-input" value={rectTelf} onChange={(e) => setRectTelf(e.target.value)} disabled={isLocked} />
          </div>

          {/* BLOQUE 3: VICERRECTORADO */}
          <div className="data-column">
             <div className="section-label">VICERRECTOR(A)</div>
             
             <label>Nombres Completos</label>
             <input type="text" className="data-input" value={viceNombre} onChange={(e) => setViceNombre(e.target.value)} disabled={isLocked} />

             <label>Cédula de Identidad</label>
             <input type="text" className="data-input" value={viceCedula} onChange={(e) => setViceCedula(e.target.value)} disabled={isLocked} />

             <label>Correo Electrónico</label>
             <input type="email" className="data-input" value={viceEmail} onChange={(e) => setViceEmail(e.target.value)} disabled={isLocked} />

             <label>Número de Contacto</label>
             <input type="tel" className="data-input" value={viceTelf} onChange={(e) => setViceTelf(e.target.value)} disabled={isLocked} />
          </div>

          {/* BLOQUE 4: SECRETARÍA */}
          <div className="data-column">
             <div className="section-label">SECRETARÍA (CONTACTO)</div>
             
             <label>Nombres Completos</label>
             <input type="text" className="data-input" value={secNombre} onChange={(e) => setSecNombre(e.target.value)} disabled={isLocked} />

             <label>Cédula de Identidad</label>
             <input type="text" className="data-input" value={secCedula} onChange={(e) => setSecCedula(e.target.value)} disabled={isLocked} />

             <label>Correo Electrónico</label>
             <input type="email" className="data-input" value={secEmail} onChange={(e) => setSecEmail(e.target.value)} disabled={isLocked} />

             <label>Número de Contacto</label>
             <input type="tel" className="data-input" value={secTelf} onChange={(e) => setSecTelf(e.target.value)} disabled={isLocked} />

             <button className="update-data-btn" disabled={isLocked} onClick={handleUpdate}>
               GUARDAR CAMBIOS
             </button>
             <h2 className="watermark-text">AUTORIDAD</h2>
          </div>

        </div>
      </main>

      <footer className="profile-footer">
        © 2026 CONFEDEC - Sistema de Gestión de Información Educativa
      </footer>
    </div>
  );
}

export default Directivo;