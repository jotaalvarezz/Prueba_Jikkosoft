# Library Frontend

Aplicación frontend para el sistema de gestión de bibliotecas desarrollada con Vue 3 y Vite.

## 📋 Descripción

Interfaz de usuario para la administración de bibliotecas que permite gestionar libros, miembros, préstamos y géneros literarios. Construida con Vue 3, Vue Router y Pinia para el manejo de estado.

## 🚀 Tecnologías Utilizadas

- **Vue 3.5.22** - Framework JavaScript progresivo
- **Vite 7.1.7** - Build tool y servidor de desarrollo
- **Vue Router 4.5.1** - Enrutamiento oficial de Vue
- **Pinia 3.0.3** - Store de gestión de estado
- **Prettier** - Formateo de código

## 📦 Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 20.19.0 o superior)
- npm o yarn
- Backend de Library API ejecutándose (ver `../Library_backend`)

## 🔧 Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno (Opcional)

Si necesitas configurar la URL del backend, copia el archivo de ejemplo:

```bash
# En Windows (PowerShell)
copy env.example .env

# En Linux/Mac
cp env.example .env
```

Edita el archivo `.env` según sea necesario:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_TITLE=Library Management System
```

> **Nota:** Si el backend está corriendo en el puerto 3000, no necesitas el archivo `.env`.

### 3. Iniciar servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

## 📝 Scripts Disponibles

```bash
# Modo desarrollo con hot-reload
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Formatear código con Prettier
npm run format
```

## 📁 Estructura del Proyecto

```
Library_frontend/
├── src/
│   ├── App.vue           # Componente principal
│   ├── main.js           # Punto de entrada
│   ├── router/           # Configuración de rutas
│   │   └── index.js
│   └── stores/           # Stores de Pinia
│       └── counter.js
├── public/               # Archivos estáticos
│   └── favicon.ico
├── index.html            # HTML base
├── vite.config.js        # Configuración de Vite
├── jsconfig.json         # Configuración de JavaScript
└── package.json          # Dependencias
```

## 🔌 Conectar con el Backend

Asegúrate de que el backend esté corriendo antes de iniciar el frontend:

1. Ve a `../Library_backend`
2. Inicia Docker: `docker-compose up -d`
3. Inicia el servidor: `npm run dev`
4. El backend debe estar en `http://localhost:3000`

## 🎨 Desarrollo

### Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

### Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## ⚠️ Solución de Problemas

### El frontend no puede conectarse al backend

1. Verifica que el backend esté corriendo en `http://localhost:3000`
2. Revisa la configuración de CORS en el backend
3. Verifica que la URL del API esté correcta en tu código
4. Revisa la consola del navegador para ver errores

### Error de compilación

1. Elimina `node_modules` y reinstala: `rm -rf node_modules && npm install`
2. Limpia el cache de Vite: `rm -rf node_modules/.vite`
3. Verifica que tengas la versión correcta de Node.js

## 👤 Autor

Jesus Alvarez

## 📄 Licencia

ISC
