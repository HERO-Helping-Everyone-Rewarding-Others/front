<script setup>
import { ref, computed, onMounted } from 'vue'
import { usuario, gastarPontos } from '../store/user'

// Itens disponíveis
const itens = ref([
  {
    id: 1,
    nome: 'Gift Card Amazon R$ 50',
    preco: 500,
    descricao: 'Vale-presente para compras na Amazon',
    disponivel: 280,
    img: '/amazon.png',
    categoria: 'gift',
  },
  {
    id: 2,
    nome: 'Desconto 20% iFood',
    preco: 200,
    descricao: 'Cupom de desconto para pedidos no iFood',
    disponivel: 50,
    img: '/ifood.png',
    categoria: 'desconto',
  },
  {
    id: 3,
    nome: 'PIX R$ 50',
    preco: 300,
    descricao: 'Tranferência PIX direto para sua conta',
    disponivel: 100,
    img: '/pix.png',
    categoria: 'dinheiro',
  },
  {
    id: 4,
    nome: 'Doação para ONGs',
    preco: 100,
    descricao: 'Doe seus pontos para ONGs parceiras',
    disponivel: 999,
    img: '/ong.png',
    categoria: 'doacao',
  },
  {
    id: 5,
    nome: 'Gift Card Spotify R$ 30',
    preco: 350,
    descricao: 'Assinatura premium do Spotify',
    disponivel: 15,
    img: '/spotify.png',
    categoria: 'gift',
  },
  {
    id: 6,
    nome: 'Desconto 15% Uber',
    preco: 150,
    descricao: 'Cupom de desconto para corridas Uber',
    disponivel: 75,
    img: '/uber.png',
    categoria: 'desconto',
  },
  {
    id: 7,
    nome: 'Gift Card Google Play R$ 30',
    preco: 300,
    descricao: 'Gift card de 30 reais na Google Play',
    disponivel: 40,
    img: '/play.png',
    categoria: 'gift',
  },
  {
    id: 8,
    nome: 'Desconto 30% Starbucks',
    preco: 100,
    descricao: 'Cupom de desconto para pedidos no Starbuks',
    disponivel: 100,
    img: '/starbucks.png',
    categoria: 'desconto',
  },
])

// Modal
const itemSelecionado = ref(null)
const mostrarModal = ref(false)

// Categoria filtrada
const categoriaSelecionada = ref('todos')
const itensFiltrados = computed(() => {
  if (categoriaSelecionada.value === 'todos') return itens.value
  return itens.value.filter((item) => item.categoria === categoriaSelecionada.value)
})

// Barra de progresso animada
const progressoAtual = ref({})
itens.value.forEach((item) => (progressoAtual.value[item.id] = 0))

const calcularProgresso = (item) => {
  const pontos = usuario.pontos
  return Math.min((pontos / item.preco) * 100, 100)
}

const animarProgresso = () => {
  let precisaAtualizar = false
  itens.value.forEach((item) => {
    const alvo = calcularProgresso(item)
    const atual = progressoAtual.value[item.id]
    const diferenca = alvo - atual
    if (Math.abs(diferenca) > 0.1) {
      progressoAtual.value[item.id] += diferenca * 0.1
      precisaAtualizar = true
    }
  })
  if (precisaAtualizar) requestAnimationFrame(animarProgresso)
}
onMounted(() => animarProgresso())

// Modal
const abrirModal = (item) => {
  itemSelecionado.value = item
  mostrarModal.value = true
}
const fecharModal = () => {
  itemSelecionado.value = null
  mostrarModal.value = false
}

// Comprar
const confirmarCompra = () => {
  if (gastarPontos(itemSelecionado.value.preco)) {
    alert(`Você comprou ${itemSelecionado.value.nome}!`)
    fecharModal()
  } else {
    alert('Pontos insuficientes.')
  }
}

// Filtrar categoria
const selecionarCategoria = (categoria) => {
  categoriaSelecionada.value = categoria
}
</script>

