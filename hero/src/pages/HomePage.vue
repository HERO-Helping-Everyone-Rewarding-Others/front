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
  background: rgb(253, 252, 252);
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
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem;
}


.sidebar {
  background: #f4f4f4;
  padding: 0.8rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  max-height: calc(100vh - 180px);
  overflow-y: auto;
  font-size: 0.9rem;
}


.feed {
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  font-size: 0.95rem; 
}
</style>
