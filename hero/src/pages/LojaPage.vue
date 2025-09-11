<script setup>
import { ref, computed } from 'vue'
import { usuario, gastarPontos } from '../store/user'

// Itens disponíveis
const itens = ref([
  { id: 1, nome: 'Gift Card Amazon R$ 50', preco: 500, descricao: 'Vale-presente para compras na Amazon', disponivel: 280, img: '/amazon.png', categoria: 'gift' },
  { id: 2, nome: 'Desconto 20% iFood', preco: 200, descricao: 'Cupom de desconto para pedidos no iFood', disponivel: 50, img: '/ifood.png', categoria: 'desconto' },
  { id: 3, nome: 'PIX R$ 50', preco: 300, descricao: 'Tranferência PIX direto para sua conta', disponivel: 100, img: '/pix.png', categoria: 'dinheiro' },
  { id: 4, nome: 'Doação para ONGs', preco: 100, descricao: 'Doe seus pontos para ONGs parceiras', disponivel: 999, img: '/ong.png', categoria: 'doacao' },
  { id: 5, nome: 'Gift Card Spotify R$ 30', preco: 350, descricao: 'Assinatura premium do Spotify', disponivel: 15, img: '/spotify.png', categoria: 'gift' },
  { id: 6, nome: 'Desconto 15% Uber', preco: 150, descricao: 'Cupom de desconto para corridas Uber', disponivel: 75, img: '/uber.png', categoria: 'desconto' },
  { id: 7, nome: 'Gift Card Google Play R$ 30', preco: 300, descricao: 'Gift card de 30 reais na Google Play', disponivel: 40, img: '/play.png', categoria: 'gift' },
  { id: 8, nome: 'Desconto 30% Starbucks', preco: 100, descricao: 'Cupom de desconto para pedidos no Starbuks', disponivel: 100, img: '/starbucks.png', categoria: 'desconto' }
])

// Modal
const itemSelecionado = ref(null)
const mostrarModal = ref(false)

// Categoria filtrada
const categoriaSelecionada = ref('todos')
const itensFiltrados = computed(() => {
  if (categoriaSelecionada.value === 'todos') return itens.value
  return itens.value.filter(item => item.categoria === categoriaSelecionada.value)
})

// Modal
const abrirModal = (item) => { itemSelecionado.value = item; mostrarModal.value = true }
const fecharModal = () => { itemSelecionado.value = null; mostrarModal.value = false }

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
const selecionarCategoria = (categoria) => categoriaSelecionada.value = categoria
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
        <li><button @click="selecionarCategoria('todos')"><span class="mdi mdi-star-outline"></span>
            <p>Todos</p>
          </button></li>
        <li><button @click="selecionarCategoria('gift')"><span class="mdi mdi-gift-outline"></span>
            <p>Gift Cards</p>
          </button></li>
        <li><button @click="selecionarCategoria('desconto')"><span class="mdi mdi-cart-outline"></span>
            <p>Descontos</p>
          </button></li>
        <li><button @click="selecionarCategoria('dinheiro')"><span class="mdi mdi-currency-usd"></span>
            <p>Dinheiro</p>
          </button></li>
        <li><button @click="selecionarCategoria('doacao')"><span class="mdi mdi-heart-outline"></span>
            <p>Doações</p>
          </button></li>
      </ul>
    </div>

    <div class="flex">
      <div v-for="item in itensFiltrados" :key="item.id" class="itens">
        <img :src="item.img" alt="Imagem do item" />
        <div class="box-description">
          <h2>{{ item.nome }}</h2>
          <p>{{ item.descricao }}</p>
        </div>

        <div class="progress-box">
          <div class="box-info">
            <div class="text">
              <font-awesome-icon :icon="['far', 'star']" class="star" />
              <p>{{ item.preco }} pontos</p>
            </div>
            <p class="disp">{{ item.disponivel }} disponíveis</p>
          </div>
          <div class="text-progress">
            <p class="faltam">Progresso</p>
            <p class="faltam">
              {{ usuario.pontos >= item.preco
                ? 'Pronto!'
                : `Faltam ${item.preco - usuario.pontos} pontos` }}
            </p>
          </div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: Math.min(100, (usuario.pontos / item.preco) * 100) + '%' }">
            </div>
          </div>
          <button @click="abrirModal(item)" :class="usuario.pontos >= item.preco ? 'btn-resgatar' : 'btn-insuficiente'">
            {{ usuario.pontos >= item.preco ? 'Resgatar' : 'Pontos insuficientes' }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="mostrarModal" class="modal-overlay" @click.self="fecharModal">
      <div class="modal">
        <div class="info-modal">
          <h2>Confirmar Resgate</h2>
          <p>
            Você está prestes a resgatar uma recompensa. Confirme os detalhes abaixo.
          </p>
          <img :src="itemSelecionado?.img" :alt="itemSelecionado?.nome" class="modal-img">
          <div class="text-modal">
            <h2><strong>{{ itemSelecionado?.nome }}</strong></h2>
            <p>{{ itemSelecionado?.descricao }}</p>
          </div>
        </div>

        <div class="modal-pontos">
          <ul>
            <li>
              <p>Custo:</p>
              <p><strong>{{ itemSelecionado?.preco }} pontos</strong></p>
            </li>
            <li>
              <p>Seus pontos:</p>
              <p><strong>{{ usuario.pontos }} pontos</strong></p>
            </li>
            <li>
              <p><strong>Restantes:</strong></p>
              <p id="text-green"><strong>{{ itemSelecionado?.preco - usuario.pontos }} pontos</strong></p>
            </li>
          </ul>
        </div>

        <div class="buttons">
          <button class="cancelar" @click="fecharModal">Cancelar</button>
          <button class="confirmar" @click="confirmarCompra">Confirmar Resgate</button>
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
section {
  padding: 5vw 5vw;
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
  padding: 0.4vw 1vw;
  cursor: pointer;
  font-weight: 600;
  color: rgb(88, 87, 87);
}

.list button:focus {
  color: white;
  background: rgb(25, 25, 26);
}

.list button span {
  font-size: 1.3rem;
}

.list p {
  margin: 0;
}

.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 2vw 0 4vw 0;
}

