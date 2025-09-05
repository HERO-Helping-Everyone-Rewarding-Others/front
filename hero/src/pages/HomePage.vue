<script setup>
import WelcomeComponent from '../components/WelcomeComponent.vue'
import FeedComponent from '../components/FeedComponent.vue'
import SidebarCommunities from '@/components/SidebarCommunities.vue';


</script>

<template>
    <SidebarCommunities/>
     <section>
  <div class="welcome">
      <h1>Bem-vindo ao HERO</h1>
    <p>
      Junte-se a comunidades que fazem a diferença e seja recompensado por ajudar!
    </p>
    </div>
  </section>
    <FeedComponent />
  
</template>

<style scoped>
section {
  background: rgb(253, 252, 252);
  padding-top: 3vw;
}

div.welcome {
  text-align: center;
}
.welcome h1 {
  font-size: 2.5rem;
  margin: 0;
}
.welcome p {
  font-size: 1.5rem;
  color: rgb(104, 104, 103);
  margin: 0 0 8vw 0;
}
</style>

