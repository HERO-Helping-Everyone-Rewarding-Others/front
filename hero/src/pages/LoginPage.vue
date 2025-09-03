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
          type="submit" class="submit"
        >
          Entrar
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
  padding: 0 8vw 0 8vw;
  color: #f5f5f5;
  background: linear-gradient(to right bottom, #1b2353 0%, #276394 75%, #43a86a 100%);
  }
  .box1, .box2 {
    flex: 1; 
    margin-top: 5vw;
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
    font-weight: 700;
    font-size: 3rem;
    gap: 5px;
  }
  .box1 h2 {
    font-weight: 700;
    font-size: 3rem;
    margin: 0;
    text-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  }
  .box1 p {
    font-weight: 600;
    margin-top: 1vw;
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
    border: 1px solid rgba(177, 175, 175, 0.377);
    box-shadow: 1px 1px 5px 2px rgba(177, 175, 175, 0.3);
    width: auto;
    text-align: center;
    border-radius: 5vw;
    padding: 7px 20px 7px 20px;
    font-weight: 600;
  }
  .box2 {
    background: rgba(255, 255, 255, 0.15);
    align-items: center;
    border-radius: 15px;
    border: 1px solid rgb(31, 30, 30, 0.3);
    box-shadow: 1px 1px 10px 5px rgba(17, 17, 17, 0.2);
    max-width: 40%;
    max-height: 75%;
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
    text-shadow: 2px 2px 5px rgba(0,0,0,0.2);
    font-size: 1.6rem;
  }
  form input {
    background: rgb(255, 255, 255, 0.3);
    color: rgb(243, 243, 243);
    border-radius: 25px;
    border: 1px solid rgb(204, 198, 198);
    box-shadow: 0 0 10px rgba(150, 148, 148, 0.5);
    padding: 20px;
    margin-bottom: 1.5vw;
    transition: 0.2s;
    font-size: 1.3rem;
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
    font-size: 1.2rem;
  }
  form button.submit {
    background: linear-gradient(135deg, #1720a1, #54cada);
    padding: 0.75vw 1.6vw;
    font-size: 1.2rem;
    margin: 0 0 1vw 0;
    border-radius: 25px;
    border: none;
    color: rgb(228, 225, 225);
    font-weight: 700;
    transition: 0.2s; 
    cursor: pointer;
  }
  .password-field {
    position: relative;
    width: 70%;
  }
  .password-field .mdi {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    color: #ffffff;
  }
  .password-field input {
    width: 100%;
    height: 100%;
  }
  .register {
    text-align: center;
    margin: 2vw auto 0 auto;
    padding-top: 2vw;
    width: 70%;
    border-top: 1px solid rgba(255, 255, 255, 0.4);
    }
  .register p {
    font-weight: 600;
    font-size: 1.2rem;
    margin-bottom: 1.5vw;
    text-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  }
  .register a {
    text-decoration: none;
    color: rgb(228, 225, 225);
    border-radius: 25px;
    font-weight: 700;
    transition: 0.2s;
    padding: 0.7vw 1.3vw 0.7vw 1.3vw;
    background: linear-gradient(135deg, #1720a1, #54cada);
  }
  .register a:hover,
  .box2 button:hover {
    color: #ffffff;
  }
  @media (max-width: 1400px) {
  section {
  padding: 0 5vw;
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