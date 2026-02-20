<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h2 class="mb-8 text-3xl font-bold text-center text-gray-800">Register</h2>
      
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label for="username" class="block mb-2 text-sm font-medium text-gray-700">
            Nombre de usuario
          </label>
          <input
            type="text"
            id="username"
            v-model="form.username"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Choose a username"
          />
        </div>

        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Create a password"
          />
        </div>

        <div>
          <label for="password2" class="block mb-2 text-sm font-medium text-gray-700">
            Confirmar contraseña
          </label>
          <input
            type="password"
            id="password2"
            v-model="form.password2"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
          />
        </div>

        <div v-if="error" class="px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded">
          <div v-if="typeof error === 'string'">{{ error }}</div>
          <ul v-else class="list-disc list-inside">
            <li v-for="(messages, field) in error" :key="field">
              <span class="font-medium">{{ field }}:</span>
              <span v-for="(msg, idx) in messages" :key="idx"> {{ msg }}</span>
            </li>
          </ul>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Creando cuenta...' : 'Registrarse' }}
        </button>
      </form>

      <p class="mt-6 text-center text-gray-600">
        ¿Ya tienes una cuenta?
        <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-800">
          Inicia sesión aquí
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  username: '',
  email: '',
  password: '',
  password2: ''
})

const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  loading.value = true
  error.value = ''

  if (form.value.password !== form.value.password2) {
    error.value = 'Las contraseñas no coinciden'
    loading.value = false
    return
  }

  try {
    await authStore.register(form.value)
    router.push('/tasks')
  } catch (err) {
    console.error('Register error:', err)
    error.value = err.response?.data || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
