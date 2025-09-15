<script setup>
import { ref, computed, onMounted } from "vue"
import { useAuth } from "../composables/auth"
import { useRoute, useRouter } from "vue-router"
import { addPost, posts } from "../store/posts"
import { ganharPontos } from "../store/user"
import { useCommunityState } from "../store/communities"
import PostComponent from "../components/PostComponent.vue"


const { user, accessToken, fetchUser } = useAuth()
const route = useRoute()
const router = useRouter()
const { entrouNaComunidade, entrarNaComunidade, todasComunidades } = useCommunityState()

const comunidadeNome = route.params.nome
const conteudo = ref("")
const imagemLink = ref("")
const arquivoImagem = ref(null)
const previewImagem = ref("")
const usuarioLogado = computed(() => user.value?.nome || "")
const membro = ref(false)

// 🔹 comunidade atual
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

const abrirModal = () => { mostrarModal.value = true }
const fecharModal = () => { mostrarModal.value = false }
</script>

<template>
  <section>
    <div class="button-back">
      <button @click="router.push({ name: 'comunidades' })">
        <font-awesome-icon :icon="['fas', 'arrow-left']" /> Voltar para Comunidades
      </button>
    </div>

    <div v-if="comunidade" class="box-user">

      <div class="info">
        <h2>{{ comunidade.nome }}</h2>
        <p class="desc">{{ comunidade.descricao }}</p>
        <p class="motiv">{{ comunidade.motivacao }}</p>
        <p class="infos"><strong>Contato:</strong> {{ comunidade.contato }}</p>
        <p class="infos"><strong>Ajude com:</strong> {{ comunidade.doacao }}</p>

        <div class="numbers">
          <p>Membros: máx. {{ comunidade.maxMembros }}</p>
          <p><font-awesome-icon :icon="['far', 'heart']" style="color: red;" /> {{ postsDaComunidade.length }} postagens
          </p>
        </div>
      </div>

      <div class="buttons">
        <div v-if="!membro" class="in">
          <button class="doar"><span class="mdi mdi-currency-usd"></span> Doar</button>
          <button @click="entrar" class="postar">Entrar</button>
        </div>
        <div v-else>
          <div class="member">
            <p>Membro</p>
          </div>
          <button class="doar"><span class="mdi mdi-currency-usd"></span> Doar</button>
          <button @click="abrirModal" class="postar"><span class="mdi mdi-plus"></span> Postar</button>
        </div>
      </div>
    </div>

    <div v-if="mostrarModal" class="show-post" @click.self="fecharModal">
      <div class="new-post">
        <h2>Nova Postagem</h2>
        <p>
          Compartilhe suas atividades e contribuições para a comunidade.
        </p>
        <textarea v-model="conteudo"
          placeholder="Compartilhe suas atividades e contribuições para a comunidade..."></textarea>
        <div class="image-upload">
          <label class="upload-label">
            Escolher imagem
            <input type="file" accept="image/*" @change="selecionarImagem" />
          </label>
          <img v-if="previewImagem" :src="previewImagem" class="preview-image" />
        </div>
      </div>

      <button>Cancelar</button>
      <button @click="postar">Publicar</button>
    </div>
    <button class="fechar" @click.self="fecharModal">✕</button>


    <div v-if="postsDaComunidade.length">
      <div v-for="p in postsDaComunidade" :key="p.tempo + p.usuario" class="feed">
        <PostComponent :post="p" />
      </div>
    </div>
    <p v-else class="text-gray-500">Nenhum post nesta comunidade ainda.</p>
  </section>
</template>


<style scoped>
section {
  padding: 0 12vw;
}

.feed {
  display: flex;
  justify-content: center;
}

.box-user {
  background: white;
  display: flex;
  justify-content: space-between;
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
  animation: popIn 0.3s ease forwards;
}

.fechar {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 2rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
}

@keyframes popIn {
  from {
    transform: scale(0.5);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}


.button-back button {
  background: rgba(168, 168, 168, 0.1);
  border: 1px solid rgb(218, 215, 215, 0.5);
  box-shadow: 0 1px 5px rgb(204, 202, 202, 0.2);
  font-size: 1.2rem;
  font-weight: 500;
  padding: 10px 25px;
  border-radius: 10px;
  color: #1a1f1a;
  margin: 4vw 0 1.5vw 0;
  cursor: pointer;
}

.info {
  max-width: 55vw;
}

.info h2 {
  font-weight: 600;
  font-size: 1.6rem;
  margin-bottom: 0.5vw;
}

.info p {
  color: rgb(100, 99, 99);
}

.desc {
  font-size: 1.2rem;
  margin: 0;
}

.motiv {
  font-size: 1.1rem;
  margin: 0.5vw 0 3vw 0;
}

.infos {
  margin: 0.3vw 0;
  font-size: 1rem;
}

.numbers {
  font-size: 1.1rem;
}

.buttons {
  text-align: right;
}

.buttons button {
  font-size: 1.1rem;
  padding: 10px 15px;
  margin-left: 0.5vw;
}

.doar {
  color: #1a1f1a;
  background: rgba(168, 168, 168, 0.1);
  border: 1px solid rgb(218, 215, 215, 0.5);
  border-radius: 10px;
  font-weight: 500;
}

.postar {
  color: #ffffff;
  background: #1a1f1a;
  border: 1px solid rgb(218, 215, 215, 0.5);
  border-radius: 10px;
  font-weight: 600;
}

.member {
  display: flex;
}

.member p {
  padding: 6px 10px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  background: rgba(88, 166, 238, 0.12);
  color: rgb(17, 135, 204);
  width: 5vw;
  text-align: center;
  margin-left: auto;
}

.in {
  margin-top: 2vw;
}

.avatar-form {
  border: 2px dashed #aaa;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
}

.avatar-form.dragging {
  border-color: #1b2353;
  background: rgba(27, 35, 83, 0.1);
}

.new-post h2 {
  font-size: 1.5rem;
  margin: 0;
}

.new-post p {
  font-size: 1.2rem;
  color: rgb(100, 99, 99);
  margin: 0.5vw 0 1vw 0;
}

.image-upload {
  gap: 0.8rem;
 
}

.upload-label input[type="file"] {
  display: none;
  /* esconde o input real */
}

.preview-image {
  max-width: 15vw;
  max-height: 10vw;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid rgb(204, 204, 204, 0.5);
}

</style>
