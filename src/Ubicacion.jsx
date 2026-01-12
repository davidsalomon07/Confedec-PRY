import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

const ecuadorData = {
  "Azuay": ["Cuenca", "Girón", "Gualaceo", "Nabón", "Paute", "Pucará", "San Fernando", "Santa Isabel", "Sigsig", "Oña", "Chordeleg", "El Pan", "Sevilla de Oro", "Guachapala", "Camilo Ponce Enríquez"],
  "Bolívar": ["Guaranda", "Chillanes", "Chimbo", "Echeandía", "San Miguel", "Caluma", "Las Naves"],
  "Cañar": ["Azogues", "Biblián", "Cañar", "La Troncal", "El Tambo", "Deleg", "Suscal"],
  "Carchi": ["Tulcán", "Bolívar", "Espejo", "Mira", "Montúfar", "San Pedro de Huaca"],
  "Cotopaxi": ["Latacunga", "La Maná", "Pangua", "Pujilí", "Salcedo", "Saquisilí", "Sigchos"],
  "Chimborazo": ["Riobamba", "Alausí", "Colta", "Chambo", "Chunchi", "Guamote", "Guano", "Pallatanga", "Penipe", "Cumandá"],
  "El Oro": ["Machala", "Arenillas", "Atahualpa", "Balsas", "Chilla", "El Guabo", "Huaquillas", "Marcabelí", "Pasaje", "Piñas", "Santa Rosa", "Zaruma", "Las Lajas"],
  "Esmeraldas": ["Esmeraldas", "Eloy Alfaro", "Muisne", "Quinindé", "San Lorenzo", "Atacames", "Río Verde", "La Concordia"],
  "Guayas": ["Guayaquil", "Alfredo Baquerizo Moreno", "Balao", "Balzar", "Colimes", "Daule", "Durán", "El Empalme", "El Triunfo", "Milagro", "Naranjal", "Naranjito", "Palestina", "Pedro Carbo", "Samborondón", "Santa Lucía", "Salitre", "San Jacinto de Yaguachi", "Playas", "Simón Bolívar", "Marcelino Maridueña", "Lomas de Sargentillo", "Nobol", "General Antonio Elizalde", "Isidro Ayora"],
  "Imbabura": ["Ibarra", "Antonio Ante", "Cotacachi", "Otavalo", "Pimampiro", "San Miguel de Urcuquí"],
  "Loja": ["Loja", "Calvas", "Catamayo", "Celica", "Chaguarpamba", "Espíndola", "Gonzanamá", "Macará", "Paltas", "Puyango", "Saraguro", "Sozoranga", "Zapotillo", "Pindal", "Quilanga", "Olmedo"],
  "Los Ríos": ["Babahoyo", "Baba", "Montalvo", "Puebloviejo", "Quevedo", "Urdaneta", "Ventanas", "Vinces", "Palenque", "Buena Fé", "Valencia", "Mocache", "Quinsaloma"],
  "Manabí": ["Portoviejo", "Bolívar", "Chone", "El Carmen", "Flavio Alfaro", "Jipijapa", "Junín", "Manta", "Montecristi", "Paján", "Pichincha", "Rocafuerte", "Santa Ana", "Sucre", "24 de Mayo", "Pedernales", "Olmedo", "Puerto López", "Jama", "Jaramijó", "San Vicente"],
  "Morona Santiago": ["Morona", "Gualaquiza", "Limón Indanza", "Palora", "Santiago", "Sucúa", "Huamboya", "San Juan Bosco", "Taisha", "Logroño", "Pablo Sexto", "Tiwintza"],
  "Napo": ["Tena", "Archidona", "El Chaco", "Quijos", "Carlos Julio Arosemena Tola"],
  "Pastaza": ["Pastaza", "Mera", "Santa Clara", "Arajuno"],
  "Pichincha": ["Quito", "Cayambe", "Mejía", "Pedro Moncayo", "Rumiñahui", "San Miguel de los Bancos", "Pedro Vicente Maldonado", "Puerto Quito"],
  "Tungurahua": ["Ambato", "Baños de Agua Santa", "Cevallos", "Mocha", "Patate", "Quero", "Pelileo", "Píllaro", "Tisaleo"],
  "Zamora Chinchipe": ["Zamora", "Chinchipe", "Nangaritza", "Yacuambi", "Yantzaza", "El Pangui", "Centinela del Cóndor", "Palanda", "Paquisha"],
  "Galápagos": ["San Cristóbal", "Isabela", "Santa Cruz"],
  "Sucumbíos": ["Lago Agrio", "Gonzalo Pizarro", "Putumayo", "Shushufindi", "Sucumbíos", "Cascales", "Cuyabeno"],
  "Orellana": ["Orellana", "Aguarico", "La Joya de los Sachas", "Loreto"],
  "Santo Domingo de los Tsáchilas": ["Santo Domingo"],
  "Santa Elena": ["Santa Elena", "La Libertad", "Salinas"]
};

