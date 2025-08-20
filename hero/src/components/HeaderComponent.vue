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
                <p>Usuário demo</p>
                <p id="pontos">120 pontos</p>
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
    }
    header nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0 4rem;
        box-sizing: border-box;
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
        color: rgb(110, 109, 107);
        border-radius: 10px;
        text-align: center;
    }
   header nav ul li {
        list-style: none;
    }
    nav a:active,
    nav a:focus {
        color: rgb(24, 66, 36);
        background: #eff0f1;
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
        color: rgb(185, 181, 181);
        margin: 0 0 0.7vw 0;
    }
    .button-user:hover, .sidebar-button:hover {
         background-color: #f3f2f2;
         color: rgb(95, 93, 93);
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
    }
    #pontos {
        color: rgb(110, 109, 107);
    }
    button.exit-button {
        background-color: rgb(228, 225, 221);
        padding: 10px 15px;
        font-size: 1rem;
        margin: 0 0 0.7vw 0;
    }
</style>