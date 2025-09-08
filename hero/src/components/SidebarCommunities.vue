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

  <div class="mb-4">
    <h3>Paginas</h3>
    <ul>
      <li><RouterLink to="/comunidades">🌍Comunidades</RouterLink></li>
      <li><RouterLink to="/loja" class="block mb-1 text-blue-600 hover:underline">🛒 Loja</RouterLink></li>
      <li><RouterLink to="/profile" class="block mb-2 text-blue-600 hover:underline">👤 Perfil</RouterLink></li>

  </ul>
  </div>
</template>

<style scoped>
</style>
