<template>
  <div class="p-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
    <div class="flex items-start justify-between">
      <div class="flex items-start flex-1 space-x-4">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="$emit('toggle', task)"
          class="w-5 h-5 mt-1 text-blue-600 border-gray-300 rounded cursor-pointer focus:ring-blue-500"
        />
        
        <div class="flex-1">
          <div class="flex items-center">
            <h3
              :class="[
                'text-lg font-semibold',
                task.completed ? 'line-through text-gray-500' : 'text-gray-800'
              ]"
            >
              {{ task.title }}
            </h3>
            <span
              v-if="task.completed"
              class="px-2 py-1 ml-3 text-xs font-semibold text-green-800 bg-green-100 rounded-full"
            >
              Completada
            </span>
          </div>
          
          <p
            v-if="task.description"
            :class="['mt-2', task.completed ? 'text-gray-400' : 'text-gray-600']"
          >
            {{ task.description }}
          </p>
          
          <p class="mt-2 text-sm text-gray-400">
            Creada: {{ formatDate(task.created_at) }}
          </p>
        </div>
      </div>

      <div class="flex ml-4 space-x-2">
        <button
          @click="$emit('edit', task)"
          class="p-2 text-blue-600 hover:text-blue-800"
          title="Edit"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          @click="$emit('delete', task.id)"
          class="p-2 text-red-600 hover:text-red-800"
          title="Delete"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle', 'edit', 'delete'])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
