  <script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuth } from '../composables/auth'
  import { usuario, profileName, profileBio, profileAvatar, pontosGanhos, recompensasResgatadas } from '../store/user'
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
            <div class="edit">
              <p>Perfil</p>
              <button @click="editing = !editing"><font-awesome-icon
                  :icon="editing ? ['fas', 'xmark'] : ['fas', 'pen-to-square']" />
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
          <transition name="grow" mode="out-in">
            <div v-if="editing" class="profile-edit">
              <div class="profile-form">
                <div class="avatar-form" @click="$refs.avatarInput.click()" @dragover.prevent="handleDragOver"
                  @dragenter.prevent="handleDragOver" @dragleave="handleDragLeave" @drop="handleDrop"
                  :class="{ 'dragging': isDragging }">
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
          </transition>
        </div>

        <!-- Conteúdo -->
        <div class="profile-content">
          <nav class="nav-perfil">
            <button :class="{ active: tab === 'stats' }" @click="selectTab('stats')">Estatísticas</button>
            <button :class="{ active: tab === 'saved' }" @click="selectTab('saved')">Salvos</button>
            <button :class="{ active: tab === 'activity' }" @click="selectTab('activity')">Atividade</button>
            <button :class="{ active: tab === 'reward' }" @click="selectTab('reward')">Recompensas</button>
          </nav>

          <!-- Estatísticas -->
          <transition name="come" mode="in-out">
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
                  <p id="verde" class="stat-value">{{ comunidadesEntradas.length }}</p>
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
                  <p class="stat-value">{{ savedPosts.length }}</p>
                  <p class="stat-label">Salvos</p>
                </div>
                <span class="mdi mdi-star-outline" id="gift"></span>
              </div>
            </div>
          </transition>

          <transition name="come" mode="in-out">
            <!-- Posts Salvos -->
            <div v-if="tab === 'saved'" class="saved">

              <div v-if="savedPosts.length" class="post">
                <PostComponentSaved v-for="p in savedPosts" :key="p.id || p._localUid" :post="p" />
              </div>
              <p v-else>Nenhum post salvo ainda.</p>
            </div>
          </transition>

          <transition name="come" mode="in-out">
            <!-- Atividade -->
            <div v-if="tab === 'activity'" class="activity">
              <div v-if="userPosts.length" class="post">
                <PostActivity v-for="p in userPosts" :key="p.id || p._localUid" :post="p" />
              </div>
              <p v-else>Você ainda não fez nenhuma postagem.</p>
            </div>
          </transition>
          <transition name="come" mode="in-out">
            <div v-if="tab === 'reward'" class="box-reward">
              <div v-if="recompensasResgatadas.length" class="reward">
                <div v-for="(r, index) in recompensasResgatadas" :key="index" class="reward-card">
                  <div class="reward-info">
                    <h3>{{ r.nome }}</h3>
                    <p>{{ r.descricao }}</p>
                    <p id="date">Resgatado em: {{ new Date(r.data).toLocaleDateString('pt-BR') }}</p>
                  </div>
                  <img :src="r.Qr" alt="Imagem recompensa" class="reward-img" />
                </div>
              </div>
              <p v-else id="null">Você ainda não resgatou nenhuma recompensa.</p>
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
  object-fit: cover;
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

.avatar-form.dragging {
  border-color: #1b2353;
  background: rgba(27, 35, 83, 0.1);
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
  border-radius: 25px;
  display: flex;
  width: 100%;
  padding: 0.2vw;
}

.nav-perfil button {
  font-weight: 600;
  font-size: 0.9rem;
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

.activity,
.saved,
.box-reward {
  margin-top: 2vw;
  width: 100%;
  max-height: 28vw;
  overflow-y: auto;
}

.activity p,
.saved p,
#null {
  color: rgb(103, 103, 104);
  text-align: center;
  margin-top: 3vw;
}

.reward {
  background: white;
  border: 3px solid rgb(201, 199, 199, 0.3);
  border-radius: 20px;
  padding: 1.2vw 1.5vw;
}

.reward-info h3 {
  margin: 0;
  color: #1a1f1a;
}

.reward-info p {
  margin: 0.5vw 0 1vw 0;
  color: rgb(103, 103, 104);
  font-weight: 600;
}

#date {
  font-size: 1rem;
  margin: 3vw 0 0 0;
  font-weight: 500;
}

.reward-card {
  display: flex;
  justify-content: space-between;
}

.reward-img {
  max-width: 10vw;
  max-height: 10vw;
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

  p.profile-email {
    word-break: break-all;
    overflow-wrap: break-word;
    white-space: normal;
    max-width: 100%;
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
    padding: 1vw 5vw 4vw 5vw;
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
