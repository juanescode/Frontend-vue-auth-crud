import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log(`[${config.method.toUpperCase()}] ${config.url}`)
      console.log('Token agregado:', token.substring(0, 20) + '...')
    } else {
      console.warn(`[${config.method.toUpperCase()}] ${config.url} - NO TOKEN`)
    }
    return config
  },
  (error) => {
    console.error('Error en request interceptor:', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    console.log(`✓ ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status}`)
    return response
  },
  (error) => {
    if (error.response) {
      console.error(`✗ ${error.config.method.toUpperCase()} ${error.config.url} - ${error.response.status}`)
      console.error('Error response:', error.response.data)
    }
    
    if (error.response?.status === 401) {
      console.warn('401 Unauthorized - Limpiando sesión y redirigiendo...')
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  register: (data) => api.post('/auth/register/', data),
  login: (data) => api.post('/auth/login/', data),
}

export const tasksAPI = {
  getTasks: () => api.get('/tasks/'),
  createTask: (data) => api.post('/tasks/', data),
  updateTask: (id, data) => api.put(`/tasks/${id}/`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}/`),
}

export default api
