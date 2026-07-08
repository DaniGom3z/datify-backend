# Datify - Backend (API REST)

Datify es una plataforma web modular diseñada para la gestión, visualización y centralización de indicadores clave de rendimiento empresarial (KPIs). Este repositorio contiene el código fuente del servidor (Backend), desarrollado bajo principios de arquitectura limpia, separación de responsabilidades y control de acceso basado en roles (RBAC).


## Instalación

Instala el proyecto con pnpm

```bash
  git clone https://github.com/DaniGom3z/datify-backend.git
  cd datify-backend
  pnpm install
```


## Stack Tecnológico

**Servidor:** Node.js, Express, TypeScript, tsx

**Base de datos:** PostgreSQL, Prisma ORM

**Seguridad:** JSON Web Tokens (JWT), bcrypt

**Documentación:** Swagger UI, OpenAPI 3.0


## Variables de Entorno

Para ejecutar este proyecto, necesitarás agregar las siguientes variables de entorno a tu archivo .env

`PORT`

`DATABASE_URL`

`JWT_SECRET`

`ADMIN_EMAIL`

`ADMIN_PASSWORD`


## Ejecución Local

Ve al directorio del proyecto

```bash
  cd datify-backend
```

Ejecuta las migraciones de la base de datos

```bash
  npx prisma migrate dev --name init
```

Puebla la base de datos con roles predeterminados y cuenta de administrador

```bash
  npx prisma db seed
```

Inicia el servidor

```bash
  pnpm run dev
```


## Referencia de la API

Consulta la documentación de la API con Swagger UI

```http
  GET http://localhost:4000/api-docs
```

#### Autenticación

| Método | Ruta | Permisos |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Público |
| `GET` | `/api/auth/protected` | ADMIN, USER |

#### Gestión de Usuarios

| Método | Ruta | Permisos |
| :--- | :--- | :--- |
| `GET` | `/api/users` | ADMIN |
| `GET` | `/api/users/:id` | ADMIN |
| `POST` | `/api/users` | ADMIN |
| `PUT` | `/api/users/:id` | ADMIN |
| `DELETE` | `/api/users/:id` | ADMIN |

#### Gestión de Indicadores (KPIs)

| Método | Ruta | Permisos |
| :--- | :--- | :--- |
| `GET` | `/api/indicators` | ADMIN, USER |
| `GET` | `/api/indicators/:id` | ADMIN, USER |
| `POST` | `/api/indicators` | ADMIN |
| `PUT` | `/api/indicators/:id` | ADMIN |
| `DELETE` | `/api/indicators/:id` | ADMIN |


## Esquema de Base de Datos (3FN)

Estructura de base de datos optimizada bajo la Tercera Forma Normal (3FN)

- **roles:** Mapeo de roles de acceso (id, name)
- **users:** Mapeo de credenciales y cuentas de usuario (id, name, email, password_hash, role_id)
- **areas:** Mapeo de departamentos de la empresa (id, name, description)
- **indicators:** Mapeo de métricas e indicadores (id, name, description, valor_actual, meta, unidad_medida, area_id, creado_por) 