<script setup>
import { onMounted } from "vue"
import { usuario } from "../store/user"
import router from "@/router/"
import { useAuth } from "@/composables/auth"

const emit = defineEmits(['toggleMenu'])

const { user, accessToken, fetchUser, logout } = useAuth()

onMounted(() => {
    // Se já tem token salvo mas o user ainda não foi buscado
    if (accessToken.value && !user.value) {
        fetchUser().catch(() => { })
    }
})

const handleLogout = () => {
    logout()
    router.push("/login")
}

</script>

<template>
    <header>
        <nav>
            <button @click="$emit('toggleMenu')" class="button-sidebar"><font-awesome-icon
                        :icon="['fas', 'bars']" /></button>
            <h1>
                <img src="/logo-branca-icon.png" alt="logo" @click="router.push('/')" />
            </h1>

            <ul>
                <li><router-link to="/">Início</router-link></li>
                <li><router-link to="/comunidades">Comunidades</router-link></li>
                <li><router-link to="/loja">Loja</router-link></li>
            </ul>

            <div class="user">
                <div class="user-demo">
                    <p id="user-negrito">{{ (user && (user.nome || user.username)) || "Visitante" }}</p>
                    <p>{{ usuario.pontos }} pontos</p>
                </div>
                <router-link to="/profile" class="button-user">
                    <span><font-awesome-icon :icon="['far', 'user']" /></span>
                </router-link>
            </div>
            <button class="exit-button" @click="handleLogout">Sair</button>
        </nav>
    </header>
</template>

<style scoped>
header {
    box-shadow: 0 0 10px rgba(17, 17, 17, 0.8);
    width: 100%;
    font-size: 1rem;
    background: linear-gradient(to right, #1b2353 0%, #276394 55%, #1f9494 100%);
    color: wheat;
}

header nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5vw;
    padding: 0 4rem;
    box-sizing: border-box;
    color: rgb(255, 255, 255);
}

header img {
    height: 3vw;
    width: auto;
    margin:  1vw 6vw 0 2vw; 
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

nav ul li a:hover,
nav ul li a:focus,
li .router-link-exact-active {
    color: #113b74;
    background: rgb(250, 249, 246, 0.3);
}

button {
    background-color: transparent;
    border: none;
    border-radius: 10px;
}

.button-user,
.button-sidebar {
    font-size: 1.7rem;
    align-items: center;
    color: #ffffff;
    transition: 0.2s;
    text-align: center;
    padding: 5px 7px;
    border-radius: 10px;
    cursor: pointer;
}

.button-user {
    margin-top: 0.7vw;
}

.button-user:hover,
.button-sidebar:hover {
    color: #ffffff;
    background: rgb(250, 249, 246, 0.2);
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
    background: rgb(250, 249, 246, 0.3);
    padding: 10px 15px;
    font-size: 1rem;
    font-weight: 600;
    color: rgb(255, 255, 255);
    cursor: pointer;
    transition: 0.2s;
}

button.exit-button:hover {
    color: #ffffff;
    background: rgb(250, 249, 246, 0.5);
}
</style>
