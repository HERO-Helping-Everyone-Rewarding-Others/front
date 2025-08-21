<script setup>
import { ref } from 'vue'
import NewPostComponent from '../components/NewPostComponent.vue'
import FeedComponent from '../components/FeedComponent.vue'

const ShowPost = ref(false)

const togglePost = () => {
  ShowPost.value = !ShowPost.value
}

</script>

<template>

  <div>
    <button @click="togglePost">
      {{ ShowPost ? 'Cancelar' : 'Fazer publicação' }}
    </button>
    <NewPostComponent v-if="ShowPost" />

    <FeedComponent />

  </div>
</template>
<style scoped>

</style>

