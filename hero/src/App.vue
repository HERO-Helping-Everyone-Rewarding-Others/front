<script setup>
import { useRoute } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import SidebarCommunities from './components/SidebarCommunities.vue'

const route = useRoute()
</script>

<template>
  <div id="app">
    <HeaderComponent v-if="route.name !== 'login' && route.name !== 'register'" />
    <div class="main-layout" v-if="route.name !== 'login' && route.name !== 'register'">

      <aside class="sidebar">
        <SidebarCommunities />
      </aside>
      <main class="content">
        <RouterView />
      </main>
    </div>

    <div v-else>
      <RouterView />
    </div>

    <FooterComponent v-if="route.name !== 'login' && route.name !== 'register'" />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-layout {
  flex: 1;
  display: flex;
}
.sidebar {
  width: 25vw;
  background: #f9f9f9;
  border-right: 1px solid #ddd;
  padding: 1rem;
  min-height: calc(100vh - 120px);
}


.content {
  flex: 1;
  padding: 1rem;
}
</style>
