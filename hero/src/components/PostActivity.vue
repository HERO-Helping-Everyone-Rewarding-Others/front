<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '../composables/auth'
import { profileName, profileAvatar } from '../store/user'
import { toggleSave, isSaved } from '../store/saved'


const props = defineProps({ post: Object })

const { user, accessToken, fetchUser } = useAuth()

const postId = computed(() => {
  if (props.post.id) return props.post.id
  if (props.post._localId) return props.post._localId

  const newId = `${Date.now()}.${Math.random().toString(36).slice(2, 8)}`
  return newId
})

const likes = ref(props.post.curtidas || 0)
const liked = ref(false)

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


const toggleLike = () => {
  liked.value ? likes.value-- : likes.value++
  liked.value = !liked.value
  localStorage.setItem(likedKey.value, liked.value.toString())
  localStorage.setItem(likesKey.value, likes.value.toString())
}

function handleSave() {
  toggleSave(props.post)
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
    <div class="head-post">
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
            <span> • <RouterLink :to="`/comunidade/${post.comunidade}`" class="link-comunidade">
                {{ post.comunidade }}
              </RouterLink> • {{ new Date(post.tempo).toLocaleTimeString('pt-BR', {
                hour: '2-digit', minute: '2-digit'
              })
              }}</span>
          </div>
          <div v-if="post.verificado" class="pontos-info">
            <p class="verificado">Verificado</p>
            <p class="pontos">+{{ post.pontos }} pontos</p>
          </div>
        </div>
      </div>
      <div class="salvos">
        <a @click="handleSave">
          <font-awesome-icon :icon="[isSaved(post) ? 'fas' : 'far', 'star']"
            :class="['star', isSaved(post) ? 'saved' : '']" class="bookmark" />
        </a>
      </div>
    </div>

    <div class="post-img">
      <p>{{ post.conteudo }}</p>
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
        <a><span id="link" class="mdi mdi-share-variant-outline"></span> </a>
      </div>
    </div>
  </div>
</template>


<style scoped>
div.box-post {
  border: 3px solid rgb(201, 199, 199, 0.3);
  border-radius: 20px;
  padding: 1.2vw 1.5vw;
  box-sizing: border-box;
  background: rgba(255, 255, 255);
  margin-bottom: 1vw;
}

.info-box {
  display: flex;
  margin-bottom: 4vw;
}

.head-post {
  display: flex;
  justify-content: space-between;
  height: 3vw;
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
  color: #1a1f24;
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
  padding: 6px 10px;
  border-radius: 10px;
  font-weight: 600;
  margin: 0.5vw 0.5vw 0 0;
  font-size: 1rem;
}

div.pontos-info .verificado {
  background: rgba(53, 231, 178, 0.3);
}

div.pontos-info .pontos {
  background: rgba(238, 240, 146, 0.6);
}

.post-img p {
  font-size: 1.3rem;
  margin-top: 3vw;
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
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.lightbox-img {
  max-width: 70vw;
  max-height: 70vh;
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
  color: grey;
}

.bookmark:hover {
  color: rgba(243, 227, 6, 0.925);
}

.bookmark.saved {
  color: rgba(243, 227, 6, 0.925);
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

.link-comunidade {
  color: rgb(88, 88, 88);
  text-decoration: none;
}

@media (max-width: 1400px) {

  div.pontos-info .verificado,
  div.pontos-info .pontos {
    font-size: 0.8rem;
  }

  .post-img p {
    font-size: 1.1rem;
  }

  .social {
    font-size: 1.1rem;
  }

  .salvos {
    font-size: 1.1rem;
  }

  .comment-box button {
    font-size: 0.8rem;
  }
}

@media (max-width: 950px) {

  div.pontos-info .verificado,
  div.pontos-info .pontos {
    font-size: 0.7rem;
  }

  .post-img p {
    font-size: 0.9rem;
    margin-top: 4vw;
  }

  .social {
    font-size: 0.9rem;
  }

  .salvos {
    font-size: 0.9rem;
  }

  .comment-box button {
    font-size: 0.6rem;
  }
}

@media (max-width: 500px) {
  .post-img p {
    margin: 10vw 0 0 0;
  }

  .perfil-user p {
    width: 5vw;
    height: 5vw;
    font-size: 0.8rem;
  }
}
</style>
