import { ref, computed } from "vue";

export const novaComunidade = ref({
  nome: "",
  descricao: "",
  motivacao: "",
  maxMembros: 30,
  contato: "",
  doacoesInfo: "",
  tiposDoacoes: ""
});


export const userPosts = ref([]);
export const postsCount = computed(() => userPosts.value.length);

export function addPost(post) {
  userPosts.value.push(post);
}
