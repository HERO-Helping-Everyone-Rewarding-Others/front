import { ref } from "vue"

export const posts = ref([
  {
    usuario: "Maria Silva",
    comunidade: "Canil Amor Animal",
    pontos: 50,
    verificado: true,
    tempo: "16:20",
    conteudo: "Resgatamos mais 3 cães hoje! Precisamos de ajuda para castração.",
    imagem: "https://static9.depositphotos.com/1594920/1087/i/450/depositphotos_10875445-stock-photo-cavalier-king-charles-spaniel-3.jpg",
    curtidas: 0,
    comentarios: 1,
    compartilhamentos: 1,
    comentariosLista: [
      { usuario: "João Santos", conteudo: "Posso ajudar com transporte!", tempo: "16:20" }
    ]
  }
])



export const comunidades = ref([
  { nome: "Canil Amor Animal", descricao: "Resgate e adoção de cães.", maxMembros:30}
])


export function addPost(novoPost) {
  posts.value.unshift(novoPost) // adiciona no topo do feed
}

// função para adicionar nova comunidade
export function addCommunity(novaComunidade) {
  comunidades.value.push(novaComunidade)
}
