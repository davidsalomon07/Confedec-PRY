import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function Paralelos() {
  
  // 1. Scroll al inicio
  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, []);

  // 2. RECIBIMOS EL PODER DEL LAYOUT
  const [isLocked, setIsLocked] = useOutletContext();

  // 3. ESTADOS
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
    setIsLocked(true); // Bloquear al guardar
  };

  return (
    <>
      {/* ✅ BANNER CON BOTÓN FLOTANTE */}
      <div className="profile-hero-banner" style={{ position: 'relative' }}>
        <div className="hero-content">
          <img src="/confedec.png" alt="Logo" className="hero-logo-large" />
          <h1>PARALELOS</h1>
          <p>Gestión de paralelos por nivel educativo</p>
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
                EDITAR PARALELOS
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
      <main className="paralelos-section">
        
        <div className="paralelos-card">
          
          {/* 🛠️ CORRECCIÓN: AVISO MOVIDO DENTRO DE LA TARJETA */}
          {!isLocked && (
            <div style={{ 
              background: '#e1f5fe', 
              padding: '15px', 
              borderRadius: '8px', 
              marginBottom: '25px', // Un poco de espacio antes del título
              borderLeft: '5px solid #00d2d3', 
              color: '#0277bd',
              textAlign: 'left' // Aseguramos que el texto se lea bien
            }}>
              <strong>✏️ Editando Paralelos:</strong> Ingrese el número de paralelos por nivel.
            </div>
          )}

          <h2 className="paralelos-title">Paralelos por Nivel Educativo</h2>

          <div className="paralelos-grid">
            <div className="paralelo-item">
              <label>INICIAL</label>
              <input type="number" name="inicial" value={paralelos.inicial} onChange={handleChange} disabled={isLocked} placeholder="Cantidad" />
            </div>

            <div className="paralelo-item">
              <label>PREPARATORIA</label>
              <input type="number" name="preparatoria" value={paralelos.preparatoria} onChange={handleChange} disabled={isLocked} placeholder="Cantidad" />
            </div>

            <div className="paralelo-item">
              <label>BÁSICA ELEMENTAL</label>
              <input type="number" name="basicaElemental" value={paralelos.basicaElemental} onChange={handleChange} disabled={isLocked} placeholder="Cantidad" />
            </div>

            <div className="paralelo-item">
              <label>BÁSICA MEDIA</label>
              <input type="number" name="basicaMedia" value={paralelos.basicaMedia} onChange={handleChange} disabled={isLocked} placeholder="Cantidad" />
            </div>

            <div className="paralelo-item">
              <label>BÁSICA SUPERIOR</label>
              <input type="number" name="basicaSuperior" value={paralelos.basicaSuperior} onChange={handleChange} disabled={isLocked} placeholder="Cantidad" />
            </div>
          </div>

          <button className="paralelos-save-btn" disabled={isLocked} onClick={handleGuardar} style={{opacity: isLocked ? 0.5 : 1}}>
            GUARDAR CAMBIOS
          </button>
        </div>
      </main>
    </>
  );
}

export default Paralelos;