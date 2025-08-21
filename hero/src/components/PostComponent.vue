<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  post: Object
});

const likes = ref(props.post.curtidas);
const liked = ref(false);

const storageKey = `liked_post_${props.post.id}`;
const likesKey = `likes_post_${props.post.id}`;

// Carrega do localStorage ao montar o componente
onMounted(() => {
  const savedLike = localStorage.getItem(storageKey);
  const savedLikes = localStorage.getItem(likesKey);

  if (savedLike === "true") {
    liked.value = true;
  }

  if (savedLikes) {
    likes.value = parseInt(savedLikes);
  }
});

// Função de curtir / descurtir
const toggleLike = () => {
  if (!liked.value) {
    likes.value++;
    liked.value = true;
  } else {
    likes.value--;
    liked.value = false;
  }

  localStorage.setItem(storageKey, liked.value.toString());
  localStorage.setItem(likesKey, likes.value.toString());
};
</script>

<template>
  <div class="max-w-2xl mx-auto mt-6 bg-white rounded-2xl shadow p-4">
    <!-- Cabeçalho -->
    <div class="flex items-center gap-3 mb-3">
      <div class="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
        {{ post.usuario.split(" ")[0][0] }}{{ post.usuario.split(" ")[1]?.[0] }}
      </div>

      <div>
        <div class="font-semibold">
          {{ post.usuario }}
          <span class="text-blue-600 cursor-pointer"> • {{ post.comunidade }}</span>
        </div>
        <div class="text-gray-500 text-sm">{{ post.tempo }}</div>
      </div>

      <div v-if="post.verificado" class="ml-auto">
        <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Verificado</span>
        <span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">+{{ post.pontos }} pontos</span>
      </div>
    </div>

    <!-- Texto -->
    <p class="mb-3 text-gray-800">
      {{ post.conteudo }}
    </p>

    <!-- Imagem -->
    <img
      v-if="post.imagem"
      :src="post.imagem"
      alt="imagem do post"
      class="w-full h-60 object-cover rounded-xl mb-3"
    />

    <!-- Ações -->
    <div class="flex items-center gap-6 text-gray-600 text-sm mb-3">
      <!-- Botão de curtir -->
      <button
        @click="toggleLike"
        class="flex items-center gap-1 transition text-lg"
      >
        <span :class="liked ? 'text-red-500' : 'text-gray-500'">❤️</span>
        {{ likes }}
      </button>

      <span>💬 {{ post.comentarios }}</span>
      <span>🔗 {{ post.compartilhamentos }}</span>
    </div>

    <hr class="mb-3" />

    <!-- Comentários -->
    <div
      v-for="(comentario, i) in post.comentariosLista"
      :key="i"
      class="flex items-start gap-2 mb-2"
    >
      <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
        {{ comentario.usuario.split(' ')[0][0] }}{{ comentario.usuario.split(' ')[1]?.[0] }}
      </div>

      <div class="bg-gray-100 p-2 rounded-lg">
        <span class="font-semibold">{{ comentario.usuario }}</span>
        <p>{{ comentario.conteudo }}</p>
        <span class="text-xs text-gray-500">{{ comentario.tempo }}</span>
      </div>
    </div>
  </div>
</template>
