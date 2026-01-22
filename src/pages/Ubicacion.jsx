import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

// DATOS DE ECUADOR (Se mantienen igual)
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
    setIsLocked(true); // Bloqueamos al guardar
  };

  // Handler jerárquico para cantones
  const handleProvinciaChange = (e) => {
    setProvincia(e.target.value);
    setCanton(""); // Reset cantón al cambiar provincia
  };

  return (
    <>
      {/* ✅ HERO BANNER CON BOTÓN FLOTANTE */}
      <div className="profile-hero-banner" style={{ position: 'relative' }}>
        <div className="hero-content">
          <img src="/confedec.png" alt="Logo" className="hero-logo-large" />
          <h1>UBICACIÓN GEOGRÁFICA</h1>
          <p>Gestión de Localización y Zonificación Institucional</p>
        </div>

        {/* BOTÓN DE ACCIÓN EN LA ESQUINA SUPERIOR DERECHA */}
        <div style={{ position: 'absolute', top: '30px', right: '30px' }}>
          <button 
            onClick={() => setIsLocked(!isLocked)}
            className="banner-action-btn"
            style={{
              backgroundColor: isLocked ? 'rgba(255, 255, 255, 0.2)' : '#00d2d3',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.4)',
              padding: '10px 20px',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(5px)'
            }}
          >
            {isLocked ? (
              <>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                EDITAR UBICACIÓN
              </>
            ) : (
              <>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                CANCELAR
              </>
            )}
          </button>
        </div>
      </div>

      {/* 📝 CONTENIDO PRINCIPAL */}
      <main className="profile-data-grid">
        
        {/* AVISO DE MODO EDICIÓN */}
        {!isLocked && (
          <div style={{ 
            gridColumn: '1 / -1', 
            background: '#e1f5fe', 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '20px', 
            borderLeft: '5px solid #00d2d3', 
            color: '#0277bd',
            maxWidth: '1200px',
            margin: '0 auto 20px auto',
            width: '90%'
          }}>
            <strong>✏️ Editando Ubicación:</strong> Seleccione la zona, provincia y actualice los datos de contacto.
          </div>
        )}

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
              style={{opacity: isLocked ? 0.5 : 1}}
            >
              ACTUALIZAR UBICACIÓN
            </button>
            <h2 className="watermark-text">UBICACIÓN</h2>
          </div>

        </div>
      </main>
    </>
  );
}

export default Ubicacion;