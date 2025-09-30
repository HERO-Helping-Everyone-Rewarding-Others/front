import { computed } from "vue";
import { posts } from "@/store/posts";


// redireciona os posts de uma comunidade específica (não mexer)
export function usePosts() {
  const postsDaComunidade = (nomeComunidade) => {
    return computed(() =>
      posts.value.filter((p) => p.comunidade === nomeComunidade)
    );
  };

  const totalPosts = computed(() => posts.value.length);

  return { postsDaComunidade, totalPosts };
}
