<template>
  <div class="min-h-screen bg-gray-100">
    <TaskNavbar :username="authStore.user?.username || 'User'" @logout="handleLogout" />

    <div class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold text-gray-800">Mis tareas</h2>
        <button
          @click="showForm = !showForm"
          class="px-6 py-3 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
        >
          {{ showForm ? 'Cancelar' : '+ Nueva tarea' }}
        </button>
      </div>

      <div v-if="error" class="px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
        {{ error }}
      </div>

      <div v-if="showForm" class="mb-8">
        <TaskForm
          :form-data="formData"
          :is-editing="!!editingTask"
          :loading="loading"
          @submit="handleSubmit"
          @cancel="resetForm"
        />
      </div>

      <div v-if="loading && !showForm" class="py-12 text-center">
        <div class="inline-block w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        <p class="mt-4 text-gray-600">Cargando tareas...</p>
      </div>

      <div v-else-if="!loading && tasks.length === 0" class="py-12 text-center bg-white rounded-lg shadow-md">
        <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No hay tareas</h3>
        <p class="mt-1 text-sm text-gray-500">Comienza creando una nueva tarea.</p>
      </div>

      <TaskList
        v-else
        :tasks="tasks"
        @toggle="toggleCompleted"
        @edit="editTask"
        @delete="deleteTask"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTasks } from '@/composables/useTasks'
import { useTaskForm } from '@/composables/useTaskForm'
import TaskNavbar from '@/components/TaskNavbar.vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskList from '@/components/TaskList.vue'

const router = useRouter()
const authStore = useAuthStore()

const { tasks, loading, error, loadTasks, deleteTask, toggleCompleted } = useTasks()
const { showForm, editingTask, formData, handleSubmit, editTask, resetForm } = useTaskForm(loadTasks)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

onMounted(() => {
  loadTasks()
})
</script>