function Ubicacion() {
  const navigate = useNavigate();
  
  // Persistence y UI Logic
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [isLocked, setIsLocked] = useState(true);

  // Form States
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [zona, setZona] = useState("");

  const handleLogout = () => navigate('/');
  const toggleLock = () => setIsLocked(!isLocked);
  const handleUpdate = () => {
    alert("¡Ubicación actualizada correctamente!");
    setIsLocked(true); 
  };

  // Handler jerárquico para cantones
  const handleProvinciaChange = (e) => {
    setProvincia(e.target.value);
    setCanton(""); // Reset cantón al cambiar provincia
  };

  return (
    <div className="profile-wrapper">
      {/* --- HEADER IDÉNTICO AL PERFIL --- */}
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
          <NavLink to="/ubicacion" className={({ isActive }) => isActive ? "nav-tab-link active" : "nav-tab-link"}>UBICACIÓN</NavLink>
          <NavLink to="/directivo" className="nav-tab-link">DIRECTIVO</NavLink>
          <NavLink to="/estudiantes" className="nav-tab-link">ESTUDIANTES</NavLink>
          <NavLink to="/paralelos" className="nav-tab-link">PARALELOS</NavLink>
          <NavLink to="/personal" className="nav-tab-link">PERSONAL</NavLink>
        </nav>
        <div className="navbar-right-logout">
          <button className="logout-circle-btn" onClick={handleLogout}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
          </button>
          <span className="logout-label">CERRAR SESIÓN</span>
        </div>
      </header>

      {/* --- BARRA DE SEGURIDAD REUTILIZADA --- */}
      <div className="security-bar">
        <button className={`lock-toggle-btn ${isLocked ? 'locked' : 'unlocked'}`} onClick={toggleLock}>
          {isLocked ? 'DESBLOQUEAR EDICIÓN' : 'EDICIÓN ACTIVADA'}
        </button>
      </div>

      <div className="profile-hero-banner">
        <div className="hero-content">
          <img src="/confedec.png" alt="Logo" className="hero-logo-large" />
          <h1>UBICACIÓN GEOGRÁFICA</h1>
          <p>Gestión de Localización y Zonificación Institucional</p>
        </div>
      </div>

      <main className="profile-data-grid">
        <div className="data-container four-columns">
          
          {/* COLUMNA 1: ZONIFICACIÓN */}
          <div className="data-column">
            <div className="section-label">ZONIFICACIÓN</div>
            <label>Zona Administrativa</label>
            <select className="data-select" disabled={isLocked} value={zona} onChange={(e) => setZona(e.target.value)}>
              <option value="">- Seleccionar Zona -</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                <option key={n} value={n}>Zona {n}</option>
              ))}
            </select>
            
            <label>Régimen Escolar</label>
            <select className="data-select" disabled={isLocked}>
              <option value="sierra">Sierra / Amazonía</option>
              <option value="costa">Costa / Galápagos</option>
            </select>
          </div>

          {/* COLUMNA 2: DIVISIÓN POLÍTICA (Jerárquica) */}
          <div className="data-column">
            <div className="section-label">DIVISIÓN POLÍTICA</div>
            <label>Provincia</label>
            <select className="data-select" disabled={isLocked} value={provincia} onChange={handleProvinciaChange}>
              <option value="">- Seleccionar Provincia -</option>
              {Object.keys(ecuadorData).map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            <label>Cantón</label>
            <select className="data-select" disabled={isLocked || !provincia} value={canton} onChange={(e) => setCanton(e.target.value)}>
              <option value="">- Seleccionar Cantón -</option>
              {provincia && ecuadorData[provincia].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* COLUMNA 3: DETALLES DE CONTACTO */}
          <div className="data-column">
            <div className="section-label">DATOS ESPECÍFICOS</div>
            <label>Distrito Educativo</label>
            <input type="text" className="data-input" disabled={isLocked} placeholder="Ej: 17D05" />
            
            <label>Ciudad / Parroquia</label>
            <input type="text" className="data-input" disabled={isLocked} placeholder="Ingrese ciudad" />
            
            <label>Enlace Google Maps</label>
            <input type="text" className="data-input" disabled={isLocked} placeholder="https://maps.google.com/..." />
          </div>

          {/* COLUMNA 4: JORNADA Y ACTUALIZACIÓN */}
          <div className="data-column">
            <div className="section-label">JORNADAS</div>
            <div className={`educational-level-box ${isLocked ? 'box-locked' : ''}`}>
              <div className="checkbox-grid">
                <label className="check-item"><input type="checkbox" disabled={isLocked} /> Matutina</label>
                <label className="check-item"><input type="checkbox" disabled={isLocked} /> Vespertina</label>
                <label className="check-item"><input type="checkbox" disabled={isLocked} /> Nocturna</label>
              </div>
            </div>

            <button 
              className="update-data-btn" 
              disabled={isLocked}
              onClick={handleUpdate}
            >
              ACTUALIZAR UBICACIÓN
            </button>
            <h2 className="watermark-text">UBICACIÓN</h2>
          </div>

        </div>
      </main>

      <footer className="profile-footer">
        © 2026 CONFEDEC - Sistema de Gestión de Información Educativa
      </footer>
    </div>
  );
}

export default Ubicacion;