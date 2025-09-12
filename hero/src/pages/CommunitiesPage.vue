<script setup>
import { ref, computed } from "vue" // <-- ADICIONE 'computed'
import { comunidades, addCommunity } from "../store/posts"
import { useRouter } from "vue-router"
import { useAuth } from "../composables/auth"
import { useCommunityState } from "../store/communities"
import { posts } from '../store/posts'
import { usuario, profileName } from '../store/user'


const router = useRouter()
const { user } = useAuth()
const { adicionarComunidadeCriada } = useCommunityState()


const userPosts = computed(() => {
  const backendName = user.value?.nome || usuario.value.nome
  const localName = profileName.value
  return posts.value.filter((p) => p.usuario === backendName || p.usuario === localName)
})
const postsCount = computed(() => userPosts.value.length)

const novaComunidade = ref({
  nome: "",
  descricao: "",
  motivacao: "",
  maxMembros: 30,
  contato: "",
  doacoesInfo: "",
  tiposDoacoes: ""
})

const erro = ref("")

function criarComunidade() {
  erro.value = ""

  if (!novaComunidade.value.nome.trim()) {
    erro.value = "O nome da comunidade é obrigatório."
    return
  }
  if (!novaComunidade.value.descricao.trim()) {
    erro.value = "A descrição é obrigatória."
    return
  }
  if (!novaComunidade.value.motivacao.trim()) {
    erro.value = "A motivação é obrigatória."
    return
  }
  if (!novaComunidade.value.maxMembros || novaComunidade.value.maxMembros < 1) {
    erro.value = "O número máximo de membros deve ser no mínimo 1."
    return
  }

  const comunidade = {
    nome: novaComunidade.value.nome.trim(),
    descricao: novaComunidade.value.descricao.trim(),
    motivacao: novaComunidade.value.motivacao.trim(),
    maxMembros: novaComunidade.value.maxMembros,
    contato: novaComunidade.value.contato.trim(),
    doacoesInfo: novaComunidade.value.doacoesInfo.trim(),
    tiposDoacoes: novaComunidade.value.tiposDoacoes
      ? novaComunidade.value.tiposDoacoes.split(",").map(d => d.trim())
      : []
  }

  addCommunity(comunidade)

  if (!user.value.comunidades) user.value.comunidades = []
  if (!user.value.comunidades.includes(comunidade.nome)) {
    user.value.comunidades.push(comunidade.nome)
  }

  adicionarComunidadeCriada(comunidade)


  novaComunidade.value = {
    nome: "",
    descricao: "",
    motivacao: "",
    maxMembros: 30,
    contato: "",
    doacoesInfo: "",
    tiposDoacoes: ""
  }
}

const filtro = ref("")

const comunidadesFiltradas = computed(() => {
  if (!filtro.value.trim()) {
    return comunidades.value
  }
  return comunidades.value.filter(c =>
    c.nome.toLowerCase().includes(filtro.value.toLowerCase())
  )
})


const itemSelecionado = ref(null)
const mostrarModal = ref(false)

const abrirModal = (item) => { itemSelecionado.value = item; mostrarModal.value = true }
const fecharModal = () => { itemSelecionado.value = null; mostrarModal.value = false }


</script>


