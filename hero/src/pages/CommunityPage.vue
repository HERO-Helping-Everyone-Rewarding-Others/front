<script setup>
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import { posts } from "../store/posts"
import { minhasComunidades, ehDonoComunidade, entrarComunidade } from "../store/communities"
import { usuario } from "../store/user"
import NewPostComponent from "../components/NewPostComponent.vue"

const route = useRoute()
const nomeComunidade = route.params.nome

// controla se o formulário está visível
const mostrarForm = ref(false)

// filtra os posts dessa comunidade
const postsDaComunidade = computed(() =>
  posts.value.filter(p => p.comunidade === nomeComunidade)
)

// Verifica se o usuário participa ou é dono
const participa = computed(() =>
  minhasComunidades.value.some(c => c.nome === nomeComunidade)
)

const dono = computed(() => {
  const comunidade = minhasComunidades.value.find(c => c.nome === nomeComunidade)
  return comunidade ? ehDonoComunidade(usuario.value, comunidade) : false
})

const podePostar = computed(() => participa.value || dono.value)

function toggleForm() {
  mostrarForm.value = !mostrarForm.value
}

function entrar() {
  const comunidade = { nome: nomeComunidade, criadorId: 999 } // mock (ideal puxar do backend)
  entrarComunidade(comunidade)
}
</script>

<template>
  <div class="max-w-3xl mx-auto mt-6">
    <h1 class="text-2xl font-bold mb-4">
      Comunidade: {{ nomeComunidade }}
    </h1>

    <!-- Se pode postar, mostra o botão e o form -->
    <div v-if="podePostar">
      <button @click="toggleForm"
        class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mb-4">
        {{ mostrarForm ? "Fechar formulário" : "Criar nova postagem" }}
      </button>

      <NewPostComponent v-if="mostrarForm" :comunidade-fixa="nomeComunidade" />
    </div>

    <!-- Se não participa, mostra aviso e botão -->
    <div v-else class="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded">
      <p class="text-yellow-800">Você precisa entrar nesta comunidade para poder postar.</p>
      <button @click="entrar"
        class="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Entrar na comunidade
      </button>
    </div>

    <!-- Lista de posts -->
    <div v-if="postsDaComunidade.length" class="mt-6 space-y-4">
      <div v-for="post in postsDaComunidade" :key="post.conteudo"
           class="bg-white shadow rounded-2xl p-4">
        <h2 class="font-semibold">{{ post.usuario }}</h2>
        <p class="text-gray-700">{{ post.conteudo }}</p>

        <img v-if="post.imagem"
             :src="post.imagem"
             alt="Imagem do post"
             class="w-full max-h-80 object-cover rounded-xl mt-2" />
      </div>
    </div>
    <p v-else class="text-gray-500 mt-4">Ainda não há postagens aqui.</p>
  </div>
</template>
