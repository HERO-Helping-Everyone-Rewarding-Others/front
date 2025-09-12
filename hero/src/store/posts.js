import { ref } from "vue"

export const posts = ref([
  {
    usuario: "Maria Silva",
    comunidade: "Canil Amor Animal",
    pontos: 50,
    verificado: true,
    tempo: "13d",
    conteudo: "Resgatamos mais 3 cães hoje! Precisamos de ajuda para castração.",
    imagem: "https://static9.depositphotos.com/1594920/1087/i/450/depositphotos_10875445-stock-photo-cavalier-king-charles-spaniel-3.jpg",
    curtidas: 0,
    comentarios: 1,
    compartilhamentos: 1,
    comentariosLista: [
      { usuario: "João Santos", conteudo: "Posso ajudar com transporte!", tempo: "13d" }
    ]
  }
])


// aqui cria as comunidades para mostrar na pagina de comunidades
export const comunidades = ref([
  { nome: "Canil Amor Animal", descricao: "Resgate e adoção de cães." },
  { nome: "Animais carentes", descricao: "ajudando diferentes tipos de animais em situação de necessidade"}
])

// função para adicionar novo post
export function addPost(novoPost) {
  posts.value.unshift(novoPost) // adiciona no topo do feed
}

// função para adicionar nova comunidade
export function addCommunity(novaComunidade) {
  console.log(novaComunidade)
  comunidades.value.push({...novaComunidade})
}
