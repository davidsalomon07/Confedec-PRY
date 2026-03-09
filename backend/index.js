const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// ==================== CORS MEJORADO (para Vercel y producción) ====================
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://confedec-pry.vercel.app',
  'https://confedec-pry-git-*.vercel.app'  // para previews de Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.some(o => origin.includes(o))) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// ==================== RUTAS (todas tus rutas originales) ====================

// --- RUTA DE LOGIN (INTELIGENTE: MULTI-ROL) ---
app.post('/login', async (req, res) => {
  const { usuario, password } = req.body; 

  try {
    // 1. PRIMERO BUSCAMOS SI ES UN ADMINISTRADOR
    const queryAdmin = 'SELECT * FROM usuarios_admin WHERE usuario = $1';
    const resultAdmin = await pool.query(queryAdmin, [usuario]);

    if (resultAdmin.rows.length > 0) {
      const adminUser = resultAdmin.rows[0];

      if (adminUser.password === password) {
        return res.json({ 
          success: true, 
          user: {
            amie: adminUser.usuario,
            nombreInstitucion: adminUser.rol === 'admin_nacional' ? 'SISTEMA CONFEDEC NACIONAL' : `FEDERACIÓN ${adminUser.usuario.split('_')[1].toUpperCase()}`,
            rol: adminUser.rol,
            scope: adminUser.scope
          } 
        });
      } else {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }
    }

    // 2. SI NO ES ADMIN, BUSCAMOS SI ES UN COLEGIO
    const queryEscuela = 'SELECT * FROM instituciones WHERE amie = $1';
    const resultEscuela = await pool.query(queryEscuela, [usuario]);

    if (resultEscuela.rows.length > 0) {
      const schoolUser = resultEscuela.rows[0];

      if (schoolUser.password === password) {
        return res.json({ 
          success: true, 
          user: {
            ...schoolUser,
            rol: 'institucion',
            scope: schoolUser.amie
          } 
        });
      } else {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }
    }

    return res.status(401).json({ error: "El Usuario o Código AMIE no existe" });

  } catch (err) {
    console.error("DETALLE DEL ERROR:", err.message);
    res.status(500).json({ error: "Error en el servidor: " + err.message });
  }
});

// --- RUTA DE INSTITUCIONES: MODIFICADA CON FILTROS Y JOIN ---
app.get('/instituciones', async (req, res) => {
  try {
    const { nombre, amie } = req.query;
    
    let queryText = 'SELECT i.*, u."CANTON" as "Canton" FROM instituciones i LEFT JOIN ubicacion u ON i.amie = u.amie WHERE 1=1';
    const values = [];

    if (nombre) {
      values.push(`%${nombre}%`);
      queryText += ` AND i."nombreInstitucion" ILIKE $${values.length}`;
    }

    if (amie) {
      values.push(amie);
      queryText += ` AND i.amie = $${values.length}`;
    }

    queryText += ' ORDER BY i.amie ASC';

    const allInstitutions = await pool.query(queryText, values);
    res.json(allInstitutions.rows);
  } catch (err) {
    console.error("Error al obtener las instituciones:", err.message);
    res.status(500).send("Error al obtener las instituciones");
  }
});

// --- RUTA PARA ACTUALIZAR ESTADO ---
app.put('/instituciones/:amie/estado', async (req, res) => {
  const { amie } = req.params;
  const { estado } = req.body;

  try {
    const updateQuery = 'UPDATE instituciones SET estado = $1 WHERE amie = $2 RETURNING *';
    const result = await pool.query(updateQuery, [estado, amie]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Institución no encontrada" });
    }

    res.json({ 
      success: true, 
      message: `Estado actualizado correctamente para ${amie}`,
      institucion: result.rows[0]
    });
  } catch (err) {
    console.error("Error al actualizar el estado:", err.message);
    res.status(500).json({ error: "Error interno del servidor al actualizar estado" });
  }
});

// --- RUTA DE PRUEBA ---
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); 
    res.json({ message: "¡Conectado con éxito!", time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== PUERTO ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});