import { ref } from "vue"

const comunidadesEntradas = ref([])

const todasComunidades = ref([
  {
    nome: 'Canil Amor Animal',
    descricao: 'Resgate e adoção de cães.',
    motivacao: 'Promover a adoção responsável e reduzir o número de cães abandonados.',
    maxMembros: 300,
    contato: 'canilamor@email.com / (11) 90000-0000',
    doacao: 'Rações, água, dinheiro',
  },
  {
    nome: 'Animais carentes',
    descricao: 'Ajudando diferentes tipos de animais em situação de necessidade',
    motivacao: 'Apoiar animais em risco e garantir tratamento e acolhimento.',
    maxMembros: 400,
    contato: 'animaiscarentes@email.com / (21) 95555-0000',
    doacao: 'Rações, água, dinheiro',
  },
  {
    nome: 'Mãos Solidárias',
    descricao:
      'Rede de voluntários para arrecadar e distribuir cestas básicas às famílias em vulnerabilidade social.',
    motivacao: 'Garantir alimentação digna para todos, principalmente em momentos de crise.',
    maxMembros: 500,
    contato: 'maossolidarias@email.com / (11) 98888-0000',
    doacao: 'Alimentos, água, dinheiro, produtos de higiene'
  },
  {
    nome: 'Educa Jovem',
    descricao:
      'Grupo comunitário que oferece reforço escolar e oficinas gratuitas para crianças e adolescentes.',
    motivacao:
      'Reduzir a evasão escolar e ampliar as oportunidades de aprendizado para jovens em situação de risco.',
    maxMembros: 300,
    contato: 'educajovem@email.com / (21) 98888-0000',
    doacao: 'Materiais escolares, dinheiro, voluntarios',
  },
  {
    nome: 'Cuidadores do Futuro',
    descricao:
      'Comunidade de apoio a idosos, oferecendo visitas, acompanhamento médico e atividades de convivência.',
    motivacao: 'Proporcionar carinho, dignidade e inclusão social para a terceira idade.',
    maxMembros: 200,
    contato: 'cuidadoresfuturo@email.com / (31) 97777-0000',
    doacao: 'Dinheiro, voluntarios, remedios',
  },
])

export function useCommunityState() {
  function entrouNaComunidade(nome) {
    return comunidadesEntradas.value.includes(nome)
  }

  function entrarNaComunidade(nome) {
    if (comunidadesEntradas.value.includes(nome)) {
      alert(`Você já é membro da comunidade "${nome}"!`)
      return
    }
    comunidadesEntradas.value.push(nome)
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
