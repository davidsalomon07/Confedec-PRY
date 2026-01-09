import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css'; 

function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <div className="profile-wrapper">
      
      {/* --- HEADER SUPERIOR (NAVBAR) --- */}
      <header className="profile-navbar">
        <div className="navbar-left">
          <img src="/confedec.png" alt="Logo" className="nav-logo" />
        </div>

        {/* MENÚ DE NAVEGACIÓN */}
        {/* Usamos NavLink para que se ilumine el activo automáticamente */}
        <nav className="navbar-center">
          <NavLink to="/perfil" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            PERFIL
          </NavLink>
          <NavLink to="/estudiantes" className="nav-item">ESTUDIANTES</NavLink>
          <NavLink to="/paralelos" className="nav-item">PARALELOS</NavLink>
          <NavLink to="/personal" className="nav-item">PERSONAL</NavLink>
          <NavLink to="/informacion" className="nav-item">INFORMACIÓN</NavLink>
        </nav>

        {/* SECCIÓN USUARIO Y SALIR */}
        <div className="navbar-right">
          <button className="logout-text-btn" onClick={handleLogout}>
            CERRAR SESIÓN
          </button>
        </div>
      </header>

      {/* --- BANNER TIPO HERO (Con el mapa de fondo) --- */}
      <div className="profile-banner">
         <div className="banner-content">
            <img src="/confedec.png" alt="Logo Grande" className="banner-logo"/>
            <h1>CONFEDEC</h1>
            <p>Confederación Ecuatoriana de Establecimientos de Educación Católica</p>
         </div>
      </div>

      {/* --- SECCIÓN DE DATOS (GRID DE 3 COLUMNAS) --- */}
      <div className="data-section">
        <div className="data-container">
          
          {/* COLUMNA 1 */}
          <div className="data-column">
            <label>Identificación AMIE</label>
            <div className="data-pill">17H000XX</div>

            <label>Nombre de la Institución</label>
            <div className="data-pill">Unidad Educativa Ejemplo</div>

            <label>Tipo de sostenimiento</label>
            <div className="data-pill">Fiscomisional</div>
          </div>

          {/* COLUMNA 2 */}
          <div className="data-column">
            <label>Fecha de Creación</label>
            <div className="data-pill">24 de Mayo 1980</div>

            <label>Celebración patronal</label>
            <div className="data-pill">San José</div>

            <label>Entidad patrocinada / congregación</label>
            <div className="data-pill">Hermanas de la Caridad</div>
          </div>

          {/* COLUMNA 3 (Nivel Educativo) */}
          <div className="data-column">
            <label>Nivel educativo</label>
            <div className="level-box">
              <ul>
                <li>• Inicial (3-4 años)</li>
                <li>• Preparatoria (1º EGB)</li>
                <li>• Básica elemental (2º,3º,4º EGB)</li>
                <li>• Básica media (5º, 6º ,7º EGB)</li>
                <li>• Básica superior (8º, 9º, 10º EGB)</li>
              </ul>
            </div>
            <h2 className="section-title-corner">PERFIL</h2>
          </div>

        </div>
      </div>

      {/* --- FOOTER PEQUEÑO --- */}
      <footer className="profile-footer">
        Contacto - redes sociales
      </footer>

    </div>
  );
}

export default Profile;