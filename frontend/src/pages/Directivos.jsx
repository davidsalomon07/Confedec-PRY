import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  IdCard, 
  Lock, 
  Unlock, 
  ChevronLeft, 
  ChevronRight, 
  Camera,
  ShieldCheck,
  Trash2,
  Upload,
  CheckCircle2
} from 'lucide-react';

function Directivo() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const placeholderPhoto = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&h=200&auto=format&fit=crop";

  // --- ESTADOS DE DATOS ---
  const [dirNombre, setDirNombre] = useState("");
  const [dirEmail, setDirEmail] = useState("");
  const [dirTelf, setDirTelf] = useState("");
  const [dirCedula, setDirCedula] = useState("");
  const [dirPhoto, setDirPhoto] = useState(null); // Almacena la imagen local

  const [rectNombre, setRectNombre] = useState("");
  const [rectEmail, setRectEmail] = useState("");
  const [rectTelf, setRectTelf] = useState("");
  const [rectCedula, setRectCedula] = useState("");
  const [rectPhoto, setRectPhoto] = useState(null);

  const [viceNombre, setViceNombre] = useState("");
  const [viceEmail, setViceEmail] = useState("");
  const [viceTelf, setViceTelf] = useState("");
  const [viceCedula, setViceCedula] = useState("");
  const [vicePhoto, setVicePhoto] = useState(null);

  const [secNombre, setSecNombre] = useState("");
  const [secEmail, setSecEmail] = useState("");
  const [secTelf, setSecTelf] = useState("");
  const [secCedula, setSecCedula] = useState("");
  const [secPhoto, setSecPhoto] = useState(null);

  // ESTADOS DE BLOQUEO INDIVIDUAL
  const [lockDir, setLockDir] = useState(true);
  const [lockRect, setLockRect] = useState(true);
  const [lockVice, setLockVice] = useState(true);
  const [lockSec, setLockSec] = useState(true);

  // ESTADO DEL CARRUSEL
  const [currentIndex, setCurrentIndex] = useState(0);
  const fileInputRef = useRef(null);

  const authorities = [
    { id: 'dir', title: 'Director General', nombre: dirNombre, setNombre: setDirNombre, email: dirEmail, setEmail: setDirEmail, telf: dirTelf, setTelf: setDirTelf, cedula: dirCedula, setCedula: setDirCedula, photo: dirPhoto, setPhoto: setDirPhoto, locked: lockDir, setLocked: setLockDir },
    { id: 'rect', title: 'Rectorado', nombre: rectNombre, setNombre: setRectNombre, email: rectEmail, setEmail: setRectEmail, telf: rectTelf, setTelf: setRectTelf, cedula: rectCedula, setCedula: setRectCedula, photo: rectPhoto, setPhoto: setRectPhoto, locked: lockRect, setLocked: setLockRect },
    { id: 'vice', title: 'Vicerrectorado', nombre: viceNombre, setNombre: setViceNombre, email: viceEmail, setEmail: setViceEmail, telf: viceTelf, setTelf: setViceTelf, cedula: viceCedula, setCedula: setViceCedula, photo: vicePhoto, setPhoto: setVicePhoto, locked: lockVice, setLocked: setLockVice },
    { id: 'sec', title: 'Secretaría', nombre: secNombre, setNombre: setSecNombre, email: secEmail, setEmail: setSecEmail, telf: secTelf, setTelf: setSecTelf, cedula: secCedula, setCedula: setSecCedula, photo: secPhoto, setPhoto: setSecPhoto, locked: lockSec, setLocked: setLockSec },
  ];

  const currentAuth = authorities[currentIndex];

  // Función para manejar la subida de imagen
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        currentAuth.setPhoto(reader.result); // Guardamos la imagen en Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const nextSlide = () => setCurrentIndex((prev) => (prev === authorities.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? authorities.length - 1 : prev - 1));
  const [showToast, setShowToast] = useState(false);

  const handleUpdate = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setLockDir(true); setLockRect(true); setLockVice(true); setLockSec(true);
  };

  const inputClass = (locked) => `
    w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-300 flex items-center justify-between
    ${locked 
      ? 'bg-gray-50 dark:bg-[#0f172a] border-gray-100 dark:border-gray-800 text-gray-500' 
      : 'bg-white dark:bg-gray-800 border-indigo-500 dark:border-indigo-400 text-gray-900 dark:text-white shadow-lg shadow-indigo-500/10'}
  `;

  const labelStyle = "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-1 mb-1.5 flex items-center gap-2";

  // --- VARIANTES DE ANIMACIÓN ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 } // Efecto cascada
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      key="page-directivo" // LA KEY PARA FORZAR LA ANIMACIÓN AL ENTRAR
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto pb-20 px-4" // AQUÍ CAMBIAMOS A max-w-6xl
    >
      
      {/* --- BANNER (CON DISEÑO UNIFICADO) --- */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] shadow-2xl mb-12 p-10 text-center">
        <div className="absolute inset-0 bg-indigo-500/10 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-white">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.1 }}>
             <img src="/confedec.png" alt="Logo" className="w-24 h-24 mx-auto mb-4 drop-shadow-2xl" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic">Cuadro Directivo</h1>
          <p className="text-indigo-200 font-medium tracking-[0.3em] text-[10px] mt-2 uppercase">Gestión de Fotografías y Credenciales</p>
        </div>
      </motion.div>

      {/* --- CARRUSEL --- */}
      <motion.div variants={itemVariants} className="relative">
        
        {/* Navegación */}
        <button onClick={prevSlide} className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white dark:bg-[#1e293b] shadow-xl text-indigo-600 dark:text-indigo-400 border border-gray-100 dark:border-gray-700 hover:scale-110 transition-all">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white dark:bg-[#1e293b] shadow-xl text-indigo-600 dark:text-indigo-400 border border-gray-100 dark:border-gray-700 hover:scale-110 transition-all">
          <ChevronRight size={24} />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}
            className="bg-white dark:bg-[#1e293b] rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 min-h-[520px]">
              
              {/* SECCIÓN FOTO (IZQUIERDA) */}
              <div className="md:col-span-2 relative bg-gray-50 dark:bg-[#0f172a] flex flex-col items-center justify-center p-8 border-r border-gray-100 dark:border-gray-800">
                <div className="relative group/photo">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 transition-transform duration-500 group-hover/photo:scale-[1.02]">
                    <img src={currentAuth.photo || placeholderPhoto} alt="Autoridad" className="w-full h-full object-cover" />
                  </div>

                  {/* Acciones de Imagen (Solo si está desbloqueado) */}
                  {!currentAuth.locked && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-indigo-900/40 backdrop-blur-sm rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all">
                      <button 
                        onClick={() => fileInputRef.current.click()}
                        className="p-3 bg-white text-indigo-600 rounded-full shadow-lg hover:scale-110 transition-transform"
                        title="Subir Foto"
                      >
                        <Upload size={24} />
                      </button>
                      {currentAuth.photo && (
                        <button 
                          onClick={() => currentAuth.setPhoto(null)}
                          className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                          title="Eliminar Foto"
                        >
                          <Trash2 size={24} />
                        </button>
                      )}
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                    </motion.div>
                  )}
                  
                  <div className="absolute -bottom-4 -right-4 p-4 bg-indigo-600 rounded-2xl shadow-xl text-white">
                    <Camera size={24} />
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <h3 className="text-2xl font-black text-gray-800 dark:text-white uppercase italic">{currentAuth.title}</h3>
                  <div className="flex items-center gap-2 justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <p className="text-gray-400 font-bold text-[10px] tracking-widest uppercase">Estatus Oficial</p>
                  </div>
                </div>
              </div>

              {/* SECCIÓN DATOS (DERECHA) */}
              <div className="md:col-span-3 p-8 md:p-12 relative">
                <button 
                  onClick={() => currentAuth.setLocked(!currentAuth.locked)} 
                  className="absolute top-8 right-8 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:scale-110 transition-all shadow-sm z-10"
                >
                  {currentAuth.locked ? <Lock size={20} className="text-gray-400" /> : <Unlock size={20} className="text-indigo-500" />}
                </button>

                <div className="space-y-6 mt-6">
                  <div>
                    <label className={labelStyle}><User size={12}/> Nombres Completos</label>
                    <div className={inputClass(currentAuth.locked)}>
                      <input type="text" className="bg-transparent outline-none w-full font-bold" value={currentAuth.nombre} onChange={(e) => currentAuth.setNombre(e.target.value)} disabled={currentAuth.locked} />
                    </div>
                  </div>

                  <div>
                    <label className={labelStyle}><IdCard size={12}/> Cédula de Identidad</label>
                    <div className={inputClass(currentAuth.locked)}>
                      <input type="text" className="bg-transparent outline-none w-full font-mono" value={currentAuth.cedula} onChange={(e) => currentAuth.setCedula(e.target.value)} disabled={currentAuth.locked} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelStyle}><Mail size={12}/> Email</label>
                      <div className={inputClass(currentAuth.locked)}>
                        <input type="email" className="bg-transparent outline-none w-full text-xs" value={currentAuth.email} onChange={(e) => currentAuth.setEmail(e.target.value)} disabled={currentAuth.locked} />
                      </div>
                    </div>
                    <div>
                      <label className={labelStyle}><Phone size={12}/> Teléfono</label>
                      <div className={inputClass(currentAuth.locked)}>
                        <input type="tel" className="bg-transparent outline-none w-full text-xs" value={currentAuth.telf} onChange={(e) => currentAuth.setTelf(e.target.value)} disabled={currentAuth.locked} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-12 justify-center md:justify-start">
                  {authorities.map((_, idx) => (
                    <div key={idx} className={`h-1.5 transition-all duration-300 rounded-full ${currentIndex === idx ? 'w-10 bg-indigo-600' : 'w-2 bg-gray-200 dark:bg-gray-700'}`} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* BOTÓN GUARDAR */}
      <AnimatePresence>
        {(!lockDir || !lockRect || !lockVice || !lockSec) && (
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="fixed bottom-10 left-0 right-0 z-50 flex justify-center px-4">
            <button onClick={handleUpdate} className="px-12 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-2xl shadow-indigo-500/40 flex items-center gap-3">
              <ShieldCheck size={20} /> GUARDAR CAMBIOS DE AUTORIDADES
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NOTIFICACIÓN TOAST ELEGANTE --- */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
            className="fixed top-24 right-8 z-[100] flex items-center gap-4 bg-white dark:bg-[#1e293b] px-6 py-4 rounded-2xl shadow-2xl shadow-emerald-500/20 border border-emerald-100 dark:border-emerald-500/30"
          >
            <div className="bg-emerald-100 dark:bg-emerald-500/20 p-2 rounded-full">
              <CheckCircle2 size={24} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-wider">¡Éxito!</p>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Autoridades actualizadas con éxito.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

export default Directivo;