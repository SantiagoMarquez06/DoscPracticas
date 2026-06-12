# Herramientas Total

Proyecto React + backend Node/Express para gestion de productos, categorias, clientes y ventas de una tienda de herramientas. El frontend consume la API con rutas relativas bajo `/api`, por lo que funciona en local, Docker Compose y Coolify sin dominios separados para el backend.

## Requisitos

- Node.js 20 o superior
- npm o Bun
- Docker y Docker Compose para despliegue local con contenedores
- SQL Server / SSMS para la base de datos

## Frontend local

El frontend usa rutas relativas bajo `/api`. En desarrollo, Vite debe reenviar esas rutas al backend local.

1. Crea `frontend-app/.env`:

```env
VITE_DEV_API_PROXY_TARGET=http://localhost:3000
```

2. Instala dependencias y levanta Vite:

```bash
cd frontend-app
npm install
npm run dev
```

Tambien puedes usar Bun:

```bash
cd frontend-app
bun install
bun run dev
```

La aplicacion queda disponible en `http://localhost:5173`. El backend debe estar corriendo en `http://localhost:3000` para que el login y las pantallas administrativas consuman `/api` correctamente.

Credenciales de desarrollo, si corriste `node seedAdmin.js` en el backend:

```text
Email: admin@admin.com
Password: admin
```

## Build del frontend

```bash
cd frontend-app
npm run build
```

O con Bun:

```bash
cd frontend-app
bun run build
```

## Docker Compose

1. Copia `.env.example` a `.env`.
2. Completa al menos `DB_USER`, `DB_PASSWORD` y `JWT_SECRET`.
3. Si SQL Server corre en tu Windows y Docker Desktop levanta los contenedores, usa:

```env
DB_HOST=host.docker.internal
DB_PORT=1433
DB_NAME=tienda
DB_USER=tu_usuario_sql_server
DB_PASSWORD=tu_password_sql_server
DB_DIALECT=mssql
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
```

Si usas una instancia nombrada como `SQLEXPRESS`, puedes usar:

```env
DB_HOST=host.docker.internal
DB_INSTANCE=SQLEXPRESS
DB_PORT=
```

4. Levanta los servicios:

```bash
docker compose up --build
```

El compose levanta solo `backend` y `frontend`. No levanta PostgreSQL ni SQL Server; la base de datos es tu SQL Server existente de SSMS. El frontend queda publicado en el puerto configurado por `FRONTEND_PORT` y Nginx envia:

- `/api/*` al backend Node.
- `/docs` a Swagger del backend.
- `/api-docs.json` al esquema OpenAPI.

## Rutas

- `/` Landing page publica.
- `/login` Login administrativo.
- `/admin` Dashboard protegido.
- `/admin/productos` CRUD de productos.
- `/admin/categorias` CRUD de categorias.
- `/admin/clientes` Listado de clientes.
- `/admin/ventas` Listado de ventas.
- `/docs` Swagger del backend.

## Coolify

En Coolify asigna el dominio publico solo al servicio `frontend`, puerto `80`. No publiques un dominio independiente para `backend`; el contenedor frontend proxya las rutas `/api` y `/docs` hacia el servicio interno `backend:3000`.

Variables minimas en Coolify:

```env
DB_HOST=
DB_PORT=1433
DB_NAME=tienda
DB_USER=
DB_PASSWORD=
DB_DIALECT=mssql
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
JWT_SECRET=
```

Variables utiles:

```env
API_PORT=
NODE_ENV=
CORS_ORIGIN=
FRONTEND_PORT=
DB_INSTANCE=
```

## Antes de commitear

- Verifica que no exista un archivo `.env` versionado.
- Revisa que `DB_PASSWORD`, `JWT_SECRET`, tokens y credenciales reales no esten en git.
- Ejecuta `npm run build` o `bun run build` dentro de `frontend-app`.
- Levanta `docker compose up --build` y revisa `/`, `/login`, `/admin` y `/docs`.
