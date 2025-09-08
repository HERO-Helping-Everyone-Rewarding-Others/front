<template>
  <section class="profile-section">
    <div class="profile-container">
      <!-- painel esquerdo: perfil -->
      <aside class="profile-card">
        <div class="profile-header">
          <div class="avatar-wrapper">
            <img
              v-if="profileAvatar && profileAvatar.length"
              :src="profileAvatar"
              alt="avatar"
              class="avatar-img"
            />
            <div v-else class="avatar-fallback" :style="{ background: avatarColor }">
              {{ initials }}
            </div>
          </div>

          <div class="profile-main">
            <h2 class="profile-name">{{ displayName }}</h2>
            <p v-if="user?.email" class="profile-email">{{ user.email }}</p>
            <p class="profile-points">{{ usuario.pontos || 0 }} pontos</p>
          </div>

          <button class="edit-toggle" @click="editing = !editing">
            {{ editing ? "Cancelar" : "Editar perfil" }}
          </button>
        </div>

        <!-- edição -->
        <div v-if="editing" class="profile-edit">
          <label class="label">Foto do perfil</label>
          <input type="file" accept="image/*" @change="onSelectAvatar" />

          <label class="label" for="nome">Nome</label>
          <input id="nome" v-model="profileName" type="text" placeholder="Seu nome" />

          <label class="label" for="bio">Biografia</label>
          <textarea
            id="bio"
            v-model="profileBio"
            placeholder="Escreva uma biografia curta"
          ></textarea>

          <div class="edit-actions">
            <button @click="saveLocalChanges" class="btn-save">Salvar</button>
            <button @click="resetLocal" class="btn-reset">Resetar</button>
          </div>
        </div>

        <!-- bio -->
        <div v-else class="profile-bio">
          <h3>Bio</h3>
          <p v-if="profileBio">{{ profileBio }}</p>
          <p v-else class="muted">Sem biografia</p>
        </div>
      </aside>

      <!-- painel direito -->
      <main class="profile-content">
        <nav class="profile-tabs">
          <button :class="{ active: tab === 'stats' }" @click="tab = 'stats'">
            Estatísticas
          </button>
          <button :class="{ active: tab === 'activity' }" @click="tab = 'activity'">
            Atividade
          </button>
        </nav>

        <!-- estatísticas -->
        <section v-if="tab === 'stats'" class="stats">
          <div class="stat-item">
            <p class="stat-value">{{ usuario.pontos || 0 }}</p>
            <p class="stat-label">Total de pontos</p>
          </div>

          <div class="stat-item">
            <p class="stat-value">{{ comunidadesCount }}</p>
            <p class="stat-label">Comunidades</p>
          </div>

          <div class="stat-item clickable" @click="tab = 'activity'">
            <p class="stat-value">{{ postsCount }}</p>
            <p class="stat-label">Postagens</p>
          </div>

          <div class="stat-item">
            <p class="stat-value">{{ pontosGanhos }}</p>
            <p class="stat-label">Pontos Ganhos</p>
          </div>
        </section>

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
      </main>
    </div>
  </section>
</template>

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


<style scoped>
.profile-section {
  padding: 2rem;
  background: rgba(230, 242, 243, 0.5);
  min-height: 80vh;
  box-sizing: border-box;
}
.profile-container {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: flex-start;
}
.profile-card {
  width: 320px;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
}
.avatar-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.avatar-img {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
}
.avatar-fallback {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.4rem;
}
.profile-main {
  flex: 1;
}
.profile-name {
  margin: 0;
  font-size: 1.2rem;
}
.profile-email {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}
.profile-points {
  margin-top: 0.4rem;
  font-weight: 700;
  color: #0c587c;
}
.edit-toggle {
  margin-top: 0.8rem;
  background: transparent;
  border: 1px solid #ddd;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
}
.profile-edit {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.label {
  font-weight: 600;
  margin-top: 0.4rem;
}
.profile-edit input,
.profile-edit textarea {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}
.edit-actions {
  display: flex;
  gap: 0.5rem;
}
.btn-save {
  background: #2f9e44;
  color: white;
  padding: 8px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.btn-reset {
  background: #eee;
  padding: 8px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.profile-content {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
}
.profile-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.profile-tabs button {
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #eee;
  background: transparent;
  cursor: pointer;
}
.profile-tabs button.active {
  background: #0c587c;
  color: white;
}
.stats {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.stat-item {
  flex: 1 1 200px;
  background: #f6f9fa;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  cursor: default;
}
.stat-item.clickable {
  cursor: pointer;
}
.stat-value {
  font-size: 1.2rem;
  font-weight: 700;
}
.stat-label {
  color: #666;
  margin-top: 0.4rem;
}
.communities .community-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.community-card {
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #eee;
  background: #fff;
}
.community-card:hover {
  background: #f9fafb;
  cursor: pointer;
}
.community-name {
  margin: 0 0 0.2rem 0;
}
.community-desc {
  margin: 0 0 0.4rem 0;
  color: #555;
}
.empty {
  color: #666;
  padding: 1rem;
}
.posts-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.post-snippet {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 0.8rem;
}
.post-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.4rem;
}
.post-avatar,
.post-avatar-fallback,
.post-avatar-fallback-other {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white;
}
.post-avatar-fallback {
  font-size: 14px;
  background: var(--avatar-color, #888);
}
.post-avatar-fallback-other {
  font-size: 14px;
}
.post-author {
  font-weight: 700;
  font-size: 0.95rem;
}
.post-meta {
  font-size: 0.8rem;
  color: #777;
}
.post-content {
  font-size: 0.95rem;
}
</style>
