<script setup>
import { ref, computed, onMounted } from "vue"
import { useAuth } from "../composables/auth"
import { useRoute } from "vue-router"
import { addPost, posts } from "../store/posts"
import { ganharPontos } from "../store/user"
import { useCommunityState } from "../store/communities"
import PostComponent from "../components/PostComponent.vue"
import { novaComunidade } from "../composables/useComunidades";


const { user, accessToken, fetchUser } = useAuth()
const route = useRoute()
const { entrouNaComunidade, entrarNaComunidade, todasComunidades } = useCommunityState()

const comunidadeNome = route.params.nome
const conteudo = ref("")
const imagemLink = ref("")
const arquivoImagem = ref(null)
const previewImagem = ref("")
const usuarioLogado = computed(() => user.value?.nome || "")
const membro = ref(false)

// 🔹 Usa as comunidades do state centralizado
const comunidade = computed(() =>
  todasComunidades.value.find(c => c.nome === comunidadeNome) || null
)

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

const itemSelecionado = ref(null)
const mostrarModal = ref(false)

const abrirModal = (item) => { itemSelecionado.value = item; mostrarModal.value = true }
const fecharModal = () => { itemSelecionado.value = null; mostrarModal.value = false }
</script>

<template>
    <div>
      <button>
        Voltar para Comunidades
      </button>
    </div>

      <div v-if="!membro" class="box-user">
      <div class="info">
        <h2>{{ comunidadeNome }}</h2>
        <p>Cuidado e resgate de cães abandonados</p>
        <p>Ajudar animais abandonados a encontrar um lar</p>
        <div class="numbers">
          <p>25/50 membros</p>
          <p>postagens</p>
        </div>
      </div>
      
      <div class="buttons">
        <button>Doar</button>
        <button @click="entrar" >
        Entrar na comunidade
      </button>
      </div>
    </div>

    <div v-else class="box-user">
      <div class="info">
        <h2>{{ comunidadeNome }}</h2>
        <p>Cuidado e resgate de cães abandonados</p>
        <p>Ajudar animais abandonados a encontrar um lar</p>
        <div class="numbers">
          <p>25/50 membros</p>
          <p>postagens</p>
        </div>
      </div>
      
      <div class="buttons">
        <p>Membro</p>
        <button>Doar</button>
        <button @click="abrirModal">
        Postar
      </button>
      </div>
    </div>

    <div v-if="mostrarModal" class="show-post" @click.self="fecharModal">
      <div class="new-post">
        <textarea v-model="conteudo" placeholder="Escreva algo..."></textarea>

      <input v-model="imagemLink" type="text" placeholder="URL da imagem (opcional)" />

      <input type="file" accept="image/*" @change="selecionarImagem" />

      <img v-if="previewImagem" :src="previewImagem" />

      <button @click="postar">
        Postar
      </button>
      </div>
    </div>

    <div v-if="postsDaComunidade.length">
      <div v-for="p in postsDaComunidade" :key="p.tempo + p.usuario" class="feed">
        <PostComponent :post="p" />
      </div>
    </div>
    <p v-else class="text-gray-500">Nenhum post nesta comunidade ainda.</p>
</template>

<style scoped>
.feed {
  display: flex;
  justify-content: center;
}
.box-user {
  background: white;
  display: flex;
  justify-content: space-between;
  width: 66vw;
  margin: 0 auto 3vw auto;
  padding: 1vw 2vw;
  border-radius: 20px;
  border: 1px solid rgb(218, 215, 215, 0.5);
  box-shadow: 0 2px 5px 1px rgb(204, 202, 202, 0.6);
}

.numbers {
  display: flex;
  gap: 4vw;
}

.show-post {
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.new-post {
  background: white;
  border-radius: 15px;
  padding: 2vw 2vw;
  width: 44vw;
  height: 20vw;
  z-index: 100;
}
</style>
