// src/pages/Consultas.jsx
import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BarChart2, Table as TableIcon, FileSpreadsheet, FileText, Users, BookOpen, Percent, X, Eye, CheckCircle2, XCircle, Calendar, School, BookOpenCheck } from 'lucide-react';

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

  // --- NUEVOS ESTADOS PARA MODAL Y ESTADO ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState(null);

  // --- ESTADOS PARA PAGINACIÓN ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const tableRef = useRef(null);

  const handlePageChange = (newPage, isBottom) => {
    setCurrentPage(newPage);
    
    // Solo hace el auto-scroll si el clic vino de los botones de ABAJO
    if (isBottom) {
      // Le damos 150ms para asegurar que React ya renderizó las 20 filas nuevas
      setTimeout(() => {
        const tablaAncla = document.getElementById('inicio-tabla');
        if (tablaAncla) {
          // El ID nativo es infalible sin importar el layout
          tablaAncla.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); 
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

  const cargarDatosAdministrativos = (role, scope) => {
      let url = 'http://localhost:5000/instituciones';
      
      fetch(url)
        .then(res => res.json())
        .then(dbData => {
            let datosFinales = dbData;

            if (role === 'federacion' && scope !== 'TODOS') {
                datosFinales = dbData.filter(item => item.amie && item.amie.startsWith(scope));
            }

            const datosConProvincia = datosFinales.map(item => ({
                ...item,
                Provincia: item.Provincia || obtenerProvincia(item.amie),
                Canton: item.Canton || 'NO DEFINIDO'
                // NOTA: Sostenimiento, fechaCreacion, y niveles ya vienen en 'item'
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

  useEffect(() => {
    let filtered = [...data];

    if (isAdminView) {
        if (searchTerm.trim()) {
            const normalizeText = (text) => String(text).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const normalizedSearch = normalizeText(searchTerm);
            
            filtered = filtered.filter(item => 
                normalizeText(item.nombreInstitucion || '').includes(normalizedSearch) ||
                normalizeText(item.amie || '').includes(normalizedSearch) ||
                normalizeText(item.Provincia || '').includes(normalizedSearch) ||
                normalizeText(item.Sostenimiento || '').includes(normalizedSearch) ||
                normalizeText(item.Canton || '').includes(normalizedSearch) ||
                normalizeText(item.estado !== false ? 'activo' : 'inactivo').includes(normalizedSearch)
            );
        }
        setFilteredData(filtered);
        setCurrentPage(1); // Resetear a la página 1 cuando se busca
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
    setCurrentPage(1); // Resetear a la página 1 cuando se usan filtros
  }, [searchTerm, data, filterLevel, filterGender, isAdminView]);

  // --- NUEVA LÓGICA: ACTUALIZAR ESTADO DE INSTITUCIÓN ---
  const handleToggleEstado = async (amie, currentEstado) => {
    // Si es null/undefined, asumimos que estaba true. Invertimos.
    const isCurrentlyActive = currentEstado !== false; 
    const newEstado = !isCurrentlyActive;

    try {
        const response = await fetch(`http://localhost:5000/instituciones/${amie}/estado`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado: newEstado })
        });

        if (response.ok) {
            // Actualizamos el estado localmente para reflejar el cambio inmediato sin recargar
            const updateList = (list) => list.map(item => 
                item.amie === amie ? { ...item, estado: newEstado } : item
            );
            setData(updateList(data));
            setFilteredData(updateList(filteredData));
        } else {
            console.error("Error al actualizar estado en el servidor");
        }
    } catch (error) {
        console.error("Error de red al actualizar estado:", error);
    }
  };

  const openInstitutionModal = (institution) => {
      setSelectedInstitution(institution);
      setIsModalOpen(true);
  };

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

  const handleSelectAll = (e) => {
      if (e.target.checked) {
          const existingIds = new Set(selectedItems.map(item => isAdminView ? item.amie : item.curso));
          const newItems = filteredData.filter(item => !existingIds.has(isAdminView ? item.amie : item.curso));
          setSelectedItems([...selectedItems, ...newItems]);
      } else {
          const visibleIds = new Set(filteredData.map(item => isAdminView ? item.amie : item.curso));
          setSelectedItems(selectedItems.filter(item => !visibleIds.has(isAdminView ? item.amie : item.curso)));
      }
  };

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

  // --- FUNCIONES DE EXPORTACIÓN GENERAL (TABLA) ---
  const exportToCSV = (clearAfter = true) => {
    const dataToExport = selectedItems.length > 0 ? selectedItems : filteredData;

    if (isAdminView) {
        const headers = ['AMIE', 'Institucion', 'Provincia', 'Canton', 'Estado'];
        const csvContent = [
            headers.join(','),
            ...dataToExport.map(item => `"${item.amie}","${item.nombreInstitucion}","${item.Provincia}","${item.Canton || 'NO DEFINIDO'}","${item.estado !== false ? 'Activo' : 'Inactivo'}"`)
        ].join('\n');
        
        downloadCSV(csvContent, `instituciones_admin_${new Date().toISOString().split('T')[0]}.csv`);
    } else {
        const headers = ['Curso', 'Estudiantes'];
        const csvContent = [
          headers.join(','),
          ...dataToExport.map(item => `"${item.curso}",${item.estudiantes}`)
        ].join('\n');

        downloadCSV(csvContent, `estudiantes_confedec.csv`);
    }

    if (clearAfter && selectedItems.length > 0) {
        setSelectedItems([]);
    }
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

  const exportToPDF = (clearAfter = true) => {
    const doc = new jsPDF();
    const dataToExport = selectedItems.length > 0 ? selectedItems : filteredData;
    
    doc.setFontSize(18);
    doc.setTextColor(102, 36, 131); 
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
        head = [['AMIE', 'Institución', 'Provincia', 'Cantón', 'Estado']];
        body = dataToExport.map(item => [item.amie, item.nombreInstitucion, item.Provincia, item.Canton || 'NO DEFINIDO', item.estado !== false ? 'Activo' : 'Inactivo']);
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

    if (clearAfter && selectedItems.length > 0) {
        setSelectedItems([]);
    }
  };

  const exportBoth = () => {
      exportToCSV(false);
      exportToPDF(false);
      
      setTimeout(() => {
        if (selectedItems.length > 0) {
            setSelectedItems([]);
        }
      }, 500); 
  };

  const exportSingleToCSV = () => {
    if (!selectedInstitution) return;
    
    const headers = ['AMIE', 'Nombre Institucion', 'Provincia', 'Canton', 'Sostenimiento', 'Creacion', 'Celebracion', 'Estado'];
    const values = [
      selectedInstitution.amie,
      selectedInstitution.nombreInstitucion,
      selectedInstitution.Provincia,
      selectedInstitution.Canton || 'NO DEFINIDO',
      selectedInstitution.Sostenimiento || 'No registrado',
      selectedInstitution.fechaCreacion || '--',
      selectedInstitution.fechaCelebracion || '--',
      selectedInstitution.estado !== false ? 'Activo' : 'Inactivo'
    ].map(val => `"${val}"`);

    const csvContent = headers.join(',') + '\n' + values.join(',');
    downloadCSV(csvContent, `Ficha_${selectedInstitution.amie}.csv`);
  };

  const exportSingleToPDF = () => {
    if (!selectedInstitution) return;
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.setTextColor(102, 36, 131); 
    doc.text('FICHA TÉCNICA INSTITUCIONAL', 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generado: ${new Date().toLocaleDateString('es-EC')}`, 14, 28);
    
    // Información General
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text(`AMIE: ${selectedInstitution.amie}`, 14, 40);
    doc.text(`Nombre: ${selectedInstitution.nombreInstitucion}`, 14, 48);
    doc.text(`Ubicación: ${selectedInstitution.Provincia} - ${selectedInstitution.Canton || 'NO DEFINIDO'}`, 14, 56);
    doc.text(`Sostenimiento: ${selectedInstitution.Sostenimiento || 'No registrado'}`, 14, 64);
    doc.text(`Estado: ${selectedInstitution.estado !== false ? 'Activo' : 'Inactivo'}`, 14, 72);

    // Tabla de Niveles
    const niveles = [
      { key: 'Maternal', label: 'Maternal' }, { key: 'Preparatoria', label: 'Preparatoria' },
      { key: 'Inicial', label: 'Inicial' }, { key: 'Media', label: 'EGB Media' },
      { key: 'Superior', label: 'EGB Superior' }, { key: 'Bachiller', label: 'Bachillerato' },
      { key: 'B Tecnico', label: 'B. Técnico' }, { key: 'BI', label: 'B. Internacional' },
    ];

    const body = niveles.map(n => {
      const loOferta = selectedInstitution[n.key] && selectedInstitution[n.key].toString().trim() !== '';
      return [n.label, loOferta ? 'OFERTADO' : 'NO OFERTADO'];
    });
    
    autoTable(doc, {
      startY: 85,
      head: [['Nivel Educativo', 'Disponibilidad']],
      body: body,
      theme: 'grid',
      headStyles: { fillColor: [102, 36, 131], textColor: 255, halign: 'center' },
      bodyStyles: { halign: 'center' },
      alternateRowStyles: { fillColor: [245, 240, 250] },
    });

    doc.save(`Ficha_${selectedInstitution.amie}.pdf`);
  };

  // --- CÁLCULOS PARA PAGINACIÓN DE LA TABLA ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const COLORS = [
    '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
    '#f43f5e', '#f97316', '#f59e0b', '#eab308', '#84cc16'
  ];

  const labelStyle = "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-1 mb-1.5 flex items-center gap-2";
  const inputClass = "w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-300 flex items-center justify-between bg-white dark:bg-gray-800 border-indigo-500 dark:border-indigo-400 text-gray-900 dark:text-white shadow-lg shadow-indigo-500/10 outline-none";

  const renderPagination = (isBottom = false) => {
    if (totalPages <= 1) return null;
    return (
      <div className={`flex flex-col md:flex-row items-center justify-between px-8 py-6 bg-gray-50 dark:bg-[#0f172a] gap-4 ${isBottom ? 'border-t border-gray-100 dark:border-gray-800' : 'border-b border-gray-100 dark:border-gray-800 rounded-t-[3rem]'}`}>
        <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
          Mostrando <span className="text-indigo-600 dark:text-indigo-400">{indexOfFirstItem + 1}</span> a <span className="text-indigo-600 dark:text-indigo-400">{Math.min(indexOfLastItem, filteredData.length)}</span> de <span className="text-indigo-600 dark:text-indigo-400">{filteredData.length}</span>
        </p>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1), isBottom)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm"
          >
            Anterior
          </button>
          
          <div className="flex gap-1 px-2 hidden sm:flex">
            {(() => {
              const pages = [];
              if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
              } else {
                if (currentPage <= 4) {
                  pages.push(1, 2, 3, 4, 5, '...', totalPages);
                } else if (currentPage >= totalPages - 3) {
                  pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                } else {
                  pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                }
              }

              return pages.map((page, index) => {
                if (page === '...') {
                  return <span key={`ellipsis-${index}`} className="w-9 h-9 flex items-center justify-center text-gray-400 dark:text-gray-600 font-bold tracking-widest">...</span>;
                }
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page, isBottom)}
                    className={`w-9 h-9 rounded-xl text-xs font-black transition-all flex items-center justify-center ${currentPage === page ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30 border border-indigo-600' : 'bg-white dark:bg-[#1e293b] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm'}`}
                  >
                    {page}
                  </button>
                );
              });
            })()}
          </div>

          <button 
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages), isBottom)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm"
          >
            Siguiente
          </button>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }} 
      className="max-w-6xl mx-auto pb-24 px-4"
    >
      
      {/* --- BANNER INTEGRADO --- */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] shadow-2xl mb-12 p-10 text-center">
        <div className="absolute inset-0 bg-indigo-500/10 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-white">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <img src="/confedec.png" alt="Logo" className="w-24 h-24 mx-auto mb-4 drop-shadow-2xl" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic">{getPageTitle()}</h1>
          <p className="text-indigo-200 font-medium tracking-[0.3em] text-[10px] mt-2 uppercase">
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

      {/* --- PANEL DE CONTROL --- */}
      <div className="bg-white dark:bg-[#1e293b] rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800 p-8 md:p-10 mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-50 dark:bg-[#0f172a] rounded-xl text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-gray-700"><Search size={24}/></div>
          <h3 className="text-2xl font-black text-gray-800 dark:text-white uppercase italic">Panel de Búsqueda</h3>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={isAdminView ? "Buscar institución por AMIE, Nombre, Provincia, Cantón, Estado y Sostenimiento" : "Buscar curso por nombre..."}
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

        <div className="flex flex-col gap-6 mt-4">
          {/* --- FILA 1: Filtros (Ocultos para Admin) --- */}
          {!isAdminView && (
            <div className="grid md:grid-cols-2 gap-4">
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
            </div>
          )}

          {/* --- FILA 2: Botones de Acción Lado a Lado --- */}
          <div className="flex flex-wrap gap-4 items-center justify-between w-full">
            
            {/* GRUPO IZQUIERDA: Limpiar y Vistas */}
            <div className="flex items-center gap-4">
              {/* BOTÓN LIMPIAR (Alineado a la izquierda) */}
              {selectedItems.length > 0 && (
                <button 
                  onClick={() => setSelectedItems([])} 
                  className="px-4 py-3 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 font-bold transition-colors flex items-center gap-2"
                  title="Desmarcar todas las instituciones"
                >
                  <X size={18} /> Limpiar ({selectedItems.length})
                </button>
              )}

              {!isAdminView && (
                <div className="flex bg-gray-50 dark:bg-[#0f172a] p-1.5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-inner">
                    <button onClick={() => setViewMode('charts')} className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'charts' ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-md border border-indigo-100 dark:border-gray-700' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
                      <BarChart2 size={16} /> Gráficos
                    </button>
                    <button onClick={() => setViewMode('table')} className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'table' ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-md border border-indigo-100 dark:border-gray-700' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
                      <TableIcon size={16} /> Tabla
                    </button>
                </div>
              )}
            </div>

            {/* GRUPO DERECHA: Descargas */}
            <div className="flex gap-2">
              <button onClick={() => exportToCSV(true)} className="px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/30 transition-transform active:scale-95 flex items-center gap-2">
                <FileSpreadsheet size={18} /> CSV
              </button>
              
              <button onClick={() => exportToPDF(true)} className="px-5 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/30 transition-transform active:scale-95 flex items-center gap-2">
                <FileText size={18} /> PDF
              </button>
              
              {/* BOTÓN: DESCARGAR AMBOS (Ahora siempre visible) */}
              <button onClick={exportBoth} className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/30 transition-transform active:scale-95 flex items-center gap-2 border border-indigo-500" title="Descargar PDF y CSV a la vez">
                <span className="flex items-center gap-1"><FileSpreadsheet size={16} /> + <FileText size={16} /></span> Ambos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      {filteredData.length === 0 ? (
        <motion.div 
          key="empty-state" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="bg-white dark:bg-[#1e293b] rounded-[3rem] p-16 text-center shadow-2xl border border-gray-100 dark:border-gray-800"
        >
          <div className="w-24 h-24 bg-gray-50 dark:bg-[#0f172a] rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100 dark:border-gray-800">
            <Search className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-black text-gray-800 dark:text-white uppercase italic mb-2">No se encontraron resultados</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Prueba ajustando los filtros de búsqueda.</p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {/* VISTA TABLA */}
          {(isAdminView || viewMode === 'table') ? (
            <motion.div 
              id="inicio-tabla"
              key="table-view" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white dark:bg-[#1e293b] rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden scroll-mt-8"
            >
              {/* Paginación Superior */}
              {renderPagination(false)}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse table-fixed">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-[#0f172a] border-b border-gray-100 dark:border-gray-800">
                      <th className="px-8 py-6 text-center w-20">
                          <input 
                              type="checkbox" 
                              onChange={handleSelectAll}
                              checked={
                                  filteredData.length > 0 && 
                                  filteredData.every(fItem => 
                                      selectedItems.some(sItem => 
                                          isAdminView ? sItem.amie === fItem.amie : sItem.curso === fItem.curso
                                      )
                                  )
                              }
                              className="w-5 h-5 accent-indigo-600 cursor-pointer rounded border-gray-300"
                          />
                      </th>
                      
                      {isAdminView ? (
                          <>
                              <th className="px-6 py-6 w-28 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">AMIE</th>
                              <th className="px-6 py-6 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Nombre Institución</th>
                              <th className="px-6 py-6 w-32 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Provincia</th>
                              <th className="px-6 py-6 w-60 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Cantón</th>
                              <th className="px-6 py-6 w-24 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] text-center">Estado</th>
                              <th className="px-6 py-6 w-28 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] text-center">Acciones</th>
                          </>
                      ) : (
                          <>
                              <th className="px-6 py-6 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Curso</th>
                              <th className="px-6 py-6 w-32 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Nivel</th>
                              <th className="px-6 py-6 w-32 text-center text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Estudiantes</th>
                              <th className="px-6 py-6 w-40 text-center text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Porcentaje</th>
                          </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                    {/* IMPORTANTE: AQUÍ AHORA USAMOS currentItems PARA LA PAGINACIÓN */}
                    {currentItems.map((item, index) => {
                      const isSelected = selectedItems.some(selected => 
                          isAdminView ? selected.amie === item.amie : selected.curso === item.curso
                      );
                      
                      const percentage = !isAdminView ? ((item.estudiantes / totalEstudiantes) * 100).toFixed(2) : 0;
                      
                      // Opacidad reducida si está inactivo
                      const isActive = item.estado !== false; 
                      const rowBgClass = isSelected 
                          ? 'bg-indigo-50/50 dark:bg-indigo-900/20' 
                          : 'bg-white dark:bg-[#1e293b] hover:bg-gray-50 dark:hover:bg-[#0f172a]/50';

                      return (
                        <tr key={index} className={`${rowBgClass} transition-all duration-200 ${!isActive && isAdminView ? 'opacity-50 grayscale-[0.5]' : ''}`}>
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
                                  <td className="px-6 py-5 font-bold text-gray-800 dark:text-white text-sm">
                                      {item.nombreInstitucion}
                                      {!isActive && <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Inactivo</span>}
                                  </td>
                                  <td className="px-6 py-5 text-gray-500 dark:text-gray-400 text-sm font-medium">{item.Provincia}</td>
                                  
                                  {/* COLUMNA CANTÓN */}
                                  <td className="px-6 py-5">
                                    <span className="inline-block whitespace-nowrap px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50">
                                      {item.Canton || 'NO DEFINIDO'}
                                    </span>
                                  </td>
                                  
                                  {/* COLUMNA ESTADO (TOGGLE) */}
                                  <td className="px-6 py-5 text-center">
                                      <button
                                          onClick={(e) => { e.stopPropagation(); handleToggleEstado(item.amie, item.estado); }}
                                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isActive ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                                      >
                                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                                      </button>
                                  </td>

                                  {/* COLUMNA ACCIONES */}
                                  <td className="px-6 py-5 text-center">
                                      <button
                                          onClick={(e) => { e.stopPropagation(); openInstitutionModal(item); }}
                                          className="p-2 bg-indigo-50 dark:bg-[#0f172a] text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors border border-indigo-100 dark:border-gray-800 shadow-sm"
                                          title="Ver Ficha Técnica"
                                      >
                                          <Eye size={18} />
                                      </button>
                                  </td>
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

              {/* Paginación Inferior */}
              {renderPagination(true)}
            </motion.div>
          ) : (
            /* VISTA DE GRÁFICOS */
            <motion.div 
              key="charts-view" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              transition={{ duration: 0.4, delay: 0.1 }} 
              className="flex flex-col gap-12"
            >
              {/* Contenido de gráficos inalterado */}
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

      {/* --- MODAL DE FICHA TÉCNICA (NUEVO) --- */}
      <AnimatePresence>
        {isModalOpen && selectedInstitution && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic dentro
              className="bg-white dark:bg-[#1e293b] rounded-[2.5rem] w-full max-w-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 relative"
            >
              {/* Header del Modal */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white relative">
                
                {/* BOTONES DE ACCIÓN (NUEVOS) */}
                <div className="absolute top-6 right-6 flex items-center gap-2">
                  <button 
                    onClick={exportSingleToCSV}
                    title="Exportar Ficha a CSV"
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-md"
                  >
                    <FileSpreadsheet size={20} />
                  </button>
                  <button 
                    onClick={exportSingleToPDF}
                    title="Exportar Ficha a PDF"
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-md"
                  >
                    <FileText size={20} />
                  </button>
                  <div className="w-px h-6 bg-white/20 mx-1"></div> {/* Separador */}
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    title="Cerrar Ficha"
                    className="p-2 bg-white/10 hover:bg-red-500/80 rounded-xl transition-colors backdrop-blur-md"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-2 pr-32"> {/* padding-right añadido para que no choque con los botones */}
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                    AMIE: {selectedInstitution.amie}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase ${selectedInstitution.estado !== false ? 'bg-emerald-500' : 'bg-red-500'}`}>
                    {selectedInstitution.estado !== false ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black italic pr-32">{selectedInstitution.nombreInstitucion}</h2>
                <p className="text-indigo-100 mt-2 font-medium flex items-center gap-2">
                  <School size={16}/> {selectedInstitution.Provincia} - {selectedInstitution.Canton || 'NO DEFINIDO'}
                </p>
              </div>

              {/* Contenido del Modal */}
              <div className="p-8 grid md:grid-cols-2 gap-8">
                {/* Columna Izquierda: Info General */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <BookOpenCheck size={16}/> Información General
                    </h4>
                    <div className="bg-gray-50 dark:bg-[#0f172a] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-bold mb-1">SOSTENIMIENTO</p>
                        <p className="font-medium text-gray-900 dark:text-white">{selectedInstitution.Sostenimiento || 'No registrado'}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-bold mb-1 flex items-center gap-1"><Calendar size={12}/> CREACIÓN</p>
                          <p className="font-medium text-gray-900 dark:text-white">{selectedInstitution.fechaCreacion || '--'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-bold mb-1 flex items-center gap-1"><Calendar size={12}/> CELEBRACIÓN</p>
                          <p className="font-medium text-gray-900 dark:text-white">{selectedInstitution.fechaCelebracion || '--'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Columna Derecha: Niveles Educativos */}
                <div>
                  <h4 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <BookOpen size={16}/> Niveles Ofertados
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Renderizamos condicionalmente si la columna existe y es true/"si" */}
                    {[
                      { key: 'Maternal', label: 'Maternal' },
                      { key: 'Preparatoria', label: 'Preparatoria' },
                      { key: 'Inicial', label: 'Inicial' },
                      { key: 'Media', label: 'EGB Media' },
                      { key: 'Superior', label: 'EGB Superior' },
                      { key: 'Bachiller', label: 'Bachillerato' },
                      { key: 'B Tecnico', label: 'B. Técnico' },
                      { key: 'BI', label: 'B. Internacional' },
                    ].map((nivel) => {
                      // Verificamos si el nivel está marcado como activo en tu base de datos (por ejemplo, con una "X", "Si", o booleano)
                      // Asumimos que si no está vacío, lo oferta. Ajusta esto según cómo guardes los datos en tu tabla.
                      const loOferta = selectedInstitution[nivel.key] && selectedInstitution[nivel.key].toString().trim() !== '';
                      
                      return (
                        <div key={nivel.key} className={`flex items-center gap-2 p-3 rounded-xl border ${loOferta ? 'bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300' : 'bg-gray-50 dark:bg-[#0f172a] border-gray-100 dark:border-gray-800 text-gray-400 dark:text-gray-600'}`}>
                          {loOferta ? <CheckCircle2 size={16} className="text-emerald-500"/> : <XCircle size={16}/>}
                          <span className="text-sm font-bold">{nivel.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </motion.div>
  );
}

export default Consultas;