<template>
  <section>
    <div class="box-text">
      <div>
        <h2>Comunidades</h2>
        <p>
          Encontre e participe de comunidades que fazem a diferença
        </p>
      </div>
      <button @click="abrirModal"><span class="mdi mdi-plus"></span> Criar Comunidade</button>
    </div>
    <div class="search">
      <label for="lupa"><span class="mdi mdi-magnify"></span></label>
      <input type="text" v-model="filtro" placeholder="Buscar comunidades..." class="search-input" />
    </div>
    <div class="comunidades">
      <ul>
        <li v-for="c in comunidadesFiltradas" :key="c.nome"
          @click="router.push({ name: 'comunidade', params: { nome: c.nome } })">
          <h2>{{ c.nome }}</h2>
          <p>{{ c.descricao }}</p>
          <p>{{ c.maxMembros }}</p>

        </li>
      </ul>
    </div>
    <div v-if="mostrarModal" class="modal-overlay" @click.self="fecharModal">


      <div class="modal">
        <div class="border">
          <h2>Criar Nova Comunidade</h2>
        </div>

        <div class="form-comunidade">
          <div>
            <label for="nome">Nome da Comunidade</label>
            <input v-model="novaComunidade.nome" type="text" />
          </div>

          <div>
            <label for="descrição">Descrição</label>
            <textarea v-model="novaComunidade.descricao"></textarea>
          </div>

          <div>
            <label for="motivação">Motivação</label>
            <textarea v-model="novaComunidade.motivacao"></textarea>
          </div>

          <div>
            <label for="membros">Máximo de Membros</label>
            <input v-model.number="novaComunidade.maxMembros" type="number" />
          </div>

          <div>
            <label for="contato">Informações de Contato</label>
            <input v-model="novaComunidade.contato" type="text" placeholder="email@exemplo.com ou telefone" />
          </div>

          <div>
            <label for="doações">Informações para Doação</label>
            <input v-model="novaComunidade.doacoesInfo" type="text" placeholder="PIX, conta bancária, ect." />
          </div>

          <div>
            <label for="tipos">Tipos de Doações aceitas</label>
            <input v-model="novaComunidade.tiposDoacoes" type="text"
              placeholder="Dinheiro, roupas, alimentos (separados por vírgula)" />
          </div>

          <p v-if="erro">{{ erro }}</p>

          <button @click="criarComunidade">
            Criar Comunidade
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 5vw;
}

.box-text {
  display: flex;
  justify-content: space-between;
}

.box-text h2 {
  font-size: 1.7rem;
  margin: 0 0 0.5vw 0;
}

.box-text p {
  color: rgb(88, 87, 87);
  font-weight: 600;
  margin: 0;
  font-size: 1.2rem;
}

.box-text button {
  color: white;
  background: rgb(25, 25, 26);
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  height: 3vw;
  padding: 0.5vw 1vw;
  margin: 0;
  border: none;
  border-radius: 10px;
  align-items: center;
}

.box-text span.mdi-plus {
  color: white;
  font-size: 1.2rem;
  padding: 0;
  margin: 0;
}

.search {
  background: rgb(255, 255, 255);
  border: 2px solid rgba(197, 196, 196, 0.5);
  border-radius: 10px;
  padding: 0.4vw 1vw;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 2vw 0;
}

.search input {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 1rem;
  color: grey;
}

.search input::placeholder {
  font-size: 1rem;
  color: rgb(70, 68, 68);
}

span.mdi-magnify {
  color: rgb(70, 68, 68);
}

.comunidades ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.6vw;
  padding: 0;
}

.comunidades ul li {
  padding: 0 2vw;
  flex-direction: column;
  width: 24vw;
  border: 3px solid rgb(201, 199, 199, 0.3);
  border-radius: 25px;
  background: white;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  background: white;
  border-radius: 15px;
  padding: 2vw 2vw;
  width: 44vw;
  height: 38vw;
  overflow-y: auto;
}

.modal label,
.modal input,
.modal textarea,
.modal button {
  width: 95%;
}

.modal div h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 2vw 3vw;
}

.modal div.border {
  border-bottom: 1px solid rgb(200, 201, 204);
  width: calc(100% + 4vw);
  margin-left: -3vw;
  margin-bottom: 2vw;
}

.form-comunidade {
  margin-top: 2vw;
}

.form-comunidade div {
  margin: 2vw 0;
}

div.form-comunidade label {
  color: rgb(88, 87, 87);
  font-weight: 600;
  font-size: 1rem;
  display: block;
  margin-bottom: 10px;
}

.form-comunidade input,
.form-comunidade textarea {
  border: 2px solid rgb(201, 199, 199, 0.3);
  background: rgb(233, 232, 232, 0.3);
  border-radius: 10px;
  outline: none;
  padding: 0.5vw;
  font-size: 0.9rem;
}

.form-comunidade input {
  padding: 1vw;
}

.form-comunidade input::placeholder {
  font-size: 1rem;
}

.form-comunidade button {
  background: rgba(2, 155, 91);
  color: white;
  font-weight: 600;
  padding: 1.3vw 0;
  font-size: 1rem;
  border-radius: 10px;
  width: 100%;
  border: none;
}
</style>
