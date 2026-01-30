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

  // --- ARRAY DE DIRECTIVOS PARA EL CARRUSEL ---
  const directivos = [
  { titulo: "DIRECTOR GENERAL", nombre: dirNombre, cedula: dirCedula, email: dirEmail, telf: dirTelf, foto: dirPhoto || placeholderPhoto,
    setNombre: setDirNombre, setCedula: setDirCedula, setEmail: setDirEmail, setTelf: setDirTelf, setFoto: setDirPhoto },
  { titulo: "RECTOR(A)", nombre: rectNombre, cedula: rectCedula, email: rectEmail, telf: rectTelf, foto: rectPhoto || placeholderPhoto,
    setNombre: setRectNombre, setCedula: setRectCedula, setEmail: setRectEmail, setTelf: setRectTelf, setFoto: setRectPhoto },
  { titulo: "VICERRECTOR(A)", nombre: viceNombre, cedula: viceCedula, email: viceEmail, telf: viceTelf, foto: vicePhoto || placeholderPhoto,
    setNombre: setViceNombre, setCedula: setViceCedula, setEmail: setViceEmail, setTelf: setViceTelf, setFoto: setVicePhoto },
  { titulo: "SECRETARÍA", nombre: secNombre, cedula: secCedula, email: secEmail, telf: secTelf, foto: secPhoto || placeholderPhoto,
    setNombre: setSecNombre, setCedula: setSecCedula, setEmail: setSecEmail, setTelf: setSecTelf, setFoto: setSecPhoto }
  ];

  // --- CARRUSEL AUTOMÁTICO ---
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
    setIndex((prevIndex) => (prevIndex + 1) % directivos.length);
    }, 10000); // cada 10 segundos
    return () => clearInterval(interval);
  }, []);

  const current = directivos[index];

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

        {/* CARD EN CARRUSEL */}
<div className="directivo-card">
  <div className="card-header">
    <div className="icon-circle"><UserIcon /></div>
    <h3 className="card-title">{current.titulo}</h3>
  </div>

  <div className="card-content-flex">
    {/* Foto */}
    <div className="card-photo-section">
      <img src={current.foto} alt={current.titulo} className="directivo-photo" />
      {!isLocked && (
        <input type="text" className="data-input photo-url-input" placeholder="URL Foto..."
          value={current.foto} onChange={(e) => current.setFoto(e.target.value)} />
      )}
    </div>

    {/* Datos */}
    <div className="card-body-data">
      <label style={labelStyle}>NOMBRES COMPLETOS</label>
      <input type="text" className="data-input" value={current.nombre}
        onChange={(e) => current.setNombre(e.target.value)} disabled={isLocked} />
      <label style={labelStyle}>CÉDULA</label>
      <input type="text" className="data-input" value={current.cedula}
        onChange={(e) => current.setCedula(e.target.value)} disabled={isLocked} />
      <label style={labelStyle}>EMAIL</label>
      <input type="email" className="data-input" value={current.email}
        onChange={(e) => current.setEmail(e.target.value)} disabled={isLocked} />
      <label style={labelStyle}>TELÉFONO</label>
      <input type="tel" className="data-input" value={current.telf}
        onChange={(e) => current.setTelf(e.target.value)} disabled={isLocked} />
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