<script setup>
</script>
<template>
<header>
 <nav>
    <div>
        <button class="sidebar-button">
            <span class="mdi mdi-view-headline"></span>
        </button>
    </div>
        <h1>
            <img src="/he(1).png" alt="logo" />
        </h1>   
        <ul>
            <li>
                <a href="#">Início</a>
            </li>
            <li>
                <a href="#">Comunidades</a>
            </li>
            <li>
                <a href="#">Loja</a>
            </li>
        </ul>
        <div class="user">
            <div class="user-demo">
                <p id="user-negrito">Usuário demo</p>
                <p>120 pontos</p>
            </div>
            <button class="button-user">
                <span class="mdi mdi-account-circle-outline user"></span>
            </button>
        </div>
        <button class="exit-button">Sair</button>
        </nav>
</header>
</template>

<style scoped>
    header {
        width: 100%;
        box-shadow: 0 5px 6px -4px rgba(17, 17, 17, 0.3);
        font-size: 1rem;
        height: 13%;
        background: linear-gradient(135deg, #f6d365 0, #942785 50%, #1b2353 100%);
        color: wheat;
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
        color: rgb(250, 249, 246);
        background:rgb(250, 249, 246, 0.2);
    }
    button {
        background-color: transparent;
        border: none;
        border-radius: 20%;
    }
    .button-user, .sidebar-button {
        font-size: 2rem;
        width: 4vw;
        height: 4vw;
        color: #faf9f6;
        margin: 0.7vw 0 0.7vw 0;
        transition: 0.2s;
    }
    .button-user:hover, .sidebar-button:hover {
         background-color: rgb(243, 242, 242, 0.5);
         color: #ffffff;
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
    }
    #user-negrito {
        font-weight: 600;
    }
    button.exit-button {
        background:rgb(250, 249, 246, 0.5);
        padding: 10px 15px;
        font-size: 1rem;
        margin: 0.7vw 0 0.7vw 0;
        color: #ffffff;
    }
</style>