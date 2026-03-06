import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Unlock, 
  Plus, 
  Minus, 
  Briefcase, 
  UserCheck, 
  Wrench, 
  Building,
  Users,
  Save,
  Calculator,
  CheckCircle2
} from 'lucide-react';

function Personal() {
  // 1. Scroll al inicio
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // 2. ESTADOS DE DATOS (Mantenidos)
  const [formData, setFormData] = useState({
    docentesParticulares: 0,
    adminParticulares: 0,
    servicio: 0,
    docentesFiscales: 0,
    adminFiscales: 0
  });

  // 3. ESTADOS DE BLOQUEO INDIVIDUAL (Candados)
  const [lockParticular, setLockParticular] = useState(true);
  const [lockFiscal, setLockFiscal] = useState(true);

  // Manejador genérico (Preservando funcionalidad)
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || (!isNaN(value) && Number(value) >= 0)) {
      setFormData({ ...formData, [name]: value === '' ? '' : Number(value) });
    }
  };

  // 🕹️ LÓGICA DE BOTONES (+ / -)
  const adjustNumber = (name, delta, locked) => {
    if (locked) return; 
    setFormData(prev => {
      const currentVal = Number(prev[name]) || 0;
      const newVal = currentVal + delta;
      return { ...prev, [name]: newVal < 0 ? 0 : newVal };
    });
  };

  // Estado para la notificación elegante
  const [showToast, setShowToast] = useState(false);

  const handleGuardar = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setLockParticular(true);
    setLockFiscal(true);
  };

  const totalPersonal = Object.values(formData).reduce((a, b) => Number(a) + Number(b), 0);
  const isAnyUnlocked = !lockParticular || !lockFiscal;

  const cardStyle = "bg-white dark:bg-[#1e293b] p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 relative transition-all duration-300";
  const labelStyle = "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-1";
  const rowStyle = "flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-[#0f172a] border border-gray-100 dark:border-gray-800 transition-all";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto pb-24 px-4"
    >
      {/* --- BANNER --- */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] shadow-2xl mb-12 p-10 text-center">
        <div className="absolute inset-0 bg-indigo-500/10 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-white">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
            <img src="/confedec.png" alt="Logo" className="w-24 h-24 mx-auto mb-4 drop-shadow-2xl" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic">Personal Institucional</h1>
          <p className="text-indigo-200 font-medium tracking-[0.3em] text-[10px] mt-2 uppercase">Registro de Planta Docente y Administrativa</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* TARJETA 1: PERSONAL PARTICULAR */}
        <div className={cardStyle}>
          <button 
            onClick={() => setLockParticular(!lockParticular)} 
            className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            {lockParticular ? <Lock size={18} className="text-gray-400" /> : <Unlock size={18} className="text-purple-500 animate-pulse" />}
          </button>

          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-2xl text-purple-600 dark:text-purple-400"><UserCheck size={24}/></div>
            <h3 className="font-black text-gray-800 dark:text-white tracking-tight uppercase italic text-lg">Personal Particular</h3>
          </div>

          <div className="space-y-4">
            {/* Docentes Particulares */}
            <div className={rowStyle}>
              <div className="flex items-center gap-3">
                <Briefcase size={18} className="text-purple-500" />
                <span className="text-xs font-bold dark:text-gray-300">Docentes</span>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => adjustNumber('docentesParticulares', -1, lockParticular)} disabled={lockParticular} className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all disabled:opacity-20"><Minus size={14} /></button>
                <span className="text-2xl font-black dark:text-white min-w-[30px] text-center">{formData.docentesParticulares}</span>
                <button onClick={() => adjustNumber('docentesParticulares', 1, lockParticular)} disabled={lockParticular} className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all disabled:opacity-20"><Plus size={14} /></button>
              </div>
            </div>

            {/* Admin Particulares */}
            <div className={rowStyle}>
              <div className="flex items-center gap-3">
                <Users size={18} className="text-purple-500" />
                <span className="text-xs font-bold dark:text-gray-300">Administrativos</span>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => adjustNumber('adminParticulares', -1, lockParticular)} disabled={lockParticular} className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all disabled:opacity-20"><Minus size={14} /></button>
                <span className="text-2xl font-black dark:text-white min-w-[30px] text-center">{formData.adminParticulares}</span>
                <button onClick={() => adjustNumber('adminParticulares', 1, lockParticular)} disabled={lockParticular} className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all disabled:opacity-20"><Plus size={14} /></button>
              </div>
            </div>

            {/* Servicio */}
            <div className={rowStyle}>
              <div className="flex items-center gap-3">
                <Wrench size={18} className="text-purple-500" />
                <span className="text-xs font-bold dark:text-gray-300">Servicio / Mant.</span>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => adjustNumber('servicio', -1, lockParticular)} disabled={lockParticular} className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all disabled:opacity-20"><Minus size={14} /></button>
                <span className="text-2xl font-black dark:text-white min-w-[30px] text-center">{formData.servicio}</span>
                <button onClick={() => adjustNumber('servicio', 1, lockParticular)} disabled={lockParticular} className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all disabled:opacity-20"><Plus size={14} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* TARJETA 2: PERSONAL FISCAL + TOTAL */}
        <div className="space-y-8 flex flex-col">
          <div className={`${cardStyle} flex-1`}>
            <button 
              onClick={() => setLockFiscal(!lockFiscal)} 
              className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              {lockFiscal ? <Lock size={18} className="text-gray-400" /> : <Unlock size={18} className="text-indigo-500 animate-pulse" />}
            </button>

            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400"><Building size={24}/></div>
              <h3 className="font-black text-gray-800 dark:text-white tracking-tight uppercase italic text-lg">Personal Fiscal</h3>
            </div>

            <div className="space-y-4">
              {/* Docentes Fiscales */}
              <div className={rowStyle}>
                <div className="flex items-center gap-3">
                  <Briefcase size={18} className="text-indigo-500" />
                  <span className="text-xs font-bold dark:text-gray-300">Docentes</span>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => adjustNumber('docentesFiscales', -1, lockFiscal)} disabled={lockFiscal} className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-20"><Minus size={14} /></button>
                  <span className="text-2xl font-black dark:text-white min-w-[30px] text-center">{formData.docentesFiscales}</span>
                  <button onClick={() => adjustNumber('docentesFiscales', 1, lockFiscal)} disabled={lockFiscal} className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-20"><Plus size={14} /></button>
                </div>
              </div>

              {/* Admin Fiscales */}
              <div className={rowStyle}>
                <div className="flex items-center gap-3">
                  <Users size={18} className="text-indigo-500" />
                  <span className="text-xs font-bold dark:text-gray-300">Administrativos</span>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => adjustNumber('adminFiscales', -1, lockFiscal)} disabled={lockFiscal} className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-20"><Minus size={14} /></button>
                  <span className="text-2xl font-black dark:text-white min-w-[30px] text-center">{formData.adminFiscales}</span>
                  <button onClick={() => adjustNumber('adminFiscales', 1, lockFiscal)} disabled={lockFiscal} className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-20"><Plus size={14} /></button>
                </div>
              </div>
            </div>
          </div>

          {/* TOTAL SUMMARY CARD */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-[2.5rem] shadow-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Calculator size={80} />
            </div>
            <div className="relative z-10">
              <p className="text-purple-100 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Total Planta Institucional</p>
              <div className="flex items-center justify-center gap-4 text-white">
                <span className="text-5xl font-black tracking-tighter">{totalPersonal}</span>
                <p className="text-xs font-bold text-purple-200 text-left leading-tight">PERSONAS<br/>REGISTRADAS</p>
              </div>
            </div>
          </div>
        </div>
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
              className="px-12 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-2xl shadow-indigo-500/40 transform transition-all active:scale-95 flex items-center gap-3"
            >
              <Save size={20} /> GUARDAR NÓMINA DE PERSONAL
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
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Información de personal actualizada.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

export default Personal;