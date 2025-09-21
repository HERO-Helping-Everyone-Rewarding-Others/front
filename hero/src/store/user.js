import { ref } from "vue";

export const usuario = ref({
  nome: "Usuário demo",
  pontos: 120,
  comunidades: [],
});
export const profileName = ref("");
export const profileBio = ref("");
export const profileAvatar = ref("");


export function ganharPontos(qtd) {
  if (!usuario.value.pontos) usuario.value.pontos = 0;
  usuario.value.pontos += qtd;
}

export function gastarPontos(qtd) {
  if (!usuario.value.pontos) usuario.value.pontos = 0;
  if (usuario.value.pontos >= qtd) {
    usuario.value.pontos -= qtd;
    return true;
  }
  return false;
}

export const pontosGanhos = ref(0)

export function adicionarPontosPost() {
  pontosGanhos.value += 20
}
