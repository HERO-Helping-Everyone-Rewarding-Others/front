<script setup>
import { useRoute } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import SidebarCommunities from './components/SidebarCommunities.vue'
const route = useRoute()
</script>

<template>
  
    <HeaderComponent v-if="route.name !== 'login' && route.name !=='register'" />
    <RouterView />
    <SidebarCommunities/>
    <FooterComponent v-if="route.name !== 'login' && route.name !=='register'" />

</template>

<style scoped>

#app {
  min-height: 100%;
  width: 100%;
}

</style>
