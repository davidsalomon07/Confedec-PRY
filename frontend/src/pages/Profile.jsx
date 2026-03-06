import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  School, 
  Book, 
  Settings, 
  GraduationCap, 
  Lock, 
  Unlock, 
  Hash, 
  Calendar, 
  MapPin, 
  Building2, 
  Info,
  HandHelping,
  CheckCircle2
} from 'lucide-react'; 

function Profile() {
  // 0. CARGA DE DATOS (Conectada a tu BD pgAdmin)
  useEffect(() => { 
    window.scrollTo(0, 0); 
    // Cambiamos 'user_data' por 'user', que es como lo guarda tu Login
    const savedData = localStorage.getItem('user'); 
    
    if (savedData) {
      const user = JSON.parse(savedData);
      
      // Mapeo exacto con las variables que envía el backend
      if (user.amie) setAmie(user.amie); 
      if (user.nombreInstitucion) setNombreInst(user.nombreInstitucion); // I mayúscula
      if (user.Sostenimiento) {
        // Convierte el dato de la BD a un arreglo, separando por comas si es necesario
        const arraySost = Array.isArray(user.Sostenimiento) 
          ? user.Sostenimiento.map(s => s.toLowerCase())
          : user.Sostenimiento.toLowerCase().split(',').map(s => s.trim());
        setTipoSostenimientos(arraySost);
      }
      
      // Mapeo de fecha si existe, si no, lo dejamos en blanco
      if (user.fechaCreacion) setFechaCreacion(user.fechaCreacion);
      
      if (user.nombreInstitucion) {
        setHistoria(`La institución ${user.nombreInstitucion} es parte fundamental de la red de educación católica en Ecuador...`);
      }
    }
  }, []);

  // 1. ESTADOS DE INFORMACIÓN
  const [nombreInst, setNombreInst] = useState("");
  const [amie, setAmie] = useState(""); 
  const [tipoSostenimientos, setTipoSostenimientos] = useState(["particular"]);
  const [distrito, setDistrito] = useState("Zona 9 - Distrito 17D05"); 
  const [fechaCreacion, setFechaCreacion] = useState("");
  const [historia, setHistoria] = useState("");
  const [tipoObraSocial, setTipoObraSocial] = useState("Educativa - Social");
  const [descripcionObra, setDescripcionObra] = useState("");

  // ESTADOS DE BLOQUEO INDIVIDUAL
  const [lockId, setLockId] = useState(true);
  const [lockGest, setLockGest] = useState(true);
  const [lockHist, setLockHist] = useState(true);
  const [lockOfer, setLockOfer] = useState(true); // Oferta abierta para checks
  const [showToast, setShowToast] = useState(false);

  // Función para manejar el marcado/desmarcado de checkboxes
  const toggleSostenimiento = (tipo) => {
    setTipoSostenimientos(prev => 
      prev.includes(tipo) ? prev.filter(t => t !== tipo) : [...prev, tipo]
    );
  };

  const handleUpdate = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    // Volvemos a bloquear todas las tarjetas, incluyendo la oferta
    setLockId(true); setLockGest(true); setLockHist(true); setLockOfer(true);
  };

  const inputClass = (locked) => `
    w-full px-4 py-3 rounded-xl border transition-all duration-300 flex items-center justify-between
    ${locked 
      ? 'bg-gray-100 dark:bg-[#0f172a] border-gray-200 dark:border-gray-800 text-gray-500' 
      : 'bg-white dark:bg-gray-800 border-indigo-500 dark:border-indigo-400 text-gray-900 dark:text-white shadow-lg shadow-indigo-500/10'}
  `;

  const labelStyle = "text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 mb-2 flex items-center gap-2";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto pb-20 px-4"
    >
      {/* --- SALUDO DE BIENVENIDA CON NOMBRE REAL DE BD --- */}
      <div className="mb-10 text-center md:text-left">
        <p className="text-indigo-500 font-bold tracking-[0.3em] text-xs mb-2 uppercase">Sistema de Gestión Institucional</p>
        <h1 className="text-3xl md:text-5xl font-black dark:text-white">
          ¡Bienvenido, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">{nombreInst || "Cargando..."}</span>!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Panel de control administrativo - CONFEDEC</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* TARJETA 1: IDENTIFICACIÓN */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 relative">
          <button onClick={() => setLockId(!lockId)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10">
            {lockId ? <Lock size={18} className="text-gray-400" /> : <Unlock size={18} className="text-indigo-500" />}
          </button>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400"><School size={24}/></div>
            <h3 className="font-black text-gray-800 dark:text-white tracking-wide uppercase italic">Identificación</h3>
          </div>

          <div className="space-y-5">
            <div>
              <label className={labelStyle}><Hash size={14} /> Código AMIE (Identificador)</label>
              <div className={inputClass(true)}>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{amie}</span>
                <Lock size={16} className="text-gray-300" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelStyle}><Calendar size={14} /> Fecha Creación</label>
                <div className={inputClass(lockId)}>
                  <input type="text" placeholder="dd/mm/aaaa" className="bg-transparent outline-none w-full text-sm" value={fechaCreacion} onChange={(e) => setFechaCreacion(e.target.value)} disabled={lockId} />
                </div>
              </div>
              <div>
                <label className={labelStyle}><MapPin size={14} /> Distrito</label>
                <div className={inputClass(lockId)}>
                  <input type="text" className="bg-transparent outline-none w-full text-[10px]" value={distrito} onChange={(e) => setDistrito(e.target.value)} disabled={lockId} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TARJETA 2: GESTIÓN (TIPO DE SOSTENIBILIDAD) */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 relative">
          <button onClick={() => setLockGest(!lockGest)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10">
            {lockGest ? <Lock size={18} className="text-gray-400" /> : <Unlock size={18} className="text-indigo-500" />}
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400"><Settings size={24}/></div>
            <h3 className="font-black text-gray-800 dark:text-white tracking-wide uppercase italic">Gestión</h3>
          </div>

          <div className="space-y-5">
            <div>
              <label className={labelStyle}><Building2 size={14} /> Sostenimiento</label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[
                  { id: 'particular', label: 'Particular' },
                  { id: 'fiscomisional', label: 'Fiscomisional' },
                  { id: 'fiscal', label: 'Fiscal' },
                  { id: 'municipal', label: 'Municipal' },
                  { id: 'obra-social', label: 'Obra Social' }
                ].map((tipo) => (
                  <label key={tipo.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${lockGest ? 'bg-gray-50 dark:bg-[#0f172a] border-gray-100 dark:border-gray-800 opacity-60' : 'hover:border-indigo-500 cursor-pointer bg-white dark:bg-gray-800 shadow-sm'}`}>
                    <input 
                      type="checkbox" 
                      checked={tipoSostenimientos.includes(tipo.id)} 
                      onChange={() => toggleSostenimiento(tipo.id)} 
                      disabled={lockGest} 
                      className="w-4 h-4 accent-indigo-600 disabled:cursor-not-allowed" 
                    />
                    <span className="text-xs font-semibold dark:text-gray-300">{tipo.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={labelStyle}><Info size={14} /> Entidad Patrocinadora</label>
              <div className={inputClass(lockGest)}>
                <select className="bg-transparent outline-none w-full text-sm dark:text-white" disabled={lockGest}>
                  <option className="dark:bg-[#1e293b]">Hermanas de la Caridad</option>
                  <option className="dark:bg-[#1e293b]">Salesianos de Don Bosco</option>
                  <option className="dark:bg-[#1e293b]">Dominicos</option>
                  <option className="dark:bg-[#1e293b]">Salesianas</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* TARJETA 3: HISTORIA */}
        <div className="md:col-span-2 bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 relative">
          <button onClick={() => setLockHist(!lockHist)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10">
            {lockHist ? <Lock size={18} className="text-gray-400" /> : <Unlock size={18} className="text-indigo-500" />}
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400"><Book size={24}/></div>
            <h3 className="font-black text-gray-800 dark:text-white tracking-wide uppercase italic">Reseña Histórica</h3>
          </div>
          <div className={inputClass(lockHist)}>
            <textarea 
              className="bg-transparent outline-none w-full p-2 text-sm leading-relaxed dark:text-white" 
              value={historia} 
              onChange={(e) => setHistoria(e.target.value)} 
              disabled={lockHist} 
              rows="4"
              style={{ resize: 'none' }}
            />
          </div>
        </div>

        {/* TARJETA 4: OFERTA ACADÉMICA (Habilitada para checks) */}
        <div className="md:col-span-2 bg-white dark:bg-[#1e293b] p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 relative">
          <button onClick={() => setLockOfer(!lockOfer)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10">
            {lockOfer ? <Lock size={18} className="text-gray-400" /> : <Unlock size={18} className="text-indigo-500" />}
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400"><GraduationCap size={24}/></div>
            <h3 className="font-black text-gray-800 dark:text-white tracking-wide uppercase italic">Oferta Académica</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Inicial', 'Preparatoria', 'Básica Elemental', 'Básica Media', 'Básica Superior', 'Bachillerato'].map((item) => (
              <label key={item} className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${lockOfer ? 'bg-gray-50 dark:bg-[#0f172a] border-gray-100 dark:border-gray-800 opacity-60' : 'hover:border-indigo-500 cursor-pointer bg-white dark:bg-gray-800 shadow-sm'}`}>
                <input type="checkbox" defaultChecked disabled={lockOfer} className="w-5 h-5 accent-indigo-600 disabled:cursor-not-allowed" />
                <span className="text-sm font-semibold dark:text-gray-300">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* TARJETA 5: OBRA SOCIAL (Se despliega automáticamente) */}
        <AnimatePresence>
          {tipoSostenimientos.includes('obra-social') && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="md:col-span-2 bg-gradient-to-br from-indigo-50 to-white dark:from-[#1e293b] dark:to-[#0f172a] p-8 rounded-3xl border-2 border-dashed border-indigo-400"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg"><HandHelping size={24}/></div>
                <h3 className="font-black text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">Detalle de Obra Social</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className={labelStyle}>Tipo de Obra</label>
                  <div className={inputClass(lockGest)}>
                    <input type="text" className="bg-transparent outline-none w-full dark:text-white" value={tipoObraSocial} onChange={(e) => setTipoObraSocial(e.target.value)} disabled={lockGest} />
                  </div>
                </div>
                <div>
                  <label className={labelStyle}>Breve Reseña de la Obra</label>
                  <div className={inputClass(lockGest)}>
                    <textarea className="bg-transparent outline-none w-full p-1 text-sm dark:text-white" value={descripcionObra} onChange={(e) => setDescripcionObra(e.target.value)} disabled={lockGest} rows="2" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BOTÓN GUARDAR DINÁMICO */}
      <AnimatePresence>
        {(!lockId || !lockGest || !lockHist || !lockOfer) && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-0 right-0 z-50 flex justify-center px-4"
          >
            <button 
              onClick={handleUpdate}
              className="px-12 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-2xl shadow-indigo-500/40 transform transition-all active:scale-95 flex items-center gap-3"
            >
              <Unlock size={20} /> GUARDAR CAMBIOS INSTITUCIONALES
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
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Información actualizada correctamente.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

export default Profile;