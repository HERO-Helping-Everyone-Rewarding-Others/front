<script setup>
import FeedComponent from '../components/FeedComponent.vue'
// import SidebarCommunities from '@/components/SidebarCommunities.vue';
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
          <p>5</p>
          <p>Comunidades Ativas</p>
        </li>
        <li>
          <p>92</p>
          <p>Voluntários</p>
        </li>
        <li>
          <p>3</p>
          <p>Ações Realizadas</p>
        </li>
      </ul>
    </div>

    <main class="feed">
      <FeedComponent />
    </main>

  </main>
</template>

<style scoped>

.welcome {
  text-align: center;
  margin: 3vw 0 5vw 0;
  grid-area: welcome;
}

.welcome h1 {
  font-size: 2.5rem;
  margin: 0;
}

.welcome p {
  font-size: 1.4rem;
  color: rgb(94, 94, 93);
  margin: 1vw 0;
}
.welcome ul {
  display: flex;
  justify-content: center;
  list-style: none;
}
</style>
