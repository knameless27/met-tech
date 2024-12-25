<script setup lang="ts">
import {
  createItem,
  createStore,
  deleteItem,
  deleteStore,
  getAllStores,
  updateItem,
} from '@/services'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

const items = ref([])
const storeName = ref('')
const loading = ref(false)
const newItemObj = ref({
  name: '',
  price: 0,
})
const headers = ref([
  { title: '', key: 'data-table-expand' },
  { key: 'id', title: 'id' },
  { key: 'name', title: 'Name' },
  { key: 'actions', title: 'Actions' },
])

const itemHeaders = ref([
  { key: 'id', title: 'id' },
  { key: 'name', title: 'Name' },
  { key: 'price', title: 'Price' },
  { key: 'actions', title: 'Actions' },
])

async function getStores() {
  loading.value = true
  const { stores } = await getAllStores()
  items.value = stores
  loading.value = false
}

async function newStore(isActive) {
  try {
    await createStore(storeName.value)
    toast.success('Tienda creada con exito!')
    isActive.value = false
    getStores()
  } catch (error) {
    toast.error('Error al crear la tienda')
  }
}

async function removeStore(isActive, store) {
  try {
    await deleteStore(store)
    toast.success('Tienda eliminada con exito!')
    isActive.value = false
    getStores()
  } catch (error) {
    toast.error('Error al eliminar la tienda')
  }
}

async function sendItem(isActive, store) {
  try {
    await createItem(newItemObj.value.name, store, newItemObj.value.price)
    toast.success('Item agregado exitosamente!')
    isActive.value = false
    newItemObj.value = { name: '', price: 0 }
    getStores()
  } catch (error) {
    toast.error('Error al agregar el item')
  }
}

async function itemEdit(isActive, store) {
  try {
    newItemObj.value.store_id = store
    await updateItem(newItemObj.value.name, newItemObj.value)
    toast.success('Item agregado exitosamente!')
    newItemObj.value = { name: '', price: 0 }
    isActive.value = false
    getStores()
  } catch (error) {
    toast.error('Error al agregar el item')
  }
}

async function removeItem(isActive, item) {
  try {
    await deleteItem(item)
    toast.success('Tienda eliminada con exito!')
    isActive.value = false
    getStores()
  } catch (error) {
    toast.error('Error al eliminar la tienda')
  }
}

function getItem(item) {
  newItemObj.value = { name: item.name, price: item.price }
}
getStores()
</script>

<template>
  <VCard title="Stores">
    <VCardText class="d-flex flex-row-reverse">
      <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <VBtn v-bind="activatorProps" color="primary" text="Crear Store" />
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="Crear tienda">
            <v-card-text>
              <VTextField v-model="storeName" label="Nombre" />
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <VBtn
                variant="elevated"
                color="primary"
                text="Crear Tienda"
                @click="newStore(isActive)"
              ></VBtn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </VCardText>
    <VCardText>
      <VDataTable hide-default-footer :loading="loading" :items="items" :headers="headers">
        <template v-slot:expanded-row="{ columns, item }">
          <tr>
            <td :colspan="columns.length">
              <VDataTable hide-default-footer :items="item.items" :headers="itemHeaders">
                <template #item.actions="{ item }">
                  <v-dialog max-width="500">
                    <template v-slot:activator="{ props: activatorProps }">
                      <v-btn
                        variant="tonal"
                        class="mr-3"
                        color="primary"
                        icon
                        v-bind="activatorProps"
                        @click="getItem(item)"
                      >
                        <v-icon icon="mdi-pencil" />
                        <v-tooltip activator="parent" location="top">Editar</v-tooltip>
                      </v-btn>
                    </template>

                    <template v-slot:default="{ isActive }">
                      <v-card title="Editar item">
                        <v-card-text>
                          <VTextField v-model="newItemObj.name" label="Nombre" />
                          <VTextField v-model="newItemObj.price" label="Precio" />
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <VBtn
                            variant="elevated"
                            color="primary"
                            text="Actualizar Item"
                            @click="itemEdit(isActive, item.store_id)"
                          ></VBtn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                  <v-dialog max-width="500">
                    <template v-slot:activator="{ props: activatorProps }">
                      <v-btn
                        variant="tonal"
                        color="error"
                        icon
                        v-bind="activatorProps"
                        @click="getItem(item)"
                      >
                        <v-icon icon="mdi-delete-outline" />
                        <v-tooltip activator="parent" location="top">Eliminar</v-tooltip>
                      </v-btn>
                    </template>

                    <template v-slot:default="{ isActive }">
                      <v-card title="Eliminar item">
                        <v-card-text> Esta seguro de querer eliminar este item? </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <VBtn
                            variant="elevated"
                            color="error"
                            text="Eliminar Item"
                            @click="removeItem(isActive, item.name)"
                          ></VBtn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </template>
              </VDataTable>
            </td>
          </tr>
        </template>
        <template #item.actions="{ item }">
          <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                variant="tonal"
                class="mr-3"
                color="primary"
                icon
                v-bind="activatorProps"
                @click="getItem({ name: '', price: 0 })"
              >
                <v-icon icon="mdi-plus" />
                <v-tooltip activator="parent" location="top">Agregar</v-tooltip>
              </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card title="Agregar item">
                <v-card-text>
                  <VTextField v-model="newItemObj.name" label="Nombre" />
                  <VTextField v-model="newItemObj.price" label="Precio" />
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <VBtn
                    variant="elevated"
                    color="primary"
                    text="Agregar Item"
                    @click="sendItem(isActive, item.id)"
                  ></VBtn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
          <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn variant="tonal" color="error" icon v-bind="activatorProps">
                <v-icon icon="mdi-delete-outline" />
                <v-tooltip activator="parent" location="top">Eliminar</v-tooltip>
              </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card title="Eliminar tienda">
                <v-card-text> Esta seguro de querer eliminar esta tienda? </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <VBtn
                    variant="elevated"
                    color="error"
                    text="Eliminar Tienda"
                    @click="removeStore(isActive, item.name)"
                  ></VBtn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
</template>
