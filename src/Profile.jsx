import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

function Profile() {
  const navigate = useNavigate();
  
  // EFECTO PARA QUE LA PÁGINA SIEMPRE INICIE DESDE ARRIBA
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ESTADO PARA EL CANDADO
  const [isLocked, setIsLocked] = useState(true);

  // ESTADOS PARA LOS CAMPOS EDITABLES
  const [distrito, setDistrito] = useState("Zona 9 - Distrito 17D05");
  const [historia, setHistoria] = useState("La institución fue fundada con la misión de brindar educación católica de alta calidad, basada en los valores de San Vicente de Paúl, sirviendo a la comunidad desde 1980...");
  
  // NUEVOS ESTADOS PARA OBRA SOCIAL
  const [tipoObraSocial, setTipoObraSocial] = useState("Educativa - Social");
  const [descripcionObra, setDescripcionObra] = useState("Detalle aquí las actividades y el alcance de la obra social que realiza la institución...");

  const handleLogout = () => navigate('/');
  const toggleLock = () => setIsLocked(!isLocked);

  const handleUpdate = () => {
    alert("¡Datos actualizados correctamente en el sistema!");
    setIsLocked(true); 
  };

  return (
    <div className="profile-wrapper">
      {/* --- HEADER AZUL INSTITUCIONAL --- */}
      <header className="profile-navbar-blue">
        <div className="navbar-left">
          <img src="/confedec.png" alt="Logo" className="nav-logo" />
          <div className="nav-text-block">
            <h1 className="brand-title">CONFEDEC</h1>
            <p className="brand-subtitle">REGISTRO DE INFORMACIÓN</p>
          </div>
        </div>

        <nav className="navbar-tabs-container">
          <NavLink to="/perfil" className={({ isActive }) => isActive ? "nav-tab-link active" : "nav-tab-link"}>IDENTIFICACIÓN</NavLink>
          <NavLink to="/informacion" className="nav-tab-link">INFORMACIÓN</NavLink>
          <NavLink to="/ubicacion" className="nav-tab-link">UBICACIÓN</NavLink>
          <NavLink to="/directivo" className="nav-tab-link">DIRECTIVO</NavLink>
          <NavLink to="/estudiantes" className="nav-tab-link">ESTUDIANTES</NavLink>
          <NavLink to="/paralelos" className="nav-tab-link">PARALELOS</NavLink>
          <NavLink to="/personal" className="nav-tab-link">PERSONAL</NavLink>
        </nav>

        {/* BOTÓN SALIR CON TEXTO DEBAJO */}
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

      {/* --- BARRA DE SEGURIDAD --- */}
      <div className="security-bar">
        <button 
          className={`lock-toggle-btn ${isLocked ? 'locked' : 'unlocked'}`} 
          onClick={toggleLock}
        >
          {isLocked ? 'DESBLOQUEAR EDICIÓN' : 'EDICIÓN ACTIVADA'}
        </button>
      </div>

      <div className="profile-hero-banner">
        <div className="hero-content">
          <img src="/confedec.png" alt="Logo" className="hero-logo-large" />
          <h1>PERFIL DE LA INSTITUCIÓN</h1>
          <p>Gestión Centralizada de Datos Educativos</p>
        </div>
      </div>

      <main className="profile-data-grid">
        <div className="data-container">
          
          {/* COLUMNA 1 */}
          <div className="data-column">
            <div className="section-label">CONFIGURACIÓN BÁSICA</div>
            
            <label>Tipo de Sostenimiento</label>
            <select className="data-select" disabled={isLocked}>
              <option value="fiscomisional">Fiscomisional</option>
              <option value="particular">Particular</option>
              <option value="fiscal">Fiscal</option>
              <option value="municipal">Municipal</option>
            </select>

            <label>Entidad Patrocinada / Congregación</label>
            <select className="data-select" disabled={isLocked}>
              <option>Hermanas de la Caridad</option>
              <option>Salesianos de Don Bosco</option>
              <option>Compañía de Jesús (Jesuitas)</option>
              <option>Hermanos Cristianos de La Salle</option>
              <option>Dominicos</option>
            </select>

            <label>Distrito Educativo</label>
            <input 
              type="text" 
              className="data-input" 
              value={distrito} 
              onChange={(e) => setDistrito(e.target.value)}
              disabled={isLocked}
            />
          </div>

          {/* COLUMNA 2: HISTORIA Y OBRA SOCIAL */}
          <div className="data-column">
            <div className="section-label">RESEÑA Y OBRA SOCIAL</div>

            <label>Fecha de Creación</label>
            <input type="date" className="data-input" disabled={isLocked} defaultValue="1980-05-24" />

            <label>Breve Historia Institucional</label>
            <textarea 
              className="data-textarea" 
              value={historia}
              onChange={(e) => setHistoria(e.target.value)}
              disabled={isLocked}
              rows="4"
            />

            <label>Tipo de Obra Social</label>
            <input 
              type="text" 
              className="data-input" 
              value={tipoObraSocial} 
              onChange={(e) => setTipoObraSocial(e.target.value)}
              disabled={isLocked}
              placeholder="Ej: Educativa, Asistencial, etc."
            />

            <label>Descripción de la Obra Social</label>
            <textarea 
              className="data-textarea" 
              value={descripcionObra}
              onChange={(e) => setDescripcionObra(e.target.value)}
              disabled={isLocked}
              rows="5"
            />
          </div>

          {/* COLUMNA 3 */}
          <div className="data-column">
            <div className="section-label">OFERTA ACADÉMICA</div>
            
            <div className={`educational-level-box ${isLocked ? 'box-locked' : ''}`}>
              <div className="checkbox-grid">
                <label className="check-item"><input type="checkbox" disabled={isLocked} defaultChecked /> Inicial (3-4 años)</label>
                <label className="check-item"><input type="checkbox" disabled={isLocked} defaultChecked /> Preparatoria (1º EGB)</label>
                <label className="check-item"><input type="checkbox" disabled={isLocked} defaultChecked /> Básica Elemental</label>
                <label className="check-item"><input type="checkbox" disabled={isLocked} defaultChecked /> Básica Media</label>
                <label className="check-item"><input type="checkbox" disabled={isLocked} defaultChecked /> Básica Superior</label>
                <label className="check-item"><input type="checkbox" disabled={isLocked} defaultChecked /> Bachillerato General</label>
              </div>
            </div>

            <button 
              className="update-data-btn" 
              disabled={isLocked}
              onClick={handleUpdate}
            >
              ACTUALIZAR DATOS
            </button>
            <h2 className="watermark-text">CONFEDEC</h2>
          </div>
        </div>
      </main>

      <footer className="profile-footer">
        © 2026 CONFEDEC - Sistema de Gestión de Información Educativa
      </footer>
    </div>
  );
}

export default Profile;