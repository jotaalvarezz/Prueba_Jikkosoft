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
PORT=3000
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

El servidor estará corriendo en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
Library_backend/
├── config/                 # Configuración de base de datos
│   ├── config.js          # Configuración de Sequelize
│   ├── config.cjs         # Configuración para Sequelize CLI
│   └── database.js        # Instancia de Sequelize
├── controllers/           # Controladores (manejo de requests/responses)
│   ├── bookController.js
│   ├── genreController.js
│   ├── libraryController.js
│   ├── loanController.js
│   └── memberController.js
├── services/              # Lógica de negocio
│   ├── bookService.js
│   ├── genreService.js
│   ├── libraryService.js
│   ├── loanService.js
│   └── memberService.js
├── repositories/          # Acceso a datos
│   ├── bookRepository.js
│   ├── genreRepository.js
│   ├── libraryRepository.js
│   ├── loanRepository.js
│   └── memberRepository.js
├── models/                # Modelos de Sequelize
│   ├── bookModel.js
│   ├── genreModel.js
│   ├── libraryModel.js
│   ├── loanModel.js
│   ├── memberModel.js
│   └── modelsES.js       # Exportación centralizada
├── schemas/               # Validaciones con Zod
│   ├── bookSchema.js
│   ├── genreSchema.js
│   ├── librarySchema.js
│   ├── loanSchema.js
│   └── memberSchema.js
├── routes/                # Definición de rutas
│   ├── bookRouter.js
│   ├── genreRouter.js
│   ├── libraryRouter.js
│   ├── loanRouter.js
│   ├── memberRouter.js
│   └── routes.js         # Router principal
├── middlewares/           # Middlewares personalizados
│   └── cors.js
├── migrations/            # Migraciones de base de datos
├── seeders/              # Datos de prueba
├── app.js                # Punto de entrada de la aplicación
├── docker-compose.yml    # Configuración de Docker
├── package.json          # Dependencias del proyecto
└── .env                  # Variables de entorno (crear manualmente)
```

## 🔌 Endpoints de la API

### Bibliotecas (Libraries)

- `GET /api/libraries` - Obtener todas las bibliotecas
- `GET /api/libraries/:id` - Obtener una biblioteca por ID
- `POST /api/libraries` - Crear nueva biblioteca
- `PATCH /api/libraries/:id` - Actualizar biblioteca
- `DELETE /api/libraries/:id` - Eliminar biblioteca
- `GET /api/libraries/:id/books` - Obtener libros de una biblioteca

### Libros (Books)

- `GET /api/books` - Obtener todos los libros
- `GET /api/books/:id` - Obtener un libro por ID
- `POST /api/books` - Crear nuevo libro
- `PATCH /api/books/:id` - Actualizar libro
- `DELETE /api/books/:id` - Eliminar libro
- `GET /api/books/:id/loans` - Obtener préstamos de un libro
- `GET /api/books/:id/genres` - Obtener géneros de un libro

### Géneros (Genres)

- `GET /api/genres` - Obtener todos los géneros
- `GET /api/genres/:id` - Obtener un género por ID
- `POST /api/genres` - Crear nuevo género
- `PATCH /api/genres/:id` - Actualizar género
- `DELETE /api/genres/:id` - Eliminar género
- `GET /api/genres/:id/books` - Obtener libros de un género

### Miembros (Members)

- `GET /api/members` - Obtener todos los miembros
- `GET /api/members/:id` - Obtener un miembro por ID
- `POST /api/members` - Crear nuevo miembro
- `PATCH /api/members/:id` - Actualizar miembro
- `DELETE /api/members/:id` - Eliminar miembro
- `GET /api/members/:id/loans` - Obtener préstamos de un miembro
- `GET /api/members/:id/active-loans` - Obtener préstamos activos de un miembro

### Préstamos (Loans)

- `GET /api/loans` - Obtener todos los préstamos
- `GET /api/loans/:id` - Obtener un préstamo por ID
- `POST /api/loans` - Crear nuevo préstamo
- `PATCH /api/loans/:id` - Actualizar préstamo
- `DELETE /api/loans/:id` - Eliminar préstamo
- `PATCH /api/loans/:id/return` - Marcar libro como devuelto
- `GET /api/loans/active` - Obtener préstamos activos

## 🧪 Ejemplos de Uso

### Crear una biblioteca

```bash
POST http://localhost:3000/api/libraries
Content-Type: application/json

