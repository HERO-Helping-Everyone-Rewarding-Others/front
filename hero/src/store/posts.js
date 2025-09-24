import { ref, computed } from 'vue'

export const posts = ref([
  {
   usuarioId:1,
    usuario: 'Maria Silva',
    comunidade: 'Canil Amor Animal',
    bio:'Tentando ser uma pessoa melhor❤️',
    pontos: 50,
    comunidadess:1,
    postagens:1,
    verificado: true,
    tempo: '2025-09-14T00:51:55.144Z',
    conteudo: 'Resgatamos mais 3 cães hoje! Precisamos de ajuda para castração.',
    imagem:
      'https://static9.depositphotos.com/1594920/1087/i/450/depositphotos_10875445-stock-photo-cavalier-king-charles-spaniel-3.jpg',
    curtidas: 0,
    comentarios: 1,
    compartilhamentos: 1,
    comentariosLista: [
      { usuario: 'João Santos', conteudo: 'Posso ajudar com transporte!', tempo: '13d' },
    ],
  },
  {
   usuarioId:2,
    usuario: 'Pedro Oliveira',
    comunidade: 'Animais carentes',
    pontos: 30,
    postagens:1,
    comunidadess:1,
    verificado: true,
    bio:'Tentando ser uma pessoa melhor❤️',
    tempo: '2025-09-14T10:21:30.000Z',
    conteudo: 'Hoje conseguimos alimentar 3 gatos de rua❤️ ',
    imagem: 'https://cdn0.peritoanimal.com.br/pt/posts/1/7/3/o_que_os_gatos_de_rua_comem_23371_1_600.jpg',
    curtidas: 2,
    comentarios: 0,
    compartilhamentos: 1,
    comentariosLista: [],
  },

  {
   usuarioId:3,
    usuario: 'Ana Pereira',
    comunidade: 'Mãos Solidárias',
    pontos: 40,
    postagens:1,
    verificado: true,
    tempo: '2025-09-13T15:10:12.000Z',
    bio:'Tentando ser uma pessoa melhor❤️',
    conteudo: 'Organizamos a entrega de 50 cestas básicas esta semana.',
    imagem: 'https://s2-g1.glbimg.com/SInmB-nwOowUty1ps6TmdmJEuBQ=/0x0:877x470/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/I/p/qbF3BBQBeDtWV0iJL7Ag/cestas-basicas-doacao-alimentos-uberaba-23-07-2021.jpg',
    curtidas: 5,
    comunidadess:1,
    comentarios: 2,
    compartilhamentos: 1,
    comentariosLista: [
      { usuario: 'Carlos Lima', conteudo: 'Que incrível! Posso ajudar na próxima.', tempo: '2d' },
    ],
  },
  {
   usuarioId:4,
    usuario: 'Lucas Fernandes',
    comunidade: 'Mãos Solidárias',
    bio:'Tentando ser uma pessoa melhor❤️',
    pontos: 35,
    postagens:1,
    verificado: false,
    tempo: '2025-09-12T11:05:44.000Z',
    conteudo: 'Precisamos de voluntários para a arrecadação deste sábado!! Por favor quem poder venha nós ajuda🙏',
    imagem: '',
    curtidas: 3,
    comunidadess:1,
    comentarios: 0,
    compartilhamentos: 0,
    comentariosLista: [],
  },
  {
   usuarioId:5,
    usuario: 'Fernanda Costa',
    comunidade: 'Mãos Solidárias',
    pontos: 25,
    comunidadess:1,
    verificado: true,
    tempo: '2025-09-11T09:20:33.000Z',
    conteudo: 'Entrega de roupas para famílias carentes realizada com sucesso!',
    imagem: 'https://ifrs.edu.br/bento/wp-content/uploads/sites/13/2020/07/roupas.jpg',
    curtidas: 4,
    postagens:1,
    bio:'Tentando ser uma pessoa melhor❤️',
    comentarios: 1,
    compartilhamentos: 0,
    comentariosLista: [
      { usuario: 'Marcos Silva', conteudo: 'Parabéns pelo trabalho!', tempo: '1d' },
    ],
  },

  {
   usuarioId:6,
    usuario: 'Joana Ribeiro',
    comunidade: 'Educa Jovem',
    pontos: 20,
    postagens:1,
    comunidadess:1,
    bio:'Tentando ser uma pessoa melhor❤️',
    verificado: false,
    tempo: '2025-09-10T14:30:00.000Z',
    conteudo: 'Doações arrecadas na ultima semana, obrigada a todos os participantes🙏',
    imagem: 'https://files.adventistas.org/noticias/pt/2019/11/Materiais-escolares-arrecadados_edited.jpg',
    curtidas: 3,
    comentarios: 0,
    compartilhamentos: 0,
    comentariosLista: [],
  },
  {
   usuarioId:7,
    usuario: 'Thiago Souza',
    bio:'Tentando ser uma pessoa melhor❤️',
    comunidade: 'Educa Jovem',
    pontos: 15,
    postagens:1,
    verificado: true,
    tempo: '2025-09-09T16:45:12.000Z',
    conteudo: 'Sala organizada para a primeira aula especializada educação especial!',
    imagem: 'https://static.wixstatic.com/media/f6bff0_b5b51c681d114017b95955d768b97e2b~mv2.jpg/v1/fill/w_1000,h_563,al_c,q_85,usm_0.66_1.00_0.01/f6bff0_b5b51c681d114017b95955d768b97e2b~mv2.jpg',
    curtidas: 2,
    comentarios: 1,
    compartilhamentos: 0,
    comunidadess:1,
    comentariosLista: [
      { usuario: 'Lara Mendes', conteudo: 'Meus filhos adoraram!', tempo: '1d' },
    ],
  },

  {
   usuarioId:8,
   postagens:1,
    usuario: 'Roberta Lima',
    comunidade: 'Cuidadores do Futuro',
    pontos: 50,
    comunidadess:1,
    bio:'Tentando ser uma pessoa melhor❤️',
    verificado: true,
    tempo: '2025-09-08T10:00:00.000Z',
    conteudo: 'Visitamos um asilo e realizamos atividades de convivência com os idosos.',
    imagem: 'https://agazetarm.com.br/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-14-at-14.39.52.jpeg',
    curtidas: 6,
    comentarios: 2,
    compartilhamentos: 1,
    comentariosLista: [
      { usuario: 'Felipe Santos', conteudo: 'Parabéns pelo trabalho!', tempo: '1d' },
    ],
  },
])

