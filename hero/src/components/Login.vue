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
    background: linear-gradient(to bottom, #1b2353 0%, #942785 75%, #f6d365 100%);
    overflow: auto;
    display: flex;
    height: 100vh;
    color: rgb(245, 245, 245);
    padding: 5vw 8vw 5vw 8vw;
  }
  section .box1 .logo img {
    height: 4vw;
    width: auto;
  }
  .box1 .logo, h1 {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 2rem;
    gap: 10px;
    
  }
  .box1 h2 {
    font-weight: 700;
    font-size: 3rem;
    width: 70%;
    margin: 1vw 0;
    text-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  }
  .box1 p {
    width: 70%;
    font-weight: 500;
    font-size: 1.2rem;
  }
  .box1 ul {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 0;
  }
  .box1 ul li {
    list-style: none;
    border: 1px solid rgb(255, 255, 255);
    box-shadow: 1px 1px 10px 5px rgba(17, 17, 17, 0.2);
    width: auto;
    text-align: center;
    border-radius: 5vw;
    padding: 6px 20px 6px 20px;
    font-weight: 500;
  }
</style>

