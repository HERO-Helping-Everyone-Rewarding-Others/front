<script setup>
import { computed } from "vue"
import { useRouter } from "vue-router"
import { useCommunityState } from "../store/communities"



const { comunidadesEntradas } = useCommunityState()

const minhasComunidades = computed(() =>
  comunidadesEntradas.value.map(c => typeof c === "string" ? c : (c.nome || "Comunidade sem nome"))
)

const router = useRouter()

function irParaComunidade(nome) {
  router.push(`/comunidade/${nome}`)
}
</script>

<template>
  <section @click.stop>
    <div class="sidebar">
      <div class="sidebar-1">
        <div class="logo">
          <img src="/logo-branca-icon.png" alt="logo" />
        </div>
        <div class="list">
          <ul>
            <li>
              <font-awesome-icon :icon="['far', 'house']" />
            </li>
            <li>
              <span class="mdi mdi-account-group-outline"></span>
            </li>
            <li>
              <span class="mdi mdi-shopping-outline"></span>
            </li>
            <li>
              <span class="mdi mdi-account-outline"></span>
            </li>
          </ul>
        </div>
        <div class="comun">
          <span class="mdi mdi-account-multiple-check-outline"></span>
        </div>
      </div>

      <div class="sidebar-2">
        <div class="logo">
          <img src="/logo-branca-icon.png" alt="logo" />
        </div>
        <div class="list">
          <ul>
            <RouterLink to="/" class="link">
              <li>
                <font-awesome-icon :icon="['far', 'house']" class="home" />
                <p>Início</p>
              </li>
            </RouterLink>
            <RouterLink to="/comunidades" class="link">
              <li>
                <span class="mdi mdi-account-group-outline"></span>
                <p>Comunidades</p>
              </li>
            </RouterLink>
            <RouterLink to="/loja" class="link">
              <li>
                <span class="mdi mdi-shopping-outline"></span>
                <p>Loja</p>
              </li>
            </RouterLink>
            <RouterLink to="/profile" class="link">
              <li>
                <span class="mdi mdi-account-outline"></span>
                <p>Perfil</p>
              </li>
            </RouterLink>
          </ul>
        </div>
        <div class="comun">
          <div class="box-comun">
            <span class="mdi mdi-account-multiple-check-outline"></span>
            <p>Minhas comunidades</p>
          </div>
          <p v-if="minhasComunidades.length === 0" class="none-comun">
            Você ainda não entrou em nenhuma comunidade.
          </p>
          <ul>
            <li v-for="nome in minhasComunidades" :key="nome" class="comunidade" @click="irParaComunidade(nome)"
              style="cursor: pointer">
              <span class="mdi mdi-play"></span> {{ nome }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sidebar {
  display: flex;
}

.sidebar-1 {
  width: 5vw;
  transition: width .20s ease, opacity .20s ease;
  overflow: hidden;
  height: 40vw;
}

.sidebar-2 {
  width: 0;
  opacity: 0;
  pointer-events: none;
  /* evita receber hover/click quando fechada */
  transition: width .20s ease, opacity .20s ease;
  overflow: hidden;
  height: 40vw;
}

.sidebar:hover .sidebar-1 {
  width: 0;
  opacity: 0;
  pointer-events: none;
}

.sidebar:hover .sidebar-2 {
  width: 17vw;
  opacity: 1;
  pointer-events: auto;
}

.sidebar-1 .logo,
.sidebar-2 .logo {
  background: rgb(27, 35, 83, 0.9);
  width: 3.3vw;
  height: 3vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 1vw auto;
}

.logo img {
  width: 2.5vw;
}

.sidebar-1 .list {
  display: flex;
  justify-content: center;
}

.sidebar-1 ul {
  list-style: none;
  margin: 1vw 0 0 0;
  padding: 0;
}

.sidebar-1 ul li {
  font-size: 1.7rem;
  color: grey;
  margin: 1vw 0;
}

.sidebar-1 .comun {
  font-size: 1.7rem;
  color: grey;
  margin: 0 0 0 1vw;
}

.sidebar-2 {
  overflow-y: auto;
}

.sidebar-2 .list {
  display: flex;
  margin: 0 1vw;
}

.sidebar-2 .logo {
  margin: 1vw;
}

.sidebar-2 ul {
  list-style: none;
  margin: 1.4vw 0 0 0;
  padding: 0;
  width: 100%;
}

.sidebar-2 ul li {
  display: flex;
  align-items: center;
  margin: 1vw 0 0 0;
  height: 3vw;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sidebar-2 ul li span,
.home {
  font-size: 1.7rem;
  color: grey;
  padding-left: 1vw;
}

.sidebar-2 ul li p {
  margin: 0 0 0 1vw;
  font-size: 1.1rem;
  color: grey;
  font-weight: 500;
}

.link {
  text-decoration: none;
}

.sidebar-2 li:hover {
  background: rgba(120, 120, 121, 0.1);
}

.sidebar-2 .comun .box-comun {
  display: flex;
  align-items: center;
  margin-top: 1vw;
}

.box-comun p {
  font-size: 1rem;
  color: grey;
  font-weight: 500;
  width: 50%;
}

.box-comun span {
  font-size: 1.7rem;
  margin: 0 1vw;
  color: grey;
}

.none-comun {
  color: grey;
  font-size: 0.9rem;
  margin: 0 0.5vw 0 1vw;
}

.comunidade {
  color: grey;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
}

.comun ul {
  margin: 0;
}

.comun ul li {
  width: 85%;
  margin-left: 1vw;
  font-size: 0.9rem;
  padding: 0;
  margin: 0 1vw;
}

.comunidade .mdi-play {
  font-size: 0.9rem;
}

@media (max-width: 1400px) {

  .sidebar-2 ul li span,
  .home {
    font-size: 1.5rem;
  }

  .sidebar-2 ul li p {
    margin: 0 0 0 1vw;
    font-size: 1rem;
  }

  .box-comun p {
    font-size: 1rem;
  }

  .comun ul li {
    font-size: 0.8rem;
    margin: 0 0 1vw 1vw;
  }

  .comunidade .mdi-play {
    font-size: 0.8rem;
    padding-right: 1vw;
  }
}

@media (max-width: 1000px) {

  .sidebar-2 ul li span,
  .home {
    font-size: 1.2rem;
  }

  .sidebar-2 ul li p {
    margin: 0 0 0 1vw;
    font-size: 0.8rem;
  }

  .sidebar-1 ul li {
    font-size: 1.2rem;
  }

  .comun span {
    font-size: 1.2rem;
  }

  .box-comun p {
    font-size: 0.8rem;
  }

  .comun ul li {
    font-size: 0.7rem;
    margin: 0 0 1vw 0;
  }

  .comunidade .mdi-play {
    font-size: 0.6rem;
    padding-right: 1vw;
  }
}

@media (max-width: 500px) {
  .sidebar-1 {
    display: none;
  }

  .sidebar-2 {
    width: 50vw;
    opacity: 1;
    pointer-events: auto;
    transition: none;
    height: auto;
    padding: 2vw;
  }

  .sidebar:hover {
    display: none;
  }

  .sidebar-2 ul li {
    height: auto;
    gap: 10px;
    padding: 10px;
  }

  div.logo img {
    width: 5vw;
  }

  div.logo {
    padding: 2.5vw;
  }

}
</style>
