<script setup>
import { useRoute } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import SidebarCommunities from './components/SidebarCommunities.vue'
import { onMounted, ref } from 'vue'

const route = useRoute()

const showMenu = ref(false)
const top = ref(false)
const scrollContainer = ref(null);

const scrollY = ref(0);
const scrollingUp = ref(false);
let lastScrollY = 0;

const handleScroll = () => {
  scrollY.value = window.scrollY;
  scrollingUp.value = scrollY.value < lastScrollY;
  lastScrollY = scrollY.value;
      if (scrollContainer.value) {
        const { scrollTop, clientHeight, scrollHeight } = scrollContainer.value;
        if (scrollTop + clientHeight >= scrollHeight) {
          top.value = true
        }
      }
      if (scrollingUp.value) {
        top.value = false
      }
    };

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

</script>

<template>
  <div ref="scrollContainer" @scroll="handleScroll">
    <HeaderComponent v-if="route.name !== 'login' && route.name !== 'register'" @toggleMenu="showMenu=!showMenu"/>
    <transition name="sidebar-transition">
      <aside class="sidebar" :class="top ? 'top' : ''" v-if="showMenu">
        <SidebarCommunities />
      </aside>
    </transition>
    <RouterView />
    <FooterComponent v-if="route.name !== 'login' && route.name !== 'register'" />
  </div>
  
</template>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  margin: 1vw 0 0 1vw;
  background: rgba(255, 255, 255);
  border: 2px solid rgb(167, 164, 164, 0.3);  
  box-shadow: 3px 3px 15px 1px rgba(121, 120, 120, 0.2);
  border-radius: 15px;
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
  transform: translateX(-20vw);
}


</style>
