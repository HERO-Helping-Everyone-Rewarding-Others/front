import { ref } from "vue"

export const savedPosts = ref([])

// garante que cada post é salvo individualmente pelo ID
export function toggleSave(post) {
  if (!post.id && !post._localUid) {
    post._localUid = `${Date.now()}.${Math.random().toString(36).slice(2, 8)}`
  }
  const uniqueId = post.id || post._localUid

  const index = savedPosts.value.findIndex(p => (p.id || p._localUid) === uniqueId)

  if (index >= 0) {
    savedPosts.value.splice(index, 1) // remover
  } else {
    savedPosts.value.push({ ...post }) // salvar cópia
  }
}

export function isSaved(post) {
  const uniqueId = post.id || post._localUid
  return savedPosts.value.some(p => (p.id || p._localUid) === uniqueId)
}
