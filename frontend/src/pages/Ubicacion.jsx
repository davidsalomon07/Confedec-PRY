import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Map as MapIcon, 
  MapPin, 
  Clock, 
  Lock, 
  Unlock, 
  Globe,
  Navigation,
  CheckCircle2
} from 'lucide-react';

// DATOS DE ECUADOR (Mantenidos intactos para tu funcionalidad)
const ecuadorData = {
  "Azuay": ["Cuenca", "Girón", "Gualaceo", "Nabón", "Paute", "Pucará", "San Fernando", "Santa Isabel", "Sigsig", "Oña", "Chordeleg", "El Pan", "Sevilla de Oro", "Guachapala", "Camilo Ponce Enríquez"],
  "Bolívar": ["Guaranda", "Chillanes", "Chimbo", "Echeandía", "San Miguel", "Caluma", "Las Naves"],
  "Cañar": ["Azogues", "Biblián", "Cañar", "La Troncal", "El Tambo", "Deleg", "Suscal"],
  "Carchi": ["Tulcán", "Bolívar", "Espejo", "Mira", "Montúfar", "San Pedro de Huaca"],
  "Cotopaxi": ["Latacunga", "La Maná", "Pangua", "Pujilí", "Salcedo", "Saquisilí", "Sigchos"],
  "Chimborazo": ["Riobamba", "Alausí", "Colta", "Chambo", "Chunchi", "Guamote", "Guano", "Pallatanga", "Penipe", "Cumandá"],
  "El Oro": ["Machala", "Arenillas", "Atahualpa", "Balsas", "Chilla", "El Guabo", "Huaquillas", "Marcabelí", "Pasaje", "Piñas", "Santa Rosa", "Zaruma", "Las Lajas"],
  "Esmeraldas": ["Esmeraldas", "Eloy Alfaro", "Muisne", "Quinindé", "San Lorenzo", "Atacames", "Río Verde", "La Concordia"],
  "Guayas": ["Guayaquil", "Alfredo Baquerizo Moreno", "Balao", "Balzar", "Colimes", "Daule", "Durán", "El Empalme", "El Triunfo", "Milagro", "Naranjal", "Naranjito", "Palestina", "Pedro Carbo", "Samborondón", "Santa Lucía", "Salitre", "San Jacinto de Yaguachi", "Playas", "Simón Bolívar", "Marcelino Maridueña", "Lomas de Sargentillo", "Nobol", "General Antonio Elizalde", "Isidro Ayora"],
  "Imbabura": ["Ibarra", "Antonio Ante", "Cotacachi", "Otavalo", "Pimampiro", "San Miguel de Urcuquí"],
  "Loja": ["Loja", "Calvas", "Catamayo", "Celica", "Chaguarpamba", "Espíndola", "Gonzanamá", "Macará", "Paltas", "Puyango", "Saraguro", "Sozoranga", "Zapotillo", "Pindal", "Quilanga", "Olmedo"],
  "Los Ríos": ["Babahoyo", "Baba", "Montalvo", "Puebloviejo", "Quevedo", "Urdaneta", "Ventanas", "Vinces", "Palenque", "Buena Fé", "Valencia", "Mocache", "Quinsaloma"],
  "Manabí": ["Portoviejo", "Bolívar", "Chone", "El Carmen", "Flavio Alfaro", "Jipijapa", "Junín", "Manta", "Montecristi", "Paján", "Pichincha", "Rocafuerte", "Santa Ana", "Sucre", "24 de Mayo", "Pedernales", "Olmedo", "Puerto López", "Jama", "Jaramijó", "San Vicente"],
  "Morona Santiago": ["Morona", "Gualaquiza", "Limón Indanza", "Palora", "Santiago", "Sucúa", "Huamboya", "San Juan Bosco", "Taisha", "Logroño", "Pablo Sexto", "Tiwintza"],
  "Napo": ["Tena", "Archidona", "El Chaco", "Quijos", "Carlos Julio Arosemena Tola"],
  "Pastaza": ["Pastaza", "Mera", "Santa Clara", "Arajuno"],
  "Pichincha": ["Quito", "Cayambe", "Mejía", "Pedro Moncayo", "Rumiñahui", "San Miguel de los Bancos", "Pedro Vicente Maldonado", "Puerto Quito"],
  "Tungurahua": ["Ambato", "Baños de Agua Santa", "Cevallos", "Mocha", "Patate", "Quero", "Pelileo", "Píllaro", "Tisaleo"],
  "Zamora Chinchipe": ["Zamora", "Chinchipe", "Nangaritza", "Yacuambi", "Yantzaza", "El Pangui", "Centinela del Cóndor", "Palanda", "Paquisha"],
  "Galápagos": ["San Cristóbal", "Isabela", "Santa Cruz"],
  "Sucumbíos": ["Lago Agrio", "Gonzalo Pizarro", "Putumayo", "Shushufindi", "Sucumbíos", "Cascales", "Cuyabeno"],
  "Orellana": ["Orellana", "Aguarico", "La Joya de los Sachas", "Loreto"],
  "Santo Domingo de los Tsáchilas": ["Santo Domingo"],
  "Santa Elena": ["Santa Elena", "La Libertad", "Salinas"]
};

