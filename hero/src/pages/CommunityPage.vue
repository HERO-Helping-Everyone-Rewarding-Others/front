<script setup>
import { ref, computed, onMounted, watch } from "vue"
import { useAuth } from "../composables/auth"
import { useRoute, useRouter } from "vue-router"
import { addPost, posts } from "../store/posts"
import { ganharPontos } from "../store/user"
import { useCommunityState } from "../store/communities"
import PostComponent from "../components/PostComponent.vue"
import { faL } from "@fortawesome/free-solid-svg-icons"

const { user, accessToken, fetchUser } = useAuth()
const route = useRoute()
const router = useRouter()
const { entrouNaComunidade, entrarNaComunidade, todasComunidades } = useCommunityState()

const comunidadeNome = computed(() => route.params.nome)
const conteudo = ref("")
const imagemLink = ref("")
const arquivoImagem = ref(null)
const previewImagem = ref("")
const usuarioLogado = computed(() => user.value?.nome || "")
const membro = ref(false)
const mostrarMembro = ref(false)

const comunidade = computed(() =>
  todasComunidades.value.find(c => c.nome === comunidadeNome.value) || null
)

const postsDaComunidade = computed(() =>
  posts.value.filter(p => p.comunidade === comunidadeNome.value)
)

onMounted(async () => {
  if (accessToken.value && !user.value) await fetchUser()
  if (!user.value.comunidades) user.value.comunidades = []
  membro.value = entrouNaComunidade(comunidadeNome.value)
})

watch(() => route.params.nome, async (novoNome) => {
  membro.value = entrouNaComunidade(novoNome)
})


function entrar() {
  entrarNaComunidade(comunidadeNome.value)
  membro.value = true
  mostrarMembro.value = true
  setTimeout(() => {
    mostrarMembro.value = false
  }, 3000)
}

function selecionarImagem(event) {
  const file = event.target.files[0]
  if (file) {
    arquivoImagem.value = file
    previewImagem.value = URL.createObjectURL(file)
  }
}

const error = ref(null)