{
  "name": "Biblioteca Central",
  "address": "Calle 123 #45-67",
  "phone": "3001234567",
  "email": "central@biblioteca.com"
}
```

### Crear un libro

```bash
POST http://localhost:3000/api/books
Content-Type: application/json

{
  "name": "Cien Años de Soledad",
  "author": "Gabriel García Márquez",
  "library_id": 1,
  "description": "Historia de la familia Buendía a lo largo de siete generaciones",
  "cover_url": "https://picsum.photos/seed/book-ejemplo/300/450",
  "genres": [1, 2]
}
```

> **Nota sobre portadas:** El campo `cover_url` acepta cualquier URL válida de imagen. Para desarrollo, puedes usar servicios como [Picsum Photos](https://picsum.photos/) para generar imágenes aleatorias.

### Crear un préstamo

```bash
POST http://localhost:3000/api/loans
Content-Type: application/json

{
  "book_id": 1,
  "member_id": 1,
  "loan_date": "2024-01-15"
}
```

### Devolver un libro

```bash
PATCH http://localhost:3000/api/loans/1/return
Content-Type: application/json

{
  "returned_at": "2024-01-20"
}
```

## 🗃️ Base de Datos

### Diagrama de Relaciones

- **Libraries** → Tienen muchos **Books**
- **Books** → Pertenecen a una **Library**
- **Books** ↔ **Genres** (Relación muchos a muchos a través de **BookGenres**)
- **Books** → Tienen muchos **Loans**
- **Members** → Tienen muchos **Loans**
- **Loans** → Pertenecen a un **Book** y un **Member**

### Portadas de Libros

Los libros incluyen un campo `cover_url` (opcional) para almacenar la URL de la portada:

- **Tipo:** `STRING(500)` - Acepta URLs de hasta 500 caracteres
- **Validación:** Debe ser una URL válida (validado con Zod)
- **Ejemplo:** `https://picsum.photos/seed/book-ejemplo/300/450`

**Opciones para las portadas:**

1. **Picsum Photos (Actual)** - Imágenes aleatorias para desarrollo
   ```
   https://picsum.photos/seed/book-nombre/300/450
   ```

2. **URLs externas** - Cualquier URL válida de imagen
   ```
   https://ejemplo.com/portada.jpg
   ```

3. **Futuro:** Sistema de upload de archivos con Multer

### Comandos útiles de Sequelize

```bash
# Crear una nueva migración
npx sequelize-cli migration:generate --name nombre-migracion

# Ejecutar migraciones pendientes
npx sequelize-cli db:migrate

# Revertir última migración
npx sequelize-cli db:migrate:undo

# Revertir todas las migraciones
npx sequelize-cli db:migrate:undo:all

# Crear un nuevo seeder
npx sequelize-cli seed:generate --name nombre-seeder

# Ejecutar todos los seeders
npx sequelize-cli db:seed:all

# Revertir todos los seeders
npx sequelize-cli db:seed:undo:all
```

## 🐳 Comandos Docker

```bash
# Iniciar MySQL
docker-compose up -d

# Ver estado de contenedores
docker ps

# Ver logs de MySQL
docker-compose logs mysql

# Seguir logs en tiempo real
docker-compose logs -f mysql

# Detener MySQL (mantiene datos)
docker-compose down

# Detener y eliminar datos (¡CUIDADO!)
docker-compose down -v

# Reiniciar MySQL
docker-compose restart mysql

# Acceder al contenedor de MySQL
docker exec -it library_mysql bash
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

### Resetear la base de datos

```bash
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## 🛠️ Desarrollo

### Scripts disponibles

```bash
# Iniciar servidor en modo desarrollo (con auto-reload)
npm run dev
```

### Agregar nuevas características

1. Crear el modelo en `models/`
2. Crear la migración con `sequelize-cli`
3. Crear el esquema de validación en `schemas/`
4. Crear el repositorio en `repositories/`
5. Crear el servicio en `services/`
6. Crear el controlador en `controllers/`
7. Crear el router en `routes/`
8. Registrar el router en `routes/routes.js`

## 📝 Notas Importantes

- El proyecto usa **ES Modules** (`type: "module"` en `package.json`)
- Las migraciones usan CommonJS (archivos `.cjs`)
- Todas las validaciones se realizan con **Zod**
- La arquitectura sigue el patrón **Repository-Service-Controller**
- Los datos persisten en volúmenes de Docker

## 👤 Autor

Jesus Alvarez

## 📄 Licencia

ISC

