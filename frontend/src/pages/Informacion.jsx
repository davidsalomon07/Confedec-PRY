import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function Informacion() {
  // 1. Scroll al inicio
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // 2. RECIBIMOS EL PODER DEL LAYOUT
  const [isLocked, setIsLocked] = useOutletContext();

  // 3. Estados para los datos
  const [direccion, setDireccion] = useState("Av. Amazonas N34-45 y Pereira, Edificio Torre Norte");
  const [email, setEmail] = useState("secretaria@unidadeducativa.edu.ec");
  const [telefonoFijo, setTelefonoFijo] = useState("(02) 245-6789");
  const [celular, setCelular] = useState("099-123-4567");
  const [web, setWeb] = useState("www.unidadeducativa.edu.ec");

  // Datos Legales
  const [ruc, setRuc] = useState("1790012345001");
  const [resolucion, setResolucion] = useState("MINEDUC-2020-005-A");

  // Redes Sociales
  const [facebook, setFacebook] = useState("facebook.com/unidadeducativa");
  const [instagram, setInstagram] = useState("@unidad_educativa_oficial");
  const [twitter, setTwitter] = useState("@UE_Oficial");

  const handleUpdate = () => {
    alert("¡Información institucional actualizada correctamente!");
    setIsLocked(true); 
  };

  // Helper de estilos para labels
  const labelStyle = { color: '#aaa', fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '5px', textTransform: 'uppercase' };

  // Íconos SVG Temáticos
  const Icons = {
    Map: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
    Legal: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    Globe: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
  };

  return (
    <>
      {/* 1. BANNER ESTILO PROFILE / DIRECTIVOS */}
      <div className="profile-hero-banner" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '40px 20px' }}>
        <div className="hero-content" style={{ width: '100%', zIndex: 1 }}>
          <img src="/confedec.png" alt="Logo" className="hero-logo-large" />
          <h1>INFORMACIÓN INSTITUCIONAL</h1>
          <p>Datos de Contacto, Identificación Legal y Presencia Digital</p>
        </div>
        
        {/* BOTÓN FLOTANTE */}
        <div className="hero-action-container" style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 10 }}>
          <button
            onClick={() => setIsLocked(!isLocked)}
            className="banner-action-btn"
            style={{ backgroundColor: isLocked ? 'rgba(255, 255, 255, 0.2)' : '#00d2d3', color: 'white', border: '1px solid rgba(255,255,255,0.4)', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease', backdropFilter: 'blur(5px)' }}
          >
            {isLocked ? (<><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>EDITAR INFORMACIÓN</>) : (<><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>CANCELAR</>)}
          </button>
        </div>
      </div>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main className="profile-data-grid">
        
        {/* Aviso de Edición */}
        {!isLocked && (
          <div style={{ maxWidth: '1200px', width: '95%', margin: '0 auto 20px auto', background: '#e1f5fe', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #00d2d3', color: '#0277bd', textAlign: 'left' }}>
            <strong>✏️ Editando Información:</strong> Modifique los datos de contacto y presione Guardar.
          </div>
        )}

        {/* ⚡ GRID DE TARJETAS (Reutilizando clases de Directivos para consistencia) ⚡ */}
        <div className="directivos-grid-container">

          {/* TARJETA 1: SEDE & CONTACTO */}
          <div className="directivo-card">
            <div className="card-header">
              <div className="icon-circle"><Icons.Map /></div>
              <h3 className="card-title">SEDE Y CONTACTO</h3>
            </div>
            <div className="card-body">
              <label style={labelStyle}>DIRECCIÓN MATRIZ</label>
              <textarea 
                className="data-textarea" 
                value={direccion} 
                onChange={(e) => setDireccion(e.target.value)} 
                disabled={isLocked} 
                rows="2"
                style={{ resize: 'none', marginBottom: '15px' }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={labelStyle}>TELÉFONO FIJO</label>
                  <input type="tel" className="data-input" value={telefonoFijo} onChange={(e) => setTelefonoFijo(e.target.value)} disabled={isLocked} />
                </div>
                <div>
                  <label style={labelStyle}>CELULAR / WHATSAPP</label>
                  <input type="tel" className="data-input" value={celular} onChange={(e) => setCelular(e.target.value)} disabled={isLocked} />
                </div>
              </div>
            </div>
          </div>

          {/* TARJETA 2: LEGALIDAD */}
          <div className="directivo-card">
            <div className="card-header">
              <div className="icon-circle"><Icons.Legal /></div>
              <h3 className="card-title">IDENTIFICACIÓN LEGAL</h3>
            </div>
            <div className="card-body">
              <label style={labelStyle}>REGISTRO ÚNICO DE CONTRIBUYENTES (RUC)</label>
              <input type="text" className="data-input" value={ruc} onChange={(e) => setRuc(e.target.value)} disabled={isLocked} style={{ fontWeight: 'bold', letterSpacing: '1px' }} />

              <label style={labelStyle}>RESOLUCIÓN MINISTERIAL</label>
              <input type="text" className="data-input" value={resolucion} onChange={(e) => setResolucion(e.target.value)} disabled={isLocked} />
              
              {/* Espacio visual extra para igualar alturas si es necesario */}
              <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px dashed #444' }}>
                <small style={{ color: '#888', display: 'block', textAlign: 'center' }}> Documentación verificada por CONFEDEC </small>
              </div>
            </div>
          </div>

          {/* TARJETA 3: PRESENCIA DIGITAL (Ocupa todo el ancho abajo) */}
          <div className="directivo-card" style={{ gridColumn: '1 / -1' }}>
            <div className="card-header">
              <div className="icon-circle"><Icons.Globe /></div>
              <h3 className="card-title">PRESENCIA DIGITAL</h3>
            </div>
            <div className="card-body">
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '20px' }}>
                <div>
                  <label style={labelStyle}>SITIO WEB OFICIAL</label>
                  <input type="url" className="data-input" value={web} onChange={(e) => setWeb(e.target.value)} disabled={isLocked} placeholder="https://..." style={{ color: '#00d2d3' }} />
                </div>
                <div>
                  <label style={labelStyle}>CORREO INSTITUCIONAL</label>
                  <input type="email" className="data-input" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLocked} />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #333', paddingTop: '20px' }}>
                <label style={{ ...labelStyle, color: '#8e44ad', fontSize: '0.85rem', marginBottom: '15px' }}>REDES SOCIALES</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  <input type="text" className="data-input" value={facebook} onChange={(e) => setFacebook(e.target.value)} disabled={isLocked} placeholder="Facebook URL" />
                  <input type="text" className="data-input" value={instagram} onChange={(e) => setInstagram(e.target.value)} disabled={isLocked} placeholder="Instagram User" />
                  <input type="text" className="data-input" value={twitter} onChange={(e) => setTwitter(e.target.value)} disabled={isLocked} placeholder="X (Twitter)" />
                </div>
              </div>

            </div>
          </div>

        </div>

        <div style={{ maxWidth: '400px', margin: '0 auto 40px auto', padding: '0 20px' }}>
          <button className="update-data-btn" disabled={isLocked} onClick={handleUpdate} style={{ opacity: isLocked ? 0.5 : 1 }}>
            GUARDAR INFORMACIÓN
          </button>
        </div>

      </main>
    </>
  );
}

export default Informacion;