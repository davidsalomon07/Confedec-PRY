import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

// DATOS DE ECUADOR (Se mantienen intactos para la funcionalidad)
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
  
  // 1. Scroll al inicio
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // 2. RECIBIMOS EL PODER DEL LAYOUT
  const [isLocked, setIsLocked] = useOutletContext();

  // Form States
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [zona, setZona] = useState("");

  const handleUpdate = () => {
    alert("¡Ubicación actualizada correctamente!");
    setIsLocked(true); 
  };

  // Handler jerárquico para cantones (Funcionalidad preservada)
  const handleProvinciaChange = (e) => {
    setProvincia(e.target.value);
    setCanton(""); // Reset cantón al cambiar provincia
  };

  // Íconos SVG Temáticos
  const Icons = {
    Compass: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
    Map: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
    Pin: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    Clock: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  };

  // Estilo consistente para Labels
  const labelStyle = { color: '#aaa', fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '5px', textTransform: 'uppercase' };

  return (
    <>
      {/* 1. BANNER ESTILO EXECUTIVE */}
      <div className="profile-hero-banner" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '40px 20px' }}>
        <div className="hero-content" style={{ width: '100%', zIndex: 1 }}>
          <img src="/confedec.png" alt="Logo" className="hero-logo-large" />
          <h1>UBICACIÓN GEOGRÁFICA</h1>
          <p>Gestión de Localización y Zonificación Institucional</p>
        </div>
        
        {/* BOTÓN FLOTANTE */}
        <div className="hero-action-container" style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 10 }}>
          <button
            onClick={() => setIsLocked(!isLocked)}
            className="banner-action-btn"
            style={{ backgroundColor: isLocked ? 'rgba(255, 255, 255, 0.2)' : '#00d2d3', color: 'white', border: '1px solid rgba(255,255,255,0.4)', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease', backdropFilter: 'blur(5px)' }}
          >
            {isLocked ? (<><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>EDITAR UBICACIÓN</>) : (<><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>CANCELAR</>)}
          </button>
        </div>
      </div>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main className="profile-data-grid">
        
        {/* AVISO DE EDICIÓN */}
        {!isLocked && (
          <div style={{ maxWidth: '1200px', width: '95%', margin: '0 auto 20px auto', background: '#e1f5fe', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #00d2d3', color: '#0277bd', textAlign: 'left' }}>
            <strong>✏️ Editando Ubicación:</strong> Seleccione la zona, provincia y actualice los datos de contacto.
          </div>
        )}

        {/* ⚡ GRID DE TARJETAS EJECUTIVAS ⚡ */}
        <div className="directivos-grid-container">

          {/* TARJETA 1: ZONIFICACIÓN */}
          <div className="directivo-card">
            <div className="card-header">
              <div className="icon-circle"><Icons.Compass /></div>
              <h3 className="card-title">ZONIFICACIÓN</h3>
            </div>
            <div className="card-body">
              <label style={labelStyle}>ZONA ADMINISTRATIVA</label>
              <select className="data-select" disabled={isLocked} value={zona} onChange={(e) => setZona(e.target.value)}>
                <option value="">- Seleccionar Zona -</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                  <option key={n} value={n}>Zona {n}</option>
                ))}
              </select>
              
              <label style={labelStyle}>RÉGIMEN ESCOLAR</label>
              <select className="data-select" disabled={isLocked}>
                <option value="sierra">Sierra / Amazonía</option>
                <option value="costa">Costa / Galápagos</option>
              </select>
            </div>
          </div>

          {/* TARJETA 2: DIVISIÓN POLÍTICA (Funcionalidad Clave) */}
          <div className="directivo-card">
            <div className="card-header">
              <div className="icon-circle"><Icons.Map /></div>
              <h3 className="card-title">DIVISIÓN POLÍTICA</h3>
            </div>
            <div className="card-body">
              <label style={labelStyle}>PROVINCIA</label>
              <select className="data-select" disabled={isLocked} value={provincia} onChange={handleProvinciaChange}>
                <option value="">- Seleccionar Provincia -</option>
                {Object.keys(ecuadorData).map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

              <label style={labelStyle}>CANTÓN</label>
              <select className="data-select" disabled={isLocked || !provincia} value={canton} onChange={(e) => setCanton(e.target.value)}>
                <option value="">- Seleccionar Cantón -</option>
                {provincia && ecuadorData[provincia].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* TARJETA 3: DATOS ESPECÍFICOS */}
          <div className="directivo-card">
            <div className="card-header">
              <div className="icon-circle"><Icons.Pin /></div>
              <h3 className="card-title">UBICACIÓN EXACTA</h3>
            </div>
            <div className="card-body">
              <label style={labelStyle}>DISTRITO EDUCATIVO</label>
              <input type="text" className="data-input" disabled={isLocked} placeholder="Ej: 17D05" />
              
              <label style={labelStyle}>CIUDAD / PARROQUIA</label>
              <input type="text" className="data-input" disabled={isLocked} placeholder="Ingrese ciudad" />
              
              <label style={labelStyle}>ENLACE GOOGLE MAPS</label>
              <input type="text" className="data-input" disabled={isLocked} placeholder="http://googleusercontent.com..." style={{color: '#00d2d3'}} />
            </div>
          </div>

          {/* TARJETA 4: JORNADAS */}
          <div className="directivo-card">
            <div className="card-header">
              <div className="icon-circle"><Icons.Clock /></div>
              <h3 className="card-title">JORNADAS</h3>
            </div>
            <div className="card-body">
              <div className={`educational-level-box ${isLocked ? 'box-locked' : ''}`} style={{background: 'transparent', border: 'none', padding: 0}}>
                <div className="checkbox-grid">
                  <label className="check-item"><input type="checkbox" disabled={isLocked} /> Matutina</label>
                  <label className="check-item"><input type="checkbox" disabled={isLocked} /> Vespertina</label>
                  <label className="check-item"><input type="checkbox" disabled={isLocked} /> Nocturna</label>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div style={{ maxWidth: '400px', margin: '0 auto 40px auto', padding: '0 20px' }}>
          <button className="update-data-btn" disabled={isLocked} onClick={handleUpdate} style={{ opacity: isLocked ? 0.5 : 1 }}>
            ACTUALIZAR UBICACIÓN
          </button>
        </div>

      </main>
    </>
  );
}

export default Ubicacion;