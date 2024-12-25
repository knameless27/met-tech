<script setup>
import { registerUser } from '@/services'
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
    registerData.value.password = btoa(registerData.value.password)
    const { message } = await registerUser(registerData.value)
    toast.success(message)
    isRegister.value = false
  } catch (error) {
    toast.error(error.message || 'Error al registrar.')
  }
}

const login = async () => {
  try {
    loginData.value.password = btoa(loginData.value.password)
    const { access_token } = await loginUser(loginData.value)
    toast.success('Inicio de sesión exitoso. Bienvenido.')
    localStorage.setItem('token', access_token)
    router.push('stores')
    loginData.value = { email: '', password: '' }
  } catch (error) {
    toast.error(error.message || 'Error al iniciar sesión.')
  }
}
</script>

<template>
  <div class="auth-container">
    <h1>Autenticación</h1>

    <div class="auth-form" v-if="isRegister">
      <h2>Registro</h2>
      <form @submit.prevent="register">
        <input v-model="registerData.name" type="text" placeholder="Nombre" required />
        <input
          v-model="registerData.email"
          type="email"
          placeholder="Correo Electrónico"
          required
        />
        <input v-model="registerData.password" type="password" placeholder="Contraseña" required />
        <button type="submit">Registrar</button>
        <button class="secondary-btn" @click="isRegister = !isRegister">Iniciar Sesión</button>
      </form>
    </div>

    <div class="auth-form" v-else>
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <input v-model="loginData.email" type="email" placeholder="Correo Electrónico" required />
        <input v-model="loginData.password" type="password" placeholder="Contraseña" required />
        <button type="submit">Iniciar Sesión</button>
        <button class="secondary-btn" @click="isRegister = !isRegister">Registrar</button>
      </form>
    </div>
  </div>
</template>

<style>
.secondary-btn {
  margin-top: 1vh;
  padding: 10px;
  background-color: transparent;
  color: white;
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
}
.secondary-btn:hover {
  background-color: #007bff;
}

.auth-container {
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.auth-form {
  margin-bottom: 20px;
}
h2 {
  margin-bottom: 10px;
}
form {
  display: flex;
  flex-direction: column;
}
input {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.message {
  margin-top: 10px;
  color: green;
}
</style>
