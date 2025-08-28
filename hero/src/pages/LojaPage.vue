<script setup>
import { ref } from "vue";
import { usuario, gastarPontos } from "../store/user";

// Itens da loja
const itens = ref([
  { id: 1, nome: "Camiseta exclusiva", preco: 100, descricao: "Uma camiseta estilosa da comunidade." },
  { id: 2, nome: "Caneca personalizada", preco: 50, descricao: "Caneca oficial para café ou chá." },
  { id: 3, nome: "Adesivo da comunidade", preco: 20, descricao: "Adesivo para colar onde quiser." },
]);

// Controle do modal
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
    <!-- aqui NÃO usa .value -->
    <p class="pontos">Seus pontos: <strong>{{ usuario.pontos }}</strong></p>

    <div class="grid">
      <div v-for="item in itens" :key="item.id" class="card">
        <h2>{{ item.nome }}</h2>
        <p>{{ item.descricao }}</p>
        <p><strong>{{ item.preco }} pontos</strong></p>
        <button @click="abrirModal(item)">Comprar</button>
      </div>
    </div>

    <!-- Modal de confirmação -->
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
.loja {
  padding: 2rem;
  text-align: center;
}

h1 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

.pontos {
  margin-bottom: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.card {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.card h2 {
  margin: 0.5rem 0;
}

.card button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: #942785;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.card button:hover {
  background: #742068;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  text-align: center;
}

.botoes {
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
}

button.cancelar {
  background: #ccc;
  color: #000;
}

button.confirmar {
  background: #28a745;
  color: #fff;
}
</style>
