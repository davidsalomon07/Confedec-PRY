const { Pool } = require('pg');
require('dotenv').config(); // Para que lea variables de entorno

// Si existe la variable DATABASE_URL (que nos dará Render), la usamos.
// Si no existe, usamos tu conexión local por defecto.
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:123456@localhost:5432/Confedec';

const pool = new Pool({
  connectionString: connectionString,
  // Render exige que las conexiones a la base de datos usen SSL.
  // Solo activamos SSL si estamos usando la URL de la nube.
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

module.exports = pool;