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
  Navigation
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

function Ubicacion() {
  // 1. Scroll al inicio
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Form States
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [zona, setZona] = useState("");
  const [distrito, setDistrito] = useState("17D05");
  const [ciudad, setCiudad] = useState("Quito");
  const [gmaps, setGmaps] = useState("https://goo.gl/maps/example");

  // ESTADOS DE BLOQUEO INDIVIDUAL
  const [lockZona, setLockZona] = useState(true);
  const [lockPolitica, setLockPolitica] = useState(true);
  const [lockExacta, setLockExacta] = useState(true);
  const [lockJornada, setLockJornada] = useState(true);

  const handleUpdate = () => {
    alert("¡Ubicación institucional actualizada!");
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
                <select className="bg-transparent outline-none w-full text-sm disabled:cursor-default" disabled={lockZona} value={zona} onChange={(e) => setZona(e.target.value)}>
                  <option value="">- Seleccionar Zona -</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                    <option key={n} value={n}>Zona {n}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className={labelStyle}>Régimen Escolar</label>
              <div className={inputClass(lockZona)}>
                <select className="bg-transparent outline-none w-full text-sm" disabled={lockZona}>
                  <option value="sierra">Sierra / Amazonía</option>
                  <option value="costa">Costa / Galápagos</option>
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
              <div className={inputClass(lockPolitica)}>
                <select className="bg-transparent outline-none w-full text-sm" disabled={lockPolitica} value={provincia} onChange={handleProvinciaChange}>
                  <option value="">- Seleccionar Provincia -</option>
                  {Object.keys(ecuadorData).map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className={labelStyle}>Cantón</label>
              <div className={inputClass(lockPolitica)}>
                <select className="bg-transparent outline-none w-full text-sm" disabled={lockPolitica || !provincia} value={canton} onChange={(e) => setCanton(e.target.value)}>
                  <option value="">- Seleccionar Cantón -</option>
                  {provincia && ecuadorData[provincia].map(c => (
                    <option key={c} value={c}>{c}</option>
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
    </motion.div>
  );
}

export default Ubicacion;