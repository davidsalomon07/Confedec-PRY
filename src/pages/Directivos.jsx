import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function Directivo() {
  
  // 1. Scroll al inicio
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // 2. RECIBIMOS EL PODER DEL LAYOUT
  const [isLocked, setIsLocked] = useOutletContext();

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

  const handleUpdate = () => {
    alert("¡Datos de autoridades guardados correctamente!");
    setIsLocked(true); // Bloqueamos de nuevo al guardar
  };

  return (
    <>
      {/* ✅ BANNER CON BOTÓN FLOTANTE */}
      <div className="profile-hero-banner" style={{ position: 'relative' }}>
        <div className="hero-content">
          <img src="/confedec.png" alt="Logo" className="hero-logo-large" />
          <h1>CUADRO DIRECTIVO</h1>
          <p>Datos de Contacto de las Autoridades Institucionales</p>
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
                EDITAR AUTORIDADES
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
            <strong>✏️ Editando Cuadro Directivo:</strong> Actualice la información de las autoridades y guarde los cambios.
          </div>
        )}

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

             <button className="update-data-btn" disabled={isLocked} onClick={handleUpdate} style={{opacity: isLocked ? 0.5 : 1}}>
               GUARDAR CAMBIOS
             </button>
             <h2 className="watermark-text">AUTORIDAD</h2>
          </div>

        </div>
      </main>
    </>
  );
}

export default Directivo;