async function postar() {
  if (!conteudo.value || !usuarioLogado.value) {
    error.value = ("Você precisa escrever algo para postar.")
    return
  }

  if (!membro.value) {
    alert("Você precisa entrar na comunidade antes de postar.")
    return
  }

  error.value = null

  addPost({
    usuario: usuarioLogado.value,
    comunidade: comunidadeNome.value,
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

  ganharPontos(10)
  conteudo.value = ""
  imagemLink.value = ""
  arquivoImagem.value = null
  previewImagem.value = ""
}

const itemSelecionado = ref(null)
const mostrarModal = ref(false)
const mostrarModalDoacao = ref(false)

const abrirModal = () => { mostrarModal.value = true }
const fecharModal = () => {
  mostrarModal.value = false
  conteudo.value = ""
  imagemLink.value = ""
  arquivoImagem.value = null
  previewImagem.value = ""
  error.value = null
}


const abrirModalDoacao = () => { mostrarModalDoacao.value = true }
const fecharModalDoacao = () => { mostrarModalDoacao.value = false }


const mostrarConfirmar = ref(false)
const postParaRemover = ref(null)

function pedirConfirmacao(post) {
  postParaRemover.value = post
  mostrarConfirmar.value = true
}

function confirmarExclusao() {
  const index = posts.value.findIndex(p =>
    p.usuario === postParaRemover.value.usuario &&
    p.tempo === postParaRemover.value.tempo
  )
  if (index !== -1) posts.value.splice(index, 1)
  mostrarConfirmar.value = false
}
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
          <button @click="abrirModalDoacao" class="doar"><span class="mdi mdi-currency-usd"></span> Doar</button>
          <button @click="entrar" class="postar">Entrar</button>
        </div>
        <div v-else>
          <div class="member">
            <p>Membro</p>
          </div>
          <button @click="abrirModalDoacao" class="doar"><span class="mdi mdi-currency-usd"></span> Doar</button>
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
        <div v-if="error" class="error">{{ error }}</div>
        <div class="img-post">
          <div class="image-upload">
            <label v-if="!previewImagem" class="upload-label">
              Escolher imagem
              <input type="file" accept="image/*" @change="selecionarImagem" />
            </label>
            <img v-else :src="previewImagem" class="preview-image" />
          </div>
        </div>
        <div class="buttons-post">
          <button @click.self="fecharModal" class="doar">Cancelar</button>
          <button @click="postar" class="postar">Publicar</button>
        </div>
      </div>
    </div>

    <div v-if="mostrarModalDoacao" class="doação" @click.self="fecharModalDoacao">
      <div class="new-doação">
        <h2>Fazer Doação</h2>
        <p>
          Ajude a comunidade Horta Comunitária com sua doação e faça a diferença!
        </p>
        <div class="info-doação">
          <h3>
            Informações para doação:
          </h3>
          <p>
            {{ comunidade.contato }}
          </p>
        </div>
        <p>
          {{ comunidade.doacao }}
        </p>
        <div class="buttons-post">
          <button @click.self="fecharModalDoacao" class="postar">Fechar</button>
        </div>
      </div>
    </div>

    <div v-if="postsDaComunidade.length">
      <div v-for="p in postsDaComunidade" :key="p.tempo + p.usuario" class="feed">
        <PostComponent :post="p" />
        <div v-if="p.usuario === usuarioLogado" class="delete-button">
          <button @click="pedirConfirmacao(p)">
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </button>
        </div>
      </div>
    </div>
    <p v-else>Nenhum post nesta comunidade ainda.</p>

    <Transition name="slide">
      <div v-if="mostrarMembro" class="modal-backdrop">
        <div class="modal-membro">
          <h2>Você entrou na comunidade {{ comunidade.nome }}!</h2>
          <p>Agora pode fazer uma postagem.</p>
        </div>
      </div>
    </Transition>

    <div v-if="mostrarConfirmar" class="backdrop">
      <div class="modal-delete">
        <p>Deseja mesmo excluir esta postagem?</p>
        <button @click="mostrarConfirmar = false" class="doar">Não</button>
        <button @click="confirmarExclusao" class="postar">Sim</button>
      </div>
    </div>
    
  </section>
</template>

<style scoped>
section {
  padding: 0 12vw;
}

.backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-delete {
  background: rgb(252, 250, 250);
  padding: 0.5vw 2vw;
  border: 2px solid rgb(218, 215, 215);
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 10px rgba(158, 158, 158, 0.2);
}

.modal-delete p {
  font-size: 1rem;
  color: #1a1f1a;
  margin: 1vw 0 0 0;
}

.modal-delete button {
  font-size: 1rem;
  padding: 5px 15px;
  margin: 1vw 0.5vw;
  cursor: pointer;
}

.delete-button button {
  background: none;
  border: none;
  color: grey;
  font-size: 1.5rem;
  position: absolute;
  right: 13.5vw;
  margin-top: 1.3vw;
  cursor: pointer;
}

.delete-button button:hover {
  color: rgb(90, 89, 89);
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

.error {
  color: rgb(100, 99, 99);
  font-size: 1rem;
  margin-top: 0.5vw;
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
  transition: all 0.2s ease;
}

.button-back button:hover {
  background: rgba(99, 98, 98, 0.1);
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
  cursor: pointer;
}

.doar {
  color: #1a1f1a;
  background: rgba(168, 168, 168, 0.1);
  border: 1px solid rgb(218, 215, 215, 0.5);
  border-radius: 10px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.doar:hover {
  background: rgba(95, 94, 94, 0.1);
}

.postar {
  color: #ffffff;
  background: #1a1f1a;
  border: 1px solid rgb(218, 215, 215, 0.5);
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.postar:hover {
  background: #2d2e2d;
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

.show-post,
.doação {
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
  width: 35vw;
  z-index: 100;
  animation: popIn 0.3s ease forwards;
}

.new-post h2,
.new-doação h2 {
  font-size: 1.5rem;
  margin: 0;
}

.new-post p,
.new-doação p {
  font-size: 1.2rem;
  color: rgb(100, 99, 99);
  margin: 0.5vw 0 1vw 0;
}

.image-upload {
  gap: 0.8rem;
  margin: 1.5vw 0 0 0;
}

.upload-label input[type="file"] {
  display: none;
}

.preview-image {
  max-width: 15vw;
  max-height: 10vw;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid rgb(204, 204, 204, 0.5);
}

textarea {
  resize: none;
  outline: none;
  border: 2px solid rgb(201, 199, 199, 0.6);
  background: rgb(233, 232, 232, 0.3);
  border-radius: 5px;
  width: 95%;
  padding: 0.5vw;
  font-size: 0.9rem;
}

textarea::placeholder {
  color: grey;
}

.show-post label {
  border: 2px dashed #aaa;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-size: 0.9rem;
  color: #5e5e5e;
  font-weight: 600;
  position: absolute;
}

.buttons-post {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 2vw;
}

.buttons-post button {
  font-size: 1rem;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 500;
}

.info-doação {
  background: rgb(241, 241, 241, 0.5);
  border-radius: 15px;
  padding: 15px;
}

.info-doação h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a1f1a;
  margin: 0;
}

.new-doação {
  background: white;
  border-radius: 15px;
  padding: 2vw 2vw;
  width: 35vw;
  animation: popIn 0.3s ease forwards;
}


.new-doação p {
  font-size: 1.2rem;
  color: rgb(100, 99, 99);
}

/* Transição inicial */
.fade-slide-enter-active {
  transition: transform 0.6s linear;
}

.fade-slide-leave-active {
  transition: 0s;
}

.fade-slide-enter-active {
  transition: transform 0.3s linear;
}

.fade-slide-leave-active {
  transition: 0s;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.7s ease;
}

/* estado inicial da entrada */
.slide-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

/* estado final da entrada */
.slide-enter-to {
  transform: translateY(0);
  opacity: 1;
}

/* estado inicial da saída */
.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}

/* estado final da saída */
.slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* para o backdrop ficar embaixo */
.modal-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  /* modal no rodapé */
  padding-bottom: 40px;
  pointer-events: none;
}

.modal-membro {
  background: rgb(252, 250, 250);
  padding: 0.5vw 1vw;
  border: 3px solid rgb(218, 215, 215);
  border-radius: 10px;
  width: 30vw;
  text-align: center;
  box-shadow: 0 5px 10px rgba(68, 68, 68, 0.2);
}

.modal-membro h2 {
  color: #1a1f1a;
  font-size: 1rem;
  margin: 0.5vw 0;
}

.modal-membro p {
  color: #1a1f1a;
  font-size: 1rem;
  margin: 0 0 0.5vw 0;
  padding: 0;
}

@media (max-width: 1400px) {
  .member p {
    font-size: 0.7rem;
  }

  .new-post h2 {
    font-size: 1.3rem;
  }

  .new-post p {
    font-size: 0.9rem;
  }

  textarea {
    font-size: 0.8rem;
  }

  .buttons-post button {
    font-size: 0.8rem;
  }

  .info-doação h3 {
    font-size: 0.9rem;
  }

  .new-doação h2 {
    font-size: 1.2rem;
  }

  .new-doação p {
    font-size: 1rem;
  }

  .buttons button {
    font-size: 0.8rem;
    padding: 8px 12px;
  }

  .info h2 {
    font-size: 1.3rem;
  }

  .desc {
    font-size: 0.9rem;
  }

  .motiv {
    font-size: 0.9rem;
  }

  .infos {
    font-size: 0.8rem;
  }

  .numbers {
    font-size: 0.9rem;
  }

  .buttons button {
    font-size: 0.8rem;
  }

  .member p {
    font-size: 0.7rem;
  }

  .button-back button {
    font-size: 0.8rem;
  }
}

@media (max-width: 950px) {
  .button-back button {
    font-size: 0.9rem;
    padding: 8px 23px;
  }

  .info h2 {
    font-size: 1.3rem;
  }

  .desc {
    font-size: 0.9rem;
  }

  .motiv {
    font-size: 0.9rem;
  }

  .infos {
    font-size: 0.8rem;
  }

  .numbers {
    font-size: 0.9rem;
  }

  .buttons button {
    font-size: 0.8rem;
  }

  .member p {
    font-size: 0.7rem;
  }

  .new-post h2 {
    font-size: 1.3rem;
  }

  .new-post p {
    font-size: 0.9rem;
  }

  textarea {
    font-size: 0.8rem;
  }

  .buttons-post button {
    font-size: 0.8rem;
  }

  .info-doação h3 {
    font-size: 0.9rem;
  }

  .new-doação {
    background: white;
    border-radius: 15px;
    padding: 2vw 2vw;
    width: 35vw;
    height: 22vw;
    z-index: 100;
    animation: popIn 0.3s ease forwards;
  }

  .new-doação h2 {
    font-size: 1.2rem;
  }

  .new-doação p {
    font-size: 1rem;
    color: rgb(100, 99, 99);
  }

  .buttons button {
    font-size: 0.8rem;
    padding: 6px 9px;
    margin-left: 0.5vw;
    cursor: pointer;
  }
}
</style>
