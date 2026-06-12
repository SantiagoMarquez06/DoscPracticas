# Herramientas Total

Proyecto React + backend Node/Express para gestion de productos, categorias, clientes y ventas de una tienda de herramientas. El frontend consume la API con rutas relativas bajo `/api`, por lo que funciona en local, Docker Compose y Coolify sin dominios separados para el backend.

## Requisitos

- Node.js 20 o superior
- npm o Bun
- Docker y Docker Compose para despliegue local con contenedores
- SQL Server / SSMS para la base de datos

## Frontend local

El frontend usa rutas relativas bajo `/api`; no tiene URLs absolutas del backend en el codigo. En desarrollo, Vite reenvia esas rutas al backend local usando `VITE_DEV_API_PROXY_TARGET`.

1. Prepara y levanta el backend local.

   Crea `herramientas-node-api/.env` tomando como base `herramientas-node-api/.env.example`. Para SQL Server local/SSMS puedes usar, por ejemplo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=1433
DB_NAME=tienda
DB_USER=sa
DB_PASSWORD=tu_password_sql_server
DB_DIALECT=mssql
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
DB_SYNC_ALTER=false
DB_CONNECT_RETRIES=30
DB_CONNECT_RETRY_DELAY_MS=5000
JWT_SECRET=un_secreto_local
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=admin
NODE_ENV=development
```

   Luego instala dependencias y arranca la API:

```bash
cd herramientas-node-api
npm install
npm run start
```

   El backend queda escuchando en `http://localhost:3000`, con Swagger en `http://localhost:3000/docs`.

2. Crea `frontend-app/.env`:

```env
VITE_DEV_API_PROXY_TARGET=http://localhost:3000
```

3. Instala dependencias y levanta Vite:

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

La aplicacion queda disponible en `http://localhost:5173`. Aunque el navegador abra ese puerto, las llamadas del frontend se hacen a `/api`; Vite las proxya al backend configurado en `VITE_DEV_API_PROXY_TARGET`.

Credenciales de desarrollo si usaste las variables anteriores:

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

## Docker Compose / Coolify

1. Copia `.env.example` a `.env`.
2. Completa al menos `DB_PASSWORD`, `JWT_SECRET` y, para el primer acceso, `ADMIN_PASSWORD`.
3. Usa una contrasena fuerte para SQL Server. Debe tener mayuscula, minuscula, numero y simbolo.

```env
DB_HOST=sqlserver
DB_PORT=1433
DB_NAME=tienda
DB_USER=sa
DB_PASSWORD=Herramientas123..
DB_DIALECT=mssql
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
JWT_SECRET=cambia-este-secreto
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=Admin123..
DB_CONNECT_RETRIES=30
DB_CONNECT_RETRY_DELAY_MS=5000
```

4. Para Docker local, levanta los servicios con el override local:

```bash
docker compose -f docker-compose.yml -f docker-compose.local.yml up --build
```

El compose levanta `sqlserver`, `backend` y `frontend`. El backend crea la base `tienda` si no existe, sincroniza las tablas con Sequelize y crea/actualiza el admin inicial cuando `ADMIN_EMAIL` y `ADMIN_PASSWORD` tienen valor. En Docker local, `docker-compose.local.yml` publica el frontend en el puerto configurado por `FRONTEND_PORT`. Nginx envia:

- `/api/*` al backend Node.
- `/docs` a Swagger del backend.
- `/api-docs.json` al esquema OpenAPI.

Si quieres conectarte desde SSMS, usa:

```text
Servidor: IP_O_DOMINIO_DE_LA_VM,1433
Usuario: sa
Contrasena: valor de DB_PASSWORD
```

En una VM Ubuntu debes permitir el puerto `1433` en el firewall solo si necesitas acceso remoto por SSMS.

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

En Coolify asigna el dominio publico solo al servicio `frontend`, puerto interno `80`. No publiques un dominio independiente para `backend`; el contenedor frontend proxya las rutas `/api` y `/docs` hacia el servicio interno `backend:3000`.

No configures `FRONTEND_PORT=80` en Coolify ni hagas bind manual del puerto `80` del host, porque ese puerto lo usa el proxy de Coolify. El archivo principal `docker-compose.yml` usa `expose: 80` para que Coolify enrute internamente.

Variables minimas en Coolify:

```env
DB_HOST=sqlserver
DB_PORT=1433
DB_NAME=tienda
DB_USER=sa
DB_PASSWORD=
DB_DIALECT=mssql
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
JWT_SECRET=
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=
MSSQL_PID=Express
SQLSERVER_PORT=1433
DB_CONNECT_RETRIES=30
DB_CONNECT_RETRY_DELAY_MS=5000
```

Variables utiles:

```env
NODE_ENV=
CORS_ORIGIN=
DB_INSTANCE=
```

## Antes de commitear

- Verifica que no exista un archivo `.env` versionado.
- Revisa que `DB_PASSWORD`, `JWT_SECRET`, tokens y credenciales reales no esten en git.
- Ejecuta `npm run build` o `bun run build` dentro de `frontend-app`.
- Levanta `docker compose -f docker-compose.yml -f docker-compose.local.yml up --build` y revisa `/`, `/login`, `/admin` y `/docs`.
