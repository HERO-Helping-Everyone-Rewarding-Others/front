<script setup>
import NewPostComponent from '../components/NewPostComponent.vue'
import FeedComponent from '../components/FeedComponent.vue'


</script>

<template>

  <div>
    <NewPostComponent v-if="ShowPost" />

    <FeedComponent />


  </div>
</template>

<style scoped>
</style>

