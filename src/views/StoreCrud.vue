<script setup lang="ts">
import { getAllStores } from '@/services'
import { ref } from 'vue'

const items = ref([])

async function getStores() {
  const { stores } = await getAllStores()
  items.value = stores
}

getStores()
</script>

<template>
  <div></div>
</template>