.itens {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20vw;
  border: 3px solid rgb(201, 199, 199, 0.3);
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
  font-size: 1.2rem;
  margin-bottom: 0;
  color: #000000;
  font-weight: 500;
}

.box-description {
  padding: 1vw;
  flex: 1;
  font-size: 1rem;
  color: #5f5f61;
}

.box-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1vw;
  align-items: center;
  font-size: 0.9rem;
}

.box-info p {
  font-size: 0.8rem;
}

.text {
  align-items: center;
  display: flex;
}

.text p {
  font-size: 1rem;
  color: #000000;
  font-weight: 600;
  padding-left: 7px;
}

.box-info .star {
  color: rgb(253, 215, 0);
  font-size: 1rem;
}

.box-info p.disp {
  border: 1px solid rgb(168, 164, 164, 0.5);
  padding: 5px 7px;
  border-radius: 10px;
}

.progress-box {
  margin: 0 1vw;
}

.progress-box p {
  margin: 0;
}

.progress-bar {
  width: 100%;
  height: 11px;
  background: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: rgb(25, 25, 26);
  transition: width 0.3s ease;
}

p.faltam {
  font-size: 0.9rem;
  color: rgb(88, 87, 87);
  margin: 5px 0 0 0;
  font-weight: 500;
}

.progress-box div.text-progress {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8vw;
}

.btn-insuficiente,
.btn-resgatar {
  font-weight: 600;
  color: white;
  border: none;
  width: 100%;
  padding: 15px 0;
  border-radius: 10px;
  font-size: 1rem;
  margin: 1vw 0 2.5vw 0;
}

.btn-resgatar,
.confirmar {
  background: rgb(25, 25, 26);
  cursor: pointer;
  transition: 0.2s;
}

.btn-resgatar:hover,
.confirmar:hover {
  background: rgb(25, 25, 26, 0.9);
}

.btn-insuficiente {
  background: #a1a1a1;
}

.box-win {
  background: white;
  border-radius: 25px;
  border: 3px solid rgb(201, 199, 199, 0.3);
  padding: 0.5vw 2vw;
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
  margin: 3vw 2vw;
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
  padding: 2vw;
  width: 30vw;
}

.info-modal img {
  width: 100%;
  height: 10vw;
  object-fit: cover;
  border-radius: 20px;
}

.info-modal h2 {
  margin: 0;
  font-size: 1.2rem;
}

.info-modal p {
  font-size: 0.9rem;
  color: #5f5f61;
}

.text-modal {
  text-align: center;
  margin: 1vw 0;
}

.text-modal p {
  margin: 0.5vw 0;
}

.modal-pontos {
  background: rgb(241, 241, 241, 0.5);
  border-radius: 15px;
}

.modal-pontos ul {
  list-style: none;
  padding: 0.5vw 1.5vw;
}

.modal-pontos ul li {
  display: flex;
  justify-content: space-between;
}

.modal-pontos li p {
  margin: 0.5vw 0;
  font-size: 1rem;
}

#text-green {
  color: rgb(31, 146, 75);
}

.buttons {
  text-align: right;
}

.buttons button {
  border: 2px solid rgb(201, 199, 199, 0.3);
  border-radius: 10px;
  margin-left: 1vw;
  padding: 0.5vw 1vw;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.cancelar {
  background: rgb(241, 241, 241, 0.5);
}

.confirmar {
  color: white;
}
</style>
