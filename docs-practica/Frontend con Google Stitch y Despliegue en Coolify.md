
**Institución:** Universidad Católica de Cuenca (UCACUE)
**Estudiante:** Kevin David Mora Rivera
**Asignatura / Módulo:** Herramientas de Programación
**Fecha:** 11/09/2026

---

## 1. Objetivo de la Práctica
Desarrollar e integrar el frontend de una aplicación web para la gestión de herramientas utilizando Google Stitch para el prototipado rápido de UI, React para la lógica de la aplicación y Coolify para el despliegue final usando contenedores.

---

## 2. Paso 1 — Diseño con Google Stitch

En esta fase se utilizó la herramienta Google Stitch para generar las interfaces base de la aplicación. A continuación se detallan los prompts utilizados y las capturas de los resultados exportados en HTML/CSS.

### 2.1 Landing Page
* **Prompt utilizado:** *"Generar una Landing Page moderna para una plataforma de herramientas. Debe incluir un hero section con el nombre de la app, un eslogan atractivo, un botón de 'Call to Action' (Empezar). También debe tener una sección de características principales, una grilla con categorías de herramientas y un footer."*
* **Captura de pantalla:**
![[Captura de pantalla 2026-06-11 a la(s) 1.07.53 p. m..png]]

### 2.2 Pantallas del Panel de Administración (Admin)
Se generaron las siguientes vistas para el dashboard administrativo:

* **Login:**
    * **Prompt:** *"Crear una pantalla de login minimalista con campos para correo electrónico y contraseña, y un botón de inicio de sesión."*
    * **Captura:** 
    ![[Captura de pantalla 2026-06-11 a la(s) 1.08.24 p. m..png]]
* **Dashboard Principal:**
    * **Prompt:** *"Crear un dashboard de administración con un sidebar lateral de navegación (Dashboard, Productos, Categorías, Clientes, Ventas) y tarjetas de resumen en la vista principal."*
    * **Captura:** ![[Captura de pantalla 2026-06-11 a la(s) 1.08.39 p. m..png]]
* **Productos (Tabla CRUD y Formulario):**
    * **Prompt:** *"Crear una vista con una tabla de datos para gestionar productos, incluyendo botones de acción (editar, eliminar). Además, diseñar un formulario modal o en página separada para crear/editar un producto."*
    * **Captura:** ![[Captura de pantalla 2026-06-11 a la(s) 1.09.05 p. m..png]]
* **Categorías:**
    * **Prompt:** *"Diseñar una vista para la administración de categorías de herramientas. Debe contener una tabla de datos con columnas para el ID, nombre de la categoría, descripción y cantidad de productos asociados, además de botones de acción para editar y eliminar, junto con un botón destacado para añadir nueva categoría."*
    * **Captura:** ![[Stitch_Categorias.png]]
* **Clientes:**
    * **Prompt:** *"Crear una pantalla de control de clientes para el sistema de administración de herramientas. Debe incluir una lista tabular de clientes con información de contacto (nombre, email, teléfono), dirección, estado de la cuenta (activo/inactivo) y opciones de búsqueda rápida."*
    * **Captura:** ![[Stitch_Clientes.png]]
* **Ventas:**
    * **Prompt:** *"Generar una interfaz para el registro e historial de ventas de herramientas. Debe mostrar un resumen de facturas emitidas en una tabla (ID transacción, cliente, fecha, total, estado de pago) e incluir tarjetas con indicadores rápidos de ingresos."*
    * **Captura:** ![[Stitch_Ventas.png]]

---

## 3. Paso 2 — Integración en React (frontend-app)

El código estático exportado de Google Stitch fue adaptado para estructurar una aplicación dinámica en **React (TypeScript)** utilizando Vite como herramienta de construcción.

### 3.1 Arquitectura y Enrutamiento

Se configuró el enrutamiento de la aplicación mediante la librería `react-router-dom`. La arquitectura define rutas públicas (accesibles para cualquier usuario) y rutas privadas protegidas bajo un componente de envoltura (`ProtectedRoute`), asegurando que solo usuarios autenticados puedan ingresar al panel de administración.

Las rutas implementadas son:
* **Públicas:**
  * `/` (Landing Page con el catálogo público y categorías)
  * `/login` (Acceso de administradores)
* **Privadas (Bajo `/admin`):**
  * `/admin` (Dashboard principal con métricas)
  * `/admin/productos` (Gestión CRUD de inventario)
  * `/admin/categorias` (Gestión CRUD de categorías de herramientas)
  * `/admin/clientes` (Listado y control de usuarios y clientes)
  * `/admin/ventas` (Historial de transacciones y facturación)

#### Fragmento de Código: Configuración de Rutas (`src/App.tsx`)
```tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/admin/Dashboard';
import Productos from './pages/admin/Productos';
import Categorias from './pages/admin/Categorias';
import Clientes from './pages/admin/Clientes';
import Ventas from './pages/admin/Ventas';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas Privadas Protegidas */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="productos" element={<Productos />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="ventas" element={<Ventas />} />
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
```

#### Fragmento de Código: Control de Acceso (`src/components/ProtectedRoute.tsx`)
```tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('jwt_token');

  if (!token) {
    // Redirige al login si no se encuentra un token activo
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
```

### 3.2 Cliente HTTP y Autenticación

El consumo de los endpoints expuestos por la API de Node.js se centralizó en un cliente HTTP usando la librería Axios. Siguiendo las directrices del proyecto, se estableció un `baseURL` dinámico (`/api`), permitiendo al proxy de Nginx en producción canalizar el tráfico interno de forma transparente.

