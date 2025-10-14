# Prueba Técnica Jikkosoft

Repositorio que contiene la solución a los ejercicios de la prueba técnica de Jikkosoft.

## 📋 Contenido

Este repositorio está organizado en 3 ejercicios independientes:

### Exercise 1: Base de Datos - Plataforma de Blogs
- **Descripción:** Diseño de base de datos relacional para una plataforma de blogs
- **Tecnología:** MySQL
- **Contenido:**
  - Diagrama de base de datos (PNG)
  - Script SQL para creación de tablas, relaciones e inserts de ejemplo

### Exercise 2: Algoritmo JavaScript
- **Descripción:** Implementación de algoritmo en JavaScript puro
- **Tecnología:** HTML + JavaScript
- **Ejecución:** Abrir `exercise 2/index.html` en un navegador

### Exercise 3: Sistema de Gestión de Bibliotecas (Fullstack)
- **Descripción:** Aplicación completa para gestión de bibliotecas con API REST y frontend
- **Tecnologías:**
  - **Backend:** Node.js, Express, MySQL, Sequelize, Docker
  - **Frontend:** Vue 3, Vite, Vue Router, Pinia

## 🚀 Configuración Rápida

### Prerequisitos Generales

- **Node.js** v20.19.0 o superior
- **Docker** y **Docker Compose**
- **Git**
- Navegador web moderno

### Instrucciones de Instalación

#### Exercise 1 - Base de Datos
```bash
# Importar el script SQL en tu servidor MySQL
mysql -u usuario -p < "exercise 1/DB_PLATAFORMA_BLOGS.sql"
```

#### Exercise 2 - Algoritmo
```bash
# Abrir directamente en el navegador
start "exercise 2/index.html"  # Windows
open "exercise 2/index.html"   # Mac
xdg-open "exercise 2/index.html"  # Linux
```

#### Exercise 3 - Sistema de Bibliotecas

**Ver instrucciones detalladas en [SETUP.md](./SETUP.md)**

**Configuración rápida:**

```bash
# Backend
cd "exercise 3/Library_backend"
npm install
copy env.example .env        # Windows
# cp env.example .env        # Linux/Mac
docker-compose up -d
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run dev

# Frontend (en otra terminal)
cd "exercise 3/Library_frontend"
npm install
npm run dev
```

## 📁 Estructura del Proyecto

```
Prueba_Jikkosoft/
├── .gitignore              # Archivos ignorados por git
├── README.md               # Este archivo
├── SETUP.md                # Instrucciones detalladas de configuración
│
├── exercise 1/             # Base de Datos
│   ├── DB_PLATAFORMA_BLOGS.png
│   └── DB_PLATAFORMA_BLOGS.sql
│
├── exercise 2/             # Algoritmo JavaScript
│   ├── Algoritmo.js
│   └── index.html
│
└── exercise 3/             # Sistema de Bibliotecas
    ├── Library_backend/    # API REST
    │   ├── README.md       # Documentación del backend
    │   ├── env.example     # Variables de entorno de ejemplo
    │   ├── package.json
    │   └── ...
    └── Library_frontend/   # Interfaz de usuario
        ├── README.md       # Documentación del frontend
        ├── env.example     # Variables de entorno de ejemplo
        ├── package.json
        └── ...
```

## 📖 Documentación Adicional

- **[SETUP.md](./SETUP.md)** - Guía completa de instalación y configuración
- **[exercise 3/Library_backend/README.md](./exercise%203/Library_backend/README.md)** - Documentación de la API
- **[exercise 3/Library_frontend/README.md](./exercise%203/Library_frontend/README.md)** - Documentación del frontend

## 🔒 Seguridad

Este repositorio utiliza `.gitignore` para proteger información sensible:

- ✅ **No se incluyen** archivos `.env` con credenciales
- ✅ **No se incluyen** `node_modules`
- ✅ **Se incluyen** archivos `env.example` con plantillas de configuración

**Importante:** Después de clonar, debes crear tus archivos `.env` locales copiando los archivos `env.example`.

## ⚠️ Notas para Evaluadores

1. **Archivos de configuración:** Los archivos `.env` no están incluidos por seguridad. Use los archivos `env.example` como plantilla.

2. **Base de datos:** El ejercicio 3 requiere Docker para levantar MySQL. Las credenciales por defecto están en el `docker-compose.yml` y `env.example`.

3. **Dependencias:** Ejecute `npm install` en ambos proyectos (backend y frontend) del ejercicio 3.

4. **Puertos utilizados:**
   - Backend: `3000`
   - Frontend: `5173` (o el que asigne Vite)
   - MySQL: `3306`

## 🛠️ Comandos Útiles

```bash
# Ver estructura de archivos (Windows PowerShell)
tree /F

# Verificar versión de Node.js
node --version

# Verificar que Docker esté corriendo
docker ps

# Ver todos los containers (incluso detenidos)
docker ps -a
```

## 👤 Autor

**Jesus Alvarez**

## 📄 Licencia

ISC

---

**Nota:** Para instrucciones detalladas de cada ejercicio, consulta los archivos README.md dentro de cada carpeta.

