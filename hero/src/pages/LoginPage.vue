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

const passwordTeste = ref('');
const showPassword = ref(false);
</script>

<template>
<section>
    <div class="box1">
      <div class="logo">
        <img src="/he(1).png" alt="logo">
        <h1>HERO</h1>
      </div>
      <h2>Seja o herói da sua comunidade!</h2>
      <p>No HERO, acreditamos que todo ato de bondade tem poder para transformar o mundo. Aqui, você encontra pessoas que compartilham da mesma vontade de ajudar e recebe reconhecimento por cada contribuição. Juntos, podemos provar que ser herói é um papel que cabe a todos nós!</p>
      <ul>
        <li>
          Crie uma comunidade
        </li>
        <li>
          Ajude o mundo
        </li>
        <li>
          Seja um herói
        </li>
      </ul>
    </div>
    <div class="box2">
      <form @submit.prevent="handleLogin" >
        <label for="user">Nome de usuário</label>
        <input
          id="user"
          type="email"
          placeholder="user"
          v-model="email"
        />
        <label for="password">Senha</label>
      <div class="password-field">
        <input
          id="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="password"
          v-model="password"
        />
          <span class="mdi" 
          :class="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click="showPassword = !showPassword">
          </span>
      </div>
        <button
          type="submit"
        >
          Login
        </button>
      </form>
      <div class="register">
       <p>
          Não possui uma conta?
        </p>
         <router-link to="register">
        Criar conta
      </router-link>
      </div>
    </div>
</section>
</template>

<style scoped>
  section {
  display: flex;
  height: 100vh;
  padding: 5vw 8vw;
  overflow: auto;
  color: #f5f5f5;
  background: linear-gradient(to right bottom, #1b2353 0%, #276394 75%, #43a86a 100%);
  }
  .box1, .box2 {
    flex: 1; 
  }
  .box1 {
    margin-right: 5vw;
  }
  section .box1 .logo img {
    height: 4vw;
  }
  .box1 .logo,
  .box1 h1 {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 2rem;
    gap: 10px;
  }
  .box1 h2 {
    font-weight: 700;
    font-size: 3rem;
    margin: 1vw 0;
    text-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  }
  .box1 p {
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
    border: 2px solid rgb(255, 255, 255, 0.3);
    box-shadow: 0 0 10px rgba(150, 148, 148, 0.5);
    width: auto;
    text-align: center;
    border-radius: 5vw;
    padding: 6px 20px 6px 20px;
    font-weight: 500;
  }
  .box2 {
    background: rgba(255, 255, 255, 0.15);
    align-items: center;
    border-radius: 15px;
    border: 2px solid rgb(31, 30, 30, 0.3);
    box-shadow: 1px 1px 10px 5px rgba(17, 17, 17, 0.2);
    max-width: 40%;
  }
 .box2 > *:not(.register) {
    padding: 2vw 0 0 4vw;
  }
  form label,
  form input {
    display: block;
    width: 70%;
    margin: 8px 0;
  }
  form label {
    font-weight: 600;
    text-shadow: 2px 2px 5px rgba(0,0,0,0.3);
    font-size: 1.5rem;
  }
  form input {
    background: rgb(255, 255, 255, 0.3);
    color: rgb(243, 243, 243);
    border-radius: 25px;
    border: 1px solid rgb(204, 198, 198);
    box-shadow: 0 0 10px rgba(150, 148, 148, 0.5);
    padding: 10px 15px;
    margin-bottom: 1.5vw;
    transition: 0.2s;
  } 
  form input:focus,
  form input:hover {
    outline: none;
    border-color: #ffffff;
    background: rgba(155, 147, 147, 0.2);
    color: white;
  }
  form input::placeholder {
    color: rgb(243, 243, 243);
  }
  form button {
    background: linear-gradient(135deg, #1c0c79, #54cada);
    padding: 0.6vw 1.5vw 0.5vw 1.5vw;
    font-size: 1rem;
    margin: 0 0 1vw 0;
    border-radius: 25px;
    border: none;
    color: rgb(247, 244, 244);
    font-weight: 700;
    transition: 0.2s; 
  }
  .password-field {
    position: relative;
    width: 70%;
  }
  .password-field .mdi {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    font-size: 1.2rem;
    color: #ffffff;
  }
  .password-field input {
    width: 100%;
  }
  .register {
    text-align: center;
    margin: 2vw auto 0 auto;
    padding-top: 2vw;
    width: 70%;
    border-top: 1px solid rgba(255, 255, 255, 0.4);
    }
  .register p {
    font-weight: 500;
    font-size: 1.1rem;
    margin-bottom: 1.5vw;
  }
  .register a {
    text-decoration: none;
    background: linear-gradient(90deg, #1c0c79, #54cada);
    color: rgb(247, 244, 244);
    padding: 0.7vw 1.3vw 0.7vw 1.3vw;
    border-radius: 25px;
    font-weight: 700;
    transition: 0.2s;
  }
  .register a:hover,
  .box2 button:hover {
    color: #b9b7b7;
  }
  @media (max-width: 1400px) {
  section {
  padding: 3vw 5vw;
  }
  .box1 h2 {
    font-size: 2.5rem;
  }
  .box1 p {
    font-size: 1.1rem;
  }
  .box1 ul li {
    font-size: 0.9rem;
  }
  .box2 label {
    font-size: 1.2rem;
  }
  }
</style>