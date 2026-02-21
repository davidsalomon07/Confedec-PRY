import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; 

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); 
  
  const [isLocked, setIsLocked] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // --- NUEVO ESTADO PARA EL MURO DE SEGURIDAD ---
  const [isAdmin, setIsAdmin] = useState(false);

  // --- VERIFICAR ROL AL CARGAR ---
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        const role = storedUser.rol;
        if (role === 'admin_nacional' || role === 'federacion') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/');
  };

  // --- NUEVA FUNCIÓN: Scroll suave + Cerrar menú ---
  const handleNavClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinkClass = ({ isActive }) => 
    `px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2
    ${isActive 
      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' 
      : 'text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-white'
    }`;

  return (
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
            <nav className={`hidden md:flex items-center gap-1 ${isAdmin ? 'flex-1 justify-end pr-6' : ''}`}>
              {/* Ocultamos las pestañas si es Admin */}
              {!isAdmin && (
                <>
                  <NavLink to="/perfil" className={navLinkClass} onClick={handleNavClick}>PERFIL</NavLink>
                  <NavLink to="/informacion" className={navLinkClass} onClick={handleNavClick}>INFORMACIÓN</NavLink>
                  <NavLink to="/ubicacion" className={navLinkClass} onClick={handleNavClick}>UBICACIÓN</NavLink>
                  <NavLink to="/directivo" className={navLinkClass} onClick={handleNavClick}>DIRECTIVO</NavLink>
                  <NavLink to="/estudiantes" className={navLinkClass} onClick={handleNavClick}>ESTUDIANTES</NavLink>
                  <NavLink to="/paralelos" className={navLinkClass} onClick={handleNavClick}>PARALELOS</NavLink>
                  <NavLink to="/personal" className={navLinkClass} onClick={handleNavClick}>PERSONAL</NavLink>
                </>
              )}
              {/* Consultas siempre visible */}
              <NavLink to="/consultas" className={navLinkClass} onClick={handleNavClick}>CONSULTAS</NavLink>
            </nav>

            {/* --- BOTONES DERECHA --- */}
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-yellow-400 hover:scale-110 transition-transform"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              <button 
                onClick={handleLogout} 
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden lg:inline">SALIR</span>
              </button>

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
            {!isAdmin && (
              <>
                <NavLink to="/perfil" className={navLinkClass} onClick={handleNavClick}>PERFIL</NavLink>
                <NavLink to="/informacion" className={navLinkClass} onClick={handleNavClick}>INFORMACIÓN</NavLink>
                <NavLink to="/ubicacion" className={navLinkClass} onClick={handleNavClick}>UBICACIÓN</NavLink>
                <NavLink to="/directivo" className={navLinkClass} onClick={handleNavClick}>DIRECTIVO</NavLink>
                <NavLink to="/estudiantes" className={navLinkClass} onClick={handleNavClick}>ESTUDIANTES</NavLink>
                <NavLink to="/paralelos" className={navLinkClass} onClick={handleNavClick}>PARALELOS</NavLink>
                <NavLink to="/personal" className={navLinkClass} onClick={handleNavClick}>PERSONAL</NavLink>
              </>
            )}
            <NavLink to="/consultas" className={navLinkClass} onClick={handleNavClick}>CONSULTAS</NavLink>
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