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
    await fetchUser().catch(() => {})
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
      <!-- Perfil -->
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
            <div v-else class="avatar-fallback" :style="{ background: avatarColor }">
              {{ initials }}
            </div>
            <h2>{{ displayName }}</h2>
            <p v-if="user?.email" class="profile-email">{{ user.email }}</p>
            <p class="profile-pontos">{{ usuario.pontos || 0 }} pontos</p>
          </div>
        </div>

        <div v-if="editing" class="profile-edit">
          <div class="profile-form">
            <div class="avatar-form" @click="$refs.avatarInput.click()">
              <label for="avatar">Clique ou arraste sua foto aqui</label>
              <input
                ref="avatarInput"
                id="avatar"
                type="file"
                accept="image/*"
                @change="onSelectAvatar"
                style="display: none"
              />
            </div>

            <div>
              <label for="nome">Nome</label>
              <input id="nome" v-model="profileName" type="text" placeholder="Seu nome" />
            </div>

            <div>
              <label for="bio">Biografia</label>
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

      <!-- Conteúdo -->
      <div class="profile-content">
        <nav class="nav-perfil">
          <button :class="{ active: tab === 'stats' }" @click="tab = 'stats'">Estatísticas</button>
          <button :class="{ active: tab === 'saved' }" @click="tab = 'saved'">Salvos</button>
          <button :class="{ active: tab === 'activity' }" @click="tab = 'activity'">
            Atividade
          </button>
        </nav>

        <!-- Estatísticas -->
        <div v-if="tab === 'stats'" class="stats">
          <div class="box-stats">
            <p class="stat-value">{{ usuario.pontos || 0 }}</p>
            <p class="stat-label">Pontos Atuais</p>
          </div>
          <div class="box-stats">
            <p class="stat-value">{{ postsCount }}</p>
            <p class="stat-label">Postagens</p>
          </div>
          <div class="box-stats">
            <p class="stat-value">{{ salvosCount }}</p>
            <p class="stat-label">Comunidades</p>
          </div>
          <div class="box-stats">
            <p class="stat-value">{{ pontosPostagens }}</p>
            <p class="stat-label">Pontos Ganhos (postagens)</p>
          </div>
        </div>

        <!-- Posts Salvos -->
        <div v-if="tab === 'saved'">
          <h3 class="mb-4">Posts Salvos</h3>
          <div v-if="savedPosts.length" class="space-y-4">
            <PostComponent v-for="p in savedPosts" :key="p.id || p._localUid" :post="p" />
          </div>
          <p v-else class="text-gray-500">Nenhum post salvo ainda.</p>
        </div>

        <!-- Atividade -->
        <div v-if="tab === 'activity'">
          <h3 class="mb-4">Suas Postagens</h3>
          <div v-if="userPosts.length" class="space-y-4">
            <PostComponent v-for="p in userPosts" :key="p.id || p._localUid" :post="p" />
          </div>
          <p v-else class="text-gray-500">Você ainda não fez nenhuma postagem.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.profile-section {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.profile-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.profile-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  width: 320px;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.profile-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.edit {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.edit-toggle {
  cursor: pointer;
  background: #eee;
  border-radius: 8px;
  padding: 4px 8px;
  border: none;
}
.profile-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
}
.avatar-img,
.avatar-fallback {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.avatar-fallback {
  color: white;
  font-size: 24px;
}
.profile-pontos {
  background: rgba(131, 255, 141, 0.3);
  color: #04750d;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: 600;
}
.profile-edit {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.profile-form div {
  display: flex;
  flex-direction: column;
  gap: 4px;
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
}
.profile-content {
  flex: 1;
  min-width: 320px;
  display: flex;
  flex-direction: column;
}
.nav-perfil {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.nav-perfil button {
  flex: 1;
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
}
.nav-perfil button.active {
  background: #4f46e5;
  color: white;
}
.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.box-stats {
  background: white;
  padding: 12px;
  border-radius: 12px;
  flex: 1;
  min-width: 140px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
.stat-value {
  font-weight: bold;
  font-size: 18px;
}
.stat-label {
  font-size: 12px;
  color: gray;
}
</style>
