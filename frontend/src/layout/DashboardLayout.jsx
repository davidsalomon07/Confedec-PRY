import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Sun, Moon } from 'lucide-react'; // Iconos modernos
import { useTheme } from '../context/ThemeContext'; // Importamos el tema

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // Hook para modo oscuro
  
  // Estados originales (INTACTOS)
  const [isLocked, setIsLocked] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Limpiamos sesión por si acaso
    navigate('/');
  };

  // Clases para los links (Activo vs Inactivo)
  const navLinkClass = ({ isActive }) => 
    `px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2
    ${isActive 
      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' // Activo
      : 'text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-white' // Inactivo
    }`;

  return (
    // Contenedor principal con fondo adaptable
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo y Título */}
            <div className="flex items-center gap-3">
              <img src="/confedec.png" alt="Logo" className="h-10 w-10 object-contain" />
              <div className="hidden sm:block leading-tight">
                <h1 className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">CONFEDEC</h1>
                <p className="text-[10px] font-bold text-gray-400 tracking-widest">REGISTRO DE INFORMACIÓN</p>
              </div>
            </div>

            {/* --- BARRA DE NAVEGACIÓN (Desktop) --- */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink to="/perfil" className={navLinkClass}>PERFIL</NavLink>
              <NavLink to="/informacion" className={navLinkClass}>INFORMACIÓN</NavLink>
              <NavLink to="/ubicacion" className={navLinkClass}>UBICACIÓN</NavLink>
              <NavLink to="/directivo" className={navLinkClass}>DIRECTIVO</NavLink>
              <NavLink to="/estudiantes" className={navLinkClass}>ESTUDIANTES</NavLink>
              <NavLink to="/paralelos" className={navLinkClass}>PARALELOS</NavLink>
              <NavLink to="/personal" className={navLinkClass}>PERSONAL</NavLink>
              <NavLink to="/consultas" className={navLinkClass}>CONSULTAS</NavLink>
            </nav>

            {/* --- BOTONES DERECHA (Tema, Logout, Hamburguesa) --- */}
            <div className="flex items-center gap-3">
              
              {/* Botón Tema */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-yellow-400 hover:scale-110 transition-transform"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              {/* Botón Cerrar Sesión (Desktop) */}
              <button 
                onClick={handleLogout} 
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden lg:inline">SALIR</span>
              </button>

              {/* Botón Hamburguesa (Móvil) */}
              <button 
                className="md:hidden p-2 text-gray-600 dark:text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- MENÚ MÓVIL DESPLEGABLE --- */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-[#1e293b] border-b border-gray-200 dark:border-gray-700 shadow-xl py-4 px-4 flex flex-col gap-2">
            <NavLink to="/perfil" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>PERFIL</NavLink>
            <NavLink to="/informacion" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>INFORMACIÓN</NavLink>
            <NavLink to="/ubicacion" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>UBICACIÓN</NavLink>
            <NavLink to="/directivo" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>DIRECTIVO</NavLink>
            <NavLink to="/estudiantes" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>ESTUDIANTES</NavLink>
            <NavLink to="/paralelos" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>PARALELOS</NavLink>
            <NavLink to="/personal" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>PERSONAL</NavLink>
            <NavLink to="/consultas" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>CONSULTAS</NavLink>
            <hr className="border-gray-200 dark:border-gray-700 my-2" />
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-500 font-bold bg-red-50 dark:bg-red-900/10 rounded-lg"
            >
              <LogOut size={18} /> CERRAR SESIÓN
            </button>
          </div>
        )}
      </header>

      {/* --- CONTENIDO DE LAS PÁGINAS --- */}
      {/* Aquí pasamos el contexto isLocked tal cual lo tenías */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <Outlet context={[isLocked, setIsLocked]} />
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-6 text-center text-sm text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-800">
        © 2026 CONFEDEC - Sistema de Gestión de Información Educativa
      </footer>

    </div>
  );
};

export default DashboardLayout;