// src/pages/Consultas.jsx
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BarChart2, Table as TableIcon, FileSpreadsheet, FileText, Users, BookOpen, Percent, X } from 'lucide-react';

// --- MAGIA: DICCIONARIO DE PROVINCIAS ---
const CODIGOS_PROVINCIA = {
  '01': 'AZUAY', '02': 'BOLIVAR', '03': 'CAÑAR', '04': 'CARCHI',
  '05': 'COTOPAXI', '06': 'CHIMBORAZO', '07': 'EL ORO', '08': 'ESMERALDAS',
  '09': 'GUAYAS', '10': 'IMBABURA', '11': 'LOJA', '12': 'LOS RIOS',
  '13': 'MANABI', '14': 'MORONA SANTIAGO', '15': 'NAPO', '16': 'PASTAZA',
  '17': 'PICHINCHA', '18': 'TUNGURAHUA', '19': 'ZAMORA CHINCHIPE',
  '20': 'GALAPAGOS', '21': 'SUCUMBIOS', '22': 'ORELLANA',
  '23': 'SANTO DOMINGO', '24': 'SANTA ELENA', '90': 'ZONA NO DELIMITADA'
};

const obtenerProvincia = (amie) => {
  if (!amie || amie.length < 2) return 'DESCONOCIDO';
  const codigo = amie.substring(0, 2);
  return CODIGOS_PROVINCIA[codigo] || 'OTRO';
};

