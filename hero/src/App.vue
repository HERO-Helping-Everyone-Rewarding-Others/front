<script setup>
import { useRoute } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import SidebarCommunities from './components/SidebarCommunities.vue'
const route = useRoute()
</script>

<template>
    <div>
    <HeaderComponent v-if="route.name !== 'login' && route.name !=='register'" />
    <SidebarCommunities v-if="route.name !== 'login' && route.name !=='register'"/>
    <RouterView />
    <FooterComponent v-if="route.name !== 'login' && route.name !=='register'" />
</div>
</template>

<style scoped>

#app {
  min-height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

</style>
