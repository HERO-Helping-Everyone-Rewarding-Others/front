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
    curtidas: 2,
    comentarios: 1,
    compartilhamentos: 1,
    comentariosLista: [
      { usuario: "João Santos", conteudo: "Posso ajudar com transporte!", tempo: "13d" }
    ]
  }
])

// função para adicionar novo post
export function addPost(novoPost) {
  posts.value.unshift(novoPost) // adiciona no topo do feed
}
