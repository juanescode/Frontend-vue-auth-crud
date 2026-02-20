import { ref } from 'vue'
import { tasksAPI } from '@/services/api'

export function useTasks() {
  const tasks = ref([])
  const loading = ref(false)
  const error = ref('')

  const loadTasks = async () => {
    try {
      loading.value = true
      error.value = ''
      const response = await tasksAPI.getTasks()
      tasks.value = response.data
    } catch (err) {
      error.value = 'Error loading tasks'
      console.error('Error loading tasks:', err)
    } finally {
      loading.value = false
    }
  }

  const deleteTask = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta tarea?')) return

    try {
      loading.value = true
      error.value = ''
      await tasksAPI.deleteTask(id)
      await loadTasks()
    } catch (err) {
      error.value = 'Error deleting task'
      console.error('Error deleting task:', err)
    } finally {
      loading.value = false
    }
  }

  const toggleCompleted = async (task) => {
    try {
      await tasksAPI.updateTask(task.id, {
        title: task.title,
        description: task.description,
        completed: !task.completed
      })
      await loadTasks()
    } catch (err) {
      error.value = 'Error updating task'
      console.error('Error updating task:', err)
    }
  }

  return {
    tasks,
    loading,
    error,
    loadTasks,
    deleteTask,
    toggleCompleted
  }
}
