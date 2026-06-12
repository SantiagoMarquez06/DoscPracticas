# Informe de practica: Frontend React y despliegue en Coolify

## Datos generales

- Institucion:
- Estudiante:
- Asignatura:
- Fecha:

## Objetivo

Desarrollar una aplicacion frontend en React para un sistema de herramientas, conectada a un backend Node mediante `/api` y desplegable con Docker Compose/Coolify usando un unico dominio publico para el frontend.

## Prompts usados en Google Stitch

### Landing page

Prompt:

Captura:

### Login

Prompt:

Captura:

### Dashboard

Prompt:

Captura:

### Productos

Prompt:

Captura:

### Categorias

Prompt:

Captura:

### Clientes

Prompt:

Captura:

### Ventas

Prompt:

Captura:

## Integracion en React

Rutas implementadas:

- `/`
- `/login`
- `/admin`
- `/admin/productos`
- `/admin/categorias`
- `/admin/clientes`
- `/admin/ventas`

Cliente HTTP:

- Base por defecto: `/api`.
- Token JWT leido desde `localStorage`.
- Header enviado: `Authorization: Bearer <token>`.

## Despliegue en Coolify

URL publica de Coolify:

Servicio con dominio publico:

Puerto publico:

Variables configuradas:

- `DB_PASSWORD`
- `JWT_SECRET`
- `DB_NAME`
- `DB_USER`
- `CORS_ORIGIN`
- `FRONTEND_PORT`

## Capturas de app desplegada

Landing:

Login:

Dashboard:

Productos:

Categorias:

Clientes:

Ventas:

Swagger `/docs`:

## Validaciones finales

Comandos ejecutados:

```bash
cd frontend-app
npm install
npm run build
```

Resultado:

Observaciones:
