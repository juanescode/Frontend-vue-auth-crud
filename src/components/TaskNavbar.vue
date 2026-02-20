<template>
  <nav class="bg-white shadow-lg">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <h1 class="text-xl font-bold text-gray-800">Gestión de tareas</h1>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-gray-600">{{ username }}</span>
          <button
            @click="$emit('logout')"
            class="px-4 py-2 text-white transition duration-200 bg-red-500 rounded-md hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  username: {
    type: String,
    required: true
  }
})

defineEmits(['logout'])
</script>
