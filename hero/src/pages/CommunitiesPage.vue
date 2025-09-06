<script setup>
import { comunidades, addCommunity } from "../store/posts"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuth } from "../composables/auth"
import { useCommunityState } from "../store/communities"

const router = useRouter()
const { user } = useAuth()
const { adicionarComunidadeCriada } = useCommunityState()


const novaComunidade = ref({
  nome: "",
  descricao: "",
  motivacao: "",
  maxMembros: 30,
  contato: "",
  doacoesInfo: "",
  tiposDoacoes: ""
})


const erro = ref("")

function criarComunidade() {
  erro.value = ""

  if (!novaComunidade.value.nome.trim()) {
    erro.value = "O nome da comunidade é obrigatório."
    return
  }
  if (!novaComunidade.value.descricao.trim()) {
    erro.value = "A descrição é obrigatória."
    return
  }
  if (!novaComunidade.value.motivacao.trim()) {
    erro.value = "A motivação é obrigatória."
    return
  }
  if (!novaComunidade.value.maxMembros || novaComunidade.value.maxMembros < 1) {
    erro.value = "O número máximo de membros deve ser no mínimo 1."
    return
  }


  const comunidade = {
    nome: novaComunidade.value.nome.trim(),
    descricao: novaComunidade.value.descricao.trim(),
    motivacao: novaComunidade.value.motivacao.trim(),
    maxMembros: novaComunidade.value.maxMembros,
    contato: novaComunidade.value.contato.trim(),
    doacoesInfo: novaComunidade.value.doacoesInfo.trim(),
    tiposDoacoes: novaComunidade.value.tiposDoacoes
      ? novaComunidade.value.tiposDoacoes.split(",").map(d => d.trim())
      : []
  }


  addCommunity(comunidade)

  if (!user.value.comunidades) user.value.comunidades = []
  if (!user.value.comunidades.includes(comunidade.nome)) {
    user.value.comunidades.push(comunidade.nome)
  }

  adicionarComunidadeCriada(comunidade)

  // Resetar form
  novaComunidade.value = {
    nome: "",
    descricao: "",
    motivacao: "",
    maxMembros: 30,
    contato: "",
    doacoesInfo: "",
    tiposDoacoes: ""
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
    <h1 class="text-xl font-bold mb-4">Criar Nova Comunidade</h1>

    <div class="space-y-3">
      <input v-model="novaComunidade.nome" type="text" placeholder="Nome da Comunidade"
        class="border p-2 rounded w-full" />

      <textarea v-model="novaComunidade.descricao" placeholder="Descrição"
        class="border p-2 rounded w-full"></textarea>

      <textarea v-model="novaComunidade.motivacao" placeholder="Motivação"
        class="border p-2 rounded w-full"></textarea>

      <input v-model.number="novaComunidade.maxMembros" type="number" placeholder="Máximo de Membros"
        class="border p-2 rounded w-full" />

      <input v-model="novaComunidade.contato" type="text" placeholder="Informações de Contato"
        class="border p-2 rounded w-full" />

      <input v-model="novaComunidade.doacoesInfo" type="text" placeholder="Informações para Doações"
        class="border p-2 rounded w-full" />

      <input v-model="novaComunidade.tiposDoacoes" type="text" placeholder="Tipos de Doações Aceitas"
        class="border p-2 rounded w-full" />


      <p v-if="erro" class="text-red-600 font-semibold text-sm">{{ erro }}</p>

      <button @click="criarComunidade" class="bg-green-600 text-white px-4 py-2 rounded w-full">
        Criar Comunidade
      </button>
    </div>


    <ul class="space-y-2 mt-6">
      <li v-for="c in comunidades" :key="c.nome"
          class="p-3 border rounded cursor-pointer hover:bg-gray-100"
          @click="router.push({ name: 'comunidade', params: { nome: c.nome } })">
        <h2 class="font-bold">{{ c.nome }}</h2>
        <p class="text-sm text-gray-600">{{ c.descricao }}</p>
      </li>
    </ul>
  </div>
</template>
