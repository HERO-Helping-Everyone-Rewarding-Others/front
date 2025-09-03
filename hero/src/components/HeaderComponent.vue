<script setup>
import { usuario } from '../store/user'
import { sidebar } from '../store/sidebar' 
import router from '@/router/'
</script>

<template>
<header>
 <nav>




    <h1>
        
            <img src="/he(1).png" alt="logo" @click="router.push('/')"/>
        
    </h1>


    <ul>
        <li>
          <router-link to="/">
            Início
          </router-link>
        </li>
        <li>
          <router-link to="/comunidades">
            Comunidades
          </router-link>
        </li>
       <li>
        <router-link to="/loja">
          Loja
        </router-link>
      </li>
    </ul>


    <div class="user">
        <div class="user-demo">
            <p id="user-negrito">{{ usuario.nome }}</p>
            <p>{{ usuario.pontos }} pontos</p>
        </div>
          <router-link to="login" class="button-user">
            <span class="mdi mdi-account-outline"></span>
          </router-link>
        </div>


    <button class="exit-button">Sair</button>
 </nav>
</header>
</template>

<style scoped>
   header {
    width: 100%;
    
    font-size: 1rem;
    background: linear-gradient(to right, #43a86a 0%, #276394 75%, #1b2353 100%);
    color: wheat;
    position: relative;  /* Necessário para o pseudo-elemento */
    margin-bottom: 5vw;
}

header::after {
    content: '';
    position: absolute;
    bottom: 0; /* Posiciona o pseudo-elemento na parte inferior */
    left: 0;
    width: 100%;
    height: 50px;  /* Altura do gradiente de transição */
    background: linear-gradient(to bottom, rgba(74, 187, 207, 0.171), rgb(253, 252, 252)); 
}

header nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 4rem;
    box-sizing: border-box;
    color: wheat;
}

header img {
    height: 40px;
    width: auto;
    margin: 0 7vw 0 2vw;
}

header nav ul {
    display: flex;
    justify-content: center;
    flex: 1;
    margin: 0;
    padding: 0;
    gap: 40px;
}

header nav ul li a {
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 10px;
    text-align: center;
    color: rgb(250, 249, 246);
    transition: 0.2s;
    font-weight: 600;
}

header nav ul li {
    list-style: none;
}

nav a:active,
nav a:hover,
nav a:focus {
    color: rgba(22, 74, 90, 1);
    background: rgb(250, 249, 246, 0.3);
}

button {
    background-color: transparent;
    border: none;
    border-radius: 20%;
}

.button-user, .sidebar-button {
    font-size: 2rem;
    width: 2.8vw;
    height: 2.9vw;
    color: #e6e5e2ff;
    margin: 0.7vw 0 0.7vw 0;
    transition: 0.2s;
    text-align: center;
    border-radius: 20%;
}

.button-user:hover, .sidebar-button:hover {
    background-color: rgb(243, 242, 242, 0.3);
    color: #ffffffff;
}

header nav div.user {
    display: flex;
    margin: 0 1vw;
}

header nav div.user div {
    text-align: right;
}

.user-demo {
    padding: 0.7vw 0.7vw 0 0;
}

.user-demo p {
    margin: 0;
    color: #faf9f6;
    font-weight: 600;
}

#user-negrito {
    font-weight: 700;
}

button.exit-button {
    background: rgb(250, 249, 246, 0.5);
    padding: 10px 15px;
    font-size: 1rem;
    font-weight: 500;
    margin: 0.7vw 0 0.7vw 0;
    color: #ffffff;
    transition: 0.2s;
}

button.exit-button:hover {
    color: rgba(22, 74, 90, 1);
}

</style>
