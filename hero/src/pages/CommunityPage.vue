<script setup>
import { ref, computed, onMounted } from "vue"
import { useAuth } from "../composables/auth"
import { useRoute } from "vue-router"
import { addPost, posts } from "../store/posts"
import { ganharPontos } from "../store/user"
import { useCommunityState } from "../store/communities"
import PostComponent from "../components/PostComponent.vue"

const { user, accessToken, fetchUser } = useAuth()
const route = useRoute()
const { entrouNaComunidade, entrarNaComunidade } = useCommunityState()

const comunidadeNome = route.params.nome
const conteudo = ref("")
const imagemLink = ref("")
const arquivoImagem = ref(null)
const previewImagem = ref("")
const usuarioLogado = computed(() => user.value?.nome || "")
const membro = ref(false)

const postsDaComunidade = computed(() =>
  posts.value.filter(p => p.comunidade === comunidadeNome)
)

onMounted(async () => {
  if (accessToken.value && !user.value) await fetchUser()
  if (!user.value.comunidades) user.value.comunidades = []
  membro.value = entrouNaComunidade(comunidadeNome)
})

function entrar() {
  entrarNaComunidade(comunidadeNome)
  membro.value = true
  alert(`Você entrou na comunidade ${comunidadeNome}! Agora você pode postar.`)
}

function selecionarImagem(event) {
  const file = event.target.files[0]
  if (file) {
    arquivoImagem.value = file
    previewImagem.value = URL.createObjectURL(file)
  }
}

async function postar() {
  if (!conteudo.value || !usuarioLogado.value) {
    alert("Você precisa escrever algo para postar.")
    return
  }

  if (!membro.value) {
    alert("Você precisa entrar na comunidade antes de postar.")
    return
  }

  addPost({
    usuario: usuarioLogado.value,
    comunidade: comunidadeNome,
    pontos: 10,
    verificado: false,
    tempo: new Date().toISOString(),
    conteudo: conteudo.value,
    imagem: previewImagem.value || imagemLink.value,
    curtidas: 0,
    comentarios: 0,
    compartilhamentos: 0,
    comentariosLista: []
  })

  ganharPontos(20)
  conteudo.value = ""
  imagemLink.value = ""
  arquivoImagem.value = null
  previewImagem.value = ""
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-xl font-bold mb-4">{{ comunidadeNome }}</h1>

    <div v-if="!membro">
      <button @click="entrar"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4">
        Entrar na comunidade
      </button>
    </div>

    <p v-else class="text-gray-500 mb-4">Você é membro desta comunidade e pode criar posts!</p>

    <div v-if="membro" class="mb-6">
      <textarea v-model="conteudo" placeholder="Escreva algo..."
        class="w-full border p-2 rounded mb-2"></textarea>

      <input v-model="imagemLink" type="text" placeholder="URL da imagem (opcional)"
        class="w-full border p-2 rounded mb-2" />

      <input type="file" accept="image/*"
             @change="selecionarImagem"
             class="w-full border p-2 rounded mb-2" />

      <img v-if="previewImagem" :src="previewImagem" class="max-h-40 mt-2 mb-2 rounded" />

      <button @click="postar"
        class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mb-4">
        Postar
      </button>
    </div>

    <div v-if="postsDaComunidade.length">
      <h2 class="font-bold mb-2">Posts desta comunidade:</h2>
      <div v-for="p in postsDaComunidade" :key="p.tempo + p.usuario">
        <PostComponent :post="p" />
      </div>
    </div>
    <p v-else class="text-gray-500">Nenhum post nesta comunidade ainda.</p>
  </div>
</template>

<style scoped>
</style>