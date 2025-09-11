<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/auth'
import { usuario, profileName, profileBio, profileAvatar, pontosGanhos } from '../store/user'
import { posts } from '../store/posts'
import { savedPosts } from '../store/saved'
import { useCommunityState } from '../store/communities'
import PostComponent from '../components/PostComponent.vue'

const router = useRouter()
const { user, accessToken, fetchUser } = useAuth()
const { comunidadesEntradas } = useCommunityState()

const editing = ref(false)
const tab = ref('stats')

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
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F39C12', '#8E44AD', '#E74C3C']
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
</script>

<template>
  <section class="profile-section">
    <div class="profile-container">
      <div class="profile-card">
        <div class="profile-header">
          <div class="edit">
            <p>Perfil</p>
            <button class="edit-toggle" @click="editing = !editing">
              {{ editing ? 'Cancelar' : 'Editar' }}
            </button>
          </div>

          <div class="profile-main">
            <img v-if="profileAvatar" :src="profileAvatar" alt="avatar" class="avatar-img" />
            <div v-else class="avatar-fallback" :style="{ background: avatarColor }"> {{ initials }}</div>
            <h2>{{ displayName }}</h2>
            <p v-if="user?.email" class="profile-email">{{ user.email }}</p>
            <p class="profile-pontos">{{ usuario.pontos || 0 }} pontos</p>
          </div>
        </div>

        <div v-if="editing" class="profile-edit">
          <div class="profile-form">
            <div class="avatar-form" @click="$refs.avatarInput.click()">
              <label for="avatar">Clique ou arraste sua foto aqui</label>
              <input ref="avatarInput" id="avatar" type="file" accept="image/*" @change="onSelectAvatar"
                style="display: none" />
            </div>

            <div>
              <label for="nome">Nome</label>
              <input id="nome" v-model="profileName" type="text" placeholder="Seu nome" />
            </div>

            <div>
              <label for="bio">Biografia</label>
              <textarea id="bio" v-model="profileBio" placeholder="Escreva uma biografia curta"
                class="textarea"></textarea>
            </div>
          </div>

          <div class="edit-actions">
            <button @click="saveLocalChanges" class="btn-save">Salvar</button>
            <button @click="resetLocal" class="btn-reset">Resetar</button>
          </div>
        </div>

        <div v-else class="profile-bio">
          <h3>Bio</h3>
          <p v-if="profileBio">{{ profileBio }}</p>
          <p v-else class="muted">Sem biografia</p>
        </div>
      </div>

      <!-- Conteúdo -->
      <div class="profile-content">
        <nav class="nav-perfil">
          <button :class="{ active: tab === 'stats' }" @click="tab = 'stats'">Estatísticas</button>
          <button :class="{ active: tab === 'saved' }" @click="tab = 'saved'">Salvos</button>
          <button :class="{ active: tab === 'activity' }" @click="tab = 'activity'">Atividade</button>
        </nav>

        <!-- Estatísticas -->
        <div v-if="tab === 'stats'" class="stats">
          <div class="box-stats">
            <div class="stat-item">
              <p id="azul" class="stat-value">{{ usuario.pontos || 0 }}</p>
              <p class="stat-label">Total de pontos</p>
            </div>
            <span class="mdi mdi-chart-line"></span>
          </div>

          <div class="box-stats">
            <div class="stat-item">
              <p id="verde" class="stat-value">{{ comunidadesCount || 0 }}</p>
              <p class="stat-label">Comunidades</p>
            </div>
            <span class="mdi mdi-account-group-outline"></span>
          </div>

          <div class="box-stats">
            <div class="stat-item clickable" @click="tab = 'activity'">
              <p id="roxo" class="stat-value">{{ postsCount }}</p>
              <p class="stat-label">Postagens</p>
            </div>
            <span class="mdi mdi-heart-outline"></span>
          </div>

          <div id="laranja" class="box-stats">
            <div class="stat-item">
              <p class="stat-value">{{ pontosGanhos }}</p>
              <p class="stat-label">Pontos Ganhos</p>
            </div>
            <span class="mdi mdi-gift-outline" id="gift"></span>
          </div>
        </div>

        <!-- Posts Salvos -->
        <div v-if="tab === 'saved'" class="saved">
          <div v-if="savedPosts.length" class="post">
            <PostComponent v-for="p in savedPosts" :key="p.id || p._localUid" :post="p" />
          </div>
          <p v-else>Nenhum post salvo ainda.</p>
        </div>

        <!-- Atividade -->
        <div v-if="tab === 'activity'" class="activity">
          <div v-if="userPosts.length" class="post">
            <PostComponent v-for="p in userPosts" :key="p.id || p._localUid" :post="p" />
          </div>
          <p v-else>Você ainda não fez nenhuma postagem.</p>
        </div>
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
  padding: 1vw 2vw 3vw 2vw;
  min-width: 22vw;
}

