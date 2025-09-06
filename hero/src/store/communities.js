import { ref } from "vue"

const comunidadesEntradas = ref([])
const todasComunidades = ref([
  { id: 1, nome: "Canil Amor Animal"}
])

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
    if (!todasComunidades.value.some(c => c.nome === nome)) {
      todasComunidades.value.push({ id: Date.now(), nome })
    }
    if (!comunidadesEntradas.value.includes(nome)) {
      comunidadesEntradas.value.push(nome)
    }
  }

  return {
    entrouNaComunidade,
    entrarNaComunidade,
    adicionarComunidadeCriada,
    comunidadesEntradas,
    todasComunidades
  }
}
