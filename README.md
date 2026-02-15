# Sistema de Gestión de Información Educativa - CONFEDEC

> **Versión:** 1.0.0  
> **Fecha:** Febrero 2026  
> **Desarrollado para:** Confederación Ecuatoriana de Establecimientos de Educación Católica

## 1. Introducción al Sistema

### 1.1 Descripción del Proyecto
El Sistema de Gestión de Información Educativa CONFEDEC es una plataforma web integral diseñada para centralizar, administrar y visualizar la información de las instituciones educativas afiliadas a la Confederación. Permite la gestión de datos institucionales, personal directivo, estudiantes, paralelos y personal administrativo, facilitando la toma de decisiones basada en datos.

### 1.2 Objetivos del Sistema
- **Centralización:** Unificar la información de todas las instituciones afiliadas en una base de datos segura.
- **Gestión Eficiente:** Facilitar la actualización de datos mediante una interfaz intuitiva.
- **Seguridad:** Implementar un sistema de roles y permisos para proteger la información sensible.
- **Analítica:** Proveer reportes y estadísticas en tiempo real sobre la población estudiantil y docente.

### 1.3 Tecnologías Utilizadas

**Frontend:**
- **React JS (v19.2.0):** Biblioteca principal para la interfaz de usuario.
- **Vite (v7.2.4):** Entorno de desarrollo y construcción ultra rápido.
- **React Router DOM (v7.12.0):** Manejo de rutas y navegación.
- **Recharts (v3.7.0):** Librería para visualización de datos y gráficos.
- **jsPDF & AutoTable:** Generación de reportes PDF dinámicos.

**Backend:**
- **Node.js:** Entorno de ejecución para el servidor.
- **Express (v5.2.1):** Framework web para la API REST.
- **PostgreSQL (pg v8.17.2):** Base de datos relacional robusta.
- **CORS & Dotenv:** Seguridad y configuración de entorno.

**Diseño:**
- **CSS3 Vanilla & CSS Modules:** Estilos personalizados con arquitectura modular.
- **Diseño Responsivo:** Adaptable a dispositivos móviles y escritorio.
- **Paleta Corporativa:** Uso de colores institucionales (Púrpura #662483).

---

## 2. Requisitos del Sistema

### 2.1 Software Obligatorio
- **Node.js:** v18.0.0 o superior.
- **PostgreSQL:** v14.0 o superior.
- **Git:** Para control de versiones.
- **Navegador Web:** Chrome, Firefox, Edge (versiones recientes).

### 2.2 Extensiones Requeridas (VS Code)
- ES7+ React/Redux/React-Native snippets
- ESLint
- Prettier - Code formatter
- PostgreSQL (opcional, para gestión de BD desde el editor)

---

## 3. Guía de Instalación

### 3.1 Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd Confedec-PRY
```

### 3.2 Instalar Dependencias

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
cd ..
```

### 3.3 Configurar Base de Datos
1. Asegúrese de tener PostgreSQL corriendo.
2. Cree una base de datos llamada `Confedec`.
3. Restaure el script SQL proporcionado en `docs/database.sql` (si aplica) o asegúrese de tener la tabla `instituciones` creada.
4. Verifique la configuración en `server/db.js`.

### 3.4 Ejecutar el Sistema

**Servidor Backend:**
```bash
cd server
node index.js
# El servidor correrá en http://localhost:5000
```

**Cliente Frontend:**
```bash
# En una nueva terminal, raíz del proyecto
npm run dev
# La aplicación correrá en http://localhost:5173
```

### 3.5 Credenciales por Defecto
- **Usuario Administrador (Federación):**
  - Usuario: `FEDERACION`
  - Contraseña: `(Consultar al admin)`
- **Institución de Prueba:**
  - Código AMIE: `17H00001`
  - Contraseña: `(Consultar al admin)`

---

## 4. Arquitectura del Proyecto

### 4.1 Estructura de Directorios
```
CONFEDEC-PRY/
├── public/                 # Assets estáticos
├── server/                 # API REST (Node/Express)
│   ├── db.js               # Conexión BD
│   └── index.js            # Endpoints y Lógica
├── src/                    # Código Fuente React
│   ├── layout/             # Componentes de diseño estructural
│   ├── pages/              # Vistas principales (Módulos)
│   └── ...
└── ...
```