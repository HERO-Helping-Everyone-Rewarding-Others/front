import { createRouter, createWebHistory } from 'vue-router'

// Importando as páginas
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import HomePage from '../pages/HomePage.vue'
import CommunitiesPage from '../pages/CommunitiesPage.vue'
import CommunityPage from '../pages/CommunityPage.vue'

// ⬇️ Importando a loja
import LojaPage from '../pages/LojaPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/comunidades', name: 'comunidades', component: CommunitiesPage },
  { path: '/comunidade/:nome', name: 'comunidade', component: CommunityPage, props: true },
  // ⬇️ Nova rota para a Loja
  { path: '/loja', name: 'loja', component: LojaPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
