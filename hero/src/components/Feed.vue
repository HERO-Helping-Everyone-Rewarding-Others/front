<template>
  <div>
    <PostForm @post-criado="atualizarFeed" />
    <PostList ref="postList" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import PostForm from "./PostForm.vue";
import PostList from "./PostList.vue";

const postList = ref(null);

function atualizarFeed() {
  postList.value.carregarPostagens(); // chama função exposta no filho
}
</script>
