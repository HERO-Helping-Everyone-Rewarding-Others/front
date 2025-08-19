<template>
  <div class="post-form">
    <h2>Criar Postagem</h2>
    <form @submit.prevent="criarPostagem">
      <textarea v-model="conteudo" placeholder="Escreva algo..." required></textarea>
      <input type="number" v-model="comunidade" placeholder="ID da comunidade" required />
      <input type="file" @change="onFileChange" />
      <button type="submit">Postar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../services/axios";

const conteudo = ref("");
const comunidade = ref("");
const imagem = ref(null);

const emit = defineEmits(["post-criado"]);

function onFileChange(event) {
  imagem.value = event.target.files[0];
}

async function criarPostagem() {
  try {
    const formData = new FormData();
    formData.append("conteudo", conteudo.value);
    formData.append("comunidade", comunidade.value);
    if (imagem.value) {
      formData.append("imagem", imagem.value);
    }

    await api.post("/postagens/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Postagem criada com sucesso!");
    emit("post-criado"); // avisa o pai que deve atualizar a lista
    conteudo.value = "";
    comunidade.value = "";
    imagem.value = null;
  } catch (error) {
    console.error("Erro ao criar postagem:", error);
  }
}
</script>
