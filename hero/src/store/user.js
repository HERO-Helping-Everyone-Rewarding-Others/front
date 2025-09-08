// src/store/user.js
import { ref } from "vue";

/*
  Nota: retiramos a persistência em localStorage para que as alterações de perfil
  (nome, bio, avatar) sejam apenas em memória — ou seja: persistem enquanto a SPA
  estiver aberta, mas ao dar F5 tudo volta ao estado vindo do backend.
*/

// dados "oficiais" do usuário (pontos etc.); estes são atualizados pelo backend via useAuth().fetchUser()
export const usuario = ref({
  nome: "Usuário demo",
  pontos: 120,
  comunidades: [], // se necessário
  // outros campos oficiais
});

// --- estado local/temporário (edições do perfil que NÃO são persistidas no backend) ---
export const profileName = ref("");    // nome alterado localmente (mostra entre páginas)
export const profileBio = ref("");     // biografia local
export const profileAvatar = ref("");  // dataURL ou caminho temporário da foto de perfil

// funções básicas de pontos (mantidas)
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
