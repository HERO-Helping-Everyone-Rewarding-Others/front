<script setup>
</script>

<template>
    <nav class="sidebar-menu">
      <router-link to="/" @click="sidebar.fecharSidebar()">Início</router-link>
      <router-link to="/comunidades" @click="sidebar.fecharSidebar()">Comunidades</router-link>
      <router-link to="/loja" @click="sidebar.fecharSidebar()">Loja</router-link>
    </nav>
</template>

<style scoped>
 nav.siderbar-menu{
  display: block;
  flex-direction: column
 }
</style>
