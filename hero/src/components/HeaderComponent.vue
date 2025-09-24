<script setup>
import { onMounted, computed } from "vue"
import { usuario } from "../store/user"
import router from "@/router/"
import { useAuth } from "@/composables/auth"
import { profileName } from "../store/user"

  const displayName = computed(() => profileName.value || user.value?.nome || usuario.value.nome)


const emit = defineEmits(['toggleMenu'])

const { user, accessToken, fetchUser, logout } = useAuth()

onMounted(() => {
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
                    <p id="user-negrito">{{ displayName }}</p>
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
    margin: 1vw 6vw 0 2vw;
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
    padding: 10px 15px;
    text-decoration: none;
    border-radius: 10px;
    text-align: center;
    color: rgb(238, 237, 236);
    transition: 0.2s;
    font-weight: 600;
}

header nav ul li {
    list-style: none;
}

nav ul li a:hover,
nav ul li a:focus,
li .router-link-exact-active {
    color: rgb(255, 255, 255);
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

@media (max-width: 1400px) {
    header {
        font-size: 0.8rem;
    }

    header nav ul li a {
        padding: 8px 18px;
    }

    button.exit-button {
        padding: 6px 12px;
    }

    .button-user,
    .button-sidebar {
        font-size: 1.4rem;
    }
}

@media (max-width: 950px) {
    header {
        font-size: 0.8rem;
    }

    header nav ul li a {
        padding: 8px 18px;
    }

    button.exit-button {
        padding: 6px 12px;
    }

    .button-user,
    .button-sidebar {
        font-size: 1.2rem;
    }

    button.exit-button {
        padding: 5px 13px;
        font-size: 0.9rem;
    }

    .user-demo {
        display: none;
    }

    header nav ul {
        gap: 20px;
    }

    header nav ul li a {
        padding: 0.6vw 1.1vw;
    }
}

@media (max-width: 750px) {
    header {
        font-size: 0.7rem;
    }

    button.exit-button {
        padding: 6px 12px;
    }

    .button-user,
    .button-sidebar {
        font-size: 1rem;
    }

    button.exit-button {
        padding: 3px 10px;
        font-size: 0.8rem;
    }

    header nav ul {
        gap: 20px;
    }

    header nav ul li a {
        padding: 0.6vw 1.1vw;
    }
}

@media (max-width: 550px) {
    header {
        padding-top: 1vw;
        height: 6vw;
    }

    button.exit-button {
        padding: 5px 12px;
    }

    .button-sidebar {
        font-size: 1rem;
    }

    .button-user {
        display: none;
    }

    button.exit-button {
        padding: 3px 10px;
        font-size: 0.8rem;
    }

    header nav ul li a {
        padding: 0.5vw 1.2vw;
    }
}

@media (max-width: 500px) {
    header {
        padding: 6vw 0 0 0;
        height: 12vw;
    }

    header nav {
        padding: 0 3vw;
    }

    header nav ul {
        display: block;
        text-align: center;
    }
}
</style>
