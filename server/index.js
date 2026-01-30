const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express(); // <--- Esto es lo que faltaba definir

app.use(cors());
app.use(express.json());

// --- RUTA DE LOGIN (Conectada a tu tabla 'instituciones') ---
app.post('/login', async (req, res) => {
  const { usuario } = req.body; 

  try {
    // Usamos la tabla 'instituciones' y la columna 'amie' que vimos en tu pgAdmin
    const query = 'SELECT * FROM instituciones WHERE amie = $1';
    const values = [usuario];

    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      // Si el AMIE existe, mandamos los datos al frontend
      res.json({ 
        success: true, 
        user: result.rows[0] 
      });
    } else {
      res.status(401).json({ error: "El Código AMIE no existe" });
    }
  } catch (err) {
    // Si hay un error de base de datos, lo verás en la terminal
    console.error("DETALLE DEL ERROR:", err.message);
    res.status(500).json({ error: "Error en el servidor: " + err.message });
  }
});

// Ruta de prueba para verificar conexión
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); 
    res.json({ message: "¡Conectado con éxito!", time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Servidor backend corriendo en http://localhost:5000");
});