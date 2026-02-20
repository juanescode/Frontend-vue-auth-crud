import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authAPI } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const accessToken = ref(null)
  const refreshToken = ref(null)

  const isAuthenticated = computed(() => !!accessToken.value)

  const initAuth = () => {
    const storedUser = localStorage.getItem('user')
    const storedAccessToken = localStorage.getItem('access_token')
    const storedRefreshToken = localStorage.getItem('refresh_token')

    if (storedUser && storedAccessToken) {
      user.value = JSON.parse(storedUser)
      accessToken.value = storedAccessToken
      refreshToken.value = storedRefreshToken
    }
  }

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials)
      const { access, refresh, user: userData } = response.data

      user.value = userData
      accessToken.value = access
      refreshToken.value = refresh

      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)

      return response.data
    } catch (error) {
      console.error('Error en login:', error)
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData)
      const { access, refresh, user: newUser } = response.data

      user.value = newUser
      accessToken.value = access
      refreshToken.value = refresh

      localStorage.setItem('user', JSON.stringify(newUser))
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)

      return response.data
    } catch (error) {
      console.error('Error en registro:', error)
      throw error
    }
  }

  const logout = () => {
    user.value = null
    accessToken.value = null
    refreshToken.value = null

    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  initAuth()

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    login,
    register,
    logout,
    initAuth,
  }
})
