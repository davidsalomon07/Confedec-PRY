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

  // 🛡️ VALIDACIÓN DE NÚMEROS POSITIVOS
  const handleCantidadChange = (setter) => (e) => {
    const val = e.target.value;
    // Si está vacío o es mayor/igual a 0, actualizamos. Si es negativo, ignoramos.
    if (val === '' || Number(val) >= 0) {
      setter(val);
    }
  };

  // 🚫 BLOQUEAR TECLA MENOS (-)
  const preventMinus = (e) => {
    if (e.key === '-' || e.key === 'e') {
      e.preventDefault();
    }
  };

  const handleGuardar = () => {
    alert('Cambios guardados correctamente');
    setIsLocked(true); // Bloquear al guardar
  };

  return (
    <>
      {/* ✅ BANNER CON BOTÓN FLOTANTE */}
      <div className="profile-hero-banner" style={{ position: 'relative' }}>
        <div className="hero-content">
          <img src="/confedec.png" alt="Logo" className="hero-logo-large" />
          <h1>ESTUDIANTES</h1>
          <p>Gestión de estudiantes por nivel y curso</p>
        </div>

        {/* BOTÓN DE ACCIÓN */}
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
                EDITAR ESTUDIANTES
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
      <main className="students-section">
        <div className="students-left">

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
              <strong>✏️ Editando Estudiantes:</strong> Ingrese la cantidad de alumnos por género.
            </div>
          )}

          <label>Nivel de Educación</label>
          <select
            className="data-select"
            value={nivel}
            onChange={handleNivelChange}
            disabled={isLocked}
          >
            <option value="">Seleccione un nivel</option>
            <option>Inicial</option>
            <option>Preparatoria</option>
            <option>Básica Elemental</option>
            <option>Básica Media</option>
            <option>Básica Superior</option>
          </select>

          {nivel && (
            <>
              <label>Curso</label>
              <select
                className="data-select"
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                disabled={isLocked}
              >
                <option value="">Seleccione un curso</option>
                {cursosPorNivel[nivel].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </>
          )}

          {curso && (
            <>
              <label>Hombres</label>
              <input
                type="number"
                min="0" // Restricción HTML
                className="data-input"
                value={hombres}
                onChange={handleCantidadChange(setHombres)} // Validación Lógica
                onKeyDown={preventMinus} // Bloqueo de Tecla
                disabled={isLocked}
                placeholder="0"
              />

              <label>Mujeres</label>
              <input
                type="number"
                min="0"
                className="data-input"
                value={mujeres}
                onChange={handleCantidadChange(setMujeres)}
                onKeyDown={preventMinus}
                disabled={isLocked}
                placeholder="0"
              />
            </>
          )}

          <button
            className="update-data-btn"
            disabled={isLocked}
            onClick={handleGuardar}
            style={{ opacity: isLocked ? 0.5 : 1 }}
          >
            GUARDAR CAMBIOS
          </button>

        </div>
      </main>
    </>
  );
}

export default Estudiantes;