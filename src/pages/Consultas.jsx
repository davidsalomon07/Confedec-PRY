import { useState, useEffect } from 'react';

function Consultas() {
  
  // 1. Scroll al inicio
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 2. DATOS (Simulados)
  const [datosInstituciones] = useState([
    { id: 1, nombre: "Unidad Educativa San Vicente", sostenimiento: "fiscomisional", distrito: "17D05", fecha: "1980-05-24", obraSocial: "N/A" },
    { id: 2, nombre: "Fundación Ayuda Joven", sostenimiento: "obra-social", distrito: "09D01", fecha: "2005-02-10", obraSocial: "Asistencial - Médica" },
    { id: 3, nombre: "Colegio Técnico Don Bosco", sostenimiento: "particular", distrito: "11D02", fecha: "1995-11-15", obraSocial: "N/A" },
    { id: 4, nombre: "Escuela Fiscal Eloy Alfaro", sostenimiento: "fiscal", distrito: "17D03", fecha: "1975-09-01", obraSocial: "N/A" },
    { id: 5, nombre: "Liceo Internacional", sostenimiento: "particular", distrito: "17D09", fecha: "2001-03-15", obraSocial: "N/A" }
  ]);

  // 3. LÓGICA DE DESCARGA
  const descargarExcel = () => {
    const encabezados = ["ID", "Institución", "Sostenimiento", "Distrito", "Fecha", "Obra Social"];
    const filas = datosInstituciones.map(d => [d.id, `"${d.nombre}"`, d.sostenimiento.toUpperCase(), d.distrito, d.fecha, d.obraSocial]);
    const csvContent = "\uFEFF" + [encabezados.join(","), ...filas.map(f => f.join(","))].join("\n");
    
    const url = URL.createObjectURL(new Blob([csvContent], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "reporte_confedec.csv";
    link.click();
  };

  // --- ESTILOS ---
  const tableHeaderStyle = {
    padding: '18px 15px',
    textAlign: 'left',
    fontSize: '0.85rem',
    fontWeight: '800',
    color: '#662483', // Morado marca
    textTransform: 'uppercase',
    letterSpacing: '1px',
    borderBottom: '2px solid #222'
  };

  const tableCellStyle = {
    padding: '15px',
    borderBottom: '1px solid #222',
    color: '#e0e0e0', // Blanco estándar
    fontSize: '0.95rem'
  };

  // Íconos SVG
  const Icons = {
    Database: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s 9-1.34 9-3V5"/></svg>,
    Download: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
  };

  return (
    <>
      {/* 1. BANNER */}
      <div className="profile-hero-banner" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '40px 20px' }}>
        <div className="hero-content" style={{ width: '100%', zIndex: 1 }}>
          <img src="/confedec.png" alt="Logo" className="hero-logo-large" />
          <h1>CONSULTAS Y REPORTES</h1>
          <p>Generación de datos consolidados y exportación</p>
        </div>
      </div>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main className="profile-data-grid">
        
        <div style={{ maxWidth: '1200px', width: '95%', margin: '0 auto' }}>

          {/* PANEL DE CONTROL */}
          <div style={{ 
            background: '#111', 
            border: '1px solid #333', 
            borderRadius: '16px', 
            padding: '20px 30px',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}>
            
            {/* Información Izquierda */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #662483 0%, #3c096c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <Icons.Database />
              </div>
              <div>
                <h3 style={{ margin: 0, color: 'white', fontSize: '1.2rem' }}>BASE DE DATOS GENERAL</h3>
                <p style={{ margin: '5px 0 0', color: '#888', fontSize: '0.9rem' }}>
                  {/* CORRECCIÓN: Número en blanco negrita, no celeste */}
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>{datosInstituciones.length}</span> registros encontrados
                </p>
              </div>
            </div>

            {/* Botón Derecha (CORRECCIÓN: Verde Excel) */}
            <button 
              onClick={descargarExcel} 
              style={{
                background: '#1D6F42', // Verde Excel
                color: '#fff', 
                border: 'none', 
                padding: '12px 25px',
                borderRadius: '30px', 
                fontWeight: '800', 
                cursor: 'pointer', 
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'transform 0.2s',
                boxShadow: '0 0 15px rgba(29, 111, 66, 0.3)'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Icons.Download />
              DESCARGAR EXCEL
            </button>
          </div>

          {/* TABLA DE DATOS */}
          <div style={{ 
            background: '#050505', 
            borderRadius: '16px', 
            border: '1px solid #333', 
            overflow: 'hidden'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                <thead>
                  <tr style={{ background: '#0a0a0a' }}>
                    <th style={tableHeaderStyle}>INSTITUCIÓN</th>
                    <th style={tableHeaderStyle}>SOSTENIMIENTO</th>
                    <th style={tableHeaderStyle}>DISTRITO</th>
                    <th style={tableHeaderStyle}>FECHA CREACIÓN</th>
                    <th style={tableHeaderStyle}>OBRA SOCIAL</th>
                  </tr>
                </thead>
                <tbody>
                  {datosInstituciones.map((item, index) => (
                    <tr key={item.id} style={{ 
                      background: index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'
                    }}>
                      <td style={{ ...tableCellStyle, fontWeight: 'bold', color: '#fff' }}>
                        {item.nombre}
                      </td>
                      <td style={tableCellStyle}>
                        {/* CORRECCIÓN: Badge Gris uniforme para todos */}
                        <span style={{ 
                          padding: '5px 12px', 
                          borderRadius: '20px', 
                          fontSize: '0.75rem', 
                          fontWeight: 'bold',
                          background: 'rgba(255,255,255,0.1)', // Fondo gris oscuro
                          color: '#aaa', // Texto gris claro
                          border: '1px solid #444' // Borde gris sutil
                        }}>
                          {item.sostenimiento.toUpperCase()}
                        </span>
                      </td>
                      <td style={tableCellStyle}>{item.distrito}</td>
                      <td style={tableCellStyle}>{item.fecha}</td>
                      {/* CORRECCIÓN: Texto blanco/gris, sin celeste */}
                      <td style={{ ...tableCellStyle, color: item.obraSocial !== 'N/A' ? '#e0e0e0' : '#555' }}>
                        {item.obraSocial}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px', color: '#555', fontSize: '0.8rem' }}>
            Mostrando {datosInstituciones.length} resultados del sistema CONFEDEC
          </div>

        </div>
      </main>
    </>
  );
}

export default Consultas;