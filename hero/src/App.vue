<script setup>
import { useRoute } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

const route = useRoute()
</script>

<template>
  <div>
    <!-- Só mostra header/footer se NÃO estiver na página de login -->
    <HeaderComponent v-if="route.name !== 'login' && route.name !=='register'" />

    <RouterView />

    <FooterComponent v-if="route.name !== 'login' && route.name !=='register'" />
  </div>
</template>
