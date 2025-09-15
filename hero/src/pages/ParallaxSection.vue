<template>
  <!-- 
    v-show = mostra/esconde 
    :class = adiciona animação css 
  -->
  <div ref="elementRef" class="scroll-reveal" :class="{ 'is-visible': isVisible }">
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isVisible = ref(false)
const elementRef = ref(null)

onMounted(() => {
  // usando IntersectionObserver para observar se a div entra na viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true    // aparece
      } else {
        isVisible.value = false   // desaparece
      }
    })
  }, { threshold: 0.1 }) // 0.1 = 10% visível já aciona

  observer.observe(elementRef.value)

  onBeforeUnmount(() => {
    observer.disconnect()
  })
})
</script>

<style scoped>
.scroll-reveal {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s ease, transform 0.8s ease;
}

/* quando entra na tela */
.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>