<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getStore, deleteStore } from '@/services'

const route = useRoute()
const router = useRouter()
const storeName = route.params.name
const store = ref(null)
const message = ref('')

const fetchStore = async () => {
  try {
    store.value = await getStore(storeName)
  } catch (error) {
    message.value = 'Error al obtener la tienda.'
    console.error(error)
  }
}

const deleteStoreHandler = async () => {
  try {
    await deleteStore(storeName)
    message.value = 'Tienda eliminada exitosamente.'
    setTimeout(() => {
      router.push('/stores')
    }, 2000)
  } catch (error) {
    message.value = 'Error al eliminar la tienda.'
    console.error(error)
  }
}

onMounted(fetchStore)
</script>

<template>
  <div class="store-container">
    <h1>Tienda: {{ storeName }}</h1>

    <div v-if="store">
      <h2>Detalles</h2>
      <p><strong>Nombre:</strong> {{ store.name }}</p>
      <p><strong>ID:</strong> {{ store.id }}</p>
    </div>

    <div class="actions">
      <button @click="deleteStoreHandler">Eliminar Tienda</button>
    </div>

    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<style>
.store-container {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
h1 {
  margin-bottom: 10px;
}
.actions {
  margin-top: 20px;
}
button {
  padding: 10px 15px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #c9302c;
}
.message {
  margin-top: 20px;
  color: green;
}
</style>
