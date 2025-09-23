<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/auth'
import { usuario, profileName, profileBio, profileAvatar, pontosGanhos } from '../store/user'
import { posts } from '../store/posts'
import { savedPosts } from '../store/saved'
import { useCommunityState } from '../store/communities'
import PostComponentSaved from '../components/PostComponentSaved.vue'
import PostActivity from '../components/PostActivity.vue'



const router = useRouter()
const { user, accessToken, fetchUser } = useAuth()
const { comunidadesEntradas } = useCommunityState()

const editing = ref(false)
const tab = ref('stats')

function selectTab(name) {
  tab.value = name
}


// Atualiza campos locais com dados do usuário
watch(
  () => user.value,
  (val) => {
    if (val) {
      if (!profileName.value) profileName.value = val.nome || usuario.value.nome || ''
      if (!profileBio.value) profileBio.value = val.biografia || ''
    }
  },
  { immediate: true },
)

// Nome para exibição
const displayName = computed(() => profileName.value || user.value?.nome || usuario.value.nome)

// Iniciais para avatar fallback
const initials = computed(() => {
  const name = displayName.value || 'U'
  const parts = name.split(' ').filter(Boolean)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase()
})

// Gera cores para avatar de acordo com o nome
function getUserColor(name) {
  const colors = ['#E8BCE0', '#247063', '#05232B', '#040F45', '#88B0B8', '#E36BD1', '#b00000', '#6321d9', '#EDC01C']
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}
const avatarColor = computed(() => getUserColor(displayName.value))

// Posts do usuário
const userPosts = computed(() => {
  const backendName = user.value?.nome || usuario.value.nome
  const localName = profileName.value
  return posts.value.filter((p) => p.usuario === backendName || p.usuario === localName)
})
const postsCount = computed(() => userPosts.value.length)
const salvosCount = computed(() => comunidadesEntradas.value.length)
const pontosPostagens = computed(() => pontosGanhos.value)

// Verifica se o post é do usuário atual
function isPostByCurrentUser(p) {
  const backendName = user.value?.nome || usuario.value.nome
  return p.usuario === profileName.value || p.usuario === backendName
}
function initialsFor(name) {
  if (!name) return 'U'
  const parts = String(name).split(' ').filter(Boolean)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase()
}

// On mounted
onMounted(async () => {
  if (accessToken.value && !user.value) {
    await fetchUser().catch(() => { })
  }
})

// Seleção de avatar
function onSelectAvatar(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    profileAvatar.value = ev.target.result
  }
  reader.readAsDataURL(file)
}

// Salvar e resetar alterações locais
function saveLocalChanges() {
  editing.value = false
}
function resetLocal() {
  profileName.value = user.value?.nome || usuario.value.nome || ''
  profileBio.value = user.value?.biografia || ''
  profileAvatar.value = ''
}

const isDragging = ref(false)

function handleDragOver(e) {
  e.preventDefault() // obrigatório para permitir drop
  isDragging.value = true
}

function handleDragLeave(e) {
  isDragging.value = false
}

