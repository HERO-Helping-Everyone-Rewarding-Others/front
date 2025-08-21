<script setup>
import { ref } from "vue"
import { addPost } from "../store/posts"

const usuario = ref("")
const comunidade = ref("")
const conteudo = ref("")
const imagem = ref("")

function postar() {
  if (!usuario.value || !conteudo.value) return

  addPost({
    usuario: usuario.value,
    comunidade: comunidade.value || "Comunidade Geral",
    pontos: 10,
    verificado: false,
    tempo: "agora",
    conteudo: conteudo.value,
    imagem: imagem.value,
    curtidas: 0,
    comentarios: 0,
    compartilhamentos: 0,
    comentariosLista: []
  })

  // limpa o formulário
  usuario.value = ""
  comunidade.value = ""
  conteudo.value = ""
  imagem.value = ""
}
</script>

<template>
  <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow p-4 mt-6">
    <h2 class="font-bold mb-3">Criar nova postagem</h2>

    <input v-model="usuario" type="text" placeholder="Seu nome"
      class="w-full border p-2 rounded mb-2" />
    <input v-model="comunidade" type="text" placeholder="Comunidade"
      class="w-full border p-2 rounded mb-2" />
    <textarea v-model="conteudo" placeholder="Escreva algo..."
      class="w-full border p-2 rounded mb-2"></textarea>
    <input v-model="imagem" type="text" placeholder="URL da imagem (opcional)"
      class="w-full border p-2 rounded mb-2" />

    <button @click="postar"
      class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
      Postar
    </button>
  </div>
</template>
