<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '../composables/auth'
import { profileName, profileAvatar } from '../store/user' // novo

const props = defineProps({ post: Object })
// ... mantive o resto igual, com pequenas alterações

const { user, accessToken, fetchUser } = useAuth() // usuário logado

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

const addComment = () => {
  if (!newComment.value.trim()) return

  // usa o nome editado localmente se houver (para comentários feitos após a edição)
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
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F39C12', '#8E44AD', '#E74C3C']
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % colors.length
  return colors[index]
}
</script>

<template>
  <section>
    <div class="box-post">
      <div class="info-box">
        <div class="perfil-user">
          <!-- Avatar do autor do post: se autor for o usuário atual (ou o nome local editado), mostrar profileAvatar -->
          <template
            v-if="
              profileAvatar &&
              (post.usuario === (profileName || user?.nome) || post.usuario === profileName)
            "
          >
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
            <span id="user">{{ post.usuario }}</span>
            <span> • {{ post.comunidade }} • {{ post.tempo }}</span>
          </div>
          <div v-if="post.verificado" class="pontos-info">
            <p class="verificado">Verificado</p>
            <p class="pontos">+{{ post.pontos }} pontos</p>
          </div>
        </div>
      </div>

      <div class="post-img">
        <p>{{ post.conteudo }}</p>
        <img v-if="post.imagem" :src="post.imagem" alt="imagem do post" />
      </div>

      <div class="social">
        <a @click="toggleLike" class="like-btn">
          <font-awesome-icon
            :icon="[liked ? 'fas' : 'far', 'heart']"
            :class="['heart-icon', liked ? 'liked' : '']"
            class="heart-icon"
          />
          {{ likes }}
        </a>
        <a
          ><font-awesome-icon :icon="['far', 'comment']" class="comment" />
          {{ comentarios.length }}</a
        >
        <a><span id="link" class="mdi mdi-share-variant-outline"></span> Compartilhar</a>
      </div>

      <div v-for="c in comentarios" :key="c.id" class="comment-user">
        <div>
          <!-- avatar do comentário: se for do usuário atual (ou do nome local), mostrar profileAvatar -->
          <template v-if="profileAvatar && (c.usuario === profileName || c.usuario === user?.nome)">
            <img :src="profileAvatar" class="comment-avatar-img" />
          </template>
          <template v-else>
            <p class="avatar" :style="{ background: getUserColor(c.usuario) }">
              {{ c.usuario.split(' ')[0][0] }}
            </p>
          </template>
        </div>
        <div class="c-post">
          <p class="c-user">{{ c.usuario }}</p>
          <span class="c-conteudo">{{ c.conteudo }}</span>
        </div>
      </div>

      <div class="comment-box">
        <input
          v-model="newComment"
          type="text"
          placeholder="Escreva um comentário…"
          @keyup.enter="addComment"
        />
        <button @click="addComment">Publicar</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  padding-top: 3vw;
}
div.box-post {
  border: 2px solid rgb(218, 215, 215);
  width: 50vw;
  height: auto;
  margin: 0 auto;
  border-radius: 20px;
  padding: 2vw;
  box-sizing: border-box;
  box-shadow: 0 0 5px 1px rgb(204, 202, 202, 0.6);
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
  padding: 8px;
  border-radius: 12px;
  font-weight: 600;
  margin: 0.7vw 1vw 0 0;
  font-size: 1rem;
}
div.pontos-info .verificado {
  background: rgba(53, 231, 178, 0.4);
}
div.pontos-info .pontos {
  background: rgba(238, 240, 146, 0.6);
}
.post-img p {
  font-size: 1rem;
}
.post-img img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border: 1px solid rgb(218, 215, 215, 0.5);
  border-radius: 12px;
}
.social {
  display: flex;
  font-size: 1.3rem;
  color: grey;
  gap: 15px;
  margin: 1vw 0;
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
  color: blue;
}
.heart-icon:hover {
  color: red;
}
.heart-icon.liked {
  color: red;
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
