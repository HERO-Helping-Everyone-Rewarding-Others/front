<script setup>
import { computed } from 'vue'
import FeedComponent from '../components/FeedComponent.vue'
import { comunidadesCount, posts } from "@/store/posts"

// contador de ações realizadas (usa quantidade de posts do feed)
const totalPosts = computed(() => posts.value.length)
</script>

<template>
  <main>
    <div class="welcome">
      <h1>Bem-vindo ao HERO</h1>
      <p>
        Junte-se a comunidades que fazem a diferença e seja recompensado por ajudar!
      </p>
      <ul>
        <li>
          <span class="mdi mdi-account-group-outline"></span>
          <p class="number">{{ comunidadesCount }}</p>
          <p>Comunidades Ativas</p>
        </li>
        <li>
          <span class="hand">
            <font-awesome-icon :icon="['far', 'hand']"></font-awesome-icon>
          </span>
          <p class="number">92</p>
          <p>Voluntários</p>
        </li>
        <li>
          <span class="mdi mdi-eye-outline"></span>
          <p class="number">{{ totalPosts }}</p>
          <p>Ações Realizadas</p>
        </li>
      </ul>
    </div>

    <div class="feed-text">
      <h2>Feed de Atividades</h2>
    </div>

    <main class="feed">
      <FeedComponent />
    </main>
  </main>
</template>

<style scoped>
main {
  padding: 0 12vw;
}

.welcome {
  text-align: center;
  margin: 3vw 0 5vw 0;
  grid-area: welcome;
}

.welcome h1 {
  font-size: 2.5rem;
  margin: 0;
  color: #1a1f24;
}

.welcome p {
  font-size: 1.4rem;
  color: rgb(88, 88, 88);
  margin: 0.5vw 0;
}

.welcome ul {
  display: flex;
  justify-content: s;
  list-style: none;
  gap: 20px;
  margin-top: 3vw;
  padding: 0;
}

.welcome ul li {
  background: white;
  width: 100%;
  border-radius: 20px;
  border: 2px solid rgb(218, 215, 215, 0.5);
  box-shadow: 0 5px 10px 1px rgba(158, 157, 157, 0.1);
  padding: 2.5vw 0;
}

.welcome li .number {
  font-weight: 700;
  font-size: 2rem;
  color: #1a1f24;
  margin-top: 1.5vw;
}

.welcome li p {
  font-size: 1.1rem;
  margin: 0;
  color: rgb(88, 88, 88);
}

.welcome li span {
  border-radius: 100%;
  font-size: 1.4rem;
}

.mdi-account-group-outline {
  color: #066ccc;
  background: rgba(6, 108, 204, 0.2);
  padding: 13px 17px;
}

.hand {
  color: rgb(6, 187, 0);
  background: rgba(6, 187, 0, 0.2);
  padding: 14px 16px;
}

.mdi-eye-outline {
  color: rgb(177, 6, 177);
  background: rgba(177, 6, 177, 0.2);
  padding: 13px 17px;
}

main.feed {
  padding: 0;
}

.feed-text {
  color: #1a1f24;
}
 
@media (max-width: 1400px) {
.welcome h1 {
  font-size: 2rem;
}

.welcome p {
  font-size: 1.1rem;
}

.welcome li .number {
  font-size: 1.6rem;
}

.welcome li p {
  font-size: 0.9rem;
}

.welcome li span {
  font-size: 1.1rem;
}

.feed-text {
  font-size: 1rem;
}
}
</style>
