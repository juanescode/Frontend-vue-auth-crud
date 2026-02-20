<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h3 class="mb-4 text-xl font-bold text-gray-800">
      {{ isEditing ? 'Editar tarea' : 'Nueva tarea' }}
    </h3>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="title" class="block mb-2 text-sm font-medium text-gray-700">
          Titulo *
        </label>
        <input
          type="text"
          id="title"
          v-model="localFormData.title"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Coloca el titulo de la tarea"
        />
      </div>

      <div>
        <label for="description" class="block mb-2 text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          id="description"
          v-model="localFormData.description"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Coloca la descripción de la tarea"
        ></textarea>
      </div>

      <div class="flex items-center">
        <input
          type="checkbox"
          id="completed"
          v-model="localFormData.completed"
          class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label for="completed" class="block ml-2 text-sm text-gray-700">
            Marcar como completada
        </label>
      </div>

      <div class="flex space-x-4">
        <button
          type="submit"
          :disabled="loading"
          class="px-6 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Guardando...' : (isEditing ? 'Actualizar tarea' : 'Crear tarea') }}
        </button>
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-6 py-2 text-white transition-colors bg-gray-600 rounded-md hover:bg-gray-700"
        >
            Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  isEditing: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const localFormData = ref({ ...props.formData })

watch(() => props.formData, (newVal) => {
  localFormData.value = { ...newVal }
}, { deep: true })

const handleSubmit = () => {
  emit('submit', localFormData.value)
}
</script>
