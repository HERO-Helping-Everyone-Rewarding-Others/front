<script setup>
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import { posts } from "../store/posts"
import NewPostComponent from "../components/NewPostComponent.vue"

const route = useRoute()
const nomeComunidade = route.params.nome

// controla se o formulário está visível
const mostrarForm = ref(false)

// filtra os posts dessa comunidade
const postsDaComunidade = computed(() =>
  posts.value.filter(p => p.comunidade === nomeComunidade)
)

function toggleForm() {
  mostrarForm.value = !mostrarForm.value
}
</script>

<template>
  <div class="max-w-3xl mx-auto mt-6">
    <h1 class="text-2xl font-bold mb-4">
      Comunidade: {{ nomeComunidade }}
    </h1>

    <!-- Botão que mostra/esconde o formulário -->
    <button @click="toggleForm"
      class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mb-4">
      {{ mostrarForm ? "Fechar formulário" : "Criar nova postagem" }}
    </button>

    <!-- Formulário só aparece se mostrarForm for true -->
    <NewPostComponent v-if="mostrarForm" :comunidade-fixa="nomeComunidade" />

    <!-- Lista de posts -->
    <div v-if="postsDaComunidade.length" class="mt-6 space-y-4">
      <div v-for="post in postsDaComunidade" :key="post.conteudo"
           class="bg-white shadow rounded-2xl p-4">
        <h2 class="font-semibold">{{ post.usuario }}</h2>
        <p class="text-gray-700">{{ post.conteudo }}</p>

         <!-- renderiza a imagem se existir -->
  <img v-if="post.imagem"
       :src="post.imagem"
       alt="Imagem do post"
       class="w-full max-h-80 object-cover rounded-xl mt-2" />
      </div>
    </div>
    <p v-else class="text-gray-500 mt-4">Ainda não há postagens aqui.</p>
  </div>
</template>
