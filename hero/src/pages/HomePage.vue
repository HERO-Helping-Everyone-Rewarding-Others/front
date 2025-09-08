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
      <aside class="sidebar">
        <SidebarCommunities />
      </aside>

      <main class="feed">
        <div class="welcome">
          <h1>Bem-vindo ao HERO</h1>
          <p>
            Junte-se a comunidades que fazem a diferença e seja recompensado por ajudar!
          </p>
        </div>
        <FeedComponent />
      </main>
    </div>
  </section>
</template>

<style scoped>
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
  height: 100vh;
  position: sticky;
  top: 60px;   /* altura do header */
  align-self: flex-start;
  overflow-y: auto; /* se o conteúdo for maior que a tela */
}

/* conteúdo principal */
.feed {
  padding-left: 3vw;
}

.welcome {
  text-align: center;
  margin: 2vw 0;
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

