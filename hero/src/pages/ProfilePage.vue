<script setup>
import { ref, computed, watch, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useAuth } from "../composables/auth"
import { usuario, profileName, profileBio, profileAvatar } from "../store/user"
import { posts } from "../store/posts"
import { useCommunityState } from "../store/communities"

const router = useRouter()
const { user, accessToken, fetchUser } = useAuth()
const { comunidadesEntradas } = useCommunityState() // apenas para exibir contador

const editing = ref(false)
const tab = ref("stats")

watch(
  () => user.value,
  (val) => {
    if (val) {
      if (!profileName.value) profileName.value = val.nome || usuario.value.nome || ""
      if (!profileBio.value) profileBio.value = val.biografia || ""
    }
  },
  { immediate: true }
)

const displayName = computed(() => profileName.value || user.value?.nome || usuario.value.nome)
const initials = computed(() => {
  const name = displayName.value || "U"
  const parts = name.split(" ").filter(Boolean)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase()
})

function getUserColor(name) {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F39C12", "#8E44AD", "#E74C3C"]
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}
const avatarColor = computed(() => getUserColor(displayName.value))

// Contador de comunidades (apenas exibição, sem incremento ao criar)
const comunidadesCount = computed(() => comunidadesEntradas.value.length)

// Posts do usuário
const userPosts = computed(() => {
  const backendName = user.value?.nome || usuario.value.nome
  const localName = profileName.value
  return posts.value.filter((p) => p.usuario === backendName || p.usuario === localName)
})
const postsCount = computed(() => userPosts.value.length)
const pontosGanhos = computed(() => usuario.value.pontos || 0)

function isPostByCurrentUser(p) {
  const backendName = user.value?.nome || usuario.value.nome
  return p.usuario === profileName.value || p.usuario === backendName
}
function initialsFor(name) {
  if (!name) return "U"
  const parts = String(name).split(" ").filter(Boolean)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase()
}

onMounted(async () => {
  if (accessToken.value && !user.value) {
    await fetchUser().catch(() => {})
  }
})

function onSelectAvatar(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    profileAvatar.value = ev.target.result
  }
  reader.readAsDataURL(file)
}

function saveLocalChanges() {
  editing.value = false
}

