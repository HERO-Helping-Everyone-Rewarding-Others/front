<script setup>
import FeedComponent from '../components/FeedComponent.vue'
import SidebarCommunities from '@/components/SidebarCommunities.vue';
</script>

<template>
  <section>
    <div class="welcome">
      <h1>Bem-vindo ao HERO</h1>
      <p>
        Junte-se a comunidades que fazem a diferença e seja recompensado por ajudar!
      </p>
    </div>

    <div class="content">

      <aside class="sidebar">
        <SidebarCommunities />
      </aside>

      <main class="feed">
        <FeedComponent />
      </main>
    </div>
  </section>
</template>

<style scoped>
section {
  padding-top: 2vw;
}
div.welcome {
  text-align: center;
}
.welcome h1 {
  font-size: 2rem;
  margin: 0;
}
.welcome p {
  font-size: 1.2rem;
  color: rgb(104, 104, 103);
  margin: 0 0 1.5vw 0;
}
.content {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 1.5rem;
}
</style>
