<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/auth'
import { posts } from '../store/posts'
import { savedPosts } from '../store/saved'
import { useCommunityState } from '../store/communities'
import PostActivity from '../components/PostActivity.vue'

const router = useRouter()
const route = useRoute()   // 🔹 pega params
const userId = route.params.id   // 🔹 id do usuário vindo da URL

const { user } = useAuth()
const { comunidadesEntradas } = useCommunityState()

const editing = ref(false)
const tab = ref('stats')

// 🔹 seleciona o usuário baseado no id
const selectedUser = computed(() => {
  return posts.value.find(p => String(p.usuarioId) === String(userId)) || null
})

// 🔹 usa selectedUser para exibição
const displayName = computed(() => selectedUser.value?.usuario || 'Usuário')

const initials = computed(() => {
  const name = displayName.value || 'U'
  const parts = name.split(' ').filter(Boolean)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase()
})

function getUserColor(name) {
  const colors = ['#E8BCE0', '#247063', '#05232B', '#040F45', '#88B0B8', '#E36BD1', '#b00000', '#6321d9', '#EDC01C']
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}
const avatarColor = computed(() => getUserColor(displayName.value))

// 🔹 posts do usuário selecionado
const userPosts = computed(() => {
  return posts.value.filter(p => String(p.usuarioId) === String(userId))
})

// 🔹 contador de posts
const postsCount = computed(() => userPosts.value.length)
</script>

<template>
  <section class="profile-section">
    <div class="profile-container">
      <div class="profile-card">

        <div class="profile-header">
          <div class="profile-main">
            <div v-if="selectedUser?.avatar">
              <img :src="selectedUser.avatar" alt="avatar" class="avatar-img" />
            </div>
            <div v-else class="avatar-fallback" :style="{ background: avatarColor }"> {{ initials }}</div>
            <h2>{{ displayName }}</h2>
            <p class="profile-pontos">Verificado</p>
          </div>
        </div>

        <transition name="grow" mode="out-in">
          <div v-if="editing" class="profile-edit">
            <div class="profile-form">
              <div>
                <label for="nome">Nome</label>
                <input id="nome" v-model="selectedUser.usuario" type="text" placeholder="Seu nome" />
              </div>


            </div>

          </div>
          <div v-else class="profile-bio">
            <h3>Bio</h3>
            <p v-if="selectedUser?.bio">{{ selectedUser.bio }}</p>
            <p v-else class="muted">Sem biografia</p>
          </div>
        </transition>
      </div>

      <!-- Conteúdo -->
      <div class="profile-content">
        <nav class="nav-perfil">
          <button :class="{ active: tab === 'stats' }" @click="tab = 'stats'">Estatísticas</button>

          <button :class="{ active: tab === 'activity' }" @click="tab = 'activity'">Atividade</button>

        </nav>

        <!-- Estatísticas -->
        <transition name="come" mode="in-out">
          <div v-if="tab === 'stats'" class="stats">
            <div class="box-stats">
              <div class="stat-item">
                <p id="azul" class="stat-value">{{ selectedUser?.pontos || 0 }}</p>
                <p class="stat-label">Total de pontos</p>
              </div>
              <span class="mdi mdi-chart-line"></span>
            </div>

            <div class="box-stats">
              <div class="stat-item">
                <p id="verde" class="stat-value">{{ selectedUser?.comunidadess }}</p>
                <p class="stat-label">Comunidades</p>
              </div>
              <span class="mdi mdi-account-group-outline"></span>
            </div>

            <div class="box-stats">
              <div class="stat-item clickable" @click="tab = 'activity'">
                <p id="roxo" class="stat-value">{{ selectedUser?.postagens }}</p>
                <p class="stat-label">Postagens</p>
              </div>
              <span class="mdi mdi-heart-outline"></span>
            </div>
          </div>
        </transition>



        <transition name="come" mode="in-out">
          <!-- Atividade -->
          <div v-if="tab === 'activity'" class="activity">
            <div v-if="userPosts.length" class="post">
              <PostActivity v-for="p in userPosts" :key="p.id || p._localUid" :post="p" />
            </div>
            <p v-else>Esse usuário ainda não fez nenhuma postagem.</p>
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

.stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2vw;
}

.box-stats {
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  border: 3px solid rgb(201, 199, 199, 0.3);
  width: 48%;
  height: 10vw;
  margin-bottom: 1vw;
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

.mdi-star-outline,
#laranja {
  color: rgba(255, 166, 0, 0.856);
}

.mdi-star-outline {
  background: rgba(255, 166, 0, 0.2);
}

.activity {
  margin-top: 1vw;
  width: 100%;
  max-height: 28vw;
  overflow-y: auto;
}

.activity p {
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

@media (max-width: 500px) {
  .profile-container {
    flex-direction: column;
    gap: 4vw;
  }

  .profile-card {
    padding: 4vw 5vw;
  }

  .profile-main h2 {
    width: 90%;
  }

  .profile-main img,
  .profile-main .avatar-fallback {
    width: 16vw;
    height: 16vw;
  }

  .nav-perfil {
    column-count: 2;
  }

  .nav-perfil button {
    font-size: 1rem;
  }

  .profile-content nav {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .stats {
    display: block;
    column-count: 1;
  }

  .box-stats {
    width: 100%;
    height: 22vw;
  }

  .box-stats span {
    font-size: 1.7rem;
    padding: 1vw 2.3vw;
    border-radius: 50%;
    margin-right: 2vw;
  }

  .reward-info h3 {
    font-size: 1rem;
  }

  .reward-info p {
    font-size: 0.9rem;
  }

  #date {
    font-size: 0.8rem;
  }

  .reward-img {
    max-width: 20vw;
    max-height: 20vw;
    align-items: center;
  }
}
</style>
