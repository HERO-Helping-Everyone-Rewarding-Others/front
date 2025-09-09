<script setup>
import { useRoute } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import SidebarCommunities from './components/SidebarCommunities.vue'
import { ref } from 'vue'

const route = useRoute()

const showMenu = ref(false)

</script>

<template>

    <HeaderComponent v-if="route.name !== 'login' && route.name !== 'register'" @toggleMenu="showMenu=!showMenu"/>
    <aside class="sidebar" v-if="showMenu">
      <SidebarCommunities />
    </aside>
      <RouterView />
    <FooterComponent v-if="route.name !== 'login' && route.name !== 'register'" />
  
</template>

<style scoped>
.sidebar {
  position: absolute;
  left: 0;
  min-height: 100vh;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgb(218, 215, 215);
 
}

</style>
