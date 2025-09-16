import { computed } from "vue";
import { posts } from "@/store/posts";

export function usePosts() {
  // retorna os posts de uma comunidade específica
  const postsDaComunidade = (nomeComunidade) => {
    return computed(() =>
      posts.value.filter((p) => p.comunidade === nomeComunidade)
    );
  };

  const totalPosts = computed(() => posts.value.length);

  return { postsDaComunidade, totalPosts };
}
