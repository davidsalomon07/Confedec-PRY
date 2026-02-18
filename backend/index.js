const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express(); 

app.use(cors());
app.use(express.json());

// --- RUTA DE LOGIN (La que ya tenías validando contraseña) ---
app.post('/login', async (req, res) => {
  const { usuario, password } = req.body; 

  try {
    const query = 'SELECT * FROM instituciones WHERE amie = $1';
    const values = [usuario];

    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Verificamos contraseña
      if (user.password === password) {
          res.json({ 
            success: true, 
            user: user 
          });
      } else {
          res.status(401).json({ error: "Contraseña incorrecta" });
      }
    } else {
      res.status(401).json({ error: "El Código AMIE no existe" });
    }
  } catch (err) {
    console.error("DETALLE DEL ERROR:", err.message);
    res.status(500).json({ error: "Error en el servidor: " + err.message });
  }
});

// --- RUTA DE INSTITUCIONES: MODIFICADA CON FILTROS DINÁMICOS ---
// Ahora permite recibir parámetros como ?nombre=ABC o ?amie=123
app.get('/instituciones', async (req, res) => {
  try {
    const { nombre, amie } = req.query; // Capturamos los filtros de la URL
    let queryText = 'SELECT * FROM instituciones WHERE 1=1';
    const values = [];

    // Si el Súper Usuario filtra por Nombre
    if (nombre) {
      values.push(`%${nombre}%`);
      // Usamos comillas dobles en "nombreInstitucion" por las mayúsculas en la BD
      queryText += ` AND "nombreInstitucion" ILIKE $${values.length}`;
    }

    // Si el Súper Usuario filtra por AMIE
    if (amie) {
      values.push(amie);
      queryText += ` AND amie = $${values.length}`;
    }

    queryText += ' ORDER BY amie ASC';

    const allInstitutions = await pool.query(queryText, values);
    res.json(allInstitutions.rows);
  } catch (err) {
    console.error("Error al obtener las instituciones:", err.message);
    res.status(500).send("Error al obtener las instituciones");
  }
});

// --- RUTA DE PRUEBA (La que ya tenías) ---
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