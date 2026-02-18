import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function Personal() {

  // 1. Scroll al inicio
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 2. RECIBIMOS EL PODER DEL LAYOUT
  const [isLocked, setIsLocked] = useOutletContext();

  // 3. Estados para los datos del Personal
  const [formData, setFormData] = useState({
    docentesParticulares: 0,
    adminParticulares: 0,
    servicio: 0,
    docentesFiscales: 0,
    adminFiscales: 0
  });

  // Manejador genérico
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || (!isNaN(value) && Number(value) >= 0)) {
      setFormData({ ...formData, [name]: value === '' ? '' : Number(value) });
    }
  };

  // 🕹️ LÓGICA DE BOTONES (+ / -)
  const adjustNumber = (name, delta) => {
    if (isLocked) return; 
    setFormData(prev => {
      const currentVal = Number(prev[name]) || 0;
      const newVal = currentVal + delta;
      return { ...prev, [name]: newVal < 0 ? 0 : newVal };
    });
  };

  const handleGuardar = () => {
    alert('Información del personal actualizada correctamente.');
    setIsLocked(true); 
  };

  // --- ESTILOS & ÍCONOS ---
  
  const Icons = {
    Briefcase: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    UserCheck: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>,
    Tool: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    Gov: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16"/><path d="M10 22V9"/><path d="M14 22V9"/><path d="M2 9h20l-10-7-10 7z"/></svg>
  };

  // ESTILOS EN LÍNEA
  const inputGroupStyle = { 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    gap: '12px' 
  };

  const numberInputStyle = { 
    fontSize: '1.2rem', 
    textAlign: 'center', 
    fontWeight: 'bold', 
    height: '45px', 
    width: '80px', 
    color: '#fff', 
    background: '#050505', 
    border: '1px solid #333', 
    borderRadius: '8px',
    outline: 'none',
    padding: '0'
  };

  // COLORES DE TEMA
  const purpleColor = '#662483'; // Morado Confedec
  const purpleGradient = 'linear-gradient(135deg, #662483 0%, #3c096c 100%)';

  return (
    <>
      {/* CSS LOCAL: Botones Circulares Minimalistas */}
      <style>{`
        /* Quitar flechas del input number */
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }

        /* Botones Circulares */
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

        .btn-simple:hover:not(:disabled) {
          border-color: #662483; /* Hover Morado */
          background: rgba(102, 36, 131, 0.2);
          color: white;
          transform: scale(1.1);
        }

        .btn-simple:active:not(:disabled) { transform: scale(0.9); }
        .btn-simple:disabled { opacity: 0.2; cursor: not-allowed; border-color: #333; }
        
        /* Efecto focus en el input numérico */
        .data-input-number:focus { border-color: #662483 !important; background: #000 !important; }
      `}</style>

      {/* 1. BANNER */}
      <div className="profile-hero-banner" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '40px 20px' }}>
        <div className="hero-content" style={{ width: '100%', zIndex: 1 }}>
          <img src="/confedec.png" alt="Logo" className="hero-logo-large" />
          <h1>PERSONAL INSTITUCIONAL</h1>
          <p>Registro de la planta docente, administrativa y de servicio</p>
        </div>
        
        {/* BOTÓN DE ACCIÓN (Mantiene el Celeste/Turquesa original para resaltar la acción) */}
        <div className="hero-action-container" style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 10 }}>
          <button onClick={() => setIsLocked(!isLocked)} className="banner-action-btn" style={{ backgroundColor: isLocked ? 'rgba(255, 255, 255, 0.2)' : '#00d2d3', color: 'white', border: '1px solid rgba(255,255,255,0.4)', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease', backdropFilter: 'blur(5px)' }}>
            {isLocked ? (<><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>EDITAR PERSONAL</>) : (<><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>CANCELAR</>)}
          </button>
        </div>
      </div>

      {/* 2. CONTENIDO */}
      <main className="profile-data-grid">
        
        {/* ALERTA DE EDICIÓN (Mantiene el Celeste/Azul original) */}
        {!isLocked && (
          <div style={{ maxWidth: '1200px', width: '95%', margin: '0 auto 30px auto', background: '#e1f5fe', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #00d2d3', color: '#0277bd', textAlign: 'left' }}>
            <strong>✏️ Editando Personal:</strong> Actualice las cantidades de docentes y administrativos.
          </div>
        )}

        {/* GRID DE TARJETAS */}
        <div className="directivos-grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '40px', justifyContent: 'center' }}>

          {/* TARJETA 1: PERSONAL PARTICULAR (AHORA MORADO) */}
          <div className="directivo-card">
            <div className="card-header">
              {/* CORREGIDO: Gradiente Morado */}
              <div className="icon-circle" style={{ background: purpleGradient }}><Icons.UserCheck /></div>
              <h3 className="card-title">PERSONAL PARTICULAR</h3>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              
              {/* Docentes */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #222', paddingBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  {/* CORREGIDO: Color Morado */}
                  <div style={{ color: purpleColor }}><Icons.Briefcase /></div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#ccc' }}>DOCENTES</span>
                </div>
                <div style={inputGroupStyle}>
                  <button className="btn-simple" onClick={() => adjustNumber('docentesParticulares', -1)} disabled={isLocked}>-</button>
                  <input type="number" className="data-input-number" name="docentesParticulares" value={formData.docentesParticulares} onChange={handleChange} disabled={isLocked} style={numberInputStyle} placeholder="0" />
                  <button className="btn-simple" onClick={() => adjustNumber('docentesParticulares', 1)} disabled={isLocked}>+</button>
                </div>
              </div>

              {/* Administrativos */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #222', paddingBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  {/* CORREGIDO: Color Morado */}
                  <div style={{ color: purpleColor }}><Icons.UserCheck /></div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#ccc' }}>ADMINISTRATIVOS</span>
                </div>
                <div style={inputGroupStyle}>
                  <button className="btn-simple" onClick={() => adjustNumber('adminParticulares', -1)} disabled={isLocked}>-</button>
                  <input type="number" className="data-input-number" name="adminParticulares" value={formData.adminParticulares} onChange={handleChange} disabled={isLocked} style={numberInputStyle} placeholder="0" />
                  <button className="btn-simple" onClick={() => adjustNumber('adminParticulares', 1)} disabled={isLocked}>+</button>
                </div>
              </div>

              {/* Servicio */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  {/* CORREGIDO: Color Morado */}
                  <div style={{ color: purpleColor }}><Icons.Tool /></div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#ccc' }}>SERVICIO / MANT.</span>
                </div>
                <div style={inputGroupStyle}>
                  <button className="btn-simple" onClick={() => adjustNumber('servicio', -1)} disabled={isLocked}>-</button>
                  <input type="number" className="data-input-number" name="servicio" value={formData.servicio} onChange={handleChange} disabled={isLocked} style={numberInputStyle} placeholder="0" />
                  <button className="btn-simple" onClick={() => adjustNumber('servicio', 1)} disabled={isLocked}>+</button>
                </div>
              </div>

            </div>
          </div>

          {/* TARJETA 2: PERSONAL FISCAL (MORADO) */}
          <div className="directivo-card">
            <div className="card-header">
              <div className="icon-circle" style={{ background: purpleGradient }}><Icons.Gov /></div>
              <h3 className="card-title">PERSONAL FISCAL (ASIGNADO)</h3>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              
              {/* Docentes Fiscales */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #222', paddingBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ color: purpleColor }}><Icons.Briefcase /></div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#ccc' }}>DOCENTES FISCALES</span>
                </div>
                <div style={inputGroupStyle}>
                  <button className="btn-simple" onClick={() => adjustNumber('docentesFiscales', -1)} disabled={isLocked}>-</button>
                  <input type="number" className="data-input-number" name="docentesFiscales" value={formData.docentesFiscales} onChange={handleChange} disabled={isLocked} style={numberInputStyle} placeholder="0" />
                  <button className="btn-simple" onClick={() => adjustNumber('docentesFiscales', 1)} disabled={isLocked}>+</button>
                </div>
              </div>

              {/* Administrativos Fiscales */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ color: purpleColor }}><Icons.UserCheck /></div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#ccc' }}>ADMIN. FISCALES</span>
                </div>
                <div style={inputGroupStyle}>
                  <button className="btn-simple" onClick={() => adjustNumber('adminFiscales', -1)} disabled={isLocked}>-</button>
                  <input type="number" className="data-input-number" name="adminFiscales" value={formData.adminFiscales} onChange={handleChange} disabled={isLocked} style={numberInputStyle} placeholder="0" />
                  <button className="btn-simple" onClick={() => adjustNumber('adminFiscales', 1)} disabled={isLocked}>+</button>
                </div>
              </div>

              {/* Resumen Total */}
              <div style={{ marginTop: 'auto', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center', border: '1px dashed #444' }}>
                <span style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>TOTAL PLANTA DOCENTE Y ADMINISTRATIVA</span>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: '#fff', marginTop: '5px' }}>
                  { Object.values(formData).reduce((a, b) => Number(a) + Number(b), 0) }
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* BOTÓN GUARDAR (Morado para acción de guardado) */}
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '0 20px' }}>
          <button className="update-data-btn" disabled={isLocked} onClick={handleGuardar} style={{ opacity: isLocked ? 0.5 : 1 }}>
            GUARDAR CAMBIOS
          </button>
        </div>

      </main>
    </>
  );
}

export default Personal;