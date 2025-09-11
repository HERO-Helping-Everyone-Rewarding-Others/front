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
    <div class="acesso">
      <h2>Acesso Rápido</h2>
      <p>
        Suas comunidades
      </p>
    </div>
    <div class="comun-user">
      <div class="plus">
        <p>
        MINHAS COMUNIDADES
        </p>
      <span class="mdi mdi-plus"></span>

      </div>
      <div>
        <p v-if="minhasComunidades.length === 0">
          Você ainda não entrou em nenhuma comunidade.
        </p>
        <ul>
          <li v-for="nome in minhasComunidades" :key="nome">
            <RouterLink :to="`/comunidade/${nome}`">
              {{ nome }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <p>
      COMUNIDADES POPULARES
    </p>
    <div>
      <ul class="mb-4">
        <li v-for="nome in comunidadesPopulares" :key="nome" class="mb-1">
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
        <RouterLink to="/profile">👤 Perfil</RouterLink>
      </div>
    </div>
    <p>
      Helping Everyone Rewarding Others
    </p>
  </section>
</template>

<style scoped>
section {
  background: white;
  padding: 0 0 0 1.5vw;
  width: 22vw;
}

.acesso h2 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5vw;
}

section p {
  color: rgb(86, 85, 87);
}

.acesso p {
  font-size: 1.1rem;
  margin: 0;
}

.plus {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.plus p {
  font-weight: 600;
  font-size: 1.3rem;
}

.plus .mdi-plus {
  color: rgb(116, 116, 117);
  font-size: 1.5rem;
  margin-right: 2vw;
}
</style>
