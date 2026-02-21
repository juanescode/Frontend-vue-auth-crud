# Task Manager - Frontend

Aplicación SPA para gestión de tareas con autenticación JWT. Desarrollada con Vue 3 y Composition API.

## Tecnologías

- Vue 3.5.25 (Composition API)
- Vite 7.3.1
- Vue Router 4
- Pinia (state management)
- Axios
- Tailwind CSS 3

## Setup Local

```bash
# Clonar repo
git clone https://github.com/juanescode/Frontend-vue-auth-crud.git
cd Frontend-vue-auth-crud

# Instalar dependencias
npm install

# Configurar variables de entorno
# Crear archivo .env en la raíz
echo "VITE_API_URL=http://127.0.0.1:8000/api" > .env

# Correr en desarrollo
npm run dev
```

Aplicación disponible en `http://localhost:5173`

## Scripts

```bash
npm run dev      # Servidor desarrollo
npm run build    # Build producción
npm run preview  # Preview build local
```

## Variables de Entorno

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Para producción en Netlify:
```env
VITE_API_URL=https://backend-python-django-crud-auth.onrender.com/api
```

## Estructura

```
src/
├── components/
│   ├── TaskNavbar.vue    # Barra navegación
│   ├── TaskForm.vue      # Formulario crear/editar
│   ├── TaskItem.vue      # Card individual tarea
│   └── TaskList.vue      # Lista de tareas
├── composables/
│   ├── useTasks.js       # Lógica CRUD tareas
│   └── useTaskForm.js    # Lógica formulario
├── router/
│   └── index.js          # Rutas + guards
├── services/
│   └── api.js            # Cliente axios
├── stores/
│   └── auth.js           # Store autenticación
├── views/
│   ├── LoginView.vue
│   ├── RegisterView.vue
│   └── TasksView.vue
├── App.vue
└── main.js
```

## Rutas

- `/` → Redirect a `/login`
- `/login` → Login
- `/register` → Registro
- `/tasks` → Dashboard tareas (protegida)

## Características

### Autenticación
- Registro con validación client-side
- Login con persistencia en localStorage
- Navegación protegida con guards
- Interceptor axios para token

### Tareas
- CRUD completo
- Filtro visual completadas/pendientes
- Edición inline
- Confirmación eliminación
- Estado reactivo (Pinia)
- Timestamps formateados

### UX
- Loading states
- Mensajes de error
- Validación formularios
- Responsive design
- Tailwind utility-first

## Arquitectura

### Composables Pattern
Lógica de negocio extraída en composables reutilizables:

```javascript
// useTasks.js
export function useTasks() {
  const tasks = ref([])
  const loading = ref(false)
  
  async function loadTasks() { ... }
  async function deleteTask(id) { ... }
  
  return { tasks, loading, loadTasks, deleteTask }
}
```

### Component Hierarchy
```
TasksView
├── TaskNavbar
├── TaskForm
└── TaskList
    └── TaskItem (v-for)
```

### State Management
- **Pinia store**: Solo para autenticación (user, tokens)
- **Composables**: Estado local de tareas
- **Props/Emits**: Comunicación componentes

## API Integration

```javascript
// services/api.js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
})

// Auto-attach token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

## Build & Deploy

### Build local
```bash
npm run build
# Output: dist/
```

### Deploy en Netlify
1. Conectar repo GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Variables de entorno: `VITE_API_URL`

**URL Producción**: https://entrevista-tecnica.netlify.app

## Credenciales de Prueba

Usuario: `testuser`  
Password: `test12345`

## Decisiones Técnicas

- **Composition API** sobre Options API para mejor reusabilidad
- **Composables** en lugar de mixins para compartir lógica
- **Pinia** sobre Vuex por API más simple
- **Tailwind** sobre CSS modules para rapidez
- **Axios** sobre fetch para interceptores
- **Vite** sobre Webpack por velocidad
- **localStorage** para tokens (no cookies por CORS simplicity)

## Validaciones

### Registro
- Username: requerido, min 3 caracteres
- Email: requerido, formato válido
- Password: min 8 caracteres
- Confirmación password debe coincidir

### Login
- Username/email: requerido
- Password: requerido

### Tareas
- Title: requerido, max 200 caracteres
- Description: opcional

## Manejo de Errores

- Interceptor axios captura 401 → auto-logout
- Try/catch en composables → logs de error
- UI muestra mensajes user-friendly
- Network errors manejados globalmente

## Performance

- Lazy loading de rutas
- Componentes pequeños y reutilizables
- Computed properties para filtros
- Event delegation donde aplica
- Build optimizado con Vite (code splitting)

## Browser Support

- Chrome/Edge: últimas 2 versiones
- Firefox: últimas 2 versiones
- Safari: últimas 2 versiones

