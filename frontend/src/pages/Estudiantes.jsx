import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Users, 
  Plus, 
  Minus, 
  Lock, 
  Unlock, 
  GraduationCap,
  Calculator
} from 'lucide-react';

function Estudiantes() {
  // 1. Scroll al inicio
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 2. ESTADOS DE DATOS (Mantenidos)
  const [nivel, setNivel] = useState('');
  const [curso, setCurso] = useState('');
  const [hombres, setHombres] = useState(0);
  const [mujeres, setMujeres] = useState(0);

  // 3. ESTADOS DE BLOQUEO INDIVIDUAL (Candados)
  const [lockSeleccion, setLockSeleccion] = useState(true);
  const [lockConteo, setLockConteo] = useState(true);

  // 🎯 CURSOS SEGÚN NIVEL (Tu lógica intacta)
  const cursosPorNivel = {
    'Inicial': ['Inicial 3 años', 'Inicial 4 años'],
    'Preparatoria': ['1° EGB'],
    'Básica Elemental': ['2° EGB', '3° EGB', '4° EGB'],
    'Básica Media': ['5° EGB', '6° EGB', '7° EGB'],
    'Básica Superior': ['8° EGB', '9° EGB', '10° EGB']
  };

  // 🧼 MANEJO DE CAMBIOS (Preservando funcionalidad)
  const handleNivelChange = (e) => {
    setNivel(e.target.value);
    setCurso('');
    setHombres(0);
    setMujeres(0);
  };

  const adjustNumber = (setter, value, delta) => {
    const newVal = (Number(value) || 0) + delta;
    setter(newVal < 0 ? 0 : newVal);
  };

  const handleGuardar = () => {
    alert('¡Registro de estudiantes actualizado correctamente!');
    setLockSeleccion(true);
    setLockConteo(true);
  };

  // --- ESTILOS MEJORADOS PARA VISIBILIDAD ---
  const inputClass = (locked) => `
    w-full px-4 py-3 rounded-xl border transition-all duration-300 flex items-center justify-between
    ${locked 
      ? 'bg-gray-100 dark:bg-[#0f172a] border-gray-200 dark:border-gray-800 text-gray-500' 
      : 'bg-white dark:bg-gray-800 border-purple-500 dark:border-purple-400 text-gray-900 dark:text-white shadow-lg shadow-purple-500/10'}
  `;

  const labelStyle = "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-1 mb-2 flex items-center gap-2";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto pb-20 px-4"
    >
      {/* --- BANNER PRINCIPAL --- */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#240b36] to-[#c31432] shadow-2xl mb-12 p-10 text-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-white">
          <img src="/confedec.png" alt="Logo" className="w-24 h-24 mx-auto mb-4 drop-shadow-xl" />
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic">Control de Estudiantes</h1>
          <p className="text-purple-100 font-medium tracking-widest text-[10px] mt-2 uppercase">Registro estadístico centralizado</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* TARJETA 1: SELECCIÓN ACADÉMICA */}
        <div className="bg-white dark:bg-[#1e293b] p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 relative">
          <button 
            onClick={() => setLockSeleccion(!lockSeleccion)} 
            className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:scale-90"
          >
            {lockSeleccion ? <Lock size={18} className="text-gray-400" /> : <Unlock size={18} className="text-purple-500 animate-pulse" />}
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-2xl text-purple-600 dark:text-purple-400"><Layers size={24}/></div>
            <h3 className="font-black text-gray-800 dark:text-white tracking-tight uppercase italic text-lg">Selección</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className={labelStyle}>Nivel Educativo</label>
              <div className={inputClass(lockSeleccion)}>
                <select 
                  className="bg-transparent outline-none w-full text-sm disabled:cursor-default dark:text-white" 
                  value={nivel} 
                  onChange={handleNivelChange} 
                  disabled={lockSeleccion}
                >
                  <option value="" className="dark:bg-[#1e293b]">- Seleccione nivel -</option>
                  {Object.keys(cursosPorNivel).map(n => (
                    <option key={n} value={n} className="dark:bg-[#1e293b] text-black dark:text-white">{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <AnimatePresence>
              {nivel && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <label className={labelStyle}>Curso / Grado</label>
                  <div className={inputClass(lockSeleccion)}>
                    <select 
                      className="bg-transparent outline-none w-full text-sm dark:text-white" 
                      value={curso} 
                      onChange={(e) => setCurso(e.target.value)} 
                      disabled={lockSeleccion}
                    >
                      <option value="" className="dark:bg-[#1e293b]">- Seleccione curso -</option>
                      {cursosPorNivel[nivel].map(c => (
                        <option key={c} value={c} className="dark:bg-[#1e293b] text-black dark:text-white">{c}</option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* TARJETA 2: CONTEO (Se activa al elegir curso) */}
        <AnimatePresence>
          {curso && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-[#1e293b] p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 relative"
            >
              <button 
                onClick={() => setLockConteo(!lockConteo)} 
                className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:scale-90"
              >
                {lockConteo ? <Lock size={18} className="text-gray-400" /> : <Unlock size={18} className="text-purple-500 animate-pulse" />}
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-2xl text-purple-600 dark:text-purple-400"><Users size={24}/></div>
                <h3 className="font-black text-gray-800 dark:text-white tracking-tight uppercase italic text-lg">Población</h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* HOMBRES */}
                <div className="p-4 bg-gray-50 dark:bg-[#0f172a] rounded-3xl border border-gray-100 dark:border-gray-800 text-center">
                  <label className={labelStyle}>Hombres</label>
                  <div className="flex items-center justify-center gap-6 mt-2">
                    <button onClick={() => adjustNumber(setHombres, hombres, -1)} disabled={lockConteo} className="p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-purple-600 hover:text-white disabled:opacity-20 transition-all"><Minus size={18} /></button>
                    <span className="text-4xl font-black dark:text-white w-16">{hombres}</span>
                    <button onClick={() => adjustNumber(setHombres, hombres, 1)} disabled={lockConteo} className="p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-purple-600 hover:text-white disabled:opacity-20 transition-all"><Plus size={18} /></button>
                  </div>
                </div>

                {/* MUJERES */}
                <div className="p-4 bg-gray-50 dark:bg-[#0f172a] rounded-3xl border border-gray-100 dark:border-gray-800 text-center">
                  <label className={labelStyle}>Mujeres</label>
                  <div className="flex items-center justify-center gap-6 mt-2">
                    <button onClick={() => adjustNumber(setMujeres, mujeres, -1)} disabled={lockConteo} className="p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-purple-600 hover:text-white disabled:opacity-20 transition-all"><Minus size={18} /></button>
                    <span className="text-4xl font-black dark:text-white w-16">{mujeres}</span>
                    <button onClick={() => adjustNumber(setMujeres, mujeres, 1)} disabled={lockConteo} className="p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-purple-600 hover:text-white disabled:opacity-20 transition-all"><Plus size={18} /></button>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="mt-2 p-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl text-center shadow-lg">
                  <p className="text-purple-100 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Total Matriculados</p>
                  <div className="flex items-center justify-center gap-3 text-white">
                    <Calculator size={20} className="opacity-50" />
                    <span className="text-4xl font-black tracking-tighter">{(Number(hombres) || 0) + (Number(mujeres) || 0)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BOTÓN GUARDAR */}
      <AnimatePresence>
        {(!lockSeleccion || !lockConteo) && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-0 right-0 z-50 flex justify-center px-4"
          >
            <button 
              onClick={handleGuardar}
              className="px-12 py-4 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl shadow-2xl transform transition-all active:scale-95 flex items-center gap-3"
            >
              <GraduationCap size={20} /> ACTUALIZAR REGISTRO ACADÉMICO
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

export default Estudiantes;