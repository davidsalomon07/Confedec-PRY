const { Pool } = require('pg');
require('dotenv').config();

// ====================== CONEXIÓN A LA BASE DE DATOS ======================
const connectionString = process.env.DATABASE_URL || 
  'postgresql://postgres:123456@localhost:5432/Confedec';

const pool = new Pool({
  connectionString,
  // Render usa certificados SSL que no son verificados por defecto
  ssl: process.env.DATABASE_URL 
    ? { rejectUnauthorized: false } 
    : false
});

// ==================== PRUEBA DE CONEXIÓN (solo una vez) ====================
const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ ¡Conectado exitosamente a PostgreSQL!');
    console.log('   Hora del servidor:', res.rows[0].now);
  } catch (err) {
    console.error('❌ Error de conexión a la base de datos:');
    console.error(err.message);
  }
};

// Ejecutamos la prueba solo una vez cuando se carga el archivo
testConnection();

module.exports = pool;