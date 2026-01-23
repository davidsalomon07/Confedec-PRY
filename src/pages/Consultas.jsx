import { useState } from 'react';

function Consultas() {
  
  const [datosInstituciones] = useState([
    { id: 1, nombre: "Unidad Educativa San Vicente", sostenimiento: "fiscomisional", distrito: "17D05", fecha: "1980-05-24", obraSocial: "N/A" },
    { id: 2, nombre: "Fundación Ayuda Joven", sostenimiento: "obra-social", distrito: "09D01", fecha: "2005-02-10", obraSocial: "Asistencial - Médica" },
    { id: 3, nombre: "Colegio Técnico Don Bosco", sostenimiento: "particular", distrito: "11D02", fecha: "1995-11-15", obraSocial: "N/A" }
  ]);

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

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', color: 'white' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
         <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>
           CONSULTAS Y REPORTES
         </h1>
         <p style={{ color: '#00d2d3', fontSize: '1.1rem' }}>Generación de datos consolidados</p>
      </div>

      <div style={{ 
        background: '#111', border: '1px solid #333', borderRadius: '12px', padding: '25px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'
      }}>
        <div>
          <h3 style={{ margin: 0, color: 'white' }}>Base de Datos General</h3>
          <p style={{ margin: '5px 0 0', color: '#888' }}>{datosInstituciones.length} registros encontrados</p>
        </div>
        <button onClick={descargarExcel} style={{
          background: '#00d2d3', color: '#000', border: 'none', padding: '12px 30px',
          borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem'
        }}>
          📥 DESCARGAR EXCEL
        </button>
      </div>

      <div style={{ overflowX: 'auto', background: '#000', borderRadius: '10px', border: '1px solid #222' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
          <thead>
            <tr style={{ background: '#1a1a1a', color: '#00d2d3', textAlign: 'left' }}>
              <th style={{ padding: '15px' }}>INSTITUCIÓN</th>
              <th style={{ padding: '15px' }}>SOSTENIMIENTO</th>
              <th style={{ padding: '15px' }}>DISTRITO</th>
              <th style={{ padding: '15px' }}>OBRA SOCIAL</th>
            </tr>
          </thead>
          <tbody>
            {datosInstituciones.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #222', color: '#ccc' }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>{item.nombre}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ 
                    padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem',
                    background: item.sostenimiento === 'obra-social' ? 'rgba(0, 210, 211, 0.2)' : '#333',
                    color: item.sostenimiento === 'obra-social' ? '#00d2d3' : '#aaa'
                  }}>
                    {item.sostenimiento.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '15px' }}>{item.distrito}</td>
                <td style={{ padding: '15px' }}>{item.obraSocial}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Consultas;