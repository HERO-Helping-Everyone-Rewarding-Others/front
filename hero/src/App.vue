<script setup>
import { useRoute } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import SidebarCommunities from './components/SidebarCommunities.vue'

const route = useRoute()
</script>

<template>

    <HeaderComponent v-if="route.name !== 'login' && route.name !== 'register'" />
      <RouterView />
    <FooterComponent v-if="route.name !== 'login' && route.name !== 'register'" />
  
</template>

<style scoped>

</style>
