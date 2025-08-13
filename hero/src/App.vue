<script>
import api from './services/api';

export default {
  name: 'App',
  data() {
    return {
      usuarios: [],
    };
  },
  mounted() {
    // Quando o componente carregar, vamos buscar os usuários
    api.get('usuarios/')
      .then(response => {
        this.usuarios = response.data;
      })
      .catch(error => {
        console.error("Erro ao buscar usuários:", error);
      });
  }
}
</script>

<template>
  <div>
    <h1>Lista de Usuários</h1>
    <ul>
      <li v-for="user in usuarios" :key="user.id">
        {{ user.username }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>

