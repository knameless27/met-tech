<script setup>
import { reactive, ref } from 'vue'
import { toast } from 'vue3-toastify'

const matrixInput = ref('[[[1, 2, 3], [2, 3, 4]], [[5, 6, 7], [5, 4, 3]], [[3,5, 6], [4, 8, 3]]]')
const stringInput = ref('(2 + 10) / 2 - 20')

const matrixOutput = reactive({ dimension: null, straight: null, compute: null })
const stringOutput = reactive({ operation: null, compute: null })

function executeMatrix() {
  try {
    const matrix = JSON.parse(matrixInput.value)

    const MyMatrix = {
      dimension: (m) => {
        let depth = 0
        // Calcula la profundidad máxima de la matriz
        while (Array.isArray(m)) {
          depth++
          m = m[0]
        }
        return depth
      },
      straight: (m) => {
        if (!Array.isArray(m) || m.length === 0) return false
        if (!Array.isArray(m[0])) return true // Matriz unidimensional
        const rowLength = m[0].length
        return m.every((row) => Array.isArray(row) && row.length === rowLength) // Verifica si todas las filas tienen el mismo tamaño
      },
      compute: (m) => {
        const flatten = (arr) =>
          arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), [])
        return flatten(m).reduce((sum, num) => sum + num, 0) // Suma todos los elementos de la matriz
      },
    }

    // Asigna los resultados de los métodos al objeto de salida
    matrixOutput.dimension = MyMatrix.dimension(matrix)
    matrixOutput.straight = MyMatrix.straight(matrix)
    matrixOutput.compute = MyMatrix.compute(matrix)
  } catch (error) {
    toast.error(
      'Error al procesar la matriz. Asegúrate de ingresar el array o matriz sin comillas y sin letras.',
    )
  }
}

function executeString() {
  try {
    const MyArray = {
      operation: (s) => /^[\d+\-*/().\s]+$/.test(s), // Verifica si la cadena es una operación válida
      compute: (s) => {
        try {
          // Evalúa la operación aritmética
          // eslint-disable-next-line no-new-func
          return new Function(`return (${s})`)()
        } catch {
          return false
        }
      },
    }

    const operation = MyArray.operation(stringInput.value)
    const compute = MyArray.compute(stringInput.value)

    stringOutput.operation = (operation && compute) != false
    stringOutput.compute = operation && compute
  } catch (error) {
    toast.error(
      'Error al procesar la cadena, asegurate de ingresarla sin letras ni simbolos especiales.',
    )
  }
}

executeMatrix()
executeString()
</script>

<template>
  <VCard class="container" title="Ejercicios Lógicos">
    <!-- Sección para procesar matrices -->
    <VCardText>
      <h2>Ejercicio: Operaciones con Matriz</h2>
      <VTextarea v-model="matrixInput" placeholder="Ingresa la matriz aquí..."></VTextarea>
      <VBtn color="primary" @click="executeMatrix">Ejecutar</VBtn>
      <VCard v-if="matrixOutput" class="mt-3">
        <VCardText>
          <p><strong>Dimensión:</strong> {{ matrixOutput.dimension }}</p>
          <p><strong>¿Uniforme?:</strong> {{ matrixOutput.straight }}</p>
          <p><strong>Suma:</strong> {{ matrixOutput.compute }}</p>
        </VCardText>
      </VCard>
    </VCardText>

    <!-- Sección para procesar cadenas -->
    <VCardText>
      <h2>Ejercicio: Operaciones con Cadena</h2>
      <VTextarea v-model="stringInput" placeholder="Ingresa la cadena aquí..."></VTextarea>
      <VBtn color="primary" @click="executeString">Ejecutar</VBtn>
      <VCard v-if="stringOutput" class="mt-3">
        <VCardText>
          <p><strong>¿Operación válida?:</strong> {{ stringOutput.operation }}</p>
          <p><strong>Resultado:</strong> {{ stringOutput.compute }}</p>
        </VCardText>
      </VCard>
    </VCardText>
  </VCard>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
