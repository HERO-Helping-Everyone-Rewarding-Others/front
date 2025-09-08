import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/auth'

import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import HomePage from '../pages/HomePage.vue'
import CommunitiesPage from '../pages/CommunitiesPage.vue'
import CommunityPage from '../pages/CommunityPage.vue'
import LojaPage from '../pages/LojaPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/comunidades', name: 'comunidades', component: CommunitiesPage, meta: { requiresAuth: true } },
  { path: '/comunidade/:nome', name: 'comunidade', component: CommunityPage, props: true, meta: { requiresAuth: true } },
  { path: '/loja', name: 'loja', component: LojaPage, meta: { requiresAuth: true } },
  { path: '/profile', name: 'profile', component: ProfilePage, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// === Guard global para autenticação ===
router.beforeEach(async (to, from, next) => {
  const { user, fetchUser, accessToken } = useAuth()

  // Tenta buscar o usuário se tiver token
  if (!user.value && accessToken.value) {
    await fetchUser()
  }

  // Se a rota precisa de login e não tem usuário logado, vai para login
  if (to.meta.requiresAuth && !user.value) {
    return next('/login')
  }

  // Redireciona usuário logado que tenta acessar login ou register
  if ((to.path === '/login' || to.path === '/register') && user.value) {
    return next('/')
  }

  next()
})

export default router
