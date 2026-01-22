import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function Personal() {

  // 1. Scroll al inicio al cargar la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 2. RECIBIMOS EL PODER DEL LAYOUT
  const [isLocked, setIsLocked] = useOutletContext();

  // 3. Estados para los datos del Personal
  const [formData, setFormData] = useState({
    docentesParticulares: '',
    adminParticulares: '',
    servicio: '', 
    docentesFiscales: '',
    adminFiscales: ''
  });

  // Manejador genérico
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value >= 0) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGuardar = () => {
    console.log("Datos a guardar:", formData);
    alert('Información del personal actualizada correctamente.');
    setIsLocked(true); // Bloquear al guardar
  };

  return (
    <>
      {/* ✅ HERO BANNER CON BOTÓN FLOTANTE */}
      <div className="profile-hero-banner" style={{ position: 'relative' }}>
        <div className="hero-content">
          <img src="/confedec.png" alt="Logo" className="hero-logo-large" />
          <h1>PERSONAL INSTITUCIONAL</h1>
          <p>Registro de la planta docente, administrativa y de servicio</p>
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
                EDITAR PERSONAL
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

      {/* 📝 FORMULARIO PRINCIPAL */}
      <main className="section-content" style={{ paddingBottom: '60px' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          
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
              <strong>✏️ Editando Personal:</strong> Actualice las cantidades de docentes y administrativos.
            </div>
          )}
          
          {/* SECCIÓN 1: PERSONAL PARTICULAR / SERVICIO */}
          <div className="clean-card-box" style={{ marginBottom: '30px' }}>
            <h3 className="clean-card-title" style={{ color: '#0056b3' }}>Personal Particular y Servicio</h3>
            <div className="form-grid-3">
              
              <div className="clean-input-group">
                <label>Docentes Particulares</label>
                <input type="number" className="clean-input" name="docentesParticulares" value={formData.docentesParticulares} onChange={handleChange} disabled={isLocked} placeholder="0" />
              </div>

              <div className="clean-input-group">
                <label>Administrativos Particulares</label>
                <input type="number" className="clean-input" name="adminParticulares" value={formData.adminParticulares} onChange={handleChange} disabled={isLocked} placeholder="0" />
              </div>

              <div className="clean-input-group">
                <label>Mantenimiento y Servicio</label>
                <input type="number" className="clean-input" name="servicio" value={formData.servicio} onChange={handleChange} disabled={isLocked} placeholder="0" />
              </div>

            </div>
          </div>

          {/* SECCIÓN 2: PERSONAL FISCAL */}
          <div className="clean-card-box">
            <h3 className="clean-card-title" style={{ color: '#662483' }}>Personal Fiscal (Asignado)</h3>
            <div className="form-grid-2">
              
              <div className="clean-input-group">
                <label>Docentes Fiscales</label>
                <input type="number" className="clean-input" name="docentesFiscales" value={formData.docentesFiscales} onChange={handleChange} disabled={isLocked} placeholder="0" />
              </div>

              <div className="clean-input-group">
                <label>Administrativos Fiscales</label>
                <input type="number" className="clean-input" name="adminFiscales" value={formData.adminFiscales} onChange={handleChange} disabled={isLocked} placeholder="0" />
              </div>

            </div>
          </div>

          {/* BOTÓN DE GUARDAR */}
          <button 
            className="update-data-btn wide-btn" 
            style={{ marginTop: '30px', opacity: isLocked ? 0.5 : 1 }}
            disabled={isLocked} 
            onClick={handleGuardar}
          >
            GUARDAR REGISTRO DE PERSONAL
          </button>

        </div>
      </main>
    </>
  );
}

export default Personal;