<template>
  <section>
    <div class="pontos-user">
      <div class="recom">
        <h2>Recompensas</h2>
        <p>Troque seus pontos por recompensas incríveis</p>
      </div>
      <div class="pontos">
        <div class="box1-pontos">
          <p class="text-ponto">Seus pontos</p>
          <p class="total-pontos">{{ usuario.pontos }}</p>
        </div>
        <div class="icon-line">
          <span class="mdi mdi-chart-line"></span>
        </div>
      </div>
    </div>

    <div class="list">
      <ul>
        <li>
          <button @click="selecionarCategoria('todos')">
            <span class="mdi mdi-star-outline"></span>
            <p>Todos</p>
          </button>
        </li>
        <li>
          <button @click="selecionarCategoria('gift')">
            <span class="mdi mdi-gift-outline"></span>
            <p>Gift Cards</p>
          </button>
        </li>
        <li>
          <button @click="selecionarCategoria('desconto')">
            <span class="mdi mdi-cart-outline"></span>
            <p>Descontos</p>
          </button>
        </li>
        <li>
          <button @click="selecionarCategoria('dinheiro')">
            <span class="mdi mdi-currency-usd"></span>
            <p>Dinheiro</p>
          </button>
        </li>
        <li>
          <button @click="selecionarCategoria('doacao')">
            <span class="mdi mdi-heart-outline"></span>
            <p>Doações</p>
          </button>
        </li>
      </ul>
    </div>

    <div class="flex">
      <div v-for="item in itensFiltrados" :key="item.id" class="itens">
        <img :src="item.img" alt="Imagem do item" />
        <div class="box-description">
          <h2>{{ item.nome }}</h2>
          <p>{{ item.descricao }}</p>

          <div class="box-info">
            <p><span class="mdi mdi-star-outline"></span> {{ item.preco }} pontos</p>
            <p class="disp">{{ item.disponivel }} disponíveis</p>
          </div>

          <div class="progress-container">
            <p v-if="usuario.pontos < item.preco">
              Faltam {{ item.preco - usuario.pontos }} pontos
            </p>
            <p v-else>Você já pode resgatar!</p>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressoAtual[item.id] + '%' }"></div>
            </div>
          </div>

          <button @click="abrirModal(item)">Comprar</button>
        </div>
      </div>
    </div>

    <div v-if="mostrarModal" class="modal-overlay" @click.self="fecharModal">
      <div class="modal">
        <h2>Confirmar compra</h2>
        <p>
          <strong>{{ itemSelecionado?.nome }}</strong>
        </p>
        <p>{{ itemSelecionado?.descricao }}</p>
        <p>
          Preço: <strong>{{ itemSelecionado?.preco }} pontos</strong>
        </p>
        <div class="botoes">
          <button class="cancelar" @click="fecharModal">Cancelar</button>
          <button class="confirmar" @click="confirmarCompra">Confirmar</button>
        </div>
      </div>
    </div>

    <div class="box-win">
      <h2>Como Ganhar Pontos</h2>
      <ul>
        <li>
          <span class="mdi mdi-heart-outline" id="heart"></span>
          <h3>Participe de Atividades</h3>
          <p>Poste suas contribuições nas comunidades e ganhe pontos quando verificadas</p>
        </li>
        <li>
          <span class="mdi mdi-star-outline" id="star"></span>
          <h3>Seja Ativo</h3>
          <p>Comente, curta e compartilhe postagens para ganhar pontos de engajamento</p>
        </li>
        <li>
          <span class="mdi mdi-gift-outline" id="gift"></span>
          <h3>Complete Desafios</h3>
          <p>Participe de desafios especiais e eventos para ganhar pontos extras</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* O CSS que você forneceu, intacto */
