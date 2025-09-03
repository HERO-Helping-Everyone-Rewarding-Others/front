<script setup>
import { ref, onMounted, computed } from "vue";
import { useAuth } from "../composables/auth";

const props = defineProps({ post: Object });
const { user, accessToken, fetchUser } = useAuth(); // usuário logado

const postId = computed(() => {
  if (props.post.id) return props.post.id;
  if (props.post._localUid) return props.post._localUid;

  const newId = `${Date.now()}.${Math.random().toString(36).slice(2, 8)}`;
  props.post._localUid = newId;
  return newId;
});


const likes = ref(props.post.curtidas || 0);
const liked = ref(false);


const newComment = ref("");
const comentarios = ref([]);


const likedKey    = computed(() => `liked_post_${postId.value}`);
const likesKey    = computed(() => `likes_post_${postId.value}`);
const commentsKey = computed(() => `comments_post_${postId.value}`);

onMounted(async () => {
  if (accessToken.value && !user.value) {
    await fetchUser();
  }


  const savedLike  = localStorage.getItem(likedKey.value);
  const savedLikes = localStorage.getItem(likesKey.value);
  if (savedLike === "true") liked.value = true;
  if (savedLikes) likes.value = parseInt(savedLikes);


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

const addComment = () => {
  if (!newComment.value.trim()) return;

  const usuarioNome = user.value?.nome || "Usuário Anônimo";

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

function getUserColor(name) {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F39C12", "#8E44AD", "#E74C3C"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length; 
  return colors[index];
}

</script>

<template>
  <section>
    <div class="welcome">
      <h1>Bem-vindo ao HERO</h1>
    <p>
      Junte-se a comunidades que fazem a diferença e seja recompensado por ajudar!
    </p>
    </div>

    

    <div class="box-post">

      <div class="info-box">
        <div class="perfil-user">
        <p class="avatar" :style="{ background: getUserColor(post.usuario) }">
        {{ post.usuario.split(' ')[0][0] }}{{ post.usuario.split(' ')[1]?.[0] }}
      </p>
      </div>

        <div class="info-post">
          <div class="post-user">
          <span id="user">{{ post.usuario }}</span>
          <span> • {{ post.comunidade }} • {{ post.tempo }}</span>
        </div>

      <div v-if="post.verificado" class="pontos-info">
        <p class="verificado">Verificado</p>
        <p class="pontos">+{{ post.pontos }} pontos</p>
      </div>
        </div>
      </div>

    <div class="post-img">
      <p>{{ post.conteudo }}</p>

      <img v-if="post.imagem" :src="post.imagem" alt="imagem do post" />
    </div>

    <div class="social">
      <a @click="toggleLike" class="like-btn">
        <font-awesome-icon
        :icon="[liked ? 'fas' : 'far', 'heart']"
        :style="{ color: liked ? 'red' : 'gray' }"
        class="heart-icon"
      />
        {{ likes }}
      </a>
      <p class="comment"><font-awesome-icon :icon="['far', 'comment']" /> {{ comentarios.length }}</p>
      <p class="link"><font-awesome-icon :icon="['fas', 'link']" /> {{ post.compartilhamentos }}</p>
    </div>

    <div>
      <input v-model="newComment" type="text" placeholder="Escreva um comentário…"/>
      <button @click="addComment">
        Comentar
      </button>
    </div>/* Gradiente do cabeçalho para o branco */

   
    <div v-for="c in comentarios" :key="c.id" >
      <div  class="avatar" 
     :style="{ background: getUserColor(c.usuario) }">
        {{ c.usuario.split(' ')[0][0] }}
      </div>
      <div>
        <div>
          <span >{{ c.usuario }}</span>
          <small >{{ c.tempo }}</small>
        </div>
        <p>{{ c.conteudo }}</p>
        <span :class="c.liked ? 'text-red-500' : 'text-gray-500'">❤️</span> {{ c.curtidas }} <button @click="toggleCommentLike(c)" ></button>
         
      </div>
    </div>
    </div>
    </section>
</template>

<style scoped>
section {
  background: rgb(253, 252, 252);
  padding-top: 3vw;
}
div.welcome {
  text-align: center;
}
.welcome h1 {
  font-size: 2.5rem;
  margin: 0;
}
.welcome p {
  font-size: 1.5rem;
  color: rgb(104, 104, 103);
  margin: 0 0 8vw 0;
}
.feed p {
  font-size: 2rem;
  font-weight: 700;
}
div.feed {
  margin: 0 auto;
  width: 50vw;
}
div.box-post {
  border: 3px solid rgb(218, 215, 215);
  width: 50vw;
  margin: 0 auto;
  border-radius: 20px;
  padding: 2vw;
  box-sizing: border-box;
  box-shadow: 0 5px 10px 5px rgba(180, 179, 179, 0.3);
}
.info-box {
  display: flex;
  margin-bottom: 4vw;
}
.perfil-user p {
 width: 4vw;
 height: 4vw;
 border-radius: 100%;
 margin: 0 1vw 0 0;
 display: flex;            
 justify-content: center;   
 align-items: center; 
 color: white;
 font-weight: 700;
}
#user {
  font-weight: 600;
  color: black  ;
}
.info-post .post-user span {
  color: rgb(81, 81, 82);
}
.pontos-info {
  display: flex;
}
div.pontos-info .verificado,
div.pontos-info .pontos {
  padding: 8px;
  border-radius: 12px;
  font-weight: 600;
  margin: 0.7vw 1.2vw 0 0;
}
div.pontos-info .verificado {
  background: rgb(151, 247, 231, 0.6);
  
}
div.pontos-info .pontos {
  background: rgba(238, 240, 146, 0.6);
}

.post-img img {
  width: 100%;
  height: auto;
  object-fit: cover;
  
}
.social a {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.3rem;
  color: gray;
}
.social {
  display: flex;
  gap: 10px;
}
.social p {
  cursor: pointer;
}
.social p:hover {
  color: rgb(11, 20, 146);
}
.social p
.social {
  display: flex;
  font-size: 1.3rem;
  color: grey;
  gap: 15px;
}

</style>