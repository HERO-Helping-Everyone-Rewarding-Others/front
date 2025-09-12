<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '../composables/auth'
import { profileName, profileAvatar } from '../store/user'
import { toggleSave, isSaved } from '../store/saved' // novo


const imagemExpandida = ref(null)

function abrirImagem(img) {
  imagemExpandida.value = img
}

function fecharImagem() {
  imagemExpandida.value = null
}

const props = defineProps({ post: Object })

const { user, accessToken, fetchUser } = useAuth()

const postId = computed(() => {
  if (props.post.id) return props.post.id
  if (props.post._localUid) return props.post._localUid

  const newId = `${Date.now()}.${Math.random().toString(36).slice(2, 8)}`
  props.post._localUid = newId
  return newId
})

const likes = ref(props.post.curtidas || 0)
const liked = ref(false)

const newComment = ref('')
const comentarios = ref([])

const likedKey = computed(() => `liked_post_${postId.value}`)
const likesKey = computed(() => `likes_post_${postId.value}`)
const commentsKey = computed(() => `comments_post_${postId.value}`)

onMounted(async () => {
  if (accessToken.value && !user.value) {
    await fetchUser()
  }

  const savedLike = localStorage.getItem(likedKey.value)
  const savedLikes = localStorage.getItem(likesKey.value)
  if (savedLike === 'true') liked.value = true
  if (savedLikes) likes.value = parseInt(savedLikes)

  const savedComments = localStorage.getItem(commentsKey.value)
  if (savedComments) {
    comentarios.value = JSON.parse(savedComments)
  } else {
    comentarios.value = Array.isArray(props.post.comentariosLista)
      ? JSON.parse(JSON.stringify(props.post.comentariosLista))
      : []
  }
})

const persistComments = () =>
  localStorage.setItem(commentsKey.value, JSON.stringify(comentarios.value))

const toggleLike = () => {
  liked.value ? likes.value-- : likes.value++
  liked.value = !liked.value
  localStorage.setItem(likedKey.value, liked.value.toString())
  localStorage.setItem(likesKey.value, likes.value.toString())
}



function handleSave() {
  toggleSave(props.post)
}


const addComment = () => {
  if (!newComment.value.trim()) return

  const usuarioNome = profileName.value || user.value?.nome || 'Usuário Anônimo'

  comentarios.value.push({
    id: Date.now(),
    usuario: usuarioNome,
    conteudo: newComment.value,
    tempo: 'agora',
    curtidas: 0,
    liked: false,
  })

  newComment.value = ''
  persistComments()
}

function getUserColor(name) {
  const colors = ['#E8BCE0', '#247063', '#05232B', '#040F45', '#88B0B8', '#E36BD1', '#b00000', '#6321d9', '#EDC01C']
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % colors.length
  return colors[index]
}
</script>

<template>
  <div class="box-post">
    <div class="info-box">
      <div class="perfil-user">

        <template v-if="profileAvatar && (post.usuario === user?.nome || post.usuario === profileName)">

          <img :src="profileAvatar" class="avatar-img-small" />
        </template>
        <template v-else>
          <p class="avatar" :style="{ background: getUserColor(post.usuario) }">
            {{ post.usuario.split(' ')[0][0] }}{{ post.usuario.split(' ')[1]?.[0] }}
          </p>
        </template>
      </div>

      <div class="info-post">
        <div class="post-user">
          <span id="user">
            {{
              post.usuario === user?.nome || post.usuario === profileName
                ? profileName || user?.nome
                : post.usuario
            }}
          </span>
          <span> • {{ post.comunidade }} • {{ post.tempo }}</span>
        </div>
      </div>
    </div>

    <div class="post-img">
      <p>{{ post.conteudo }}</p>
      <img v-if="post.imagem" :src="post.imagem" alt="imagem do post" @click="abrirImagem(post.imagem)" />
    </div>

    <div v-if="imagemExpandida" class="lightbox" @click.self="fecharImagem">
      <img :src="imagemExpandida" class="lightbox-img" />
      <button class="fechar" @click="fecharImagem">✕</button>
    </div>

    <div class="social">
      <div class="likes">
        <a @click="toggleLike" class="like-btn">
        <font-awesome-icon :icon="[liked ? 'fas' : 'far', 'heart']" :class="['heart-icon', liked ? 'liked' : '']"
          class="heart-icon" />
        {{ likes }}
      </a>
      <a>
        <font-awesome-icon :icon="['far', 'comment']" class="comment" /> {{ comentarios.length }}
      </a>
      <a><span id="link" class="mdi mdi-share-variant-outline"></span> Compartilhar</a>
      </div>

      <div class="salvos">
        <a @click="handleSave">
        <font-awesome-icon :icon="[isSaved(post) ? 'fas' : 'far', 'bookmark']"
    :class="['bookmark', isSaved(post) ? 'saved' : '']"
    class="bookmark"/>
      </a>
      </div>
    </div>
  </div>
