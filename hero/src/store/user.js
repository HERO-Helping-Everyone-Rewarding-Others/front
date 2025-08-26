// store/user.js
import { ref, watch } from "vue";

const stored = localStorage.getItem("userData");
const data = stored ? JSON.parse(stored) : { nome: "Usuário demo", pontos: 120 };

export const usuario = ref(data);

watch(usuario, (val) => {
  localStorage.setItem("userData", JSON.stringify(val));
}, { deep: true });

// ganhar pontos
export function ganharPontos(qtd) {
  usuario.value.pontos += qtd;
}

// gastar pontos
export function gastarPontos(qtd) {
  if (usuario.value.pontos >= qtd) {
    usuario.value.pontos -= qtd;
    return true;
  }
  return false; // pontos insuficientes
}
