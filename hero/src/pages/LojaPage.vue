<script setup>
import { ref } from "vue";
import { usuario, gastarPontos } from "../store/user";


const itens = ref([
  { id: 1, nome: "Camiseta exclusiva", preco: 100, descricao: "Uma camiseta estilosa da comunidade." },
  { id: 2, nome: "Caneca personalizada", preco: 50, descricao: "Caneca oficial para café ou chá." },
  { id: 3, nome: "Adesivo da comunidade", preco: 20, descricao: "Adesivo para colar onde quiser." },
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

  <div class="loja">
    <h1>Loja de Recompensas</h1>

    <p class="pontos">Seus pontos: <strong>{{ usuario.pontos }}</strong></p>

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
  </div>

</template>

<style scoped>
</style>