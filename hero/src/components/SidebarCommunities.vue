<script setup>
import { computed } from "vue"
import { RouterLink } from "vue-router"
import { useCommunityState } from "../store/communities"

const { todasComunidades, comunidadesEntradas } = useCommunityState()
const comunidadesPopulares = computed(() =>
  todasComunidades.value.map(c => c.nome || "Comunidade sem nome")
)
const minhasComunidades = computed(() =>
  comunidadesEntradas.value.map(c => typeof c === "string" ? c : (c.nome || "Comunidade sem nome"))
)
</script>

<template>
  <aside class="sidebar-menu p-4 bg-gray-100 rounded-md shadow">
    <h2 class="font-bold mb-2">🌍 Comunidades Populares</h2>
    <ul class="mb-4">
      <li v-for="nome in comunidadesPopulares" :key="nome" class="mb-1">
        <RouterLink :to="`/comunidade/${nome}`" class="hover:underline">
          {{ nome }}
        </RouterLink>
      </li>
    </ul>

    <h2 class="font-bold mb-2">👥 Suas Comunidades</h2>
    <ul>
      <li v-if="minhasComunidades.length === 0" class="text-gray-500 text-sm">
        Você ainda não entrou em nenhuma comunidade.
      </li>
      <li v-for="nome in minhasComunidades" :key="nome" class="mb-1">
        <RouterLink :to="`/comunidade/${nome}`" class="hover:underline">
          {{ nome }}
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.sidebar-menu {
  display: flex;
  flex-direction: column;
}
</style>
