<script setup>
import { registerUser } from '@/services'
import { ref } from 'vue'

const registerData = ref({
  name: '',
  email: '',
  password: '',
})

const loginData = ref({
  email: '',
  password: '',
})

const registerMessage = ref('')
const loginMessage = ref('')

const register = async () => {
  try {
    const response = await registerUser(registerData.value)
    registerMessage.value = 'Registro exitoso. Ahora puedes iniciar sesión.'
    registerData.value = { name: '', email: '', password: '' }
  } catch (error) {
    registerMessage.value = error.message || 'Error al registrar.'
  }
}

const login = async () => {
  try {
    const response = await loginUser(loginData.value)
    loginMessage.value = 'Inicio de sesión exitoso. Bienvenido.'
    console.log('Token de usuario:', response.token)
    loginData.value = { email: '', password: '' }
  } catch (error) {
    loginMessage.value = error.message || 'Error al iniciar sesión.'
  }
}
</script>

<template>
  <div class="auth-container">
    <h1>Autenticación</h1>

    <div class="auth-form">
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
      </form>
      <p v-if="registerMessage" class="message">{{ registerMessage }}</p>
    </div>

    <div class="auth-form">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <input v-model="loginData.email" type="email" placeholder="Correo Electrónico" required />
        <input v-model="loginData.password" type="password" placeholder="Contraseña" required />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p v-if="loginMessage" class="message">{{ loginMessage }}</p>
    </div>
  </div>
</template>

<style>
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
