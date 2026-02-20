import { ref } from 'vue'
import { tasksAPI } from '@/services/api'

export function useTaskForm(loadTasks) {
  const showForm = ref(false)
  const editingTask = ref(null)
  const loading = ref(false)
  const formData = ref({
    title: '',
    description: '',
    completed: false
  })

  const handleSubmit = async (data) => {
    try {
      loading.value = true

      if (editingTask.value) {
        await tasksAPI.updateTask(editingTask.value.id, data)
      } else {
        await tasksAPI.createTask(data)
      }

      await loadTasks()
      resetForm()
    } catch (err) {
      const errorMsg = editingTask.value ? 'Error updating task' : 'Error creating task'
      console.error(errorMsg, err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const editTask = (task) => {
    editingTask.value = task
    formData.value = {
      title: task.title,
      description: task.description || '',
      completed: task.completed
    }
    showForm.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetForm = () => {
    showForm.value = false
    editingTask.value = null
    formData.value = {
      title: '',
      description: '',
      completed: false
    }
  }

  return {
    showForm,
    editingTask,
    loading,
    formData,
    handleSubmit,
    editTask,
    resetForm
  }
}
