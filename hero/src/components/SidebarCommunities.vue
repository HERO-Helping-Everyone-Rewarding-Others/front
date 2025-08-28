<script setup>
import { sidebar } from "../store/sidebar";
</script>

<template>
  <!-- fundo escuro quando a sidebar está aberta -->
<div v-show="sidebar.aberto" class="overlay" @click="sidebar.fecharSidebar()"></div>
<aside v-show="sidebar.aberto" class="sidebar">
  <button class="close-btn" @click="sidebar.fecharSidebar()">X</button>
    <nav class="sidebar-menu">
      <router-link to="/" @click="sidebar.fecharSidebar()">Início</router-link>
      <router-link to="/comunidades" @click="sidebar.fecharSidebar()">Comunidades</router-link>
      <router-link to="/loja" @click="sidebar.fecharSidebar()">Loja</router-link>
    </nav>
  </aside>
</template>

<style scoped>

</style>
