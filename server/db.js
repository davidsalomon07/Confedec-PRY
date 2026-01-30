const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Confedec', // <--- CAMBIA ESTO: Usa la 'C' mayúscula
  password: '123456',
  port: 5432,
});

module.exports = pool;