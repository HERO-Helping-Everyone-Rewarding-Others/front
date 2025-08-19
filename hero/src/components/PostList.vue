<template>
  <div class="post-list">
    <h2>Postagens</h2>
    <div v-if="loading">Carregando postagens...</div>
    <div v-else>
      <div v-for="post in postagens" :key="post.id" class="post-card">
        <p><strong>{{ post.autor }}</strong> em {{ post.comunidade }}</p>
        <p>{{ post.conteudo }}</p>
        <img v-if="post.imagem" :src="getImageUrl(post.imagem)" alt="Imagem do post" />
        <small>{{ formatarData(post.postado) }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../axios";

export default {
  name: "PostList",
  data() {
    return {
      postagens: [],
      loading: true,
    };
  },
  async created() {
    await this.carregarPostagens();
  },
  methods: {
    async carregarPostagens() {
      try {
        const response = await api.get("/postagens/");
        this.postagens = response.data;
        this.loading = false;
      } catch (error) {
        console.error("Erro ao carregar postagens:", error);
      }
    },
    getImageUrl(path) {
      return `http://localhost:8000${path}`;
    },
    formatarData(data) {
      return new Date(data).toLocaleString("pt-BR");
    },
  },
};
</script>