section {
  padding: 5vw 5vw;
  background: rgba(230, 242, 243, 0.5);
}
.pontos-user {
  display: flex;
  justify-content: space-between;
}
.recom h2 {
  font-size: 1.7rem;
  margin: 0 0 0.5vw 0;
}
.recom p,
.box1-pontos p.text-ponto {
  color: rgb(88, 87, 87);
  font-weight: 600;
  margin: 0;
  font-size: 1.2rem;
}
.pontos-user .pontos {
  display: flex;
  text-align: right;
}
.icon-line span {
  color: rgb(12, 88, 124);
  font-size: 2rem;
  background: rgba(141, 215, 233, 0.5);
  border-radius: 100%;
  padding: 1vw 1.5vw;
}
.icon-line {
  margin: 0.3vw 0 0 1.5vw;
}
.total-pontos {
  font-weight: 700;
  font-size: 1.5rem;
  color: rgb(12, 88, 124);
  margin: 0;
}
.list ul {
  display: flex;
  gap: 10px;
  margin: 0;
  padding: 2vw 2vw 0 0;
}
.list ul li {
  list-style: none;
}
.list button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 0.9rem;
  border: 3px solid rgb(201, 199, 199, 0.3);
  border-radius: 10px;
  background: white;
  padding: 0.5vw 1vw;
  cursor: pointer;
  font-weight: 600;
  color: rgb(88, 87, 87);
  transition: 0.1s;
}
.list button:hover,
.list button:focus {
  color: white;
  background: rgb(25, 25, 26);
}
.list button span {
  font-size: 1.3rem;
}
.list span,
.list p {
  margin: 0;
}
.box-win {
  background: white;
  border-radius: 25px;
  border: 3px solid rgb(201, 199, 199, 0.3);
  padding: 0.5vw 2vw;
  margin: 0 4vw;
}
.box-win h2 {
  font-size: 1.3rem;
  font-weight: 500;
  color: rgb(88, 87, 87);
}
.box-win ul {
  display: flex;
  justify-content: center;
  text-align: center;
  list-style: none;
  padding: 2vw 2vw 1vw 2vw;
}
.box-win ul li span#heart {
  background: rgba(154, 184, 250, 0.3);
  color: rgb(45, 84, 194);
}
.box-win ul li span#star {
  background: rgb(129, 247, 168, 0.3);
  color: rgb(27, 139, 64);
}
.box-win ul li span#gift {
  background: rgba(230, 167, 230, 0.3);
  color: rgb(165, 66, 165);
}
.box-win ul li span#gift,
.box-win ul li span#star,
.box-win ul li span#heart {
  padding: 0.6vw 1vw;
  border-radius: 100%;
  font-size: 1.5rem;
}
.box-win li p {
  font-size: 1rem;
  color: rgb(88, 87, 87);
}
.box-win li h3 {
  font-size: 1.3rem;
}
.flex {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2vw;
  margin: 4vw 0;
}
.itens {
  display: flex;
  flex-direction: column;
  width: 20vw;
  border: 3px solid rgba(131, 129, 129, 0.2);
  border-radius: 25px;
  overflow: hidden;
  background: white;
}
.itens img {
  height: 12vw;
  object-fit: cover;
  display: block;
}
.itens h2 {
  font-size: 1rem;
  margin-bottom: 0;
}
.itens p {
  color: rgb(88, 87, 87);
  font-size: 0.75rem;
}
.box-description {
  padding: 1vw;
}
.box-info {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
}
.box-info .mdi-star-outline {
  color: rgb(247, 212, 16);
  font-size: 1.2rem;
}
.box-info p.disp {
  border: 1px solid rgb(168, 164, 164, 0.5);
  padding: 5px 7px;
  border-radius: 10px;
}
.progress-container {
  margin-top: 10px;
}
.progress-bar {
  height: 8px;
  background: #ddd;
  border-radius: 5px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: #4caf50;
  transition: width 0.3s ease;
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
  padding: 2rem;
  width: 30vw;
  max-width: 500px;
}
.botoes {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}
button.cancelar {
  background: #ddd;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}
button.confirmar {
  background: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}
</style>
