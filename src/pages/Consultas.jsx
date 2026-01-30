// src/pages/Consultas.jsx
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Consultas() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('charts'); // 'charts' o 'table'
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterGender, setFilterGender] = useState('all');

  useEffect(() => {
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
  }, []);

  // Filtrado combinado
  useEffect(() => {
    let filtered = [...data];

    if (filterLevel !== 'all') {
      filtered = filtered.filter(item => item.nivel === filterLevel);
    }

    if (filterGender !== 'all') {
      filtered = filtered.filter(item => item.genero === filterGender);
    }

    if (searchTerm.trim()) {
      const normalizeText = (text) => {
        return text
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
      };

      const normalizedSearch = normalizeText(searchTerm);
      filtered = filtered.filter(item =>
        normalizeText(item.curso).includes(normalizedSearch)
      );
    }

    if (!searchTerm.trim()) {
      filtered = filtered.filter(item => item.estudiantes > 0);
    }

    setFilteredData(filtered);
  }, [searchTerm, data, filterLevel, filterGender]);

  const totalEstudiantes = filteredData.reduce((sum, item) => sum + item.estudiantes, 0);
  const totalCursos = filteredData.length;
  const promedioEstudiantes = totalCursos > 0 ? (totalEstudiantes / totalCursos).toFixed(1) : 0;

  const exportToCSV = () => {
    const headers = ['Curso', 'Estudiantes'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(item => `"${item.curso}",${item.estudiantes}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `estudiantes_confedec_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.setTextColor(102, 36, 131);
    doc.text('CONFEDEC - Estudiantes por Curso', 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generado: ${new Date().toLocaleDateString('es-EC')}`, 14, 28);
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text(`Total Estudiantes: ${totalEstudiantes}`, 14, 36);
    doc.text(`Total Cursos: ${totalCursos}`, 14, 42);
    doc.text(`Promedio: ${promedioEstudiantes} estudiantes/curso`, 14, 48);

    const tableData = filteredData.map(item => [item.curso, item.estudiantes]);
    
    doc.autoTable({
      startY: 55,
      head: [['Curso', 'Estudiantes']],
      body: tableData,
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
      margin: { top: 55 },
      styles: {
        fontSize: 9,
        cellPadding: 5
      }
    });

    doc.save(`estudiantes_confedec_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const COLORS = [
    '#662483', '#8e44ad', '#9b59b6', '#a64ca6', '#b565b5',
    '#c478c4', '#d38bd3', '#e29fe2', '#7c3aed', '#8b5cf6',
    '#9333ea', '#a855f7', '#b87eff', '#c49dff', '#d0bbff'
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', paddingTop: '40px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '1400px', width: '95%', margin: '0 auto', padding: '0 20px' }}>
        
        {/* HEADER BANNER */}
        <div style={{
          background: 'linear-gradient(135deg, #662483 0%, #3c096c 100%)',
          borderRadius: '16px',
          padding: '40px',
          marginBottom: '40px',
          boxShadow: '0 10px 40px rgba(102, 36, 131, 0.3)',
          border: '1px solid #662483',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            color: '#ffffff',
            margin: '0 0 10px 0',
            letterSpacing: '1px',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            Consultas
          </h1>
          <p style={{
            color: '#e0aaff',
            fontSize: '1.1rem',
            fontWeight: '600',
            margin: 0
          }}>
            Estudiantes por Curso - CONFEDEC
          </p>
        </div>

        {/* ESTADÍSTICAS (3 CARDS) */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '25px',
          marginBottom: '40px'
        }}>
          {/* Card 1 - Total Estudiantes */}
          <div style={{
            background: '#161616',
            border: '1px solid #333',
            borderLeft: '4px solid #662483',
            borderRadius: '12px',
            padding: '25px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#b0b0b0', fontSize: '0.85rem', fontWeight: '600', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Total Estudiantes
                </p>
                <p style={{ fontSize: '2.5rem', fontWeight: '900', color: '#ffffff', margin: 0 }}>
                  {totalEstudiantes}
                </p>
              </div>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #662483, #8e44ad)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(102, 36, 131, 0.4)'
              }}>
                <svg style={{ width: '30px', height: '30px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2 - Total Cursos */}
          <div style={{
            background: '#161616',
            border: '1px solid #333',
            borderLeft: '4px solid #8e44ad',
            borderRadius: '12px',
            padding: '25px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#b0b0b0', fontSize: '0.85rem', fontWeight: '600', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Total Cursos
                </p>
                <p style={{ fontSize: '2.5rem', fontWeight: '900', color: '#ffffff', margin: 0 }}>
                  {totalCursos}
                </p>
              </div>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #8e44ad, #9b59b6)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(142, 68, 173, 0.4)'
              }}>
                <svg style={{ width: '30px', height: '30px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 3 - Promedio */}
          <div style={{
            background: '#161616',
            border: '1px solid #333',
            borderLeft: '4px solid #e0aaff',
            borderRadius: '12px',
            padding: '25px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#b0b0b0', fontSize: '0.85rem', fontWeight: '600', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Promedio por Curso
                </p>
                <p style={{ fontSize: '2.5rem', fontWeight: '900', color: '#ffffff', margin: 0 }}>
                  {promedioEstudiantes}
                </p>
              </div>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #9b59b6, #e0aaff)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(224, 170, 255, 0.4)'
              }}>
                <svg style={{ width: '30px', height: '30px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL DE CONTROL */}
        <div style={{
          background: '#161616',
          border: '1px solid #333',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          {/* Barra de Búsqueda */}
          <div style={{ position: 'relative', marginBottom: '25px' }}>
            <div style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }}>
              <svg style={{ width: '20px', height: '20px', color: '#666' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar curso por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '15px 15px 15px 50px',
                background: '#111',
                border: '1px solid #333',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#662483';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 36, 131, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#333';
                e.target.style.boxShadow = 'none';
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                <svg style={{ width: '20px', height: '20px', color: '#666' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Filtros y Controles */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '15px', 
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {/* Filtros */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                style={{
                  padding: '12px 20px',
                  background: '#111',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#662483'}
                onBlur={(e) => e.target.style.borderColor = '#333'}
              >
                <option value="all">Todos los niveles</option>
                <option value="maternal">Maternal</option>
                <option value="inicial">Inicial</option>
                <option value="egb">EGB-E</option>
                <option value="bgu">BGU</option>
                <option value="btp">BTP</option>
              </select>

              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                style={{
                  padding: '12px 20px',
                  background: '#111',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#662483'}
                onBlur={(e) => e.target.style.borderColor = '#333'}
              >
                <option value="all">General</option>
                <option value="hombres">Hombres</option>
                <option value="mujeres">Mujeres</option>
              </select>
            </div>

            {/* Toggle Vista + Exportar */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {/* Toggle Gráficos/Tabla */}
              <div style={{
                background: '#111',
                borderRadius: '10px',
                padding: '4px',
                display: 'inline-flex',
                border: '1px solid #333'
              }}>
                <button
                  onClick={() => setViewMode('charts')}
                  style={{
                    padding: '10px 20px',
                    background: viewMode === 'charts' ? 'linear-gradient(135deg, #662483, #8e44ad)' : 'transparent',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: viewMode === 'charts' ? '0 4px 15px rgba(102, 36, 131, 0.3)' : 'none'
                  }}
                >
                  <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Gráficos
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  style={{
                    padding: '10px 20px',
                    background: viewMode === 'table' ? 'linear-gradient(135deg, #662483, #8e44ad)' : 'transparent',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: viewMode === 'table' ? '0 4px 15px rgba(102, 36, 131, 0.3)' : 'none'
                  }}
                >
                  <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Tabla
                </button>
              </div>

              {/* Botón CSV */}
              <button
                onClick={exportToCSV}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                CSV
              </button>

              {/* Botón PDF */}
              <button
                onClick={exportToPDF}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                PDF
              </button>
            </div>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        {filteredData.length === 0 ? (
          <div style={{
            background: '#161616',
            border: '1px solid #333',
            borderRadius: '16px',
            padding: '60px 40px',
            textAlign: 'center'
          }}>
            <svg style={{ width: '80px', height: '80px', color: '#666', margin: '0 auto 20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '10px' }}>
              No se encontraron resultados
            </h3>
            <p style={{ color: '#888', fontSize: '1rem' }}>
              No hay cursos que coincidan con los filtros aplicados{searchTerm && `: "${searchTerm}"`}
            </p>
          </div>
        ) : (
          <>
            {/* VISTA DE GRÁFICOS */}
            {viewMode === 'charts' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {/* Gráfico de Barras */}
                <div style={{
                  background: '#161616',
                  border: '1px solid #333',
                  borderRadius: '16px',
                  padding: '30px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #662483, #8e44ad)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '15px',
                      boxShadow: '0 0 20px rgba(102, 36, 131, 0.4)'
                    }}>
                      <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', margin: 0 }}>
                      Distribución por Curso
                    </h2>
                  </div>
                  <ResponsiveContainer width="100%" height={450}>
                    <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
                      <XAxis 
                        dataKey="curso" 
                        angle={-45} 
                        textAnchor="end" 
                        height={120} 
                        interval={0}
                        tick={{ fontSize: 11, fill: '#b0b0b0' }}
                      />
                      <YAxis tick={{ fontSize: 11, fill: '#b0b0b0' }} />
                      <Tooltip 
                        formatter={(value) => [`${value} estudiantes`, 'Cantidad']}
                        contentStyle={{ 
                          backgroundColor: '#1a1a1a', 
                          border: '1px solid #662483',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '20px', color: '#fff' }} />
                      <Bar 
                        dataKey="estudiantes" 
                        fill="url(#purpleGradient)" 
                        radius={[8, 8, 0, 0]}
                        animationDuration={800}
                      />
                      <defs>
                        <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#662483" />
                          <stop offset="100%" stopColor="#8e44ad" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Gráfico de Pastel */}
                <div style={{
                  background: '#161616',
                  border: '1px solid #333',
                  borderRadius: '16px',
                  padding: '30px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #8e44ad, #9b59b6)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '15px',
                      boxShadow: '0 0 20px rgba(142, 68, 173, 0.4)'
                    }}>
                      <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                      </svg>
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', margin: 0 }}>
                      Proporción de Estudiantes
                    </h2>
                  </div>
                  <ResponsiveContainer width="100%" height={500}>
                    <PieChart>
                      <Pie
                        data={filteredData}
                        dataKey="estudiantes"
                        nameKey="curso"
                        cx="50%"
                        cy="50%"
                        outerRadius={180}
                        innerRadius={80}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                        labelLine={true}
                        animationDuration={800}
                      >
                        {filteredData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1a1a1a', 
                          border: '1px solid #662483',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Legend 
                        layout="horizontal" 
                        verticalAlign="bottom"
                        wrapperStyle={{ paddingTop: '20px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* VISTA DE TABLA */}
            {viewMode === 'table' && (
              <div style={{
                background: '#161616',
                border: '1px solid #333',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'linear-gradient(135deg, #662483, #8e44ad)' }}>
                        <th style={{ padding: '18px 24px', textAlign: 'left', fontSize: '0.75rem', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #662483' }}>#</th>
                        <th style={{ padding: '18px 24px', textAlign: 'left', fontSize: '0.75rem', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #662483' }}>Curso</th>
                        <th style={{ padding: '18px 24px', textAlign: 'left', fontSize: '0.75rem', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #662483' }}>Nivel</th>
                        <th style={{ padding: '18px 24px', textAlign: 'center', fontSize: '0.75rem', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #662483' }}>Estudiantes</th>
                        <th style={{ padding: '18px 24px', textAlign: 'center', fontSize: '0.75rem', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #662483' }}>Porcentaje</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item, index) => {
                        const percentage = ((item.estudiantes / totalEstudiantes) * 100).toFixed(2);
                        const isEven = index % 2 === 0;
                        return (
                          <tr 
                            key={index}
                            style={{ 
                              background: isEven ? '#161616' : '#1a1a1a',
                              transition: 'background 0.2s ease'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = '#662483'}
                            onMouseOut={(e) => e.currentTarget.style.background = isEven ? '#161616' : '#1a1a1a'}
                          >
                            <td style={{ padding: '16px 24px', fontSize: '0.9rem', fontWeight: '700', color: '#fff', borderBottom: '1px solid #222' }}>
                              {index + 1}
                            </td>
                            <td style={{ padding: '16px 24px', fontSize: '0.9rem', fontWeight: '600', color: '#fff', borderBottom: '1px solid #222' }}>
                              {item.curso}
                            </td>
                            <td style={{ padding: '16px 24px', fontSize: '0.85rem', color: '#ccc', borderBottom: '1px solid #222' }}>
                              <span style={{
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                background: item.nivel === 'maternal' ? '#a64ca6' :
                                          item.nivel === 'inicial' ? '#b565b5' :
                                          item.nivel === 'egb' ? '#c478c4' :
                                          item.nivel === 'bgu' ? '#d38bd3' : '#e29fe2',
                                color: '#fff'
                              }}>
                                {item.nivel}
                              </span>
                            </td>
                            <td style={{ padding: '16px 24px', textAlign: 'center', borderBottom: '1px solid #222' }}>
                              <span style={{
                                padding: '8px 16px',
                                background: 'linear-gradient(135deg, #662483, #8e44ad)',
                                color: '#fff',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                fontWeight: '800',
                                boxShadow: '0 4px 10px rgba(102, 36, 131, 0.3)'
                              }}>
                                {item.estudiantes}
                              </span>
                            </td>
                            <td style={{ padding: '16px 24px', textAlign: 'center', borderBottom: '1px solid #222' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                                <div style={{ width: '120px', height: '8px', background: '#222', borderRadius: '10px', overflow: 'hidden' }}>
                                  <div style={{
                                    width: `${percentage}%`,
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #662483, #e0aaff)',
                                    borderRadius: '10px',
                                    transition: 'width 0.5s ease'
                                  }}></div>
                                </div>
                                <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '700', minWidth: '55px' }}>
                                  {percentage}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr style={{ background: '#0a0a0a', borderTop: '2px solid #662483' }}>
                        <td colSpan="3" style={{ padding: '18px 24px', fontSize: '0.95rem', fontWeight: '800', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>
                          TOTAL
                        </td>
                        <td style={{ padding: '18px 24px', textAlign: 'center' }}>
                          <span style={{
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, #662483, #3c096c)',
                            color: '#fff',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '900',
                            boxShadow: '0 4px 15px rgba(102, 36, 131, 0.4)'
                          }}>
                            {totalEstudiantes}
                          </span>
                        </td>
                        <td style={{ padding: '18px 24px', textAlign: 'center' }}>
                          <span style={{ color: '#e0aaff', fontSize: '0.95rem', fontWeight: '800' }}>
                            100%
                          </span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Consultas;