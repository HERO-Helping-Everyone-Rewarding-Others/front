import { ref } from "vue";

// Todas as comunidades disponíveis
export const todasComunidades = ref([
  { id: 1, nome: "Canil Amor Animal" },
  { id: 2, nome: "Horta Comunitária" },
  { id: 3, nome: "Educação Digital" },
  { id: 4, nome: "Biblioteca Comunitária" },
  { id: 5, nome: "Apoio aos Idosos" }
]);

// Comunidades que o usuário participa
export const minhasComunidades = ref([
  { id: 1, nome: "Canil Amor Animal" },
  { id: 2, nome: "Horta Comunitária" },
  { id: 3, nome: "Educação Digital" }
]);

// Função para verificar se usuário é dono da comunidade
export function ehDonoComunidade(usuario, comunidade) {
  return comunidade.criadorId === usuario.id;
}

// Função para entrar em uma comunidade
export function entrarComunidade(comunidade) {
  if (!minhasComunidades.value.find(c => c.id === comunidade.id)) {
    minhasComunidades.value.push(comunidade);
  }
}
