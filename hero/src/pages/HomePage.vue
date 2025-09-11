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
    </div>

    <main class="feed">
      <FeedComponent />
    </main>

  </main>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    "welcome"
    "feed";
  /* height: 100; */
}

.layout {
  display: flex;
}

/* container geral */
.flex {
  display: flex;
}

/* sidebar fixa mas respeita header/footer */
.sidebar {
  width: 20vw;
  height: calc(100vh-60px);
  position: sticky;
  top: 60px;
  /* altura do header */
  /* align-self: flex-start; */
  /* overflow-y: auto; */
  /* se o conteúdo for maior que a tela */
  /* grid-area: sidebar; */
}

/* conteúdo principal */
.feed {
  padding-left: 3vw;
  grid-area: feed;
}

.welcome {
  text-align: center;
  margin: 2vw 0;
  grid-area: welcome;
}

.welcome h1 {
  font-size: 2.5rem;
  margin: 0;
}

.welcome p {
  font-size: 1.4rem;
  color: rgb(70, 70, 69);
  margin: 0 0 1.5vw 0;
}
</style>
