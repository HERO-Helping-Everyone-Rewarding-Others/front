<script setup>
import { useRoute } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import SidebarCommunities from './components/SidebarCommunities.vue'
import { onMounted, onUnmounted, ref } from 'vue'

const route = useRoute()

const showMenu = ref(false)
const top = ref(false)
const scrollContainer = ref(null);

const scrollY = ref(0);
const scrollingUp = ref(false);
let lastScrollY = 0;

const handleScroll = () => {
  // seu código original
  scrollY.value = window.scrollY;
  scrollingUp.value = scrollY.value < lastScrollY;
  lastScrollY = scrollY.value;

  if (scrollContainer.value) {
    const { scrollTop, clientHeight, scrollHeight } = scrollContainer.value;
    if (scrollTop + clientHeight >= scrollHeight) {
      top.value = true
    }
  }
  if (scrollingUp.value && window.scrollY==0) {
    top.value = false
  }
};

// refs para detectar cliques dentro/fora
const sidebarRef = ref(null)
const headerRef = ref(null)

// fecha ao clicar fora (não fecha se clicar dentro da sidebar nem dentro do header)
const handleClickOutside = (e) => {
  if (!showMenu.value) return

  const clickedInsideSidebar = sidebarRef.value && sidebarRef.value.contains(e.target)
  // headerRef será um componente: usamos $el para obter o DOM root
  const clickedInsideHeader = headerRef.value && headerRef.value.$el && headerRef.value.$el.contains(e.target)

  if (!clickedInsideSidebar && !clickedInsideHeader) {
    showMenu.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="scrollContainer" @scroll="handleScroll">
    <!-- adicionamos ref no HeaderComponent -->
    <HeaderComponent
      ref="headerRef"
      v-if="route.name !== 'login' && route.name !== 'register'"
      @toggleMenu="showMenu = !showMenu"
    />
    <transition name="sidebar-transition">
      <!-- adicionamos ref no aside -->
      <aside
        class="sidebar"
        :class="top ? 'top' : ''"
        v-if="showMenu"
        ref="sidebarRef"
      >
        <SidebarCommunities @toggleMenu="showMenu = false"/>
      </aside>
    </transition>

    <RouterView />
    <FooterComponent v-if="route.name !== 'login' && route.name !== 'register'" />
  </div>
</template>


<style scoped>
.sidebar {
  position: fixed;
  top: 100px;
  left: 0;
  margin: 1vw 0 0 1vw;
  background: rgba(255, 255, 255);
  border: 2px solid rgb(167, 164, 164, 0.3);  
  box-shadow: 3px 3px 15px 1px rgba(121, 120, 120, 0.2);
  border-radius: 15px;
  transition: top 0.5s ease;

}

.top {
  top: 0;
}

.sidebar-transition-enter-active,
.sidebar-transition-leave-active {
  transition: transform 0.5s ease;
}

.sidebar-transition-enter-from,
.sidebar-transition-leave-to {
  opacity: 1;
  transform: translateX(-30vw);
}

@media (max-width: 1400px) {
  .sidebar {
  margin: 0 0 0 1vw;
  }
}
</style>
