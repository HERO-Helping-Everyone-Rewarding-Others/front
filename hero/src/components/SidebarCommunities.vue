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
/* fundo escuro por trás */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  z-index: 9;
}

/* sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background: #1b2353;
  color: white;
  padding: 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: slideIn 0.3s ease;
}

/* botão fechar */
.close-btn {
  background: transparent;
  border: none;
  font-size: 2rem;
  align-self: flex-end;
  color: white;
  cursor: pointer;
}

/* links */
.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.sidebar-menu a {
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
}
.sidebar-menu a:hover {
  color: #43a86a;
}

/* animação */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