</template>


<style scoped>
div.box-post {
  border: 2px solid rgb(218, 215, 215);
  border-radius: 20px;
  padding: 2vw;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.5);
  margin-bottom: 3vw;
  width: 55.5vw;
  max-height: 20vw;
}

.info-box {
  display: flex;
  margin-bottom: 4vw;
}

.perfil-user p {
  width: 4vw;
  height: 4vw;
  border-radius: 100%;
  margin: 0 1vw 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
}

#user,
.c-user {
  font-weight: 600;
  color: black;
}

.info-post .post-user span,
.c-conteudo {
  color: rgb(81, 81, 82);
}

.pontos-info {
  display: flex;
}

div.pontos-info .verificado,
div.pontos-info .pontos {
  padding: 5px 8px;
  border-radius: 12px;
  font-weight: 600;
  margin: 0.3vw 0.5vw 0 0;
  font-size: 1rem;
}

div.pontos-info .verificado {
  background: rgba(53, 231, 178, 0.3);
}

div.pontos-info .pontos {
  background: rgba(238, 240, 146, 0.6);
}

.post-img p {
  font-size: 1rem;
}

.post-img img {
  width: 100%;
  max-height: 25vw;
  object-fit: cover;
  border: 1px solid rgb(218, 215, 215, 0.5);
  border-radius: 12px;
  display: block;
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease;
}

.lightbox-img {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  transform: scale(0.8);
  animation: popIn 0.3s ease forwards;
  cursor: zoom-out;
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

@keyframes fadeIn {
  from {
    background: rgba(0, 0, 0, 0);
  }

  to {
    background: rgba(0, 0, 0, 0.7);
  }
}

.social {
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  color: grey;
  margin: 1vw 0;
}

.likes {
  display: flex;
  gap: 15px;
}

.likes a {
  display: block;
}

.heart-icon,
.comment,
#link {
  cursor: pointer;
}

.social span:hover {
  color: rgb(13, 129, 66);
}

.comment:hover {
  color: rgb(38, 97, 207);
}

.heart-icon:hover {
  color: red;
}

.heart-icon.liked {
  color: red;
}

.salvos {
  font-size: 1.5rem;
  cursor: pointer;
}

.bookmark:hover {
  color: rgb(230, 161, 13);
}

.bookmark.saved {
  color: rgb(230, 161, 13);
}

.comment-user p.avatar {
  width: 3vw;
  height: 3vw;
  border-radius: 100%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
  margin-right: 1vw;
}

.comment-user {
  display: flex;
  margin-top: 0;
}

.c-user {
  margin: 1vw 0 0.2vw 0;
}

.comment-box {
  margin: 1vw 0;
  padding-bottom: 1vw;
  border-bottom: 1px solid rgb(204, 196, 196, 0.5);
  display: flex;
  justify-content: space-between;

}

.comment-box input {
  border: none;
  width: 100%;
  outline: none;
  font-size: 1rem;
  background: transparent;
}

.comment-box button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  color: rgb(101, 143, 235);
}

.avatar-img-small {
  width: 3.2vw;
  height: 3.2vw;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1vw;
}

.comment-avatar-img {
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1vw;
}
</style>
