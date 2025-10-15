# Library Backend API

API REST para gestión de bibliotecas, desarrollada con Node.js, Express y MySQL.

## 📋 Descripción

Sistema backend para administración de bibliotecas que permite gestionar libros, miembros, préstamos, géneros y bibliotecas. Implementa una arquitectura en capas con validaciones, manejo de errores y relaciones entre entidades.

## 🚀 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express 5.1.0** - Framework web
- **MySQL 8.0** - Base de datos relacional
- **Sequelize 6.37.7** - ORM para Node.js
- **Zod 4.1.12** - Validación de esquemas
- **Day.js 1.11.18** - Formateo de fechas
- **Docker & Docker Compose** - Contenedorización de MySQL
- **Nodemon** - Desarrollo con auto-reload

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)
- Un editor de código (recomendado: VS Code)

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd Library_backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo de ejemplo `env.example` a `.env`:

```bash
# En Windows (PowerShell)
copy env.example .env

# En Linux/Mac
cp env.example .env
```

El archivo `.env` contiene las siguientes variables:

```env
# Configuración de Base de Datos
DB_NAME=library_db
DB_USER=jotazz
DB_PASS=Colombia2025.
DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql

# Puerto del servidor
PORT=5000
```

> **⚠️ Importante:** El archivo `.env` no se sube al repositorio por seguridad. Asegúrate de configurarlo localmente.

### 4. Iniciar MySQL con Docker

Asegúrate de que Docker Desktop esté ejecutándose, luego:

```bash
docker-compose up -d
```

Verifica que el contenedor esté corriendo:

```bash
docker ps
```

Deberías ver un contenedor llamado `library_mysql`.

### 5. Crear la base de datos

```bash
npx sequelize-cli db:create
```

### 6. Ejecutar migraciones

Las migraciones crean las tablas en la base de datos:

```bash
npx sequelize-cli db:migrate
```

### 7. Ejecutar seeders (Opcional)

Los seeders insertan datos de prueba:

```bash
npx sequelize-cli db:seed:all
```

### 8. Iniciar el servidor

```bash
npm run dev
```

El servidor estará corriendo en `http://localhost:5000` (o el puerto configurado en `.env`)

## en el archivo api.http
encontraras las url de los endpoints para probar directamente, pero para que funcione debe instalar la extension REST Client y listo 

## 🗃️ Base de Datos

### Relaciones

- **Libraries** → Tienen muchos **Books**
- **Books** → Pertenecen a una **Library**
- **Books** ↔ **Genres** (Muchos a muchos)
- **Books** → Tienen muchos **Loans**
- **Members** → Tienen muchos **Loans**
- **Loans** → Pertenecen a un **Book** y un **Member**

### Comandos Sequelize

```bash
# Ejecutar migraciones
npx sequelize-cli db:migrate

# Ejecutar seeders
npx sequelize-cli db:seed:all

# Revertir seeders
npx sequelize-cli db:seed:undo:all

# Revertir migraciones
npx sequelize-cli db:migrate:undo:all
```

## 🐳 Comandos Docker

```bash
# Iniciar MySQL
docker-compose up -d

# Detener MySQL
docker-compose down

# Ver logs
docker-compose logs mysql
```

## ⚠️ Solución de Problemas

### Error: "Cannot connect to database"

1. Verifica que Docker Desktop esté ejecutándose
2. Verifica que el contenedor MySQL esté corriendo: `docker ps`
3. Revisa los logs: `docker-compose logs mysql`
4. Verifica las credenciales en el archivo `.env`

### Error: "Port 3306 already in use"

Si tienes MySQL instalado localmente:
- Detén el servicio local de MySQL
- O cambia el puerto en `docker-compose.yml`: `"3307:3306"`
- Actualiza `DB_PORT=3307` en tu `.env`

### Error: "Table doesn't exist"

Ejecuta las migraciones:
```bash
npx sequelize-cli db:migrate
```

### Resetear base de datos

```bash
npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## 📝 Notas Importantes

- El proyecto usa **ES Modules** (`type: "module"` en `package.json`)
- Las migraciones y seeders usan CommonJS (archivos `.cjs`)
- Todas las validaciones se realizan con **Zod**
- La arquitectura sigue el patrón **Repository-Service-Controller**
- Los datos persisten en volúmenes de Docker
- **Formateo de fechas automático:**
  - Fechas con hora: `YYYY-MM-DD HH:mm:ss` (ej: `2025-10-14 23:41:39`)
  - Fechas sin hora: `YYYY-MM-DD` (ej: `1990-05-15`)
  - El backend formatea automáticamente todas las fechas que recibe
- **Valores por defecto:**
  - `cover_url` en libros: Si se envía vacío, usa una URL por defecto
  - `loan_date`: Si no se envía, usa la fecha actual
  - `returned_at` al devolver: Si no se envía, usa la fecha actual

## 👤 Autor

Jesus Alvarez

## 📄 Licencia

ISC