function Consultas() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('charts'); 
  
  // Filtros para colegios normales
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterGender, setFilterGender] = useState('all');

  // --- ESTADOS DE ROL ---
  const [userRole, setUserRole] = useState(null); 
  const [userScope, setUserScope] = useState(null); 
  const [isAdminView, setIsAdminView] = useState(false); 

  // --- ESTADO PARA SELECCIÓN MÚLTIPLE ---
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0); // Añadido para consistencia con Directivo
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (storedUser) {
        const role = storedUser.rol || 'institucion'; 
        const scope = storedUser.scope || 'TODOS';

        setUserRole(role);
        setUserScope(scope);

        if (role === 'admin_nacional' || role === 'federacion') {
            setIsAdminView(true);
            setViewMode('table');
            cargarDatosAdministrativos(role, scope);
        } else {
            setIsAdminView(false);
            cargarDatosInstitucion();
        }
    }
  }, []);

  // Limpiar selección cuando se filtra o busca
  useEffect(() => {
    setSelectedItems([]);
  }, [searchTerm, filterLevel, filterGender]);

  const cargarDatosAdministrativos = (role, scope) => {
      let url = 'http://localhost:5000/instituciones';
      
      fetch(url)
        .then(res => res.json())
        .then(dbData => {
            // --- MAGIA: FILTRADO REAL POR FEDERACIÓN ---
            let datosFinales = dbData;

            if (role === 'federacion' && scope !== 'TODOS') {
                // Filtramos las instituciones cuyo AMIE empiece con el código de provincia (scope)
                datosFinales = dbData.filter(item => item.amie && item.amie.startsWith(scope));
            }

            const datosConProvincia = datosFinales.map(item => ({
                ...item,
                Provincia: item.Provincia || obtenerProvincia(item.amie),
                Canton: item.Canton || 'NO DEFINIDO' 
            }));

            setData(datosConProvincia);
            setFilteredData(datosConProvincia);
        })
        .catch(err => console.error("Error cargando data administrativa:", err));
  };

  const cargarDatosInstitucion = () => {
      const mockData = [
            { curso: "Maternal Hombres", estudiantes: 5, nivel: "maternal", genero: "hombres" },
            { curso: "Maternal Mujeres", estudiantes: 5, nivel: "maternal", genero: "mujeres" },
            { curso: "Inicial 1 Hombres", estudiantes: 11, nivel: "inicial", genero: "hombres" },
            { curso: "Inicial 1 Mujeres", estudiantes: 8, nivel: "inicial", genero: "mujeres" },
            { curso: "Inicial 2 Hombres", estudiantes: 9, nivel: "inicial", genero: "hombres" },
            { curso: "Inicial 2 Mujeres", estudiantes: 17, nivel: "inicial", genero: "mujeres" },
            { curso: "1 EGB-E Hombres", estudiantes: 18, nivel: "egb", genero: "hombres" },
            { curso: "1 EGB-E Mujeres", estudiantes: 20, nivel: "egb", genero: "mujeres" },
            { curso: "2 EGB-E Hombres", estudiantes: 21, nivel: "egb", genero: "hombres" },
            { curso: "2 EGB-E Mujeres", estudiantes: 24, nivel: "egb", genero: "mujeres" },
            { curso: "3 EGB-E Hombres", estudiantes: 21, nivel: "egb", genero: "hombres" },
            { curso: "3 EGB-E Mujeres", estudiantes: 12, nivel: "egb", genero: "mujeres" },
            { curso: "4 EGB-E Hombres", estudiantes: 32, nivel: "egb", genero: "hombres" },
            { curso: "4 EGB-E Mujeres", estudiantes: 30, nivel: "egb", genero: "mujeres" },
            { curso: "5 EGB-E Hombres", estudiantes: 21, nivel: "egb", genero: "hombres" },
            { curso: "5 EGB-E Mujeres", estudiantes: 16, nivel: "egb", genero: "mujeres" },
            { curso: "6 EGB-E Hombres", estudiantes: 24, nivel: "egb", genero: "hombres" },
            { curso: "6 EGB-E Mujeres", estudiantes: 20, nivel: "egb", genero: "mujeres" },
            { curso: "7 EGB-E Hombres", estudiantes: 13, nivel: "egb", genero: "hombres" },
            { curso: "7 EGB-E Mujeres", estudiantes: 11, nivel: "egb", genero: "mujeres" },
            { curso: "8 EGB-E Hombres", estudiantes: 16, nivel: "egb", genero: "hombres" },
            { curso: "8 EGB-E Mujeres", estudiantes: 9, nivel: "egb", genero: "mujeres" },
            { curso: "9 EGB-E Hombres", estudiantes: 12, nivel: "egb", genero: "hombres" },
            { curso: "9 EGB-E Mujeres", estudiantes: 12, nivel: "egb", genero: "mujeres" },
            { curso: "10 EGB-E Hombres", estudiantes: 13, nivel: "egb", genero: "hombres" },
            { curso: "10 EGB-E Mujeres", estudiantes: 15, nivel: "egb", genero: "mujeres" },
            { curso: "1 BGU Hombres", estudiantes: 0, nivel: "bgu", genero: "hombres" },
            { curso: "1 BGU Mujeres", estudiantes: 11, nivel: "bgu", genero: "mujeres" },
            { curso: "2 BGU Hombres", estudiantes: 11, nivel: "bgu", genero: "hombres" },
            { curso: "2 BGU Mujeres", estudiantes: 10, nivel: "bgu", genero: "mujeres" },
            { curso: "3 BGU Hombres", estudiantes: 15, nivel: "bgu", genero: "hombres" },
            { curso: "3 BGU Mujeres", estudiantes: 14, nivel: "bgu", genero: "mujeres" },
            { curso: "1 BTP Hombres", estudiantes: 18, nivel: "btp", genero: "hombres" },
            { curso: "1 BTP Mujeres", estudiantes: 8, nivel: "btp", genero: "mujeres" },
            { curso: "2 BTP Hombres", estudiantes: 12, nivel: "btp", genero: "hombres" },
            { curso: "2 BTP Mujeres", estudiantes: 7, nivel: "btp", genero: "mujeres" },
            { curso: "3 BTP Hombres", estudiantes: 6, nivel: "btp", genero: "hombres" },
            { curso: "3 BTP Mujeres", estudiantes: 10, nivel: "btp", genero: "mujeres" },
      ];
      const dataConEstudiantes = mockData.filter(item => item.estudiantes > 0);
      setData(mockData);
      setFilteredData(dataConEstudiantes);
  };

  // Filtrado combinado
  useEffect(() => {
    let filtered = [...data];

    if (isAdminView) {
        if (searchTerm.trim()) {
            const normalizeText = (text) => String(text).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const normalizedSearch = normalizeText(searchTerm);
            
            filtered = filtered.filter(item => 
                normalizeText(item.nombreInstitucion || '').includes(normalizedSearch) ||
                normalizeText(item.amie || '').includes(normalizedSearch) ||
                normalizeText(item.Provincia || '').includes(normalizedSearch)
            );
        }
        setFilteredData(filtered);
        return; 
    }

    if (filterLevel !== 'all') {
      filtered = filtered.filter(item => item.nivel === filterLevel);
    }
    if (filterGender !== 'all') {
      filtered = filtered.filter(item => item.genero === filterGender);
    }
    if (searchTerm.trim()) {
      const normalizeText = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const normalizedSearch = normalizeText(searchTerm);
      filtered = filtered.filter(item =>
        normalizeText(item.curso).includes(normalizedSearch)
      );
    }
    if (!searchTerm.trim()) {
      filtered = filtered.filter(item => item.estudiantes > 0);
    }

    setFilteredData(filtered);
  }, [searchTerm, data, filterLevel, filterGender, isAdminView]);

  // --- LÓGICA DE CHECKBOXES ---
  
  // 1. Manejar Check Individual
  const handleCheckboxChange = (item) => {
    const isSelected = selectedItems.some(selected => 
        isAdminView ? selected.amie === item.amie : selected.curso === item.curso
    );

    if (isSelected) {
        setSelectedItems(selectedItems.filter(selected => 
            isAdminView ? selected.amie !== item.amie : selected.curso !== item.curso
        ));
    } else {
        setSelectedItems([...selectedItems, item]);
    }
  };

  // 2. Manejar "Seleccionar Todo"
  const handleSelectAll = (e) => {
      if (e.target.checked) {
          setSelectedItems(filteredData);
      } else {
          setSelectedItems([]);
      }
  };

  // Cálculos adaptados
  const totalEstudiantes = isAdminView 
    ? 0 
    : filteredData.reduce((sum, item) => sum + item.estudiantes, 0);

  const totalCursos = filteredData.length; 
  
  const promedioEstudiantes = (!isAdminView && totalCursos > 0) 
    ? (totalEstudiantes / totalCursos).toFixed(1) 
    : 0;

  const getPageTitle = () => {
      if (userRole === 'admin_nacional') return 'Panel Administración Nacional';
      if (userRole === 'federacion') return `Panel Federación - Zona ${obtenerProvincia(userScope + '00')}`;
      return 'Consultas';
  };

  // --- EXPORTACIÓN INTELIGENTE ---
  const exportToCSV = () => {
    const dataToExport = selectedItems.length > 0 ? selectedItems : filteredData;

    if (isAdminView) {
        const headers = ['AMIE', 'Institucion', 'Provincia', 'Canton'];
        const csvContent = [
            headers.join(','),
            ...dataToExport.map(item => `"${item.amie}","${item.nombreInstitucion}","${item.Provincia}","${item.Canton}"`)
        ].join('\n');
        
        downloadCSV(csvContent, `instituciones_admin_${new Date().toISOString().split('T')[0]}.csv`);
        return;
    }

    const headers = ['Curso', 'Estudiantes'];
    const csvContent = [
      headers.join(','),
      ...dataToExport.map(item => `"${item.curso}",${item.estudiantes}`)
    ].join('\n');

    downloadCSV(csvContent, `estudiantes_confedec.csv`);
  };

  const downloadCSV = (content, filename) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const exportToPDF = () => {
    const doc = new jsPDF();
    const dataToExport = selectedItems.length > 0 ? selectedItems : filteredData;
    
    doc.setFontSize(18);
    doc.setTextColor(102, 36, 131); // Mantenemos tu color original del PDF
    doc.text(isAdminView ? getPageTitle() : 'CONFEDEC - Estudiantes por Curso', 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generado: ${new Date().toLocaleDateString('es-EC')}`, 14, 28);
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    if (selectedItems.length > 0) {
        doc.text(`Reporte Parcial: ${selectedItems.length} registros seleccionados`, 14, 36);
    } else {
        doc.text(`Reporte Total: ${dataToExport.length} registros`, 14, 36);
    }

    let head, body;
    if (isAdminView) {
        head = [['AMIE', 'Institución', 'Provincia', 'Cantón']];
        body = dataToExport.map(item => [item.amie, item.nombreInstitucion, item.Provincia, item.Canton]);
    } else {
        head = [['Curso', 'Estudiantes']];
        body = dataToExport.map(item => [item.curso, item.estudiantes]);
    }
    
    autoTable(doc, {
      startY: 45,
      head: head,
      body: body,
      theme: 'grid',
      headStyles: { 
        fillColor: [102, 36, 131],
        textColor: 255,
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: { 
        halign: 'center',
        valign: 'middle'
      },
      alternateRowStyles: { fillColor: [245, 240, 250] },
      margin: { top: 45 },
      styles: { fontSize: 9, cellPadding: 5 }
    });

    doc.save(`reporte_confedec_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const COLORS = [
    '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
    '#f43f5e', '#f97316', '#f59e0b', '#eab308', '#84cc16'
  ];

  // Estilos reutilizables (Idénticos a Directivo.jsx)
  const labelStyle = "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-1 mb-1.5 flex items-center gap-2";
  const inputClass = "w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-300 flex items-center justify-between bg-white dark:bg-gray-800 border-indigo-500 dark:border-indigo-400 text-gray-900 dark:text-white shadow-lg shadow-indigo-500/10 outline-none";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto pb-20 px-4">
      
      {/* --- BANNER --- */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl mb-12 p-10 text-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 opacity-30"></div>
        <div className="relative z-10">
          <img src="/confedec.png" alt="Logo" className="w-20 h-20 mx-auto mb-6 drop-shadow-2xl" />
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase italic">{getPageTitle()}</h1>
          <p className="text-indigo-300 font-bold tracking-[0.3em] text-[10px] mt-2 uppercase">
            {isAdminView ? 'Gestión y Monitoreo de Instituciones' : 'Estudiantes por Curso - CONFEDEC'}
          </p>
        </div>
      </div>

      {/* --- ESTADÍSTICAS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {!isAdminView && (
        <div className="bg-white dark:bg-[#1e293b] rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between transition-transform hover:scale-[1.02]">
          <div>
            <p className={labelStyle}>Total Estudiantes</p>
            <p className="text-4xl font-black text-gray-800 dark:text-white mt-2">{totalEstudiantes}</p>
          </div>
          <div className="p-4 bg-indigo-50 dark:bg-[#0f172a] rounded-2xl text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-gray-700 shadow-inner">
            <Users size={28} />
          </div>
        </div>
        )}

        <div className="bg-white dark:bg-[#1e293b] rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between transition-transform hover:scale-[1.02]">
          <div>
            <p className={labelStyle}>{isAdminView ? 'Instituciones' : 'Total Cursos'}</p>
            <p className="text-4xl font-black text-gray-800 dark:text-white mt-2">{totalCursos}</p>
          </div>
          <div className="p-4 bg-indigo-50 dark:bg-[#0f172a] rounded-2xl text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-gray-700 shadow-inner">
            <BookOpen size={28} />
          </div>
        </div>

        {!isAdminView && (
        <div className="bg-white dark:bg-[#1e293b] rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between transition-transform hover:scale-[1.02]">
          <div>
            <p className={labelStyle}>Promedio por Curso</p>
            <p className="text-4xl font-black text-gray-800 dark:text-white mt-2">{promedioEstudiantes}</p>
          </div>
          <div className="p-4 bg-indigo-50 dark:bg-[#0f172a] rounded-2xl text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-gray-700 shadow-inner">
            <Percent size={28} />
          </div>
        </div>
        )}
      </div>

      {/* --- PANEL DE CONTROL (Buscador y Filtros) --- */}
      <div className="bg-white dark:bg-[#1e293b] rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800 p-8 md:p-10 mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-50 dark:bg-[#0f172a] rounded-xl text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-gray-700"><Search size={24}/></div>
          <h3 className="text-2xl font-black text-gray-800 dark:text-white uppercase italic">Panel de Búsqueda</h3>
        </div>

        {/* Buscador (Usando inputClass de Directivo) */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={isAdminView ? "Buscar institución por nombre, AMIE..." : "Buscar curso por nombre..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${inputClass} pl-12 py-4 text-base font-medium`}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-500 transition-colors">
              <X size={20} />
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-end">
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4">
            {!isAdminView && (
              <>
                <div className="w-full">
                  <label className={labelStyle}>Nivel Educativo</label>
                  <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className={inputClass}>
                    <option value="all" className="dark:bg-[#1e293b]">Todos los niveles</option>
                    <option value="maternal" className="dark:bg-[#1e293b]">Maternal</option>
                    <option value="inicial" className="dark:bg-[#1e293b]">Inicial</option>
                    <option value="egb" className="dark:bg-[#1e293b]">EGB-E</option>
                    <option value="bgu" className="dark:bg-[#1e293b]">BGU</option>
                    <option value="btp" className="dark:bg-[#1e293b]">BTP</option>
                  </select>
                </div>
                <div className="w-full">
                  <label className={labelStyle}>Género</label>
                  <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)} className={inputClass}>
                    <option value="all" className="dark:bg-[#1e293b]">General</option>
                    <option value="hombres" className="dark:bg-[#1e293b]">Hombres</option>
                    <option value="mujeres" className="dark:bg-[#1e293b]">Mujeres</option>
                  </select>
                </div>
              </>
            )}
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-wrap gap-4 justify-start md:justify-end">
            {!isAdminView && (
              <div className="flex bg-gray-50 dark:bg-[#0f172a] p-1.5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-inner">
                  <button 
                    onClick={() => setViewMode('charts')} 
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'charts' ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-md border border-indigo-100 dark:border-gray-700' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                  >
                    <BarChart2 size={16} /> Gráficos
                  </button>
                  <button 
                    onClick={() => setViewMode('table')} 
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'table' ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-md border border-indigo-100 dark:border-gray-700' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                  >
                    <TableIcon size={16} /> Tabla
                  </button>
              </div>
            )}

            <button onClick={exportToCSV} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/30 transition-transform active:scale-95 flex items-center gap-2">
              <FileSpreadsheet size={18} /> CSV {selectedItems.length > 0 && `(${selectedItems.length})`}
            </button>
            <button onClick={exportToPDF} className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/30 transition-transform active:scale-95 flex items-center gap-2">
              <FileText size={18} /> PDF {selectedItems.length > 0 && `(${selectedItems.length})`}
            </button>
          </div>
        </div>
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      {filteredData.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-[#1e293b] rounded-[3rem] p-16 text-center shadow-2xl border border-gray-100 dark:border-gray-800">
          <div className="w-24 h-24 bg-gray-50 dark:bg-[#0f172a] rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100 dark:border-gray-800">
            <Search className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-black text-gray-800 dark:text-white uppercase italic mb-2">No se encontraron resultados</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Prueba ajustando los filtros de búsqueda.</p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {/* VISTA TABLA */}
          {(isAdminView || viewMode === 'table') && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white dark:bg-[#1e293b] rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-[#0f172a] border-b border-gray-100 dark:border-gray-800">
                      <th className="px-8 py-6 text-center w-20">
                          <input 
                              type="checkbox" 
                              onChange={handleSelectAll}
                              checked={selectedItems.length === filteredData.length && filteredData.length > 0}
                              className="w-5 h-5 accent-indigo-600 cursor-pointer rounded border-gray-300"
                          />
                      </th>
                      
                      {isAdminView ? (
                          <>
                              <th className="px-6 py-6 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">AMIE</th>
                              <th className="px-6 py-6 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Nombre Institución</th>
                              <th className="px-6 py-6 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Provincia</th>
                              <th className="px-6 py-6 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Cantón</th>
                          </>
                      ) : (
                          <>
                              <th className="px-6 py-6 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Curso</th>
                              <th className="px-6 py-6 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Nivel</th>
                              <th className="px-6 py-6 text-center text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Estudiantes</th>
                              <th className="px-6 py-6 text-center text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Porcentaje</th>
                          </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                    {filteredData.map((item, index) => {
                      const isSelected = selectedItems.some(selected => 
                          isAdminView ? selected.amie === item.amie : selected.curso === item.curso
                      );
                      
                      const percentage = !isAdminView ? ((item.estudiantes / totalEstudiantes) * 100).toFixed(2) : 0;
                      const rowBgClass = isSelected 
                          ? 'bg-indigo-50/50 dark:bg-indigo-900/20' 
                          : 'bg-white dark:bg-[#1e293b] hover:bg-gray-50 dark:hover:bg-[#0f172a]/50';

                      return (
                        <tr key={index} className={`${rowBgClass} transition-colors duration-200`}>
                           <td className="px-8 py-5 text-center">
                              <input 
                                  type="checkbox" 
                                  checked={isSelected}
                                  onChange={() => handleCheckboxChange(item)}
                                  className="w-5 h-5 accent-indigo-600 cursor-pointer rounded border-gray-300"
                              />
                           </td>

                           {isAdminView ? (
                              <>
                                  <td className="px-6 py-5 font-bold text-indigo-600 dark:text-indigo-400 text-sm">{item.amie}</td>
                                  <td className="px-6 py-5 font-bold text-gray-800 dark:text-white text-sm">{item.nombreInstitucion}</td>
                                  <td className="px-6 py-5 text-gray-500 dark:text-gray-400 text-sm font-medium">{item.Provincia}</td>
                                  <td className="px-6 py-5 text-gray-500 dark:text-gray-400 text-sm font-medium">{item.Canton}</td>
                              </>
                           ) : (
                              <>
                                  <td className="px-6 py-5 font-bold text-gray-800 dark:text-white text-sm">{item.curso}</td>
                                  <td className="px-6 py-5">
                                    <span className="px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                      {item.nivel}
                                    </span>
                                  </td>
                                  <td className="px-6 py-5 text-center">
                                    <span className="px-4 py-2 rounded-xl bg-indigo-50 dark:bg-[#0f172a] text-indigo-600 dark:text-indigo-400 font-black border border-indigo-100 dark:border-gray-800">
                                      {item.estudiantes}
                                    </span>
                                  </td>
                                  <td className="px-6 py-5 text-center">
                                    <div className="flex items-center justify-center gap-3">
                                      <div className="w-full max-w-[120px] h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
                                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
                                      </div>
                                      <span className="text-xs font-black text-gray-500 dark:text-gray-400 min-w-[3rem]">{percentage}%</span>
                                    </div>
                                  </td>
                              </>
                           )}
                        </tr>
                      );
                    })}
                  </tbody>
                  {/* FOOTER SOLO PARA COLEGIOS */}
                  {!isAdminView && (
                  <tfoot className="bg-gray-50 dark:bg-[#0f172a] border-t border-gray-100 dark:border-gray-800">
                    <tr>
                      <td colSpan="3" className="px-8 py-6 text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">TOTAL</td>
                      <td className="px-6 py-6 text-center">
                        <span className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-black shadow-lg shadow-indigo-500/30">{totalEstudiantes}</span>
                      </td>
                      <td className="px-6 py-6 text-center text-xs font-black text-indigo-600 dark:text-indigo-400 tracking-wider">100%</td>
                    </tr>
                  </tfoot>
                  )}
                </table>
              </div>
            </motion.div>
          )}

          {/* VISTA DE GRÁFICOS (SOLO USUARIO NORMAL) */}
          {!isAdminView && viewMode === 'charts' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col gap-12">
              
              {/* Gráfico de Barras */}
              <div className="bg-white dark:bg-[#1e293b] rounded-[3rem] p-10 shadow-2xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-indigo-50 dark:bg-[#0f172a] rounded-xl text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-gray-800"><BarChart2 size={24}/></div>
                  <h3 className="text-2xl font-black text-gray-800 dark:text-white uppercase italic">Distribución por Curso</h3>
                </div>
                <div className="h-[450px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
                      <XAxis dataKey="curso" angle={-45} textAnchor="end" height={120} interval={0} tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 700 }} stroke="#334155" />
                      <YAxis tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 700 }} stroke="#334155" />
                      <Tooltip formatter={(value) => [`${value} estudiantes`, 'Cantidad']} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '1rem', color: '#f8fafc', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }} itemStyle={{ color: '#818cf8', fontWeight: '900' }} />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Bar dataKey="estudiantes" fill="url(#indigoGradient)" radius={[8, 8, 0, 0]} animationDuration={1000} />
                      <defs>
                        <linearGradient id="indigoGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#818cf8" />
                          <stop offset="100%" stopColor="#4f46e5" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Gráfico de Pastel */}
              <div className="bg-white dark:bg-[#1e293b] rounded-[3rem] p-10 shadow-2xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-purple-50 dark:bg-[#0f172a] rounded-xl text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-gray-800"><Percent size={24}/></div>
                  <h3 className="text-2xl font-black text-gray-800 dark:text-white uppercase italic">Proporción de Estudiantes</h3>
                </div>
                <div className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={filteredData} dataKey="estudiantes" nameKey="curso" cx="50%" cy="50%" outerRadius={180} innerRadius={90} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`} labelLine={true} animationDuration={1000} paddingAngle={2}>
                        {filteredData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="stroke-white dark:stroke-[#1e293b] stroke-[3px]" />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '1rem', color: '#f8fafc', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }} />
                      <Legend layout="horizontal" verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

export default Consultas;