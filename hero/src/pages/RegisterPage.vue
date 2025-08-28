<script setup>
import { useAuth } from '@/composables/auth'
const { register } = useAuth()
import { ref } from 'vue'


const nome = ref(``)
const email = ref(``)
const password = ref(``)
const biografia = ref(``)

const handleRegister = async () => {
 try{
  await register(nome.value, email.value, password.value, biografia.value)
  alert(`registro realizado com sucesso`)
 }
 catch(error){
  alert(JSON.stringify(error.response?.data))
 }
}
</script>

<template>
  <form @submit.prevent="handleRegister">
    <div>
      <label>Nome:</label>
      <input v-model="nome" type="text" />
    </div>

    <div>
      <label>Email:</label>
      <input v-model="email" type="email" />
    </div>

    <div>
      <label>Senha</label>
      <input v-model="password" type="password" />
    </div>

    <div>
      <label>Biografia:</label>
      <textarea v-model="biografia"></textarea>
    </div>

    <router-link to="/login"><button>Voltar ao login</button></router-link>



    <button type="submit">Registrar</button>

  </form>
</template>
<style scoped>
</style>