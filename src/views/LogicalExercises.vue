<script setup>
import { reactive, ref } from 'vue'
import { toast } from 'vue3-toastify'

const matrixInput = ref('')
const stringInput = ref('')
const matrixOutput = reactive({ dimension: null, straight: null, compute: null })
const stringOutput = reactive({ operation: null, compute: null })

function executeMatrix() {
  try {
    const matrix = JSON.parse(matrixInput.value)

    const MyMatrix = {
      dimension: (m) => {
        let depth = 0
        while (Array.isArray(m)) {
          depth++
          m = m[0]
        }
        return depth
      },
      straight: (m) => {
        const checkUniform = (arr) =>
          Array.isArray(arr) && arr.every((e) => Array.isArray(e) && e.length === arr[0].length)
        return checkUniform(m)
      },
      compute: (m) => {
        const flatten = (arr) =>
          arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), [])
        return flatten(m).reduce((sum, num) => sum + num, 0)
      },
    }

    matrixOutput.dimension = MyMatrix.dimension(matrix)
    matrixOutput.straight = MyMatrix.straight(matrix)
    matrixOutput.compute = MyMatrix.compute(matrix)
  } catch (error) {
    toast.error('Error al procesar la matriz. Asegúrate de ingresarla en formato JSON válido.')
  }
}

function executeString() {
  try {
    const MyArray = {
      operation: (s) => /^[\d+\-*/().\s]+$/.test(s),
      compute: (s) => {
        try {
          // eslint-disable-next-line no-new-func
          return new Function(`return (${s})`)()
        } catch {
          return false
        }
      },
    }

    stringOutput.operation = MyArray.operation(stringInput.value)
    stringOutput.compute = stringOutput.operation && MyArray.compute(stringInput.value)
  } catch (error) {
    toast.error('Error al procesar la cadena.')
  }
}
</script>

<template>
  <div class="container">
    <h1>Ejercicios Lógicos</h1>

    <div class="exercise">
      <h2>Ejercicio: Operaciones con Matriz</h2>
      <textarea v-model="matrixInput" placeholder="Ingresa la matriz aquí..."></textarea>
      <button @click="executeMatrix">Ejecutar</button>
      <div v-if="matrixOutput">
        <p><strong>Dimensión:</strong> {{ matrixOutput.dimension }}</p>
        <p><strong>¿Uniforme?:</strong> {{ matrixOutput.straight }}</p>
        <p><strong>Suma:</strong> {{ matrixOutput.compute }}</p>
      </div>
    </div>

    <!-- Ejercicio 2: Cadena -->
    <div class="exercise">
      <h2>Ejercicio: Operaciones con Cadena</h2>
      <textarea v-model="stringInput" placeholder="Ingresa la cadena aquí..."></textarea>
      <button @click="executeString">Ejecutar</button>
      <div v-if="stringOutput">
        <p><strong>¿Operación válida?:</strong> {{ stringOutput.operation }}</p>
        <p><strong>Resultado:</strong> {{ stringOutput.compute }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
}
.exercise {
  margin-bottom: 20px;
}
h2 {
  margin-bottom: 10px;
}
textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}
button {
  margin-bottom: 10px;
  padding: 5px 10px;
}
div p {
  margin: 5px 0;
}
</style>
