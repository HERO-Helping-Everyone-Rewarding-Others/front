<script setup>
import { ref, computed, onMounted } from "vue"
import { addPost, comunidades } from "../store/posts"
import { useAuth } from "../composables/auth"

const { user, accessToken, fetchUser } = useAuth()

const props = defineProps({
  comunidadeFixa: { type: String, default: "" }
})

const conteudo = ref("")
const imagem = ref("")
const comunidade = ref(props.comunidadeFixa)

// Computed para nome do usuário logado
const usuarioLogado = computed(() => user.value?.nome || "")

// Ao montar, garante que o usuário logado seja buscado se houver token
onMounted(async () => {
  if (accessToken.value && !user.value) {
    await fetchUser()
  }
})

async function postar() {
  // garante que o usuário esteja carregado antes de postar
  if (!user.value && accessToken.value) {
    await fetchUser()
  }

  if (!conteudo.value || !usuarioLogado.value) {
    alert("Você precisa estar logado e escrever algo para postar.")
    return
  }

  addPost({
    usuario: usuarioLogado.value,
    comunidade: props.comunidadeFixa || comunidade.value,
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

  conteudo.value = ""
  imagem.value = ""
  if (!props.comunidadeFixa) comunidade.value = ""
}
</script>

<template>
  <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow p-4 mt-6">
    <h2 class="font-bold mb-3">Criar nova postagem</h2>

    <div v-if="usuarioLogado">
      <select v-if="!props.comunidadeFixa"
              v-model="comunidade"
              class="w-full border p-2 rounded mb-2">
        <option disabled value="">Selecione uma comunidade</option>
        <option v-for="c in comunidades" :key="c.nome" :value="c.nome">
          {{ c.nome }}
        </option>
      </select>

      <textarea v-model="conteudo" placeholder="Escreva algo..."
        class="w-full border p-2 rounded mb-2"></textarea>

      <input v-model="imagem" type="text" placeholder="URL da imagem (opcional)"
        class="w-full border p-2 rounded mb-2" />

      <button @click="postar"
        class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Postar
      </button>
    </div>

    <div v-else>
      <p class="text-gray-500">Carregando informações do usuário ou faça login para postar...</p>
    </div>
  </div>
</template>