* **Login (`POST /api/auth/login`):** Al iniciar sesión de manera exitosa, el token devuelto se almacena en el `localStorage`.
* **Interceptor de Seguridad:** Se configuró un interceptor de peticiones que adjunta el JWT de forma automática en el encabezado `Authorization: Bearer <token>` de cada consulta de datos al backend.

#### Fragmento de Código: Configuración del Cliente HTTP (`src/services/api.ts`)
```typescript
import axios from 'axios';

// baseURL configurada dinámicamente como ruta relativa
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar automáticamente el token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
```

### 3.3 Implementación de CRUDs y Control de Estados

Para las secciones de **Productos** y **Categorías** se implementó un CRUD interactivo completo (crear, leer, actualizar, eliminar) estructurado sobre ventanas modales y formularios reactivos. Para las vistas de **Clientes** y **Ventas**, se integraron tablas dinámicas con opciones de búsqueda.

Se agregaron estados explícitos de carga (`isLoading`) y errores (`error`) para notificar visualmente al usuario durante operaciones asíncronas de red, previniendo acciones duplicadas no deseadas.

#### Fragmento de Código: CRUD Típico con Manejo de Estados (`src/pages/admin/Categorias.tsx`)
```tsx
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

const Categorias: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategorias = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/categorias');
      setCategorias(response.data);
    } catch (err: any) {
      setError('Error al cargar las categorías. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const deleteCategoria = async (id: number) => {
    if (!confirm('¿Está seguro de eliminar esta categoría?')) return;
    try {
      await api.delete(`/categorias/${id}`);
      setCategorias(categorias.filter((cat) => cat.id !== id));
    } catch (err) {
      alert('No se pudo eliminar la categoría seleccionada.');
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Categorías</h2>
        <button className="btn btn-primary" onClick={fetchCategorias}>Actualizar</button>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando datos...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="table-responsive bg-white rounded shadow-sm p-3">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td>{cat.nombre}</td>
                  <td>{cat.descripcion}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteCategoria(cat.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Categorias;
```

---

## 4. Paso 3 — Despliegue con Coolify

El despliegue automatizado se realizó mediante **Coolify**, una plataforma open-source autohospedada para la gestión de aplicaciones y bases de datos en contenedores. 

### 4.1 Configuración de la Infraestructura

* **Docker Compose:** Se configuró un recurso de Docker Compose en Coolify conectado a la rama principal del repositorio de GitHub. El archivo orquesta el contenedor del frontend (Nginx sirviendo los archivos estáticos de React) y el contenedor de la API de Node.js.
* **Seguridad y Variables de Entorno:** Se definieron variables obligatorias en la sección de variables de entorno de Coolify para el backend (`DB_PASSWORD` y `JWT_SECRET`), garantizando que no existan credenciales escritas en el código fuente.
* **Redes y Dominios (Proxy Inverso):**
  * Se asignó el dominio público autogenerado por Coolify exclusivamente al puerto 80 del servicio de Frontend.
  * La API se configuró para no ser expuesta al internet de forma directa. Toda petición entrante al dominio público bajo el prefijo `/api` es canalizada a través del proxy inverso interno de Nginx hacia el contenedor de la API (puerto `4005`), garantizando un punto de entrada unificado y seguro.

### 4.2 Evidencia del Despliegue

* **URL Pública de la Aplicación:** [http://noface-front.100.120.223.125.sslip.io](http://noface-front.100.120.223.125.sslip.io)
* **Evidencias Visuales de Producción:**

  * *Vista de la Landing Page desplegada en Coolify:*
    ![[Captura de pantalla 2026-06-11 a la(s) 1.09.45 p. m..png]]

  * *Vista del Panel Administrativo cargando datos en producción:*
    ![[Captura de pantalla 2026-06-11 a la(s) 1.10.51 p. m..png]]

---

## 5. Instrucciones para Ejecución Local

Para levantar y probar el entorno de desarrollo del frontend de forma local, sigue las instrucciones a continuación:

### 5.1 Requisitos Previos
* Tener instalado [Bun](https://bun.sh/) (gestor de paquetes y motor de ejecución rápido de JavaScript).
* El backend debe estar corriendo localmente en el puerto `4005`, o bien debe haber un entorno de API accesible.

### 5.2 Pasos de Instalación y Ejecución

1. **Clonar el repositorio de la aplicación:**
   ```bash
   git clone https://github.com/noface-00/Herramientas.git
   ```

2. **Acceder a la carpeta del frontend:**
   ```bash
   cd frontend-app
   ```

3. **Instalar todas las dependencias del proyecto:**
   ```bash
   bun install
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   bun run dev
   ```
   *Esto iniciará la aplicación localmente en `http://localhost:5173`.*

5. **Compilar para producción (Build):**
   ```bash
   bun run build
   ```
   *La compilación se generará dentro de la carpeta `dist/` libre de errores sintácticos o de linter.*

### 5.3 Configuración del Servidor de Desarrollo (Vite Proxy)

Para evitar errores de CORS (Cross-Origin Resource Sharing) durante el desarrollo local, y mantener la coherencia del cliente Axios apuntando a `/api`, se configuró el servidor de Vite para actuar como proxy local hacia el puerto de la API de Node.js (`http://localhost:4005`):

#### Configuración de Referencia (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4005', // Endpoint del backend local
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remueve /api al reenviar la petición
      },
    },
  },
});
```