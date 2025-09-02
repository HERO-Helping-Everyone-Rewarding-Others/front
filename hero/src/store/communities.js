import { ref } from "vue"

const comunidadesEntradas = ref([])

export function useCommunityState() {
  function entrouNaComunidade(nome) {
    return comunidadesEntradas.value.includes(nome)
  }

  function entrarNaComunidade(nome) {
    if (!comunidadesEntradas.value.includes(nome)) {
      comunidadesEntradas.value.push(nome)
    }
  }

  function adicionarComunidadeCriada(nome) {
    if (!comunidadesEntradas.value.includes(nome)) {
      comunidadesEntradas.value.push(nome)
    }
  }

  return { entrouNaComunidade, entrarNaComunidade, adicionarComunidadeCriada }
}
