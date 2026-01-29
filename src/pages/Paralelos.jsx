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
    inicial: 0,
    preparatoria: 0,
    basicaElemental: 0,
    basicaMedia: 0,
    basicaSuperior: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validación simple para no permitir negativos
    if (value === '' || (!isNaN(value) && Number(value) >= 0)) {
      setParalelos({ ...paralelos, [name]: value === '' ? '' : Number(value) });
    }
  };

  // Lógica para botones + / -
  const adjustNumber = (name, delta) => {
    if (isLocked) return;
    setParalelos(prev => {
      const currentVal = Number(prev[name]) || 0;
      const newVal = currentVal + delta;
      return { ...prev, [name]: newVal < 0 ? 0 : newVal };
    });
  };

  const handleGuardar = () => {
    alert('Paralelos guardados correctamente');
    setIsLocked(true); 
  };

  // --- ESTILOS ---

  const labelStyle = { 
    color: '#aaa', 
    fontSize: '0.75rem', 
    fontWeight: 'bold', 
    display: 'block', 
    marginTop: '15px', 
    textTransform: 'uppercase', 
    textAlign: 'center', 
    letterSpacing: '1px' 
  };
  
  const titleStyle = {
    fontSize: '1rem',
    marginTop: '10px',
    marginBottom: '20px',
    minHeight: '45px', 
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center',
    color: '#e0e0e0',
    letterSpacing: '1px'
  };

  // Contenedor de los controles (Botón - Input - Botón)
  const inputGroupStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px', // Espacio entre elementos
    margin: '0 auto'
  };

  // Estilo del Input (CAJA OSCURA como en Personal/Estudiantes)
  const numberInputStyle = { 
    fontSize: '1.5rem', 
    textAlign: 'center', 
    fontWeight: 'bold', 
    height: '50px',
    width: '80px',
    color: '#fff',
    background: '#050505', // Fondo oscuro
    border: '1px solid #333', // Borde sutil
    borderRadius: '8px',
    padding: '0',
    outline: 'none'
  };

  // Íconos SVG
  const Icons = {
    Inicial: () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 4.9V17L12 22 3 17V6.9z"/><path d="M12 22V6.9"/></svg>,
    Preparatoria: () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
    Elemental: () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    Media: () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    Superior: () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
  };

  const purpleGradient = 'linear-gradient(135deg, #662483 0%, #3c096c 100%)';

  return (
    <>
      {/* CSS LOCAL: Botones simples + Input sin flechas */}
      <style>{`
        /* Quitar flechas nativas del input number */
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }

        /* Estilo Botones Circulares Minimalistas */
        .btn-simple {
          width: 35px !important;
          height: 35px !important;
          border-radius: 50% !important;
          border: 1px solid #444;
          padding: 0 !important;
          background: transparent;
          color: #888;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          line-height: 1;
        }

        /* Efecto Hover: Morado */
        .btn-simple:hover:not(:disabled) {
          border-color: #662483;
          background: rgba(102, 36, 131, 0.2);
          color: white;
          transform: scale(1.1);
        }

        .btn-simple:active:not(:disabled) { transform: scale(0.9); }
        .btn-simple:disabled { opacity: 0.2; cursor: not-allowed; border-color: #333; }

        /* Efecto Focus en el Input */
        .input-box:focus {
          border-color: #662483 !important;
          background-color: #000 !important;
        }
      `}</style>

      {/* 1. BANNER ESTÁNDAR */}
      <div className="profile-hero-banner" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '40px 20px' }}>
        <div className="hero-content" style={{ width: '100%', zIndex: 1 }}>
          <img src="/confedec.png" alt="Logo" className="hero-logo-large" />
          <h1>PARALELOS</h1>
          <p>Gestión de paralelos por nivel educativo</p>
        </div>

        {/* BOTÓN DE ACCIÓN (Turquesa Original) */}
        <div className="hero-action-container" style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 10 }}>
          <button
            onClick={() => setIsLocked(!isLocked)}
            className="banner-action-btn"
            style={{ backgroundColor: isLocked ? 'rgba(255, 255, 255, 0.2)' : '#00d2d3', color: 'white', border: '1px solid rgba(255,255,255,0.4)', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease', backdropFilter: 'blur(5px)' }}
          >
            {isLocked ? (<><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>EDITAR PARALELOS</>) : (<><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>CANCELAR</>)}
          </button>
        </div>
      </div>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main className="profile-data-grid">

        {/* AVISO DE MODO EDICIÓN (Azul) */}
        {!isLocked && (
          <div style={{ maxWidth: '1200px', width: '95%', margin: '0 auto 30px auto', background: '#e1f5fe', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #00d2d3', color: '#0277bd', textAlign: 'left' }}>
            <strong>✏️ Editando Paralelos:</strong> Ingrese la cantidad de paralelos disponibles para cada nivel.
          </div>
        )}

        {/* ⚡ GRID DE TARJETAS ⚡ */}
        <div className="directivos-grid-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>

          {/* TARJETA 1: INICIAL */}
          <div className="directivo-card" style={{ flex: '1 1 200px', maxWidth: '280px', textAlign: 'center' }}>
            <div className="card-header" style={{ justifyContent: 'center', borderBottom: 'none', paddingBottom: '0' }}>
              <div className="icon-circle" style={{ width: '60px', height: '60px', background: purpleGradient }}><Icons.Inicial /></div>
            </div>
            <div className="card-body">
              <h3 className="card-title" style={titleStyle}>INICIAL</h3>
              
              <div style={inputGroupStyle}>
                <button className="btn-simple" onClick={() => adjustNumber('inicial', -1)} disabled={isLocked}>-</button>
                <input 
                  type="number" 
                  name="inicial" 
                  value={paralelos.inicial} 
                  onChange={handleChange} 
                  disabled={isLocked} 
                  style={numberInputStyle} 
                  placeholder="0"
                  className="input-box" 
                />
                <button className="btn-simple" onClick={() => adjustNumber('inicial', 1)} disabled={isLocked}>+</button>
              </div>

              <label style={labelStyle}>PARALELOS</label>
            </div>
          </div>

          {/* TARJETA 2: PREPARATORIA */}
          <div className="directivo-card" style={{ flex: '1 1 200px', maxWidth: '280px', textAlign: 'center' }}>
            <div className="card-header" style={{ justifyContent: 'center', borderBottom: 'none', paddingBottom: '0' }}>
              <div className="icon-circle" style={{ width: '60px', height: '60px', background: purpleGradient }}><Icons.Preparatoria /></div>
            </div>
            <div className="card-body">
              <h3 className="card-title" style={titleStyle}>PREPARATORIA</h3>
              <div style={inputGroupStyle}>
                <button className="btn-simple" onClick={() => adjustNumber('preparatoria', -1)} disabled={isLocked}>-</button>
                <input type="number" name="preparatoria" value={paralelos.preparatoria} onChange={handleChange} disabled={isLocked} style={numberInputStyle} placeholder="0" className="input-box" />
                <button className="btn-simple" onClick={() => adjustNumber('preparatoria', 1)} disabled={isLocked}>+</button>
              </div>
              <label style={labelStyle}>PARALELOS</label>
            </div>
          </div>

          {/* TARJETA 3: BÁSICA ELEMENTAL */}
          <div className="directivo-card" style={{ flex: '1 1 200px', maxWidth: '280px', textAlign: 'center' }}>
            <div className="card-header" style={{ justifyContent: 'center', borderBottom: 'none', paddingBottom: '0' }}>
              <div className="icon-circle" style={{ width: '60px', height: '60px', background: purpleGradient }}><Icons.Elemental /></div>
            </div>
            <div className="card-body">
              <h3 className="card-title" style={titleStyle}>BÁSICA ELEMENTAL</h3>
              <div style={inputGroupStyle}>
                <button className="btn-simple" onClick={() => adjustNumber('basicaElemental', -1)} disabled={isLocked}>-</button>
                <input type="number" name="basicaElemental" value={paralelos.basicaElemental} onChange={handleChange} disabled={isLocked} style={numberInputStyle} placeholder="0" className="input-box" />
                <button className="btn-simple" onClick={() => adjustNumber('basicaElemental', 1)} disabled={isLocked}>+</button>
              </div>
              <label style={labelStyle}>PARALELOS</label>
            </div>
          </div>

          {/* TARJETA 4: BÁSICA MEDIA */}
          <div className="directivo-card" style={{ flex: '1 1 200px', maxWidth: '280px', textAlign: 'center' }}>
            <div className="card-header" style={{ justifyContent: 'center', borderBottom: 'none', paddingBottom: '0' }}>
              <div className="icon-circle" style={{ width: '60px', height: '60px', background: purpleGradient }}><Icons.Media /></div>
            </div>
            <div className="card-body">
              <h3 className="card-title" style={titleStyle}>BÁSICA MEDIA</h3>
              <div style={inputGroupStyle}>
                <button className="btn-simple" onClick={() => adjustNumber('basicaMedia', -1)} disabled={isLocked}>-</button>
                <input type="number" name="basicaMedia" value={paralelos.basicaMedia} onChange={handleChange} disabled={isLocked} style={numberInputStyle} placeholder="0" className="input-box" />
                <button className="btn-simple" onClick={() => adjustNumber('basicaMedia', 1)} disabled={isLocked}>+</button>
              </div>
              <label style={labelStyle}>PARALELOS</label>
            </div>
          </div>

          {/* TARJETA 5: BÁSICA SUPERIOR */}
          <div className="directivo-card" style={{ flex: '1 1 200px', maxWidth: '280px', textAlign: 'center' }}>
            <div className="card-header" style={{ justifyContent: 'center', borderBottom: 'none', paddingBottom: '0' }}>
              <div className="icon-circle" style={{ width: '60px', height: '60px', background: purpleGradient }}><Icons.Superior /></div>
            </div>
            <div className="card-body">
              <h3 className="card-title" style={titleStyle}>BÁSICA SUPERIOR</h3>
              <div style={inputGroupStyle}>
                <button className="btn-simple" onClick={() => adjustNumber('basicaSuperior', -1)} disabled={isLocked}>-</button>
                <input type="number" name="basicaSuperior" value={paralelos.basicaSuperior} onChange={handleChange} disabled={isLocked} style={numberInputStyle} placeholder="0" className="input-box" />
                <button className="btn-simple" onClick={() => adjustNumber('basicaSuperior', 1)} disabled={isLocked}>+</button>
              </div>
              <label style={labelStyle}>PARALELOS</label>
            </div>
          </div>

        </div>

        {/* BOTÓN GUARDAR (Morado) */}
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '0 20px' }}>
          <button className="update-data-btn" disabled={isLocked} onClick={handleGuardar} style={{ opacity: isLocked ? 0.5 : 1 }}>
            GUARDAR CAMBIOS
          </button>
        </div>

      </main>
    </>
  );
}

export default Paralelos;