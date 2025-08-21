<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/auth'
const { login } = useAuth()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await login(email.value, password.value)
    alert('Login successful!')
  } catch (error) {
    alert('Login failed: ', error)
  }
}

</script>

<template>
<form @submit.prevent="handleLogin" >
        <input
          type="email"
          placeholder="Email"
          v-model="email"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
        />
         <button
          type="submit"

        >
          Logar
        </button>
      </form>
      <router-link to="/"><button> Voltar a pagina anterior</button></router-link>
      <router-link to="/register"><button>Não tem conta? Crie aqui</button> </router-link>
</template>

