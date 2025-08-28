<script setup>
import { ref, onMounted, computed } from "vue";
import { useAuth } from "../composables/auth";

const props = defineProps({ post: Object });
const { user, accessToken, fetchUser } = useAuth(); // usuário logado

// id estável para este post
const postId = computed(() =>
  props.post.id ??
  props.post._localUid ??
  (props.post._localUid = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`)
);

// curtidas
const likes = ref(props.post.curtidas || 0);
const liked = ref(false);

// comentários
const newComment = ref("");
const comentarios = ref([]);

// chaves locais para persistência
const likedKey    = computed(() => `liked_post_${postId.value}`);
const likesKey    = computed(() => `likes_post_${postId.value}`);
const commentsKey = computed(() => `comments_post_${postId.value}`);

onMounted(async () => {
  // garante que o usuário logado esteja carregado
  if (accessToken.value && !user.value) {
    await fetchUser();
  }

  // likes
  const savedLike  = localStorage.getItem(likedKey.value);
  const savedLikes = localStorage.getItem(likesKey.value);
  if (savedLike === "true") liked.value = true;
  if (savedLikes) likes.value = parseInt(savedLikes);

  // comentários
  const savedComments = localStorage.getItem(commentsKey.value);
  if (savedComments) {
    comentarios.value = JSON.parse(savedComments);
  } else {
    comentarios.value = Array.isArray(props.post.comentariosLista)
      ? JSON.parse(JSON.stringify(props.post.comentariosLista))
      : [];
  }
});

const persistComments = () =>
  localStorage.setItem(commentsKey.value, JSON.stringify(comentarios.value));

const toggleLike = () => {
  liked.value ? likes.value-- : likes.value++;
  liked.value = !liked.value;
  localStorage.setItem(likedKey.value, liked.value.toString());
  localStorage.setItem(likesKey.value, likes.value.toString());
};

// <<< função de adicionar comentário usando automaticamente o usuário logado
const addComment = () => {
  if (!newComment.value.trim()) return;

  const usuarioNome = user.value?.nome || "Usuário Anônimo"; // pega do auth

  comentarios.value.push({
    id: Date.now(),
    usuario: usuarioNome,
    conteudo: newComment.value,
    tempo: "agora",
    curtidas: 0,
    liked: false,
  });

  newComment.value = "";
  persistComments();
};

const toggleCommentLike = (c) => {
  c.liked ? c.curtidas-- : c.curtidas++;
  c.liked = !c.liked;
  persistComments();
};
</script>

<template>
  <div class="max-w-2xl mx-auto mt-6 bg-white rounded-2xl shadow p-4">
    <!-- Cabeçalho -->
    <div class="flex items-center gap-3 mb-3">
      <div class="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
        {{ post.usuario.split(' ')[0][0] }}{{ post.usuario.split(' ')[1]?.[0] }}
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
    <p class="mb-3 text-gray-800">{{ post.conteudo }}</p>

    <!-- Imagem -->
    <img v-if="post.imagem" :src="post.imagem" alt="imagem do post"
         class="w-full h-60 object-cover rounded-xl mb-3" />

    <!-- Ações -->
    <div class="flex items-center gap-6 text-gray-600 text-sm mb-3">
      <button @click="toggleLike" class="flex items-center gap-1 transition text-lg bg-transparent border-none">
        <span :class="liked ? 'text-red-500' : 'text-gray-500'">❤️</span>
        {{ likes }}
      </button>
      <span>💬 {{ comentarios.length }}</span>
      <span>🔗 {{ post.compartilhamentos }}</span>
    </div>

    <hr class="mb-3" />

    <!-- Novo comentário -->
    <div class="flex items-center gap-2 mb-4">
      <input v-model="newComment" type="text" placeholder="Escreva um comentário…"
             class="flex-1 border rounded-lg p-2 text-sm" />
      <button @click="addComment" class="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
        Comentar
      </button>
    </div>

    <!-- Lista de comentários -->
    <div v-for="c in comentarios" :key="c.id" class="flex items-start gap-2 mb-3">
      <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
        {{ c.usuario.split(' ')[0][0] }}
      </div>
      <div class="bg-gray-100 p-2 rounded-lg flex-1">
        <div class="flex justify-between items-center">
          <span class="font-semibold">{{ c.usuario }}</span>
          <small class="text-gray-500">{{ c.tempo }}</small>
        </div>
        <p>{{ c.conteudo }}</p>
        <button @click="toggleCommentLike(c)" class="text-xs mt-1 flex items-center gap-1 bg-transparent border-none">
          <span :class="c.liked ? 'text-red-500' : 'text-gray-500'">❤️</span> {{ c.curtidas }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>