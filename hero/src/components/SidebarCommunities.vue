<script setup>
import { computed } from "vue"
import { RouterLink } from "vue-router"
import { useCommunityState } from "../store/communities"

const emit = defineEmits(['toggleMenu'])

const { todasComunidades, comunidadesEntradas } = useCommunityState()
const comunidadesPopulares = computed(() =>
  todasComunidades.value.map(c => c.nome || "Comunidade sem nome")
)
const minhasComunidades = computed(() =>
  comunidadesEntradas.value.map(c => typeof c === "string" ? c : (c.nome || "Comunidade sem nome"))
)
</script>

<template>
  <section @click.stop>
    <div class="acesso">
      <h2>Acesso Rápido</h2>
    </div>
    <div class="comun-user">
      <div class="plus">
        <p class="p-text">
          MINHAS COMUNIDADES
        </p>
        <RouterLink to="/comunidades">
          <span class="mdi mdi-plus"></span>
        </RouterLink>

      </div>
      <div class="minhas-comun">
        <p v-if="minhasComunidades.length === 0" class="none-comun">
          Você ainda não entrou em nenhuma comunidade.
        </p>
        <ul>
          <li v-for="nome in minhasComunidades" :key="nome">
            <RouterLink :to="`/comunidade/${nome}`" class="hover:underline">
              <span>•</span> {{ nome }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <p class="p-text">
      COMUNIDADES POPULARES
    </p>
    <div class="minhas-comun">
      <ul class="mb-4">
        <li v-for="nome in comunidadesPopulares" :key="nome" class="mb-1">
          <RouterLink :to="`/comunidade/${nome}`" class="hover:underline">
            <span>•</span> {{ nome }}
          </RouterLink>
        </li>
      </ul>
    </div>

    <div>
      <div class="comun-per">
        <div>
          <RouterLink to="/comunidades"><font-awesome-icon :icon="['fas', 'users']" /> Ver todas as comunidades
          </RouterLink>
        </div>
        <div>
          <RouterLink to="/profile"><font-awesome-icon :icon="['far', 'user']" /> Perfil</RouterLink>
        </div>
      </div>
    </div>
    <p class="hero">
      Helping Everyone Rewarding Others
    </p>
  </section>
  <div class="fechar">
    <button @click="emit('toggleMenu')">✕</button>
  </div>
</template>

<style scoped>
section {
  background: white;
  padding: 0 0 0 1vw;
  width: 20vw;
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

p.p-text {
  font-weight: 600;
  font-size: 1.2rem;
  color: #1a1f1a;
}

.plus .mdi-plus {
  color: rgb(116, 116, 117);
  font-size: 1.5rem;
  margin-right: 2vw;
}

.minhas-comun ul {
  margin: 0;
  list-style: none;
  padding: 0;
  align-items: center;
}

.minhas-comun ul li a {
  text-decoration: none;
  color: rgb(86, 85, 87);
}

.minhas-comun li {
  padding: 5px 10px;
  width: 70%;
  border-radius: 10px;
}

.minhas-comun ul li:hover {
  background: rgba(202, 203, 204, 0.2);
}

.none-comun {
  margin: 0;
  font-size: 1rem;
  padding-right: 20px;
}

.hero {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 2vw 0 2vw 0.5vw;
}

.comun-per {
  margin: 1vw 0;
}

.comun-per div {
  margin-bottom: 10px;
}

.comun-per a {
  text-decoration: none;
  color: rgb(86, 85, 87);
  font-size: 1.2rem;
  font-weight: 600;
  padding: 6px;
  border-radius: 10px;
}

.comun-per a:hover {
  background: rgba(202, 203, 204, 0.2);
  color: rgb(57, 57, 58);
}

span {
  font-weight: 700;
  font-size: 1.2rem;
}

.fechar {
  position: absolute;
  top: 0.7vw;
  left: 17vw;
}

.fechar button {
  border: none;
  background: transparent;
  font-size: 1.7rem;
  cursor: pointer;
  color: rgb(135, 135, 136);
  padding: 2px 10px;
  border-radius: 10px;
}

.fechar button:hover {
  background: rgb(135, 135, 136, 0.1);
}

@media (max-width: 1400px) {
  .acesso h2 {
    font-size: 1rem;
  }

  .acesso p {
    font-size: 0.9rem;
  }

  p.p-text {
    font-size: 0.9rem;
  }

  .plus .mdi-plus {
    font-size: 1.2rem;
  }

  .minhas-comun ul li a {
    font-size: 1rem;
  }

  .minhas-comun li {
    padding: 3px 8px;
  }

  .comun-per a {
    font-size: 0.9rem;
  }

  .hero {
  font-size: 0.7rem;
  }

  .fechar button {
  font-size: 1.3rem;
  }
}
@media (max-width: 950px) {
  .acesso h2 {
    font-size: 0.9rem;
  }

  .acesso p {
    font-size: 0.8rem;
  }

  p.p-text {
    font-size: 0.8rem;
  }

  .plus .mdi-plus {
    font-size: 1rem;
  }

  .minhas-comun ul li a {
    font-size: 0.9rem;
  }

  .minhas-comun li {
    padding: 3px 8px;
  }

  .comun-per a {
    font-size: 0.8rem;
  }

  .hero {
  font-size: 0.6rem;
  }

  .fechar button {
  font-size: 1.2rem;
  }
}
</style>
