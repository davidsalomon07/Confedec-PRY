import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Smartphone, 
  Globe, 
  Mail, 
  FileText, 
  ShieldCheck, 
  Facebook, 
  Instagram, 
  Twitter, 
  Lock, 
  Unlock 
} from 'lucide-react';

function Informacion() {
  // 1. Scroll al inicio al cargar
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // 2. ESTADOS DE DATOS
  const [direccion, setDireccion] = useState("Av. Amazonas N34-45 y Pereira, Edificio Torre Norte");
  const [email, setEmail] = useState("secretaria@unidadeducativa.edu.ec");
  const [telefonoFijo, setTelefonoFijo] = useState("(02) 245-6789");
  const [celular, setCelular] = useState("099-123-4567");
  const [web, setWeb] = useState("www.unidadeducativa.edu.ec");
  const [ruc, setRuc] = useState("1790012345001");
  const [resolucion, setResolucion] = useState("MINEDUC-2020-005-A");
  const [facebook, setFacebook] = useState("facebook.com/unidadeducativa");
  const [instagram, setInstagram] = useState("@unidad_educativa_oficial");
  const [twitter, setTwitter] = useState("@UE_Oficial");

  // 3. ESTADOS DE BLOQUEO INDIVIDUAL (Candados)
  const [lockSede, setLockSede] = useState(true);
  const [lockLegal, setLockLegal] = useState(true);
  const [lockDigital, setLockDigital] = useState(true);

  const handleUpdate = () => {
    alert("¡Información institucional actualizada correctamente!");
    setLockSede(true); setLockLegal(true); setLockDigital(true);
  };

  // Helper de estilos para inputs bloqueados vs editables
  const inputClass = (locked) => `
    w-full px-4 py-3 rounded-xl border transition-all duration-300 flex items-center justify-between
    ${locked 
      ? 'bg-gray-100 dark:bg-[#0f172a] border-gray-200 dark:border-gray-800 text-gray-500' 
      : 'bg-white dark:bg-gray-800 border-indigo-500 dark:border-indigo-400 text-gray-900 dark:text-white shadow-lg shadow-indigo-500/10'}
  `;

  const labelStyle = "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-1 mb-2 flex items-center gap-2";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto pb-20 px-4"
    >
      {/* --- BANNER PRINCIPAL --- */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-800 to-slate-900 shadow-2xl mb-12 p-10 text-center">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative z-10">
          <img src="/confedec.png" alt="Logo" className="w-20 h-20 mx-auto mb-6 drop-shadow-2xl" />
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">Información Institucional</h1>
          <p className="text-slate-400 font-medium tracking-widest text-xs mt-2 uppercase italic">Datos de Contacto, Legalidad y Presencia Digital</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* TARJETA 1: SEDE & CONTACTO */}
        <div className="bg-white dark:bg-[#1e293b] p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 relative group">
          <button 
            onClick={() => setLockSede(!lockSede)} 
            className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:scale-90"
          >
            {lockSede ? <Lock size={18} className="text-gray-400" /> : <Unlock size={18} className="text-indigo-500 animate-pulse" />}
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400"><MapPin size={24}/></div>
            <h3 className="font-black text-gray-800 dark:text-white tracking-tight uppercase italic text-lg">Sede y Contacto</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className={labelStyle}>Dirección Matriz</label>
              <div className={inputClass(lockSede)}>
                <textarea 
                  className="bg-transparent outline-none w-full text-sm py-1 disabled:cursor-default" 
                  value={direccion} onChange={(e) => setDireccion(e.target.value)} disabled={lockSede} rows="2" style={{ resize: 'none' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelStyle}><Phone size={12}/> Teléfono Fijo</label>
                <div className={inputClass(lockSede)}>
                  <input type="text" className="bg-transparent outline-none w-full text-sm" value={telefonoFijo} onChange={(e) => setTelefonoFijo(e.target.value)} disabled={lockSede} />
                </div>
              </div>
              <div>
                <label className={labelStyle}><Smartphone size={12}/> Celular</label>
                <div className={inputClass(lockSede)}>
                  <input type="text" className="bg-transparent outline-none w-full text-sm" value={celular} onChange={(e) => setCelular(e.target.value)} disabled={lockSede} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TARJETA 2: LEGALIDAD */}
        <div className="bg-white dark:bg-[#1e293b] p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 relative group">
          <button 
            onClick={() => setLockLegal(!lockLegal)} 
            className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:scale-90"
          >
            {lockLegal ? <Lock size={18} className="text-gray-400" /> : <Unlock size={18} className="text-indigo-500 animate-pulse" />}
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400"><ShieldCheck size={24}/></div>
            <h3 className="font-black text-gray-800 dark:text-white tracking-tight uppercase italic text-lg">Legalidad</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className={labelStyle}>Registro Único de Contribuyentes (RUC)</label>
              <div className={inputClass(lockLegal)}>
                <input type="text" className="bg-transparent outline-none w-full font-mono font-bold tracking-widest" value={ruc} onChange={(e) => setRuc(e.target.value)} disabled={lockLegal} />
              </div>
            </div>
            <div>
              <label className={labelStyle}><FileText size={12}/> Resolución Ministerial</label>
              <div className={inputClass(lockLegal)}>
                <input type="text" className="bg-transparent outline-none w-full text-sm" value={resolucion} onChange={(e) => setResolucion(e.target.value)} disabled={lockLegal} />
              </div>
            </div>
          </div>
        </div>

        {/* TARJETA 3: PRESENCIA DIGITAL */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 relative group">
          <button 
            onClick={() => setLockDigital(!lockDigital)} 
            className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:scale-90"
          >
            {lockDigital ? <Lock size={18} className="text-gray-400" /> : <Unlock size={18} className="text-indigo-500 animate-pulse" />}
          </button>

          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400"><Globe size={24}/></div>
            <h3 className="font-black text-gray-800 dark:text-white tracking-tight uppercase italic text-lg">Presencia Digital</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <label className={labelStyle}>Sitio Web Oficial</label>
                <div className={inputClass(lockDigital)}>
                  <input type="url" className="bg-transparent outline-none w-full text-indigo-500 font-bold" value={web} onChange={(e) => setWeb(e.target.value)} disabled={lockDigital} />
                </div>
              </div>
              <div>
                <label className={labelStyle}><Mail size={12}/> Correo Institucional</label>
                <div className={inputClass(lockDigital)}>
                  <input type="email" className="bg-transparent outline-none w-full text-sm" value={email} onChange={(e) => setEmail(e.target.value)} disabled={lockDigital} />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-[#0f172a] p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
              <label className="text-[9px] font-black text-indigo-500 mb-4 block tracking-[0.3em]">SOCIAL MEDIA</label>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Facebook size={18} className="text-blue-600" />
                  <input type="text" className="bg-transparent border-b border-gray-200 dark:border-gray-700 outline-none w-full py-1 text-sm dark:text-gray-300" value={facebook} onChange={(e) => setFacebook(e.target.value)} disabled={lockDigital} />
                </div>
                <div className="flex items-center gap-4">
                  <Instagram size={18} className="text-pink-500" />
                  <input type="text" className="bg-transparent border-b border-gray-200 dark:border-gray-700 outline-none w-full py-1 text-sm dark:text-gray-300" value={instagram} onChange={(e) => setInstagram(e.target.value)} disabled={lockDigital} />
                </div>
                <div className="flex items-center gap-4">
                  <Twitter size={18} className="text-sky-400" />
                  <input type="text" className="bg-transparent border-b border-gray-200 dark:border-gray-700 outline-none w-full py-1 text-sm dark:text-gray-300" value={twitter} onChange={(e) => setTwitter(e.target.value)} disabled={lockDigital} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTÓN GUARDAR FLOTANTE */}
      <AnimatePresence>
        {(!lockSede || !lockLegal || !lockDigital) && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 50 }}
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
    </motion.div>
  );
}

export default Informacion;