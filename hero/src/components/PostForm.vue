<template>
  <div class="post-form">
    <h2>Criar Postagem</h2>
    <form @submit.prevent="criarPostagem">
      <div>
        <label for="conteudo">Legenda:</label>
        <textarea v-model="conteudo" id="conteudo" required></textarea>
      </div>

      <div>
        <label for="imagem">Imagem (opcional):</label>
        <input type="file" @change="onFileChange" />
      </div>

      <div>
        <label for="comunidade">Comunidade:</label>
        <input type="number" v-model="comunidade" id="comunidade" required />
      </div>

      <button type="submit">Postar</button>
    </form>
  </div>
</template>

<script>
import api from "../axios";

export default {
  name: "PostForm",
  data() {
    return {
      conteudo: "",
      imagem: null,
      comunidade: "", // ID da comunidade
    };
  },
  methods: {
    onFileChange(event) {
      this.imagem = event.target.files[0];
    },
    async criarPostagem() {
      try {
        const formData = new FormData();
        formData.append("conteudo", this.conteudo);
        formData.append("comunidade", this.comunidade);
        if (this.imagem) {
          formData.append("imagem", this.imagem);
        }
        // o backend já sabe quem é o autor pelo token
        // mas se precisar pode mandar o id do usuário aqui também

        await api.post("/postagens/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Postagem criada com sucesso!");
        this.$emit("post-criado"); // emite evento para atualizar lista
        this.conteudo = "";
        this.imagem = null;
      } catch (error) {
        console.error("Erro ao criar postagem:", error);
      }
    },
  },
};
</script>
