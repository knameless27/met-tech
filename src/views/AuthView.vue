<script setup>
import { loginUser, registerUser } from '@/services'
import { toast } from 'vue3-toastify'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const registerData = ref({
  name: '',
  email: '',
  password: '',
})

const loginData = ref({
  email: '',
  password: '',
})

const isRegister = ref(false)
const router = useRouter()

const register = async () => {
  try {
    // Encriptar la contraseña para mayor seguridad antes de enviarla
    registerData.value.password = btoa(registerData.value.password)
    const { message } = await registerUser(registerData.value)
    toast.success(message)
    isRegister.value = false
  } catch (error) {
    // Manejo de errores con un mensaje genérico si no se obtiene uno específico
    toast.error(error.message || 'Error al registrar.')
  }
}

const login = async () => {
  try {
    // Encriptar la contraseña antes de enviarla
    loginData.value.password = btoa(loginData.value.password)
    const { access_token } = await loginUser(loginData.value)
    toast.success('Inicio de sesión exitoso. Bienvenido.')
    localStorage.setItem('token', access_token) // Guardar el token para futuras solicitudes autenticadas
    router.push('stores') // Redirección a la página de tiendas tras iniciar sesión
    loginData.value = { email: '', password: '' } // Limpieza de datos después del inicio de sesión
  } catch (error) {
    // Mostrar un mensaje de error en caso de fallo en la autenticación
    toast.error(error.message || 'Error al iniciar sesión.')
  }
}
</script>

<template>
  <VCard class="auth-container" title="Autenticación">
    <!-- Formulario de registro -->
    <VCardText v-if="isRegister">
      <h2 class="mb-2">Registro</h2>
      <form class="d-flex flex-column" @submit.prevent="register">
        <VTextField v-model="registerData.name" type="text" label="Nombre" required />
        <VTextField v-model="registerData.email" type="email" label="Correo Electrónico" required />
        <VTextField v-model="registerData.password" type="password" label="Contraseña" required />
        <VBtn variant="elevated" color="primary" type="submit">Registrar</VBtn>
        <VBtn variant="tonal" class="mt-3" @click="isRegister = !isRegister">Iniciar Sesión</VBtn>
      </form>
    </VCardText>

    <!-- Formulario de inicio de sesión -->
    <VCardText v-else>
      <h2 class="mb-2">Iniciar Sesión</h2>
      <form class="d-flex flex-column" @submit.prevent="login">
        <VTextField v-model="loginData.email" type="email" label="Correo Electrónico" required />
        <VTextField v-model="loginData.password" type="password" label="Contraseña" required />
        <VBtn variant="elevated" color="primary" type="submit">Iniciar Sesión</VBtn>
        <VBtn variant="tonal" class="mt-3" @click="isRegister = !isRegister">Registrar</VBtn>
      </form>
    </VCardText>
  </VCard>
</template>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
</style>
