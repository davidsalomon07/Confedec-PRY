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
    setIsLocked(true); // Bloqueamos al guardar
  };

  return (
    <>
      {/* ✅ HERO BANNER CON BOTÓN FLOTANTE */}
      <div className="profile-hero-banner" style={{ position: 'relative' }}>
        <div className="hero-content">
          <img src="/confedec.png" alt="Logo" className="hero-logo-large" /> 
          <h1>INFORMACIÓN INSTITUCIONAL</h1>
          <p>Datos de Contacto, Legal y Presencia Digital</p>
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
                EDITAR INFORMACIÓN
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
      <main className="clean-layout-container">
        
        {/* AVISO DE MODO EDICIÓN */}
        {!isLocked && (
          <div style={{ 
            background: '#e1f5fe', 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '20px', 
            borderLeft: '5px solid #00d2d3', 
            color: '#0277bd'
          }}>
            <strong>✏️ Editando Información:</strong> Modifique los datos de contacto y presione Guardar.
          </div>
        )}

        {/* TARJETA 1: UBICACIÓN Y CONTACTO */}
        <div className="clean-card-box">
           <h3 className="clean-card-title">Ubicación y Contacto</h3>
           
           <div className="clean-input-group">
             <label>Dirección Matriz</label>
             <input type="text" className="clean-input" value={direccion} onChange={(e) => setDireccion(e.target.value)} disabled={isLocked} />
           </div>

           <div className="clean-input-group">
             <label>Teléfono Convencional</label>
             <input type="tel" className="clean-input" value={telefonoFijo} onChange={(e) => setTelefonoFijo(e.target.value)} disabled={isLocked} />
           </div>

           <div className="clean-input-group">
             <label>Celular Institucional / WhatsApp</label>
             <input type="tel" className="clean-input" value={celular} onChange={(e) => setCelular(e.target.value)} disabled={isLocked} />
           </div>
        </div>

        {/* TARJETA 2: DATOS LEGALES */}
        <div className="clean-card-box">
           <h3 className="clean-card-title">Identificación Legal</h3>
           
           <div className="clean-input-group">
             <label>Registro Único de Contribuyentes (RUC)</label>
             <input type="text" className="clean-input" value={ruc} onChange={(e) => setRuc(e.target.value)} disabled={isLocked} />
           </div>

           <div className="clean-input-group">
             <label>Resolución Ministerial</label>
             <input type="text" className="clean-input" value={resolucion} onChange={(e) => setResolucion(e.target.value)} disabled={isLocked} />
           </div>
        </div>

        {/* TARJETA 3: PRESENCIA DIGITAL */}
        <div className="clean-card-box">
           <h3 className="clean-card-title">Canales Digitales</h3>
           
           <div className="clean-input-group">
             <label>Sitio Web Oficial</label>
             <input type="url" className="clean-input" value={web} onChange={(e) => setWeb(e.target.value)} disabled={isLocked} placeholder="https://..." />
           </div>

           <div className="clean-input-group">
             <label>Correo Electrónico Institucional</label>
             <input type="email" className="clean-input" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLocked} />
           </div>

           <div className="clean-input-group">
             <label style={{marginTop: '10px', color: '#662483'}}>Redes Sociales</label>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <input type="text" className="clean-input" value={facebook} onChange={(e) => setFacebook(e.target.value)} disabled={isLocked} placeholder="Facebook" />
                <input type="text" className="clean-input" value={instagram} onChange={(e) => setInstagram(e.target.value)} disabled={isLocked} placeholder="Instagram" />
                <input type="text" className="clean-input" value={twitter} onChange={(e) => setTwitter(e.target.value)} disabled={isLocked} placeholder="X (Twitter)" />
             </div>
           </div>
        </div>

        <button className="update-data-btn wide-btn" disabled={isLocked} onClick={handleUpdate} style={{opacity: isLocked ? 0.5 : 1}}>
           GUARDAR INFORMACIÓN
        </button>

      </main>
    </>
  );
}

export default Informacion;