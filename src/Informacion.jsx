import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

function Informacion() {
  const navigate = useNavigate();

  // 1. Scroll al inicio al cargar
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // 2. Estado del Candado
  const [isLocked, setIsLocked] = useState(true);

  // 3. Estados para los datos de la institución
  const [direccion, setDireccion] = useState("Av. Amazonas N34-45 y Pereira, Edificio Torre Norte");
  const [email, setEmail] = useState("secretaria@unidadeducativa.edu.ec");
  const [telefonoFijo, setTelefonoFijo] = useState("(02) 245-6789");
  const [celular, setCelular] = useState("099-123-4567");
  const [web, setWeb] = useState("www.unidadeducativa.edu.ec");
  
  // Datos Legales (Agregados para completar la ficha)
  const [ruc, setRuc] = useState("1790012345001");
  const [resolucion, setResolucion] = useState("MINEDUC-2020-005-A");
  
  // Redes Sociales
  const [facebook, setFacebook] = useState("facebook.com/unidadeducativa");
  const [instagram, setInstagram] = useState("@unidad_educativa_oficial");
  const [twitter, setTwitter] = useState("@UE_Oficial");

  const handleLogout = () => navigate('/');
  const toggleLock = () => setIsLocked(!isLocked);
  
  const handleUpdate = () => {
    alert("¡Información institucional actualizada correctamente!");
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
          <NavLink to="/informacion" className={({ isActive }) => isActive ? "nav-tab-link active" : "nav-tab-link"}>INFORMACIÓN</NavLink>
          <NavLink to="/ubicacion" className="nav-tab-link">UBICACIÓN</NavLink>
          <NavLink to="/directivo" className="nav-tab-link">DIRECTIVO</NavLink>
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
          <h1>INFORMACIÓN INSTITUCIONAL</h1>
          <p>Datos de Contacto, Legal y Presencia Digital</p>
        </div>
      </div>

      {/* --- DISEÑO LIMPIO (NUEVO) --- */}
      <main className="clean-layout-container">
        
        {/* TARJETA 1: UBICACIÓN Y CONTACTO */}
        <div className="clean-card-box">
           <h3 className="clean-card-title">Ubicación y Contacto</h3>
           
           <div className="clean-input-group">
              <label>Dirección Matriz</label>
              <input 
                type="text" 
                className="clean-input" 
                value={direccion} 
                onChange={(e) => setDireccion(e.target.value)} 
                disabled={isLocked} 
              />
           </div>

           <div className="clean-input-group">
              <label>Teléfono Convencional</label>
              <input 
                type="tel" 
                className="clean-input" 
                value={telefonoFijo} 
                onChange={(e) => setTelefonoFijo(e.target.value)} 
                disabled={isLocked} 
              />
           </div>

           <div className="clean-input-group">
              <label>Celular Institucional / WhatsApp</label>
              <input 
                type="tel" 
                className="clean-input" 
                value={celular} 
                onChange={(e) => setCelular(e.target.value)} 
                disabled={isLocked} 
              />
           </div>
        </div>

        {/* TARJETA 2: DATOS LEGALES */}
        <div className="clean-card-box">
           <h3 className="clean-card-title">Identificación Legal</h3>
           
           <div className="clean-input-group">
              <label>Registro Único de Contribuyentes (RUC)</label>
              <input 
                type="text" 
                className="clean-input" 
                value={ruc} 
                onChange={(e) => setRuc(e.target.value)} 
                disabled={isLocked} 
              />
           </div>

           <div className="clean-input-group">
              <label>Resolución Ministerial</label>
              <input 
                type="text" 
                className="clean-input" 
                value={resolucion} 
                onChange={(e) => setResolucion(e.target.value)} 
                disabled={isLocked} 
              />
           </div>
        </div>

        {/* TARJETA 3: PRESENCIA DIGITAL */}
        <div className="clean-card-box">
           <h3 className="clean-card-title">Canales Digitales</h3>
           
           <div className="clean-input-group">
              <label>Sitio Web Oficial</label>
              <input 
                type="url" 
                className="clean-input" 
                value={web} 
                onChange={(e) => setWeb(e.target.value)} 
                disabled={isLocked} 
                placeholder="https://..." 
              />
           </div>

           <div className="clean-input-group">
              <label>Correo Electrónico Institucional</label>
              <input 
                type="email" 
                className="clean-input" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                disabled={isLocked} 
              />
           </div>

           <div className="clean-input-group">
             <label style={{marginTop: '10px', color: '#662483'}}>Redes Sociales</label>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <input 
                  type="text" 
                  className="clean-input" 
                  value={facebook} 
                  onChange={(e) => setFacebook(e.target.value)} 
                  disabled={isLocked} 
                  placeholder="Facebook"
                />
                <input 
                  type="text" 
                  className="clean-input" 
                  value={instagram} 
                  onChange={(e) => setInstagram(e.target.value)} 
                  disabled={isLocked} 
                  placeholder="Instagram"
                />
                <input 
                  type="text" 
                  className="clean-input" 
                  value={twitter} 
                  onChange={(e) => setTwitter(e.target.value)} 
                  disabled={isLocked} 
                  placeholder="X (Twitter)"
                />
             </div>
           </div>
        </div>

        <button className="update-data-btn wide-btn" disabled={isLocked} onClick={handleUpdate}>
           GUARDAR INFORMACIÓN
        </button>

      </main>

      <footer className="profile-footer">
        © 2026 CONFEDEC - Sistema de Gestión de Información Educativa
      </footer>
    </div>
  );
}

export default Informacion;