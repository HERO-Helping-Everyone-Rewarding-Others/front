<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/auth'
const { login } = useAuth()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await login(email.value, password.value)
    alert('Login successful!')
  } catch (error) {
    alert('Login failed: ', error)
  }
}

</script>

<template>
<section>
    <div class="box1">
      <div class="logo">
        <img src="/he(1).png" alt="logo">
        <h1>HERO</h1>
      </div>
      <h2>Vamos Construir a partir daqui.</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus veniam vel ducimus provident explicabo, mollitia praesentium cupiditate et iusto. Non architecto eaque aliquid impedit facere ad dignissimos eum laudantium vel.</p>
      <ul>
        <li>
          Exemplo
        </li>
        <li>
          Exemplo
        </li>
        <li>
          Exemplo
        </li>
      </ul>
    </div>
    <div class="box2">
      <form @submit.prevent="handleLogin" >
        <label for="#">Nome de usuário</label>
        <input
          type="email"
          placeholder="user"
          v-model="email"
        />
        <label for="#">Senha</label>
        <input
          type="password"
          placeholder="password"
          v-model="password"
        />
        <button
          type="submit"
        >
          Logar
        </button>
      </form>
    </div>
</section>
</template>

<style scoped>
  section {
    background: linear-gradient(135deg, #1b2353 0, #942785 50%, #f6d365 100%);
    overflow: auto;
    display: flex;
    height: 100vh;
  }
  section .box1 .logo img {
    height: 70px;
    width: auto; 
  }
</style>

