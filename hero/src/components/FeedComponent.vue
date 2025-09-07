<script setup>
import { posts } from "../store/posts"
import Post from "./PostComponent.vue"
</script>

<template>
  <section>
    <div>
    <Post
      v-for="(p, i) in posts"
      :key="p.id || p._localUid || (p._localUid = `${Date.now()}-${i}`)"
      :post="p"
    />
  </div>
  </section>
</template>

<style scoped>
</style>
