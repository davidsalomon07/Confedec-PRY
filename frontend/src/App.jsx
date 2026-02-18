import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion' // 👈 Animaciones
import { Moon, Sun, MapPin, Phone, Mail, ExternalLink, User, Lock, ChevronDown, Menu } from 'lucide-react' // 👈 Iconos
import { useTheme } from './context/ThemeContext' // 👈 Modo Oscuro
// import './App.css' <--- YA NO LO NECESITAMOS, LO COMENTAMOS

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // Hook del tema

  // --- TUS ESTADOS (INTACTOS) ---
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 1. Función para el Scroll Suave
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 2. Función del Login (TU LÓGICA INTACTA)
  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError(''); 

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user)); 
        setShowLogin(false); 

        if (data.user.amie === 'FEDERACION') {
            navigate('/consultas');
        } else {
            navigate('/perfil');
        }

      } else {
        setError(data.error || 'Credenciales incorrectas');
      }
    } catch (err) {
      console.error(err);
      setError('Error al conectar con el servidor. ¿Está encendido el backend?');
    }
  };

  // Variantes de animación
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    // CONTENEDOR PRINCIPAL CON MODO OSCURO
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#0f172a] dark:text-gray-100 transition-colors duration-300 font-sans">
      
      {/* --- HEADER (FLOTANTE Y CRISTALINO) --- */}
      <header className="fixed top-0 w-full z-40 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <img src="/confedec.png" alt="Logo Confedec" className="h-12 w-12 object-contain hover:scale-105 transition-transform" />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold tracking-tight text-primary dark:text-indigo-400">CONFEDEC</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 tracking-wider">REGISTRO DE INFORMACIÓN</p>
              </div>
            </div>

            {/* Navegación Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex gap-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                <button onClick={() => scrollToSection('informacion')} className="hover:text-primary dark:hover:text-indigo-400 transition-colors">INFORMACIÓN</button>
                <button onClick={() => scrollToSection('directivo')} className="hover:text-primary dark:hover:text-indigo-400 transition-colors">DIRECTIVO</button>
                <button onClick={() => scrollToSection('ubicacion')} className="hover:text-primary dark:hover:text-indigo-400 transition-colors">UBICACIÓN</button>
              </nav>

              <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>

              {/* Botón Tema */}
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              {/* Botón Login */}
              <button 
                onClick={() => { setShowLogin(true); setError(''); }}
                className="px-5 py-2.5 rounded-xl font-bold bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 transform hover:-translate-y-0.5 transition-all"
              >
                INICIAR SESIÓN
              </button>
            </div>
            
            {/* Menú Móvil (Icono) */}
            <div className="md:hidden flex items-center gap-4">
               <button onClick={toggleTheme} className="p-2">{theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}</button>
               <Menu className="text-gray-600 dark:text-gray-300" />
            </div>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION (GRADIENTE MODERNO) --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-[#0f172a] dark:to-[#1e1b4b]"></div>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-primary dark:text-indigo-300 text-sm font-semibold mb-6">
              Educación Católica de Calidad
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              CONFEDEC
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Confederación Ecuatoriana de Establecimientos de Educación Católica.
            </h2>
            
            <button 
              onClick={() => scrollToSection('informacion')}
              className="group flex items-center gap-2 mx-auto text-primary dark:text-indigo-400 font-semibold hover:underline underline-offset-4 transition-all"
            >
              CONOCER MÁS <ChevronDown className="group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- SECCIÓN 1: INFORMACIÓN --- */}
      <section id="informacion" className="py-24 bg-white dark:bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                ¿Quiénes Somos?
              </h3>
              <div className="h-1 w-20 bg-primary rounded-full"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                La Confederación Ecuatoriana de Establecimientos de Educación Católica es una institución de derecho privado, con finalidad de servicio social y sin fines de lucro. Integramos a 22 Federaciones Provinciales y buscamos la excelencia en la educación basada en valores.
              </p>
            </div>
            
            <div className="flex justify-center relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
               <div className="relative bg-white dark:bg-gray-800 p-8 rounded-full shadow-2xl border border-gray-100 dark:border-gray-700">
                  <img src="/confedec.png" alt="Logo" className="w-48 h-48 object-contain" />
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECCIÓN 2: DIRECTIVO --- */}
      <section id="directivo" className="py-24 bg-gray-50 dark:bg-[#111827]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-3xl font-bold mb-4 dark:text-white">Autoridades Institucionales</h3>
            <p className="text-gray-500 dark:text-gray-400">Conozca a quienes encabezan nuestra estructura organizacional, pilares fundamentales de nuestra gestión.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Dirección General', 'Rectorado', 'Vicerrectorado', 'Secretaría'].map((cargo, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-[#1f2937] p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all text-center group"
              >
                <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-6 mx-auto rounded-full group-hover:scale-150 transition-transform"></div>
                <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">{cargo}</h4>
                <p className="text-sm text-gray-400 mt-2">Confedec</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 3: UBICACIÓN --- */}
      <section id="ubicacion" className="py-24 bg-white dark:bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold dark:text-white">Nuestra Ubicación</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Visítanos en nuestra sede central</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 bg-gray-50 dark:bg-[#1e293b] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
            {/* Info */}
            <div className="p-10 space-y-8 flex flex-col justify-center">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-primary dark:text-indigo-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg dark:text-white">Dirección</h4>
                  <p className="text-gray-600 dark:text-gray-300">Calle Andalucía N24-63 y Madrid</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Sector La Floresta, Quito - Ecuador</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-primary dark:text-indigo-400">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg dark:text-white">Teléfono</h4>
                  <p className="text-gray-600 dark:text-gray-300">(02) 222-1986</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-primary dark:text-indigo-400">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg dark:text-white">Email</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm break-all">confedec.comunicaciones@confedec.org</p>
                </div>
              </div>

              <button 
                onClick={() => window.open('https://www.google.com/maps', '_blank')}
                className="mt-6 flex items-center justify-center gap-2 w-full py-3 border-2 border-primary text-primary dark:text-indigo-400 dark:border-indigo-400 rounded-xl font-bold hover:bg-primary hover:text-white transition-all"
              >
                Abrir en Google Maps <ExternalLink size={18} />
              </button>
            </div>

            {/* Mapa */}
            <div className="h-96 lg:h-auto min-h-[400px]">
              <iframe 
                title="Mapa Confedec"
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src="https://maps.google.com/maps?q=Calle%20Andaluc%C3%ADa%20N24-63%20y%20Madrid%2C%20Quito&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
              >
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 bg-white dark:bg-[#0f172a] border-t border-gray-200 dark:border-gray-800 text-center">
        <p className="text-gray-500 text-sm">© 2026 CONFEDEC - Todos los derechos reservados</p>
        <div className="flex justify-center gap-4 mt-4 text-gray-400 text-sm">
            <span className="hover:text-primary cursor-pointer">Facebook</span> | 
            <span className="hover:text-primary cursor-pointer">Instagram</span> | 
            <span className="hover:text-primary cursor-pointer">Twitter</span>
        </div>
      </footer>

      {/* --- MODAL LOGIN (ANIMADO) --- */}
      <AnimatePresence>
        {showLogin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="bg-primary p-6 text-center relative">
                 <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 p-2 bg-white dark:bg-[#1e293b] rounded-full">
                    <img src="/confedec.png" alt="Logo" className="w-16 h-16 object-contain" />
                 </div>
                 <h2 className="text-2xl font-bold text-white mb-6">Bienvenido</h2>
              </div>

              <div className="pt-16 pb-8 px-8">
                <form className="space-y-4" onSubmit={handleLogin}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <User size={16} /> Usuario
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
                      placeholder="Usuario / Código AMIE" 
                      value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Lock size={16} /> Contraseña
                    </label>
                    <input 
                      type="password" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">{error}</p>}

                  <button type="submit" className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-all transform active:scale-95">
                    ACCEDER
                  </button>
                </form>
                
                <button 
                  className="w-full mt-4 text-gray-500 dark:text-gray-400 text-sm hover:text-gray-800 dark:hover:text-white transition-colors"
                  onClick={() => setShowLogin(false)}
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default App