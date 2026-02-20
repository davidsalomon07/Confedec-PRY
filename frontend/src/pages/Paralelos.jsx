import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Unlock, 
  Plus, 
  Minus, 
  Layers, 
  Box, 
  BookOpen, 
  GraduationCap, 
  Library,
  Save
} from 'lucide-react';

function Paralelos() {
  // 1. Scroll al inicio
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // 2. ESTADOS DE DATOS (Mantenidos)
  const [paralelos, setParalelos] = useState({
    inicial: 0,
    preparatoria: 0,
    basicaElemental: 0,
    basicaMedia: 0,
    basicaSuperior: 0
  });

  // 3. ESTADOS DE BLOQUEO INDIVIDUAL (Candados)
  const [locks, setLocks] = useState({
    inicial: true,
    preparatoria: true,
    basicaElemental: true,
    basicaMedia: true,
    basicaSuperior: true
  });

  const toggleLock = (key) => {
    setLocks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const adjustNumber = (name, delta) => {
    if (locks[name]) return;
    setParalelos(prev => {
      const currentVal = Number(prev[name]) || 0;
      const newVal = currentVal + delta;
      return { ...prev, [name]: newVal < 0 ? 0 : newVal };
    });
  };

  const handleGuardar = () => {
    alert('¡Distribución de paralelos actualizada!');
    setLocks({
      inicial: true,
      preparatoria: true,
      basicaElemental: true,
      basicaMedia: true,
      basicaSuperior: true
    });
  };

  const isAnyUnlocked = Object.values(locks).some(lock => !lock);

  const cardStyle = "bg-white dark:bg-[#1e293b] p-6 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 relative flex flex-col items-center text-center transition-all duration-300";
  const labelStyle = "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mt-4 mb-1";
  const inputClass = (locked) => `
    flex items-center justify-center gap-4 py-4 px-6 rounded-2xl transition-all duration-300
    ${locked ? 'bg-gray-50 dark:bg-[#0f172a]' : 'bg-purple-50 dark:bg-purple-900/10 scale-105 shadow-inner'}
  `;

  const levels = [
    { id: 'inicial', title: 'Inicial', icon: Box },
    { id: 'preparatoria', title: 'Preparatoria', icon: BookOpen },
    { id: 'basicaElemental', title: 'Básica Elemental', icon: Library },
    { id: 'basicaMedia', title: 'Básica Media', icon: Layers },
    { id: 'basicaSuperior', title: 'Básica Superior', icon: GraduationCap },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto pb-24 px-4"
    >
      {/* --- BANNER --- */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#4b1248] to-[#703081] shadow-2xl mb-12 p-10 text-center">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-white">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
            <img src="/confedec.png" alt="Logo" className="w-24 h-24 mx-auto mb-4 drop-shadow-2xl" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic">Gestión de Paralelos</h1>
          <p className="text-purple-100 font-medium tracking-[0.3em] text-[10px] mt-2 uppercase">Capacidad Operativa Institucional</p>
        </div>
      </div>

      {/* --- GRID DE NIVELES --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {levels.map((level) => (
          <motion.div 
            key={level.id}
            whileHover={{ y: -5 }}
            className={cardStyle}
          >
            {/* Candado Individual */}
            <button 
              onClick={() => toggleLock(level.id)} 
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:scale-90"
            >
              {locks[level.id] ? <Lock size={18} className="text-gray-400" /> : <Unlock size={18} className="text-purple-500 animate-pulse" />}
            </button>

            {/* Icono y Título */}
            <div className={`p-4 rounded-2xl mb-4 bg-gradient-to-br from-[#662483] to-[#3c096c] text-white shadow-lg`}>
              <level.icon size={28} />
            </div>
            <h3 className="font-black text-gray-800 dark:text-white uppercase tracking-wider text-sm">{level.title}</h3>
            
            <label className={labelStyle}>Paralelos Disponibles</label>
            
            {/* Controles +/- */}
            <div className={inputClass(locks[level.id])}>
              <button 
                onClick={() => adjustNumber(level.id, -1)} 
                disabled={locks[level.id]}
                className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all disabled:opacity-20"
              >
                <Minus size={16} />
              </button>
              
              <div className="w-16 h-14 bg-black rounded-xl flex items-center justify-center shadow-2xl border border-gray-800">
                <span className="text-3xl font-black text-white">{paralelos[level.id]}</span>
              </div>

              <button 
                onClick={() => adjustNumber(level.id, 1)} 
                disabled={locks[level.id]}
                className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all disabled:opacity-20"
              >
                <Plus size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- BOTÓN GUARDAR FLOTANTE --- */}
      <AnimatePresence>
        {isAnyUnlocked && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-0 right-0 z-50 flex justify-center px-4"
          >
            <button 
              onClick={handleGuardar}
              className="px-12 py-4 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl shadow-2xl shadow-purple-500/40 transform transition-all active:scale-95 flex items-center gap-3"
            >
              <Save size={20} /> GUARDAR DISTRIBUCIÓN
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

export default Paralelos;