function handleDrop(e) {
  e.preventDefault()
  isDragging.value = false

  const file = e.dataTransfer.files[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    alert('Apenas arquivos de imagem são permitidos.')
    return
  }

  const reader = new FileReader()
  reader.onload = (ev) => {
    profileAvatar.value = ev.target.result
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <section class="profile-section">
    <div class="profile-container">
      <div class="profile-card">
        <div class="profile-header">

          <div class="profile-main">
            <img v-if="profileAvatar" :src="profileAvatar" alt="avatar" class="avatar-img" />
            <div v-else class="avatar-fallback" :style="{ background: avatarColor }"> {{ initials }}</div>
            <h2>{{ displayName }}</h2>
            <p class="profile-pontos">Verificado</p>
          </div>
        </div>          
            <h3>Bio</h3>
            <p v-if="profileBio">{{ profileBio }}</p>
            <p v-else class="muted">Sem biografia</p>
      </div>

      <!-- Conteúdo -->
      <div class="profile-content">
        <nav class="nav-perfil">
          <button :class="{ active: tab === 'comuni' }" @click="selectTab('comuni')">Comunidades</button>
          <button :class="{ active: tab === 'activity' }" @click="selectTab('activity')">Atividade</button>
        </nav>

        <transition name="come" mode="in-out">
          <!-- Posts Salvos -->
          <div v-if="tab === 'comuni'" class="comuni">

            <div v-if="savedPosts.length" class="post">
              <PostComponentSaved v-for="p in savedPosts" :key="p.id || p._localUid" :post="p" />
            </div>
            <p v-else>"nome" não está em nenhuma comunidade.</p>
          </div>
        </transition>

        <transition name="come" mode="in-out">
          <!-- Atividade -->
          <div v-if="tab === 'activity'" class="activity">
            <div v-if="userPosts.length" class="post">
              <PostActivity v-for="p in userPosts" :key="p.id || p._localUid" :post="p" />
            </div>
            <p v-else>"nome" ainda não fez nenhuma postagem.</p>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 5vw 8vw 10vw 8vw;
}

div .profile-container {
  display: flex;
}

.profile-card {
  background: white;
  border: 3px solid rgb(201, 199, 199, 0.3);
  border-radius: 25px;
  padding: 2vw 2vw 3vw 2vw;
  min-width: 22vw;
}

.edit {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit button {
  border: 2px solid rgb(201, 199, 199, 0.3);
  background: none;
  border-radius: 10px;
  padding: 0.5vw 0.7vw;
  color: rgb(86, 85, 87);
  cursor: pointer;
  font-size: 1.4rem;
}

.edit button:hover,
.edit-actions button:hover {
  background: rgba(247, 246, 246, 0.5);
}

.profile-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
}

.profile-main img,
.profile-main .avatar-fallback {
  width: 8vw;
  height: 8vw;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.avatar-fallback {
  color: white;
  font-weight: 700;
  object-fit: cover;
  margin-bottom: 1vw;
  font-size: 2rem;
}

.profile-main h2 {
  margin: 0;
  width: 20vw;
  white-space: normal;
  word-wrap: break-word;
}

.profile-pontos {
  background: rgba(131, 230, 255, 0.3);
  color: #045e75;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  margin: 0;
}

.profile-bio {
  font-size: 1rem;
  margin-top: 2vw;
}

.profile-bio p,
.profile-bio h3 {
  margin: 0;
}

.profile-bio p {
  color: rgb(86, 85, 87);
}

.profile-form div {
  margin: 2vw 0;
}

.profile-content {
  margin-left: 2vw;
  width: 100%;
}

.profile-content nav {
  background: rgba(240, 239, 239, 0.5);
  border-radius: 25px;
  display: flex;
  width: 100%;
  padding: 0.2vw;
}

.nav-perfil button {
  font-weight: 500;
  font-size: 1rem;
  border-radius: 20px;
  flex: 1;
  display: flex;
  justify-content: center;
  background: transparent;
  border: 1px solid rgb(255, 255, 255, 0);
  padding: 8px;
  width: 100%;
  color: rgb(124, 123, 126);
  cursor: pointer;
  transition: all 0.3s ease;
}

nav.nav-perfil button:focus,
.nav-perfil button.active {
  border: 1px solid rgb(201, 199, 199, 0.3);
  background: rgba(233, 231, 231, 0.5);
  color: rgb(0, 0, 0);
}

.activity,
.comuni {
  margin-top: 1vw;
  width: 100%;
  max-height: 28vw;
  overflow-y: auto;
}

.activity p,
.comuni p {
  color: rgb(103, 103, 104);
  text-align: center;
  margin-top: 4vw;
}

.grow-enter-active,
.grow-leave-active {
  transition: all 0.3s ease;
}

.grow-enter-from,
.grow-leave-to {
  opacity: 0;
  transform: scaleY(0.8);
}

.grow-enter-to,
.grow-leave-from {
  opacity: 1;
  transform: scaleY(1);
}

.come-enter-active {
  transition: transform 0.3s linear;
}

.come-leave-active {
  transition: 0s;
}

.come-enter-from,
.come-leave-to {
  opacity: 0;
  transform: translateX(-5px);
}

.come-enter-to,
.come-leave-from {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 1400px) {
  .edit button {
    font-size: 1.1rem;
  }

  .avatar-fallback {
    font-size: 1.8rem;
  }

  .profile-main h2 {
    font-size: 1.5rem;
  }

  .profile-main p.profile-email {
    font-size: 1rem;
  }

  .profile-pontos {
    font-size: 0.8rem;
  }

  .profile-bio {
    font-size: 0.8rem;
  }

  .profile-form label {
    font-size: 0.8rem;
  }


  .profile-form div input,
  .profile-form div textarea {
    font-size: 0.8rem;
  }

  .edit-actions button {
    font-size: 0.7rem;
  }

  .nav-perfil button {
    font-size: 0.8rem;
  }

  .stat-value {
    font-size: 1.4rem;
  }

  .stat-value p {
    font-size: 1.1rem;
  }

  .box-stats span {
    font-size: 1.7rem;
  }

  .stat-label {
    font-size: 1rem;
  }
}
@media (max-width: 950px) {
  .edit button {
    font-size: 1rem;
  }

  .avatar-fallback {
    font-size: 1.6rem;
  }

  .profile-main h2 {
    font-size: 1.3rem;
  }

  .profile-main p.profile-email {
    font-size: 0.9rem;
  }

  .profile-pontos {
    font-size: 0.7rem;
  }

  .profile-bio {
    font-size: 0.7rem;
  }

  .profile-form label {
    font-size: 0.7rem;
  }

  .profile-form div input,
  .profile-form div textarea {
    font-size: 0.7rem;
  }

  .edit-actions button {
    font-size: 0.7rem;
  }

  .nav-perfil button {
    font-size: 0.8rem;
  }

  .stat-value {
    font-size: 1.4rem;
  }

  .stat-value p {
    font-size: 1.1rem;
  }

  .box-stats span {
    font-size: 1.7rem;
  }

  .stat-label {
    font-size: 1rem;
  }
}

</style>
