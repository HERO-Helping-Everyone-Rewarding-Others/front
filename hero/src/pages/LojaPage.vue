<script setup>
import { ref } from "vue";
import { usuario, gastarPontos } from "../store/user";


const itens = ref([
  { id: 1, nome: "pinto de borracha", preco: 100, descricao: "Uma camiseta estilosa da comunidade." },
  { id: 2, nome: "Caneca personalizada", preco: 50, descricao: "Caneca oficial para café ou chá." },
  { id: 3, nome: "Adesivo da comunidade", preco: 20, descricao: "Adesivo para colar onde quiser." },
  {  id: 4, nome: "oibrdsaD", preco: 60, descricao: "AWI " }
]);

const itemSelecionado = ref(null);
const mostrarModal = ref(false);

const abrirModal = (item) => {
  itemSelecionado.value = item;
  mostrarModal.value = true;
};

const fecharModal = () => {
  itemSelecionado.value = null;
  mostrarModal.value = false;
};

const confirmarCompra = () => {
  if (gastarPontos(itemSelecionado.value.preco)) {
    alert(`Você comprou ${itemSelecionado.value.nome}!`);
    fecharModal();
  } else {
    alert("Pontos insuficientes.");
  }
};
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
          <button>
            <span class="mdi mdi-star-outline"></span>
            <p>Todos</p>
          </button>
        </li>
        <li>
          <button>
            <span class="mdi mdi-gift-outline"></span>
            <p>Gift Cards</p>
          </button>
        </li>
        <li>
          <button>
            <span class="mdi mdi-cart-outline"></span>
            <p>Descontos</p>
          </button>
        </li>
        <li>
          <button>
            <span class="mdi mdi-currency-usd"></span>
            <p>Dinheiro</p>
          </button>
        </li>
        <li>
          <button>
            <span class="mdi mdi-heart-outline"></span>
            <p>Doações</p>
          </button>
        </li>
      </ul>
    </div>



    <p class="pontos">Seus pontos: <strong></strong></p>

    <div class="grid">
      <div v-for="item in itens" :key="item.id" class="card">
        <h2>{{ item.nome }}</h2>
        <p>{{ item.descricao }}</p>
        <p><strong>{{ item.preco }} pontos</strong></p>
        <button @click="abrirModal(item)">Comprar</button>
      </div>
    </div>

    <div v-if="mostrarModal" class="modal-overlay" @click.self="fecharModal">
      <div class="modal">
        <h2>Confirmar compra</h2>
        <p><strong>{{ itemSelecionado?.nome }}</strong></p>
        <p>{{ itemSelecionado?.descricao }}</p>
        <p>Preço: <strong>{{ itemSelecionado?.preco }} pontos</strong></p>
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
section {
  padding: 7vw 8vw;
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
  color: rgb(12, 124, 81);
  font-size: 2rem;
  background: rgba(141, 233, 202, 0.5);
  border-radius: 100%;
  padding: 1vw 1.5vw;
}
.icon-line {
  margin: 0.3vw 0 0 1.5vw;
}
.total-pontos {
  font-weight: 700;
  font-size: 1.3rem;
  color: rgb(12, 124, 81);
  margin: 0;
}
.list ul {
  display: flex;
  gap: 10px;
  margin: 0;
  padding: 0;
}
.list ul li {
  list-style: none;
  margin: 3vw 0;
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
  background: rgb(18, 18, 19);
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
  padding: 3vw 2vw 1vw 2vw;
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
</style>

