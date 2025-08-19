<template>
  <div>
    <h2>Postagens</h2>
    <div v-if="loading">Carregando...</div>
    <div v-else>
      <div v-for="post in postagens" :key="post.id" class="post-card">
        <p><strong>{{ post.autor_nome }}</strong> em {{ post.comunidade_nome }}</p>
        <p>{{ post.conteudo }}</p>
        <img v-if="post.imagem" :src="getImageUrl(post.imagem)" />
        <small>{{ formatarData(post.postado) }}</small>
        <button @click="deletarPost(post.id)">Deletar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/axios";

const postagens = ref([]);
const loading = ref(true);

async function carregarPostagens() {
  try {
    const res = await api.get("/postagens/");
    postagens.value = res.data;
  } catch (error) {
    console.error("Erro ao carregar postagens:", error);
  } finally {
    loading.value = false;
  }
}

async function deletarPost(id) {
  try {
    await api.delete(`/postagens/${id}/`);
    postagens.value = postagens.value.filter(post => post.id !== id);
    alert("Post deletado!");
  } catch (error) {
    console.error("Erro ao deletar postagem:", error);
  }
}

function getImageUrl(path) {
  return `http://localhost:8000${path}`;
}

function formatarData(data) {
  return new Date(data).toLocaleString("pt-BR");
}

onMounted(carregarPostagens);

defineExpose({ carregarPostagens }); // permite o pai chamar essa função
</script>