// --- LÓGICA RELACIONAL ---
const zonasData = {
  "1": ["Esmeraldas", "Imbabura", "Carchi", "Sucumbíos"],
  "2": ["Pichincha", "Napo", "Orellana"], // Excluye Quito
  "3": ["Cotopaxi", "Tungurahua", "Chimborazo", "Pastaza"],
  "4": ["Manabí", "Santo Domingo de los Tsáchilas"],
  "5": ["Santa Elena", "Guayas", "Los Ríos", "Bolívar", "Galápagos"], // Excluye GYE, Samborondón, Durán
  "6": ["Azuay", "Cañar", "Morona Santiago"],
  "7": ["Loja", "El Oro", "Zamora Chinchipe"],
  "8": ["Guayas"], // SOLO Guayaquil, Samborondón, Durán
  "9": ["Pichincha"] // SOLO Quito
};

const cantonesZona8 = ["Guayaquil", "Samborondón", "Durán"];
const cantonesZona9 = ["Quito"];

const provinciasCosta = [
  "Esmeraldas", "Manabí", "Santa Elena", "Guayas", 
  "Los Ríos", "El Oro", "Galápagos", "Santo Domingo de los Tsáchilas"
];

function Ubicacion() {
  // 1. Scroll al inicio
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Form States
  const [zona, setZona] = useState("");
  const [regimen, setRegimen] = useState("");
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [distrito, setDistrito] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [gmaps, setGmaps] = useState("");

  // Listas Dinámicas
  const [provinciasDisponibles, setProvinciasDisponibles] = useState(Object.keys(ecuadorData));
  const [cantonesDisponibles, setCantonesDisponibles] = useState([]);

  // ESTADOS DE BLOQUEO INDIVIDUAL
  const [lockZona, setLockZona] = useState(true);
  const [lockPolitica, setLockPolitica] = useState(true);
  const [lockExacta, setLockExacta] = useState(true);
  const [lockJornada, setLockJornada] = useState(true);
  const [showToast, setShowToast] = useState(false);

  // LÓGICA 1: Cuando el usuario cambia la ZONA
  useEffect(() => {
    if (!zona) {
      setProvinciasDisponibles(Object.keys(ecuadorData));
      setProvincia("");
      setCanton("");
      setCantonesDisponibles([]);
      setRegimen("");
      return;
    }

    const provsZona = zonasData[zona] || [];
    setProvinciasDisponibles(provsZona);

    // Automatizaciones estrictas para Zonas Especiales
    if (zona === "8") {
      setProvincia("Guayas");
      setCantonesDisponibles(cantonesZona8);
      setCanton("");
      setRegimen("costa");
    } else if (zona === "9") {
      setProvincia("Pichincha");
      setCantonesDisponibles(cantonesZona9);
      setCanton("Quito");
      setRegimen("sierra");
    } else {
      // Al cambiar a cualquier zona del 1 al 7, limpiamos todo obligatoriamente
      setProvincia("");
      setCanton("");
      setCantonesDisponibles([]);
      setRegimen("");
    }
  }, [zona]);

  // LÓGICA 2: Cuando el usuario cambia la PROVINCIA
  useEffect(() => {
    if (!provincia) {
      setCantonesDisponibles([]);
      if (zona !== "8" && zona !== "9") setRegimen("");
      return;
    }

    // 1. Asignar Régimen Automáticamente
    setRegimen(provinciasCosta.includes(provincia) ? "costa" : "sierra");

    // 2. Filtrar Cantones (Las excepciones de Guayas y Pichincha)
    let cantones = ecuadorData[provincia] || [];
    
    if (zona === "5" && provincia === "Guayas") {
      cantones = cantones.filter(c => !cantonesZona8.includes(c)); // Quita GYE, Samborondón, Durán
    } else if (zona === "2" && provincia === "Pichincha") {
      cantones = cantones.filter(c => !cantonesZona9.includes(c)); // Quita Quito
    } else if (zona === "8") {
      cantones = cantonesZona8;
    } else if (zona === "9") {
      cantones = cantonesZona9;
    }

    setCantonesDisponibles(cantones);
    
    // Si el cantón seleccionado ya no es válido, lo limpiamos
    if (zona !== "9" && !cantones.includes(canton)) {
      setCanton("");
    }
  }, [provincia, zona]);

  const handleUpdate = () => {
    // Mostramos la notificación y la ocultamos tras 3 segundos
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    
    // Bloqueamos los candados nuevamente
    setLockZona(true); setLockPolitica(true); setLockExacta(true); setLockJornada(true);
  };

  const handleProvinciaChange = (e) => {
    setProvincia(e.target.value);
    setCanton(""); 
  };

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
      <div className="relative overflow-hidden rounded-3xl bg-indigo-700 shadow-2xl mb-12 p-10 text-center">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
            <img src="/confedec.png" alt="Logo" className="w-24 h-24 mx-auto mb-4 drop-shadow-xl" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">Ubicación Geográfica</h1>
          <p className="text-indigo-100 font-medium tracking-widest text-xs mt-2 uppercase">Gestión de Localización y Zonificación</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* TARJETA 1: ZONIFICACIÓN */}
        <div className="bg-white dark:bg-[#1e293b] p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 relative">
          <button onClick={() => setLockZona(!lockZona)} className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            {lockZona ? <Lock size={18} className="text-gray-400" /> : <Unlock size={18} className="text-indigo-500 animate-pulse" />}
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400"><Compass size={24}/></div>
            <h3 className="font-black text-gray-800 dark:text-white tracking-tight uppercase italic text-lg">Zonificación</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className={labelStyle}>Zona Administrativa</label>
              <div className={inputClass(lockZona)}>
                <select className="bg-transparent outline-none w-full text-sm disabled:cursor-default dark:text-white" disabled={lockZona} value={zona} onChange={(e) => setZona(e.target.value)}>
                  <option value="" className="dark:bg-[#1e293b] text-gray-900 dark:text-white">- Seleccionar Zona -</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                    <option key={n} value={n} className="dark:bg-[#1e293b] text-gray-900 dark:text-white">Zona {n}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className={labelStyle}>Régimen Escolar</label>
              {/* Le pasamos "true" directo para que el candado visual y funcional sea permanente */}
              <div className={inputClass(true)}>
                <select className="bg-transparent outline-none w-full text-sm dark:text-white" disabled={true} value={regimen} onChange={() => {}}>
                  <option value="" className="dark:bg-[#1e293b] text-gray-900 dark:text-white">- Se asignará por Provincia -</option>
                  <option value="sierra" className="dark:bg-[#1e293b] text-gray-900 dark:text-white">Sierra / Amazonía</option>
                  <option value="costa" className="dark:bg-[#1e293b] text-gray-900 dark:text-white">Costa / Galápagos</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* TARJETA 2: DIVISIÓN POLÍTICA */}
        <div className="bg-white dark:bg-[#1e293b] p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 relative">
          <button onClick={() => setLockPolitica(!lockPolitica)} className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            {lockPolitica ? <Lock size={18} className="text-gray-400" /> : <Unlock size={18} className="text-indigo-500 animate-pulse" />}
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400"><MapIcon size={24}/></div>
            <h3 className="font-black text-gray-800 dark:text-white tracking-tight uppercase italic text-lg">División Política</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className={labelStyle}>Provincia</label>
              {/* Se bloquea automáticamente si es Zona 8 o 9 */}
              <div className={inputClass(lockPolitica || zona === "8" || zona === "9")}>
                <select className="bg-transparent outline-none w-full text-sm dark:text-white" disabled={lockPolitica || zona === "8" || zona === "9"} value={provincia} onChange={(e) => setProvincia(e.target.value)}>
                  <option value="" className="dark:bg-[#1e293b] text-gray-900 dark:text-white">- Seleccionar Provincia -</option>
                  {provinciasDisponibles.map(p => (
                    <option key={p} value={p} className="dark:bg-[#1e293b] text-gray-900 dark:text-white">{p}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className={labelStyle}>Cantón</label>
              {/* Se bloquea automáticamente si es Zona 9 (Solo existe Quito) */}
              <div className={inputClass(lockPolitica || !provincia || zona === "9")}>
                <select className="bg-transparent outline-none w-full text-sm dark:text-white" disabled={lockPolitica || !provincia || zona === "9"} value={canton} onChange={(e) => setCanton(e.target.value)}>
                  <option value="" className="dark:bg-[#1e293b] text-gray-900 dark:text-white">- Seleccionar Cantón -</option>
                  {cantonesDisponibles.map(c => (
                    <option key={c} value={c} className="dark:bg-[#1e293b] text-gray-900 dark:text-white">{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* TARJETA 3: UBICACIÓN EXACTA */}
        <div className="bg-white dark:bg-[#1e293b] p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 relative">
          <button onClick={() => setLockExacta(!lockExacta)} className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            {lockExacta ? <Lock size={18} className="text-gray-400" /> : <Unlock size={18} className="text-indigo-500 animate-pulse" />}
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400"><MapPin size={24}/></div>
            <h3 className="font-black text-gray-800 dark:text-white tracking-tight uppercase italic text-lg">Ubicación Exacta</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className={labelStyle}>Distrito Educativo</label>
              <div className={inputClass(lockExacta)}>
                <input type="text" className="bg-transparent outline-none w-full text-sm" value={distrito} onChange={(e) => setDistrito(e.target.value)} disabled={lockExacta} />
              </div>
            </div>
            <div>
              <label className={labelStyle}>Ciudad / Parroquia</label>
              <div className={inputClass(lockExacta)}>
                <input type="text" className="bg-transparent outline-none w-full text-sm" value={ciudad} onChange={(e) => setCiudad(e.target.value)} disabled={lockExacta} />
              </div>
            </div>
            <div>
              <label className={labelStyle}>Enlace Google Maps</label>
              <div className={inputClass(lockExacta)}>
                <div className="flex items-center gap-2 w-full overflow-hidden">
                  <Navigation size={14} className="text-indigo-500 shrink-0" />
                  <input type="text" className="bg-transparent outline-none w-full text-[10px] text-indigo-500 font-bold truncate" value={gmaps} onChange={(e) => setGmaps(e.target.value)} disabled={lockExacta} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TARJETA 4: JORNADAS */}
        <div className="bg-white dark:bg-[#1e293b] p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 relative">
          <button onClick={() => setLockJornada(!lockJornada)} className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            {lockJornada ? <Lock size={18} className="text-gray-400" /> : <Unlock size={18} className="text-indigo-500 animate-pulse" />}
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400"><Clock size={24}/></div>
            <h3 className="font-black text-gray-800 dark:text-white tracking-tight uppercase italic text-lg">Jornadas</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {['Matutina', 'Vespertina', 'Nocturna'].map((jornada) => (
              <label key={jornada} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${lockJornada ? 'bg-gray-50 dark:bg-[#0f172a] border-gray-100 dark:border-gray-800 opacity-60' : 'hover:border-indigo-500 cursor-pointer bg-white dark:bg-gray-800 shadow-sm'}`}>
                <input type="checkbox" disabled={lockJornada} defaultChecked={jornada === 'Matutina'} className="w-5 h-5 accent-indigo-600" />
                <span className="text-sm font-bold dark:text-gray-300">{jornada}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* BOTÓN GUARDAR DINÁMICO */}
      <AnimatePresence>
        {(!lockZona || !lockPolitica || !lockExacta || !lockJornada) && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-0 right-0 z-50 flex justify-center px-4"
          >
            <button 
              onClick={handleUpdate}
              className="px-12 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-2xl shadow-indigo-500/40 transform transition-all active:scale-95 flex items-center gap-3"
            >
              <Navigation size={20} className="rotate-45" /> ACTUALIZAR UBICACIÓN
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
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Ubicación institucional actualizada.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Ubicacion;