import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function Estudiantes() {

  // 1. Scroll al inicio
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 2. RECIBIMOS EL PODER DEL LAYOUT
  const [isLocked, setIsLocked] = useOutletContext();

  // 3. ESTADOS
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

  // 🛡️ VALIDACIÓN DE NÚMEROS POSITIVOS (Escritura manual)
  const handleCantidadChange = (setter) => (e) => {
    const val = e.target.value;
    if (val === '' || (!isNaN(val) && Number(val) >= 0)) {
      setter(val === '' ? '' : Number(val));
    }
  };

  // 🕹️ LÓGICA DE BOTONES (+ / -)
  const adjustNumber = (setter, value, delta) => {
    if (isLocked) return;
    const currentVal = Number(value) || 0;
    const newVal = currentVal + delta;
    setter(newVal < 0 ? 0 : newVal);
  };

  // 🚫 BLOQUEAR TECLA MENOS (-)
  const preventMinus = (e) => {
    if (e.key === '-' || e.key === 'e') {
      e.preventDefault();
    }
  };

  const handleGuardar = () => {
    alert('Cambios guardados correctamente');
    setIsLocked(true); 
  };

  // --- ESTILOS ---

  const labelStyle = { 
    color: '#aaa', 
    fontSize: '0.75rem', 
    fontWeight: 'bold', 
    display: 'block', 
    marginBottom: '10px', 
    textTransform: 'uppercase', 
    textAlign: 'center',
    letterSpacing: '1px'
  };

  // Contenedor de controles (Botón - Input - Botón)
  const inputGroupStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    margin: '0 auto'
  };

  // Estilo del Input (Caja Oscura con Borde) - IDÉNTICO A PERSONAL
  const numberInputStyle = { 
    fontSize: '1.5rem', 
    textAlign: 'center', 
    fontWeight: 'bold', 
    height: '50px',
    width: '80px',
    color: '#fff',
    background: '#050505', 
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '0',
    outline: 'none'
  };

  // Íconos SVG
  const Icons = {
    Layers: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
    Users: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  };

  // Color Morado Principal
  const purpleTheme = '#662483';

  return (
    <>
      {/* CSS LOCAL: Botones Circulares y Input limpio */}
      <style>{`
        /* Quitar flechas nativas */
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }

        /* Botones Circulares Minimalistas */
        .btn-simple {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: 1px solid #444;
          background: transparent;
          color: #888;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        /* Hover Morado */
        .btn-simple:hover:not(:disabled) {
          border-color: #662483;
          background: rgba(102, 36, 131, 0.2);
          color: white;
          transform: scale(1.1);
        }

        .btn-simple:active:not(:disabled) { transform: scale(0.9); }
        .btn-simple:disabled { opacity: 0.2; cursor: not-allowed; border-color: #333; }

        /* Focus Input */
        .input-box:focus { border-color: #662483 !important; background: #000 !important; }
      `}</style>

      {/* 1. BANNER ESTÁNDAR */}
      <div className="profile-hero-banner" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '40px 20px' }}>
        <div className="hero-content" style={{ width: '100%', zIndex: 1 }}>
          <img src="/confedec.png" alt="Logo" className="hero-logo-large" />
          <h1>ESTUDIANTES</h1>
          <p>Gestión de estudiantes por nivel y curso</p>
        </div>

        {/* BOTÓN DE ACCIÓN (Turquesa Original) */}
        <div className="hero-action-container" style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 10 }}>
          <button
            onClick={() => setIsLocked(!isLocked)}
            className="banner-action-btn"
            style={{ backgroundColor: isLocked ? 'rgba(255, 255, 255, 0.2)' : '#00d2d3', color: 'white', border: '1px solid rgba(255,255,255,0.4)', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease', backdropFilter: 'blur(5px)' }}
          >
            {isLocked ? (<><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>EDITAR ESTUDIANTES</>) : (<><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>CANCELAR</>)}
          </button>
        </div>
      </div>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main className="profile-data-grid">
        
        {/* AVISO DE MODO EDICIÓN (Azul/Turquesa Original) */}
        {!isLocked && (
          <div style={{ maxWidth: '1200px', width: '95%', margin: '0 auto 20px auto', background: '#e1f5fe', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #00d2d3', color: '#0277bd', textAlign: 'left' }}>
            <strong>✏️ Editando Estudiantes:</strong> Seleccione el nivel educativo para habilitar el registro.
          </div>
        )}

        {/* ⚡ GRID FLEXIBLE ⚡ */}
        <div className="directivos-grid-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>

          {/* TARJETA 1: SELECCIÓN */}
          <div className="directivo-card" style={{ flex: '1 1 400px', maxWidth: '600px', width: '100%' }}>
            <div className="card-header">
              <div className="icon-circle"><Icons.Layers /></div>
              <h3 className="card-title">SELECCIÓN ACADÉMICA</h3>
            </div>
            <div className="card-body">
              <label style={{...labelStyle, textAlign: 'left'}}>NIVEL DE EDUCACIÓN</label>
              <select className="data-select" value={nivel} onChange={handleNivelChange} disabled={isLocked}>
                <option value="">- Seleccione un nivel -</option>
                <option>Inicial</option>
                <option>Preparatoria</option>
                <option>Básica Elemental</option>
                <option>Básica Media</option>
                <option>Básica Superior</option>
              </select>

              {nivel && (
                <div style={{ marginTop: '20px', animation: 'fadeIn 0.5s' }}>
                  <label style={{...labelStyle, textAlign: 'left'}}>CURSO / GRADO</label>
                  <select className="data-select" value={curso} onChange={(e) => setCurso(e.target.value)} disabled={isLocked}>
                    <option value="">- Seleccione un curso -</option>
                    {cursosPorNivel[nivel].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* TARJETA 2: REGISTRO (CON CONTROLES + / -) */}
          {curso && (
            <div className="directivo-card" style={{ flex: '1 1 400px', maxWidth: '600px', width: '100%', animation: 'fadeIn 0.5s' }}>
              <div className="card-header">
                <div className="icon-circle" style={{ background: `linear-gradient(135deg, ${purpleTheme} 0%, #3c096c 100%)` }}><Icons.Users /></div>
                <h3 className="card-title">CANTIDAD DE ESTUDIANTES</h3>
              </div>
              <div className="card-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  
                  {/* COLUMNA HOMBRES */}
                  <div>
                    <label style={labelStyle}>HOMBRES</label>
                    <div style={inputGroupStyle}>
                      <button className="btn-simple" onClick={() => adjustNumber(setHombres, hombres, -1)} disabled={isLocked}>-</button>
                      <input 
                        type="number" 
                        className="input-box" 
                        value={hombres} 
                        onChange={handleCantidadChange(setHombres)} 
                        onKeyDown={preventMinus} 
                        disabled={isLocked} 
                        placeholder="0" 
                        style={numberInputStyle}
                      />
                      <button className="btn-simple" onClick={() => adjustNumber(setHombres, hombres, 1)} disabled={isLocked}>+</button>
                    </div>
                  </div>

                  {/* COLUMNA MUJERES */}
                  <div>
                    <label style={labelStyle}>MUJERES</label>
                    <div style={inputGroupStyle}>
                      <button className="btn-simple" onClick={() => adjustNumber(setMujeres, mujeres, -1)} disabled={isLocked}>-</button>
                      <input 
                        type="number" 
                        className="input-box" 
                        value={mujeres} 
                        onChange={handleCantidadChange(setMujeres)} 
                        onKeyDown={preventMinus} 
                        disabled={isLocked} 
                        placeholder="0" 
                        style={numberInputStyle}
                      />
                      <button className="btn-simple" onClick={() => adjustNumber(setMujeres, mujeres, 1)} disabled={isLocked}>+</button>
                    </div>
                  </div>

                </div>
                
                {/* Resumen Total */}
                <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', textAlign: 'center' }}>
                  <span style={{ color: '#888', fontSize: '0.8rem' }}>TOTAL ESTUDIANTES EN ESTE CURSO</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#fff' }}>
                    {(Number(hombres) || 0) + (Number(mujeres) || 0)}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* BOTÓN GUARDAR (Morado) */}
        {curso && (
          <div style={{ maxWidth: '400px', margin: '40px auto', padding: '0 20px', animation: 'fadeIn 0.5s' }}>
            <button className="update-data-btn" disabled={isLocked} onClick={handleGuardar} style={{ opacity: isLocked ? 0.5 : 1 }}>
              GUARDAR CAMBIOS
            </button>
          </div>
        )}

      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export default Estudiantes;