// ==================
// Comunidades
// ==================
export const comunidades = ref([
  {
    nome: 'Canil Amor Animal',
    descricao: 'Resgate e adoção de cães.',
    motivacao: 'Promover a adoção responsável e reduzir o número de cães abandonados.',
    maxMembros: 300,
    lider: 'Norville Rogers',
    contato: 'canilamor@email.com / (11) 90000-0000',
    doacao: { pix: 'canilamor@pix.com', tipo: 'ração, remédios, doações em dinheiro' },
  },
  {
    nome: 'Animais carentes',
    descricao: 'Ajudando diferentes tipos de animais em situação de necessidade',
    motivacao: 'Apoiar animais em risco e garantir tratamento e acolhimento.',
    maxMembros: 400,
    lider: 'John Dolittle',
    contato: 'animaiscarentes@email.com / (21) 95555-0000',
    doacao: { pix: 'animaiscarentes@pix.com', tipo: 'ração, casinhas, doações em dinheiro' },
  },
  {
    nome: 'Mãos Solidárias',
    descricao:
      'Rede de voluntários para arrecadar e distribuir cestas básicas às famílias em vulnerabilidade social.',
    motivacao: 'Garantir alimentação digna para todos, principalmente em momentos de crise.',
    maxMembros: 500,
    lider: 'Bruce Wayne',
    contato: 'maossolidarias@email.com / (11) 98888-0000',
    doacao: {
      pix: 'maossolidarias@pix.com',
      tipo: 'alimentos, cestas básicas, doações em dinheiro',
    },
  },
  {
    nome: 'Educa Jovem',
    descricao:
      'Grupo comunitário que oferece reforço escolar e oficinas gratuitas para crianças e adolescentes.',
    motivacao:
      'Reduzir a evasão escolar e ampliar as oportunidades de aprendizado para jovens em situação de risco.',
    maxMembros: 300,
    lider: 'Antony Stark',
    contato: 'educajovem@email.com / (21) 98888-0000',
    doacao: { pix: 'educajovem@pix.com', tipo: 'materiais escolares, livros, doações em dinheiro' },
  },
  {
    nome: 'Cuidadores do Futuro',
    descricao:
      'Comunidade de apoio a idosos, oferecendo visitas, acompanhamento médico e atividades de convivência.',
    motivacao: 'Proporcionar carinho, dignidade e inclusão social para a terceira idade.',
    maxMembros: 200,
    lider: 'Francisco José Dias de Almeida',
    contato: 'cuidadoresfuturo@email.com / (31) 97777-0000',
    doacao: {
      pix: 'cuidadoresfuturo@pix.com',
      tipo: 'medicamentos, fraldas geriátricas, doações em dinheiro',
    },
  },
])

// contador reativo de comunidades
export const comunidadesCount = computed(() => comunidades.value.length)

// ==================
// Funções
// ==================
export function addPost(novoPost) {
  posts.value.unshift(novoPost) // adiciona no topo do feed
}

export function addCommunity(novaComunidade) {
  comunidades.value.push({ ...novaComunidade })
}