function resetLocal() {
  profileName.value = user.value?.nome || usuario.value.nome || ""
  profileBio.value = user.value?.biografia || ""
  profileAvatar.value = ""
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
            {{ editing ? "Cancelar" : "Editar" }}
          </button>
          </div>
          <div class="profile-main">
            <img
              v-if="profileAvatar && profileAvatar.length"
              :src="profileAvatar"
              alt="avatar"
              class="avatar-img"
            />
            <div v-else class="avatar-fallback" :style="{ background: avatarColor }">
              {{ initials }}
            </div>
            <h2>{{ displayName }}</h2>
            <p v-if="user?.email" class="profile-email">{{ user.email }}</p>
            <p class="profile-pontos">{{ usuario.pontos || 0 }} pontos</p>
          </div>
        </div>

        <!-- edição -->
        <div v-if="editing" class="profile-edit">
        
          <div class="profile-form">
            <div class="avatar-form">
            <label for="avatar">Clique ou arraste sua foto aqui
          </label>
          <input 
            id="avatar" 
            type="file" 
            accept="image/*" 
            @change="onSelectAvatar" 
            style="display: none;" 
          />
          </div>

          <div>
            <label class="label" for="nome">Nome</label>
          <input id="nome" v-model="profileName" type="text" placeholder="Seu nome" />
          </div>

          <div>
          <label class="label" for="bio">Biografia</label>
          <textarea
            id="bio"
            v-model="profileBio"
            placeholder="Escreva uma biografia curta"
            class="textarea"
          ></textarea>
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

      <!-- painel direito -->
      <div class="profile-content">
        <nav class="nav-perfil">
          <button :class="{ active: tab === 'stats' }" @click="tab = 'stats'">
            Estatísticas
          </button>
          <button>
            Comunidades
          </button>
          <button :class="{ active: tab === 'activity' }" @click="tab = 'activity'">
            Atividade
          </button>
        </nav>

        <!-- estatísticas -->
        <div v-if="tab === 'stats'" class="stats">
          <div class="box-stats">
            <div class="stat-item">
            <p class="stat-value">{{ usuario.pontos || 0 }}</p>
            <p class="stat-label">Total de pontos</p>
          </div>
          <span class="mdi mdi-chart-line"></span>
          </div>

          <div class="box-stats">
            <div class="stat-item">
            <p class="stat-value">{{ comunidadesCount }}</p>
            <p class="stat-label">Comunidades</p>
          </div>
          <span class="mdi mdi-heart-outline" id="heart"></span>
          </div>

          <div class="box-stats">
            <div class="stat-item clickable" @click="tab = 'activity'">
            <p class="stat-value">{{ postsCount }}</p>
            <p class="stat-label">Postagens</p>
          </div>
          <span class="mdi mdi-account-group-outline"></span>
          </div>

          <div class="box-stats">
            <div class="stat-item">
            <p class="stat-value">{{ pontosGanhos }}</p>
            <p class="stat-label">Pontos Ganhos</p>
          </div>
        <span class="mdi mdi-gift-outline" id="gift"></span>
          </div>

        <!-- atividade -->
        <section v-if="tab === 'activity'" class="activity">
          <div v-if="userPosts.length > 0" class="posts-list">
            <div
              v-for="p in userPosts"
              :key="p.tempo + p.usuario"
              class="post-snippet"
            >
              <div class="post-header">
                <template v-if="isPostByCurrentUser(p)">
                  <img
                    v-if="profileAvatar && profileAvatar.length"
                    :src="profileAvatar"
                    alt="avatar"
                    class="post-avatar"
                  />
                  <div v-else class="post-avatar-fallback" :style="{ background: avatarColor }">
                    {{ initials }}
                  </div>
                </template>
                <template v-else>
                  <div class="post-avatar-fallback-other" :style="{ background: getUserColor(p.usuario) }">
                    {{ initialsFor(p.usuario) }}
                  </div>
                </template>

                <div>
                  <p class="post-author">{{ isPostByCurrentUser(p) ? displayName : p.usuario }}</p>
                  <p class="post-meta">
                    {{ p.tempo }} • Curtidas: {{ p.curtidas || 0 }} • Comentários:
                    {{ (p.comentariosLista || []).length }}
                  </p>
                </div>
              </div>

              <p class="post-content">{{ p.conteudo }}</p>
            </div>
          </div>
          <div v-else class="empty">Você ainda não fez nenhuma postagem.</div>
        </section>
      </div>
    </div>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 5vw 12vw;
}
div .profile-container {
  display: flex;
}
.profile-card {
  background: white;
  border: 3px solid rgb(201, 199, 199, 0.3);
  border-radius: 25px;
  padding: 1vw 2vw;
  min-width: 24vw;
}
.edit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;
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
.edit button:hover {
  background: rgb(233, 232, 232, 0.5);
}
.profile-main {
  display: flex;
  flex-direction: column; 
  align-items: center;
  text-align: center;
}
.profile-main img,
.profile-main .avatar-fallback {
  width: 8vw;
  height: 8vw;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  background: rgb(131, 255, 141, 0.3);
  font-weight: 600;
  color: rgb(4, 117, 13);
  font-size: 1rem;
  padding: 3px 10px;
  border-radius: 8px;
}
.profile-bio {
  font-size: 1rem;
  margin-top: 2vw;
} 
.profile-bio p, .profile-bio h3 {
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
}
.avatar-form {
  border: 2px dashed #aaa;
  border-radius: 12px;
  padding: 1vw;
  text-align: center;
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
  background: rgb(233, 232, 232);
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
  background: rgb(255, 255, 255,0.5);
  border-radius: 15px;
  display: flex;
  width: 100%;
  overflow: hidden; 
  padding: 0.2vw;
}
.profile-content nav.nav-perfil button {
  font-weight: 500;
  font-size: 1rem;
  border-radius: 15px;
  flex: 1;
  background: transparent;
  border: 1px solid rgb(201, 199, 199, 0);
  padding: 6px;
}
.profile-content nav.nav-perfil button:focus {
  border: 1px solid rgb(201, 199, 199, 0.3);
  background: rgb(255, 255, 255,0.8);
}
.stats {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 2vw 0 4vw 0;
  gap: 1.6vw;
}
.box-stats {
  background: white;
  display: flex;
  justify-content: space-between; 
  width: 47%;
  align-items: center;
  border-radius: 20px;
  border: 3px solid rgb(201, 199, 199, 0.3);
}
.stat-item p {
  margin: 0;
}
</style>
