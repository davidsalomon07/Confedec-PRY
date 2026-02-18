import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function Directivo() {
  
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [isLocked, setIsLocked] = useOutletContext();

  // Placeholder para cuando no hay foto (puedes cambiar esta URL por una imagen local tuya en /public)
  const placeholderPhoto = "https://via.placeholder.com/150/3c096c/ffffff/?text=FOTO";

  // --- ESTADOS (Incluyendo FOTOS) ---
  const [dirNombre, setDirNombre] = useState("");
  const [dirEmail, setDirEmail] = useState("");
  const [dirTelf, setDirTelf] = useState("");
  const [dirCedula, setDirCedula] = useState("");
  const [dirPhoto, setDirPhoto] = useState(""); // Estado para la foto

  const [rectNombre, setRectNombre] = useState("");
  const [rectEmail, setRectEmail] = useState("");
  const [rectTelf, setRectTelf] = useState("");
  const [rectCedula, setRectCedula] = useState("");
  const [rectPhoto, setRectPhoto] = useState(""); // Estado para la foto

  const [viceNombre, setViceNombre] = useState("");
  const [viceEmail, setViceEmail] = useState("");
  const [viceTelf, setViceTelf] = useState("");
  const [viceCedula, setViceCedula] = useState("");
  const [vicePhoto, setVicePhoto] = useState(""); // Estado para la foto

  const [secNombre, setSecNombre] = useState("");
  const [secEmail, setSecEmail] = useState("");
  const [secTelf, setSecTelf] = useState("");
  const [secCedula, setSecCedula] = useState("");
  const [secPhoto, setSecPhoto] = useState(""); // Estado para la foto

  const handleUpdate = () => {
    alert("¡Datos y fotos de autoridades guardados correctamente!");
    setIsLocked(true);
  };

  // Ícono de Usuario (SVG)
  const UserIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
  );

  // Helper para estilos de labels
  const labelStyle = { color: '#aaa', fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '5px', textTransform: 'uppercase' };

  return (
    <>
      {/* BANNER */}
      <div className="profile-hero-banner" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '40px 20px' }}>
        <div className="hero-content" style={{ width: '100%', zIndex: 1 }}>
          <img src="/confedec.png" alt="Logo" className="hero-logo-large" />
          <h1>CUADRO DIRECTIVO</h1>
          <p>Datos de Contacto y Fotografías de las Autoridades</p>
        </div>
        <div className="hero-action-container" style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 10 }}>
          <button 
            onClick={() => setIsLocked(!isLocked)}
            className="banner-action-btn"
            style={{ backgroundColor: isLocked ? 'rgba(255, 255, 255, 0.2)' : '#00d2d3', color: 'white', border: '1px solid rgba(255,255,255,0.4)', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease', backdropFilter: 'blur(5px)' }}
          >
            {isLocked ? (<><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>EDITAR AUTORIDADES</>) : (<><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>CANCELAR</>)}
          </button>
        </div>
      </div>

      <main className="profile-data-grid">
        
        {!isLocked && (
          <div style={{ maxWidth: '1200px', width: '95%', margin: '0 auto 20px auto', background: '#e1f5fe', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #00d2d3', color: '#0277bd', textAlign: 'left' }}>
            <strong>✏️ Editando:</strong> Actualice los datos y las URLs de las fotos.
          </div>
        )}

        {/* GRID DE TARJETAS CON FOTOS */}
        <div className="directivos-grid-container">
          
          {/* TARJETA 1: DIRECTOR */}
          <div className="directivo-card">
            <div className="card-header">
              <div className="icon-circle"><UserIcon /></div>
              <h3 className="card-title">DIRECTOR GENERAL</h3>
            </div>
            
            <div className="card-content-flex">
              {/* SECCIÓN FOTO */}
              <div className="card-photo-section">
                <img src={dirPhoto || placeholderPhoto} alt="Director" className="directivo-photo" />
                {!isLocked && (
                  <input type="text" className="data-input photo-url-input" placeholder="URL Foto..." value={dirPhoto} onChange={(e) => setDirPhoto(e.target.value)} />
                )}
              </div>

              {/* SECCIÓN DATOS */}
              <div className="card-body-data">
                <label style={labelStyle}>NOMBRES COMPLETOS</label>
                <input type="text" className="data-input" value={dirNombre} onChange={(e) => setDirNombre(e.target.value)} disabled={isLocked} />
                <label style={labelStyle}>CÉDULA</label>
                <input type="text" className="data-input" value={dirCedula} onChange={(e) => setDirCedula(e.target.value)} disabled={isLocked} />
                <label style={labelStyle}>EMAIL</label>
                <input type="email" className="data-input" value={dirEmail} onChange={(e) => setDirEmail(e.target.value)} disabled={isLocked} />
                <label style={labelStyle}>TELÉFONO</label>
                <input type="tel" className="data-input" value={dirTelf} onChange={(e) => setDirTelf(e.target.value)} disabled={isLocked} />
              </div>
            </div>
          </div>

          {/* TARJETA 2: RECTORADO */}
          <div className="directivo-card">
            <div className="card-header">
              <div className="icon-circle"><UserIcon /></div>
              <h3 className="card-title">RECTOR(A)</h3>
            </div>
            <div className="card-content-flex">
              <div className="card-photo-section">
                <img src={rectPhoto || placeholderPhoto} alt="Rector" className="directivo-photo" />
                {!isLocked && ( <input type="text" className="data-input photo-url-input" placeholder="URL Foto..." value={rectPhoto} onChange={(e) => setRectPhoto(e.target.value)} /> )}
              </div>
              <div className="card-body-data">
                <label style={labelStyle}>NOMBRES COMPLETOS</label>
                <input type="text" className="data-input" value={rectNombre} onChange={(e) => setRectNombre(e.target.value)} disabled={isLocked} />
                <label style={labelStyle}>CÉDULA</label>
                <input type="text" className="data-input" value={rectCedula} onChange={(e) => setRectCedula(e.target.value)} disabled={isLocked} />
                <label style={labelStyle}>EMAIL</label>
                <input type="email" className="data-input" value={rectEmail} onChange={(e) => setRectEmail(e.target.value)} disabled={isLocked} />
                <label style={labelStyle}>TELÉFONO</label>
                <input type="tel" className="data-input" value={rectTelf} onChange={(e) => setRectTelf(e.target.value)} disabled={isLocked} />
              </div>
            </div>
          </div>

          {/* TARJETA 3: VICERRECTORADO */}
          <div className="directivo-card">
            <div className="card-header">
              <div className="icon-circle"><UserIcon /></div>
              <h3 className="card-title">VICERRECTOR(A)</h3>
            </div>
            <div className="card-content-flex">
              <div className="card-photo-section">
                <img src={vicePhoto || placeholderPhoto} alt="Vicerrector" className="directivo-photo" />
                {!isLocked && ( <input type="text" className="data-input photo-url-input" placeholder="URL Foto..." value={vicePhoto} onChange={(e) => setVicePhoto(e.target.value)} /> )}
              </div>
              <div className="card-body-data">
                <label style={labelStyle}>NOMBRES COMPLETOS</label>
                <input type="text" className="data-input" value={viceNombre} onChange={(e) => setViceNombre(e.target.value)} disabled={isLocked} />
                <label style={labelStyle}>CÉDULA</label>
                <input type="text" className="data-input" value={viceCedula} onChange={(e) => setViceCedula(e.target.value)} disabled={isLocked} />
                <label style={labelStyle}>EMAIL</label>
                <input type="email" className="data-input" value={viceEmail} onChange={(e) => setViceEmail(e.target.value)} disabled={isLocked} />
                <label style={labelStyle}>TELÉFONO</label>
                <input type="tel" className="data-input" value={viceTelf} onChange={(e) => setViceTelf(e.target.value)} disabled={isLocked} />
              </div>
            </div>
          </div>

          {/* TARJETA 4: SECRETARÍA */}
          <div className="directivo-card">
            <div className="card-header">
              <div className="icon-circle"><UserIcon /></div>
              <h3 className="card-title">SECRETARÍA</h3>
            </div>
            <div className="card-content-flex">
              <div className="card-photo-section">
                <img src={secPhoto || placeholderPhoto} alt="Secretaría" className="directivo-photo" />
                {!isLocked && ( <input type="text" className="data-input photo-url-input" placeholder="URL Foto..." value={secPhoto} onChange={(e) => setSecPhoto(e.target.value)} /> )}
              </div>
              <div className="card-body-data">
                <label style={labelStyle}>NOMBRES COMPLETOS</label>
                <input type="text" className="data-input" value={secNombre} onChange={(e) => setSecNombre(e.target.value)} disabled={isLocked} />
                <label style={labelStyle}>CÉDULA</label>
                <input type="text" className="data-input" value={secCedula} onChange={(e) => setSecCedula(e.target.value)} disabled={isLocked} />
                <label style={labelStyle}>EMAIL</label>
                <input type="email" className="data-input" value={secEmail} onChange={(e) => setSecEmail(e.target.value)} disabled={isLocked} />
                <label style={labelStyle}>TELÉFONO</label>
                <input type="tel" className="data-input" value={secTelf} onChange={(e) => setSecTelf(e.target.value)} disabled={isLocked} />
              </div>
            </div>
          </div>

        </div>

        <div style={{ maxWidth: '400px', margin: '0 auto 40px auto', padding: '0 20px' }}>
          <button className="update-data-btn" disabled={isLocked} onClick={handleUpdate} style={{ opacity: isLocked ? 0.5 : 1 }}>GUARDAR TODOS LOS CAMBIOS</button>
        </div>
      </main>
    </>
  );
}

export default Directivo;