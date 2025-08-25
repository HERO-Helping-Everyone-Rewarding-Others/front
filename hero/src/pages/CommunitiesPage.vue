<script setup>
import { comunidades, addCommunity } from "../store/posts"
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const novaComunidade = ref("")

function criarComunidade() {
  if (!novaComunidade.value) return
  addCommunity({ nome: novaComunidade.value, descricao: "Nova comunidade criada!" })
  novaComunidade.value = ""
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-xl font-bold mb-4">Comunidades</h1>

    <div class="mb-4">
      <input v-model="novaComunidade" type="text" placeholder="Nome da nova comunidade"
        class="border p-2 rounded w-full mb-2" />
      <button @click="criarComunidade" class="bg-indigo-600 text-white px-4 py-2 rounded">
        Criar Comunidade
      </button>
    </div>

    <ul class="space-y-2">
      <li v-for="c in comunidades" :key="c.nome"
          class="p-3 border rounded cursor-pointer hover:bg-gray-100"
          @click="router.push({ name: 'comunidade', params: { nome: c.nome } })">
        <h2 class="font-bold">{{ c.nome }}</h2>
        <p class="text-sm text-gray-600">{{ c.descricao }}</p>
      </li>
    </ul>
  </div>
</template>
