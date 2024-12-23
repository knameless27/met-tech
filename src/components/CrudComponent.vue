<script setup>
import { getAllItems, createItem, updateItem, deleteItem } from '@/services'
import { reactive, ref, onMounted } from 'vue'

// Props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  singularTitle: {
    type: String,
    required: true,
  },
  pluralTitle: {
    type: String,
    required: true,
  },
  defaultItem: {
    type: Object,
    required: true,
  },
})

const items = ref([])
const newItem = reactive({ ...props.defaultItem })
const editingItemId = ref(null)
const isModalOpen = ref(false)

const fetchItems = async () => {
  try {
    items.value = await getAllItems()
  } catch (error) {
    console.error('Error al obtener los items:', error)
  }
}

const createItemHandler = async () => {
  try {
    if (editingItemId.value) {
      await updateItem(editingItemId.value, newItem)
      editingItemId.value = null
    } else {
      await createItem(newItem.name, null, newItem)
    }
    Object.keys(newItem).forEach((key) => (newItem[key] = ''))
    closeModal()
    await fetchItems()
  } catch (error) {
    console.error('Error al crear/actualizar item:', error)
  }
}

const editItem = (item) => {
  Object.keys(newItem).forEach((key) => {
    newItem[key] = item[key]
  })
  editingItemId.value = item.id
  openModal()
}

const deleteItemHandler = async (id) => {
  try {
    await deleteItem(id)
    await fetchItems()
  } catch (error) {
    console.error('Error al eliminar item:', error)
  }
}

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  Object.keys(newItem).forEach((key) => (newItem[key] = ''))
  editingItemId.value = null
}

onMounted(fetchItems)
</script>

<template>
  <div class="crud-container">
    <h1>{{ title }}</h1>

    <button @click="openModal">Crear {{ singularTitle }}</button>

    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal">
        <h2>{{ editingItemId ? `Editar ${singularTitle}` : `Crear ${singularTitle}` }}</h2>
        <form @submit.prevent="createItemHandler">
          <div v-for="(value, key) in newItem" :key="key">
            <label :for="key">{{ key }}</label>
            <input v-model="newItem[key]" :id="key" type="text" placeholder="Ingresa {{ key }}" />
          </div>
          <button type="submit">{{ editingItemId ? 'Actualizar' : 'Crear' }}</button>
          <button type="button" @click="closeModal">Cancelar</button>
        </form>
      </div>
    </div>

    <h2>Lista de {{ pluralTitle }}</h2>
    <table>
      <thead>
        <tr>
          <th v-for="(value, key) in newItem" :key="key">{{ key }}</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td v-for="(value, key) in newItem" :key="key">{{ item[key] }}</td>
          <td>
            <button @click="editItem(item)">Editar</button>
            <button @click="deleteItemHandler(item.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.crud-container {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
}
button {
  margin-right: 5px;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f9f9f9;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.modal h2 {
  margin-top: 0;
}
.modal button {
  margin-top: 10px;
}
</style>
