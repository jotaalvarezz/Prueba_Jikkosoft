# 📋 Instrucciones de Configuración

Este documento contiene las instrucciones para configurar y ejecutar el proyecto correctamente después de clonarlo.

## 📦 Prerequisitos

Asegúrate de tener instalado:
- **Node.js** (versión 20.19.0 o superior)
- **Docker** y **Docker Compose** (para la base de datos)
- **npm** o **yarn**

## 🚀 Configuración Inicial

### 1️⃣ Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd Prueba_Jikkosoft
```

### 2️⃣ Configurar el Backend

```bash
cd "exercise 3/Library_backend"
```

#### Instalar dependencias
```bash
npm install
```

#### Configurar variables de entorno
```bash
# En Windows (PowerShell)
copy .env.example .env

# En Linux/Mac
cp .env.example .env
```

**Nota:** El archivo `.env` ya contiene valores por defecto que coinciden con el `docker-compose.yml`. Si necesitas cambiar las credenciales, edita ambos archivos para que coincidan.

#### Levantar la base de datos con Docker
```bash
docker-compose up -d
```

#### Ejecutar migraciones
```bash
npx sequelize-cli db:migrate
```

#### (Opcional) Cargar datos de prueba
```bash
npx sequelize-cli db:seed:all
```

#### Iniciar el servidor backend
```bash
npm run dev
```

El backend estará corriendo en `http://localhost:3000`

### 3️⃣ Configurar el Frontend

Abre una nueva terminal:

```bash
cd "exercise 3/Library_frontend"
```

#### Instalar dependencias
```bash
npm install
```

#### Iniciar el servidor de desarrollo
```bash
npm run dev
```

El frontend estará corriendo en `http://localhost:5173` (o el puerto que indique Vite)

## 🔧 Comandos Útiles

### Backend
- `npm run dev` - Inicia el servidor en modo desarrollo
- `npx sequelize-cli db:migrate` - Ejecuta las migraciones
- `npx sequelize-cli db:seed:all` - Carga datos de prueba
- `npx sequelize-cli db:migrate:undo` - Revierte la última migración

### Frontend
- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Crea la versión de producción
- `npm run preview` - Previsualiza la build de producción

### Docker
- `docker-compose up -d` - Inicia la base de datos en segundo plano
- `docker-compose down` - Detiene y elimina los contenedores
- `docker-compose logs` - Ver logs de los contenedores

## 🗃️ Estructura de la Base de Datos

La base de datos se creará automáticamente al ejecutar las migraciones. Incluye las siguientes tablas:
- **libraries** - Bibliotecas
- **books** - Libros
- **members** - Miembros/Usuarios
- **loans** - Préstamos
- **genres** - Géneros literarios
- **book_genres** - Relación muchos a muchos entre libros y géneros

## ⚠️ Solución de Problemas

### El backend no se conecta a la base de datos
1. Verifica que Docker esté corriendo: `docker ps`
2. Verifica que las credenciales en `.env` coincidan con `docker-compose.yml`
3. Verifica que el puerto 3306 no esté siendo usado por otra aplicación

### Error al ejecutar migraciones
1. Asegúrate de que la base de datos esté corriendo
2. Verifica que las credenciales sean correctas
3. Intenta reiniciar el contenedor: `docker-compose restart`

### El frontend no se conecta al backend
1. Verifica que el backend esté corriendo en el puerto correcto
2. Revisa la configuración de CORS en el backend
3. Verifica la URL del API en el código del frontend

## 📞 Soporte

Si encuentras algún problema, verifica que:
- Todos los servicios de Docker estén corriendo
- Las variables de entorno estén configuradas correctamente
- Las dependencias estén instaladas
- Los puertos no estén siendo usados por otras aplicaciones