.edit {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit button {
  border: 2px solid rgb(201, 199, 199, 0.3);
  background: rgb(233, 232, 232, 0.3);
  border-radius: 10px;
  padding: 0.5vw;
  color: rgb(86, 85, 87);
  cursor: pointer;
  font-size: 0.8rem;
}

.edit button:hover,
.edit-actions button:hover {
  background: rgb(233, 232, 232, 0.5);
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
}

.profile-main p.profile-email {
  margin: 0;
  color: rgb(86, 85, 87);
}

.profile-pontos {
  background: rgba(131, 255, 141, 0.3);
  color: #04750d;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
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

.profile-form label {
  font-size: 1rem;
  color: black;
  font-weight: 600;
  width: 100%;
  display: block;
  padding: 0.8vw 0;
}

.avatar-form {
  border: 2px dashed #aaa;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
}

.edit-actions {
  display: flex;
  gap: 8px;
}

.btn-save,
.btn-reset {
  padding: 4px 8px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  color: #555;
}

.avatar-form:hover {
  border-color: #1b2353;
  background: rgba(27, 35, 83, 0.05);
}

.profile-form div input,
.profile-form div textarea {
  border: 2px solid rgb(201, 199, 199, 0.3);
  background: rgb(233, 232, 232, 0.3);
  border-radius: 5px;
  width: 95%;
  outline: none;
  padding: 0.5vw;
  font-size: 0.9rem;
}

.textarea {
  resize: none;
}

.textarea::placeholder {
  color: grey;
}

.profile-form div input:hover,
.profile-form div input:focus,
.profile-form div textarea:hover,
.profile-form div textarea:focus {
  background: rgb(238, 237, 237);
}

.edit-actions button {
  border: 2px solid rgb(201, 199, 199, 0.3);
  background: rgb(233, 232, 232, 0.3);
  border-radius: 10px;
  padding: 0.5vw;
  color: rgb(86, 85, 87);
  cursor: pointer;
  font-size: 0.8rem;
  margin-right: 10px;
}

.profile-content {
  margin-left: 2vw;
  width: 100%;
}

.profile-content nav {
  background: rgba(240, 239, 239, 0.5);
  border-radius: 15px;
  display: flex;
  width: 100%;
  padding: 0.2vw;
}

.profile-content nav.nav-perfil button {
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
}

nav.nav-perfil button:focus,
nav.nav-perfil button:active {
  border: 1px solid rgb(201, 199, 199, 0.3);
  background: rgba(233, 231, 231, 0.5);
  color: rgb(0, 0, 0);
}

.stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2vw;
  gap: 1vw;
}

.box-stats {
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  border: 3px solid rgb(201, 199, 199, 0.3);
  width: 27vw;
  height: 10vw;

}

.stat-item p {
  margin: 0 0 0 2.5vw;
}

.stat-value {
  font-size: 1.7rem;
  font-weight: 700;
}

.stat-label {
  color: rgb(86, 85, 87);
}

.box-stats span {
  font-size: 2rem;
  padding: 0.6vw 1vw;
  border-radius: 50%;
  margin-right: 2vw;
}

.mdi-chart-line,
#azul {
  color: #066ccc;
}

.mdi-chart-line {
  background: rgba(6, 108, 204, 0.2);
}

.mdi-account-group-outline,
#verde {
  color: rgb(6, 187, 0);
}

.mdi-account-group-outline {
  background: rgba(6, 187, 0, 0.2);
}

.mdi-heart-outline,
#roxo {
  color: rgb(177, 6, 177);
}

.mdi-heart-outline {
  background: rgba(177, 6, 177, 0.2);
}

.mdi-gift-outline,
#laranja {
  color: rgba(255, 166, 0, 0.856);
}

.mdi-gift-outline {
  background: rgba(255, 166, 0, 0.2);
}

.activity,
.saved {
  margin-top: 2vw;
  width: 100%;
  max-height: 28vw;
  overflow-y: auto;
}

.activity p,
.saved p {
  color: rgb(103, 103, 104);
  text-align: center;
  margin-top: 4vw;
}
</style>
