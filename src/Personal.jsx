import React from 'react';
import './Personal.css';

function Personal() {
  return (
    <section id="personal" className="section-content personal-section">
      <div className="container">
        
        {/* Encabezado institucional */}
        <div className="personal-header">
          <h3>Personal Institucional</h3>
          <p className="personal-intro">
            Conozca las diferentes categorías de personal que forman parte de nuestra comunidad educativa.
          </p>
        </div>

        {/* Bloques con estilo similar a Directivo */}
        <div className="personal-grid">
          <div className="personal-item">
            <span className="personal-line"></span>
            <h4>Docentes Particulares</h4>
          </div>
          <div className="personal-item">
            <span className="personal-line"></span>
            <h4>Administrativos Particulares</h4>
          </div>
          <div className="personal-item">
            <span className="personal-line"></span>
            <h4>Mantenimiento / Servicio</h4>
          </div>
          <div className="personal-item">
            <span className="personal-line"></span>
            <h4>Docentes Fiscales</h4>
          </div>
          <div className="personal-item">
            <span className="personal-line"></span>
            <h4>Administrativos Fiscales</h4>
          </div>
        </div>

        {/* Pie de contacto */}
        <div className="personal-footer">
          <a href="#">Contacto - redes sociales</a>
        </div>
      </div>
    </section>
  );
}

export default Personal;