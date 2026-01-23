import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function Profile() {

  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [isLocked, setIsLocked] = useOutletContext();

  const [distrito, setDistrito] = useState("Zona 9 - Distrito 17D05");
  const [historia, setHistoria] = useState("La institución fue fundada con la misión de brindar educación católica de alta calidad, basada en los valores de San Vicente de Paúl, sirviendo a la comunidad desde 1980...");
  const [tipoObraSocial, setTipoObraSocial] = useState("Educativa - Social");
  const [descripcionObra, setDescripcionObra] = useState("Detalle aquí las actividades y el alcance de la obra social que realiza la institución...");

  const handleUpdate = () => {
    alert("¡Datos actualizados correctamente en el sistema!");
    setIsLocked(true);
  };

  return (
    <>
      <div className="profile-hero-banner" style={{ position: 'relative' }}>
        <div className="hero-content">
          <img src="/confedec.png" alt="Logo" className="hero-logo-large" />
          <h1>PERFIL DE LA INSTITUCIÓN</h1>
          <p>Gestión Centralizada de Datos Educativos</p>
        </div>
        <div className="hero-action-container">
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
                EDITAR PERFIL
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

      <main className="profile-data-grid">
        <div className="data-container">

          {/* 🛠️ AVISO MOVIDO AQUÍ ADENTRO PARA QUE RESPETE EL ANCHO */}
          {!isLocked && (
            <div style={{
              gridColumn: '1 / -1', // Esto hace que ocupe todo el ancho de las columnas
              background: '#e1f5fe',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              borderLeft: '5px solid #00d2d3',
              color: '#0277bd',
              textAlign: 'left'
            }}>
              <strong>✏️ Editando Perfil:</strong> Modifique la configuración básica, historia y obra social.
            </div>
          )}

          {/* COLUMNA 1 */}
          <div className="data-column">
            <div className="section-label">CONFIGURACIÓN BÁSICA</div>
            <label>Tipo de Sostenimiento</label>
            <select className="data-select" disabled={isLocked}>
              <option value="fiscomisional">Fiscomisional</option>
              <option value="particular">Particular</option>
              <option value="fiscal">Fiscal</option>
              <option value="municipal">Municipal</option>
            </select>
            <label>Entidad Patrocinada / Congregación</label>
            <select className="data-select" disabled={isLocked}>
              <option>Hermanas de la Caridad</option>
              <option>Salesianos de Don Bosco</option>
              <option>Compañía de Jesús (Jesuitas)</option>
              <option>Hermanos Cristianos de La Salle</option>
              <option>Dominicos</option>
            </select>
            <label>Distrito Educativo</label>
            <input type="text" className="data-input" value={distrito} onChange={(e) => setDistrito(e.target.value)} disabled={isLocked} />
          </div>

          {/* COLUMNA 2 */}
          <div className="data-column">
            <div className="section-label">RESEÑA Y OBRA SOCIAL</div>
            <label>Fecha de Creación</label>
            <input type="date" className="data-input" disabled={isLocked} defaultValue="1980-05-24" />
            <label>Breve Historia Institucional</label>
            <textarea className="data-textarea" value={historia} onChange={(e) => setHistoria(e.target.value)} disabled={isLocked} rows="4" />
            <label>Tipo de Obra Social</label>
            <input type="text" className="data-input" value={tipoObraSocial} onChange={(e) => setTipoObraSocial(e.target.value)} disabled={isLocked} placeholder="Ej: Educativa, Asistencial, etc." />
            <label>Descripción de la Obra Social</label>
            <textarea className="data-textarea" value={descripcionObra} onChange={(e) => setDescripcionObra(e.target.value)} disabled={isLocked} rows="5" />
          </div>

          {/* COLUMNA 3 */}
          <div className="data-column">
            <div className="section-label">OFERTA ACADÉMICA</div>
            <div className={`educational-level-box ${isLocked ? 'box-locked' : ''}`}>
              <div className="checkbox-grid">
                <label className="check-item"><input type="checkbox" disabled={isLocked} defaultChecked /> Inicial (3-4 años)</label>
                <label className="check-item"><input type="checkbox" disabled={isLocked} defaultChecked /> Preparatoria (1º EGB)</label>
                <label className="check-item"><input type="checkbox" disabled={isLocked} defaultChecked /> Básica Elemental</label>
                <label className="check-item"><input type="checkbox" disabled={isLocked} defaultChecked /> Básica Media</label>
                <label className="check-item"><input type="checkbox" disabled={isLocked} defaultChecked /> Básica Superior</label>
                <label className="check-item"><input type="checkbox" disabled={isLocked} defaultChecked /> Bachillerato General</label>
              </div>
            </div>
            <button className="update-data-btn" disabled={isLocked} onClick={handleUpdate} style={{ opacity: isLocked ? 0.5 : 1 }}>
              ACTUALIZAR DATOS
            </button>
            <h2 className="watermark-text">CONFEDEC</h2>
          </div>
        </div>
      </main>
    </>
  );
}
export default Profile;