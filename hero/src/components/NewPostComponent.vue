<script setup>
import { ref, computed, onMounted } from "vue"
import { addPost, comunidades, posts } from "../store/posts"
import { useAuth } from "../composables/auth"
import { ganharPontos } from "../store/user"
import { useRouter } from "vue-router"
import { useCommunityState } from "../store/communities"
import PostComponent from "../components/PostComponent.vue"

const router = useRouter()
const { user, accessToken, fetchUser } = useAuth()
const { entrouNaComunidade} = useCommunityState()

const conteudo = ref("")
const imagemLink = ref("")
const arquivoImagem = ref(null)
const previewImagem = ref("")
const comunidade = ref("")

const usuarioLogado = computed(() => user.value?.nome || "")

const postsFiltrados = computed(() => {
  if (!comunidade.value) return posts.value
  return posts.value.filter(p => p.comunidade === comunidade.value)
})

onMounted(async () => {
  if (accessToken.value && !user.value) await fetchUser()
})

function selecionarImagem(event) {
  const file = event.target.files[0]
  if (file) {
    arquivoImagem.value = file
    previewImagem.value = URL.createObjectURL(file)
  }
}

function redirecionarParaComunidade() {
  if (!comunidade.value) return
  router.push({ name: 'comunidade', params: { nome: comunidade.value } })
}

async function postar() {
  if (!conteudo.value || !usuarioLogado.value) {
    alert("Você precisa estar logado e escrever algo para postar.")
    return
  }

  if (!entrouNaComunidade(comunidade.value)) {
    alert("Você precisa entrar na comunidade antes de postar.")
    return
  }

  addPost({
    usuario: usuarioLogado.value,
    comunidade: comunidade.value,
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
  <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow p-4 mt-6">
    <h2 class="font-bold mb-3">Criar nova postagem</h2>

    <div v-if="usuarioLogado">
      <select v-model="comunidade" class="w-full border p-2 rounded mb-2">
        <option disabled value="">Selecione uma comunidade</option>
        <option v-for="c in comunidades" :key="c.nome" :value="c.nome">
          {{ c.nome }}
        </option>
      </select>

      <!-- Se não entrou na comunidade -->
      <div v-if="comunidade && !entrouNaComunidade(comunidade)">
        <p class="text-red-500 mb-2">Você precisa entrar na comunidade para poder postar.</p>
        <button @click="redirecionarParaComunidade"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-2">
          Entrar na comunidade
        </button>
      </div>

      <textarea v-model="conteudo" placeholder="Escreva algo..."
        class="w-full border p-2 rounded mb-2"
        :disabled="comunidade && !entrouNaComunidade(comunidade)"></textarea>

      <input v-model="imagemLink" type="text" placeholder="URL da imagem (opcional)"
        class="w-full border p-2 rounded mb-2"
        :disabled="comunidade && !entrouNaComunidade(comunidade)" />

      <input type="file" accept="image/*"
             @change="selecionarImagem"
             class="w-full border p-2 rounded mb-2"
             :disabled="comunidade && !entrouNaComunidade(comunidade)" />

      <img v-if="previewImagem" :src="previewImagem" class="max-h-40 mt-2 mb-2 rounded" />

      <button @click="postar"
        class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        :disabled="comunidade && !entrouNaComunidade(comunidade)">
        Postar
      </button>

      <!-- Lista de posts filtrados pela comunidade selecionada -->
      <div v-if="postsFiltrados.length" class="mt-6 space-y-4">
        <PostComponent v-for="p in postsFiltrados" :key="p.tempo + p.usuario" :post="p" />
      </div>
    </div>

    <div v-else>
      <p class="text-gray-500">Carregando informações do usuário ou faça login para postar...</p>
    </div>
  </div>
</template>
