<script setup>
import { useAuth } from '@/composables/auth'
const { register } = useAuth()
import { reactive, ref } from 'vue'

const errormessage = ref(``)

const nome = ref(``)
const email = ref(``)
const password = ref(``)
const biografia = ref(``)
const foto_perfil = ref(``)

const handleRegister = async () => {
 try{
  await register(nome.value, email.value, password.value, biografia.value, foto_perfil.value)
  alert(`registro realizado com sucesso`)
 }
 catch(error){
  errormessage.value = error.response?.data.detail
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
      <label>Biografia:</label>
      <textarea v-model="biografia"></textarea>
    </div>

    <div>
      <label>Foto de Perfil (URL):</label>
      <input v-model="foto_perfil" type="text" />
    </div>

    <button type="submit">Registrar</button>
  </form>
</template>
