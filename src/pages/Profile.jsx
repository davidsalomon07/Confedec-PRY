import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function Profile() {
  // 0. CARGA DE DATOS DESDE LOCALSTORAGE AL INICIAR
  useEffect(() => { 
    window.scrollTo(0, 0); 
    
    const savedData = localStorage.getItem('user_data');
    if (savedData) {
      const user = JSON.parse(savedData);
      
      // Ajustado a los nombres exactos de tu pgAdmin
      if (user.amie) setAmie(user.amie); 
      if (user.Sostenimiento) setTipoSostenimiento(user.Sostenimiento.toLowerCase());
      if (user.fechaCreacion) setFechaCreacion(user.fechaCreacion);
      
      // Usamos el nombre de la institución para generar una reseña automática si está vacía
      if (user.nombreinstitucion) {
        setHistoria(`La institución ${user.nombreinstitucion} es parte fundamental de la red de educación católica...`);
      }
    }
  }, []);

  const [isLocked, setIsLocked] = useOutletContext();

  // 1. ESTADOS (Conectados a tu BD)
  const [amie, setAmie] = useState(""); 
  const [tipoSostenimiento, setTipoSostenimiento] = useState("fiscomisional");
  const [distrito, setDistrito] = useState("Zona 9 - Distrito 17D05"); // Valor por defecto
  const [fechaCreacion, setFechaCreacion] = useState("");
  const [historia, setHistoria] = useState("");
  
  const [tipoObraSocial, setTipoObraSocial] = useState("Educativa - Social");
  const [descripcionObra, setDescripcionObra] = useState("");

  const handleUpdate = () => {
    alert("¡Perfil institucional actualizado correctamente!");
    setIsLocked(true);
  };

  const Icons = {
    School: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M17 21v-8H7v8"/></svg>,
    Book: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    Settings: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    Graduation: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
  };

  const labelStyle = { color: '#aaa', fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '5px', textTransform: 'uppercase' };

  return (
    <>
      <div className="profile-hero-banner" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '40px 20px' }}>
        <div className="hero-content" style={{ width: '100%', zIndex: 1 }}>
          <img src="/confedec.png" alt="Logo" className="hero-logo-large" />
          <h1>PERFIL INSTITUCIONAL</h1>
          <p>Gestión Centralizada de Datos Educativos</p>
        </div>
        <div className="hero-action-container" style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 10 }}>
          <button 
            onClick={() => setIsLocked(!isLocked)}
            className="banner-action-btn"
            style={{ backgroundColor: isLocked ? 'rgba(255, 255, 255, 0.2)' : '#00d2d3', color: 'white', border: '1px solid rgba(255,255,255,0.4)', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease', backdropFilter: 'blur(5px)' }}
          >
            {isLocked ? (<><Icons.Settings /> EDITAR PERFIL</>) : (<><Icons.Settings /> CANCELAR</>)}
          </button>
        </div>
      </div>

      <main className="profile-data-grid">
        {!isLocked && (
          <div style={{ maxWidth: '1200px', width: '95%', margin: '0 auto 20px auto', background: '#e1f5fe', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #00d2d3', color: '#0277bd', textAlign: 'left' }}>
            <strong>✏️ Editando Perfil:</strong> Modifique el Código AMIE, historia y oferta académica.
          </div>
        )}

        <div className="directivos-grid-container">
          <div className="directivo-card">
            <div className="card-header">
              <div className="icon-circle"><Icons.School /></div>
              <h3 className="card-title">IDENTIFICACIÓN</h3>
            </div>
            <div className="card-body">
              <label style={{...labelStyle, color: '#00d2d3', fontSize: '0.9rem'}}>CÓDIGO AMIE</label>
              <input 
                type="text" 
                className="data-input" 
                value={amie} 
                onChange={(e) => setAmie(e.target.value)} 
                disabled={isLocked} 
                style={{border: '2px solid #00d2d3', fontWeight: 'bold'}}
              />

              <label style={labelStyle}>FECHA DE CREACIÓN</label>
              <input type="date" className="data-input" value={fechaCreacion} onChange={(e) => setFechaCreacion(e.target.value)} disabled={isLocked} />

              <label style={labelStyle}>DISTRITO EDUCATIVO</label>
              <input type="text" className="data-input" value={distrito} onChange={(e) => setDistrito(e.target.value)} disabled={isLocked} />
            </div>
          </div>

          <div className="directivo-card">
            <div className="card-header">
              <div className="icon-circle"><Icons.Settings /></div>
              <h3 className="card-title">GESTIÓN</h3>
            </div>
            <div className="card-body">
              <label style={labelStyle}>TIPO DE SOSTENIMIENTO</label>
              <select className="data-select" value={tipoSostenimiento} onChange={(e) => setTipoSostenimiento(e.target.value)} disabled={isLocked}>
                <option value="fiscomisional">Fiscomisional</option>
                <option value="particular">Particular</option>
                <option value="fiscal">Fiscal</option>
                <option value="municipal">Municipal</option>
                <option value="obra-social">Obra Social</option>
              </select>

              <label style={labelStyle}>ENTIDAD PATROCINADORA</label>
              <select className="data-select" disabled={isLocked}>
                <option>Hermanas de la Caridad</option>
                <option>Salesianos de Don Bosco</option>
                <option>Dominicos</option>
              </select>
            </div>
          </div>

          <div className="directivo-card">
            <div className="card-header">
              <div className="icon-circle"><Icons.Book /></div>
              <h3 className="card-title">RESEÑA HISTÓRICA</h3>
            </div>
            <div className="card-body">
              <textarea 
                className="data-textarea" 
                value={historia} 
                onChange={(e) => setHistoria(e.target.value)} 
                disabled={isLocked} 
                rows="6"
                style={{ resize: 'none' }}
              />
            </div>
          </div>

          <div className="directivo-card">
            <div className="card-header">
              <div className="icon-circle"><Icons.Graduation /></div>
              <h3 className="card-title">OFERTA ACADÉMICA</h3>
            </div>
            <div className="card-body">
              <div className="checkbox-grid">
                <label className="check-item"><input type="checkbox" disabled={isLocked} defaultChecked /> Inicial</label>
                <label className="check-item"><input type="checkbox" disabled={isLocked} defaultChecked /> Preparatoria</label>
                <label className="check-item"><input type="checkbox" disabled={isLocked} defaultChecked /> Básica Elemental</label>
                <label className="check-item"><input type="checkbox" disabled={isLocked} defaultChecked /> Básica Media</label>
                <label className="check-item"><input type="checkbox" disabled={isLocked} defaultChecked /> Básica Superior</label>
                <label className="check-item"><input type="checkbox" disabled={isLocked} defaultChecked /> Bachillerato</label>
              </div>
            </div>
          </div>

          {tipoSostenimiento === 'obra-social' && (
            <div className="directivo-card" style={{ gridColumn: '1 / -1', border: '2px dashed #00d2d3' }}>
              <div className="card-header">
                <div className="icon-circle" style={{background: '#00d2d3'}}>🤝</div>
                <h3 className="card-title" style={{color: '#00d2d3'}}>OBRA SOCIAL</h3>
              </div>
              <div className="card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>TIPO DE OBRA</label>
                  <input type="text" className="data-input" value={tipoObraSocial} onChange={(e) => setTipoObraSocial(e.target.value)} disabled={isLocked} />
                </div>
                <div>
                  <label style={labelStyle}>DESCRIPCIÓN</label>
                  <textarea className="data-textarea" value={descripcionObra} onChange={(e) => setDescripcionObra(e.target.value)} disabled={isLocked} rows="3" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ maxWidth: '400px', margin: '0 auto 40px auto', padding: '0 20px' }}>
          <button className="update-data-btn" disabled={isLocked} onClick={handleUpdate} style={{ opacity: isLocked ? 0.5 : 1 }}>
            ACTUALIZAR PERFIL
          </button>
        </div>
      </main>
    </>
  );
}

export default Profile;