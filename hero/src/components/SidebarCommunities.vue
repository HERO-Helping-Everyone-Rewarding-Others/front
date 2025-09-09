<script setup>
import { computed } from "vue"
import { RouterLink } from "vue-router"
import { useCommunityState } from "../store/communities"
import router from "@/router"

const { todasComunidades, comunidadesEntradas } = useCommunityState()
const comunidadesPopulares = computed(() =>
  todasComunidades.value.map(c => c.nome || "Comunidade sem nome")
)
const minhasComunidades = computed(() =>
  comunidadesEntradas.value.map(c => typeof c === "string" ? c : (c.nome || "Comunidade sem nome"))
)
</script>

<template>
    <section>
      <h2>Acesso Rápido</h2>
      <p>
        Suas comunidades
      </p>
      <div>
        <p>
          MINHAS COMUNIDADES
        </p>
        <font-awesome-icon :icon="['far', 'star']" />
      </div>
        <div>
         <ul>
      <li v-if="minhasComunidades.length === 0">
        Você ainda não entrou em nenhuma comunidade.
      </li>
      <li v-for="nome in minhasComunidades" :key="nome">
        <RouterLink :to="`/comunidade/${nome}`">
          {{ nome }}
        </RouterLink>
      </li>
    </ul>
      </div>

      <p>
        COMUNIDADES POPULARES
      </p>
       <div>
          <ul class="mb-4">
          <li v-for="nome in                   comunidadesPopulares" :key="nome" class="mb-1">
            <RouterLink :to="`/comunidade/${nome}`" class="hover:underline">
            {{ nome }}
            </RouterLink>
          </li>
      </ul>
      </div>

      <div>
        <div>
        <font-awesome-icon :icon="['fas', 'users']" />
        <RouterLink to="/comunidades">Ver todas as comunidades</RouterLink>
        <RouterLink to="/loja" class="block mb-1 text-blue-600 hover:underline">🛒 Loja</RouterLink>
        <RouterLink to="/profile" class="block mb-2 text-blue-600 hover:underline">👤 Perfil</RouterLink>
      </div>
      <button><span class="mdi mdi-plus"></span><p>Criar comunidade</p></button>
      </div>
     <p>
      Helping Everyone Rewarding Others
     </p>
    </section>
</template>

<style scoped>
h2 {
  margin: 0;
}
</style>
