<template>
  <header>
    <!-- Botão menu lateral -->
    <button class="sidebar-button">
      <span class="mdi mdi-view-headline"></span>
    </button>

    <!-- Logo -->
    <h1 class="logo">
      <img src="/he(1).png" alt="logo" />
    </h1>

    <!-- Menu de navegação -->
    <nav>
      <ul>
        <li><router-link to="/">Início</router-link></li>
        <li><router-link to="/comunidades">Comunidades</router-link></li>
        <li><router-link to="/loja">Loja</router-link></li>
      </ul>
    </nav>

    <!-- Usuário -->
    <div class="user">
      <div class="user-demo">
        <p>Usuário demo</p>
        <p id="pontos">120 pontos</p>
      </div>
      <router-link to="/login" class="button-user">
        <span class="mdi mdi-account-circle-outline"></span>
      </router-link>
    </div>

    <!-- Botão sair -->
    <button class="exit-button">Sair</button>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 80px;
  display: flex; /* 🔑 Deixa tudo lado a lado */
  align-items: center;
  justify-content: space-between; /* distribui */
  padding: 0 2rem;
  box-shadow: 0 5px 6px -4px rgba(17, 17, 17, 0.3);
  box-sizing: border-box;
  font-size: 1rem;
}

.logo img {
  height: 40px;
  width: auto;
}

/* Menu de navegação */
nav ul {
  display: flex;
  gap: 40px;
  margin: 0;
  padding: 0;
  list-style: none;
}

nav ul li a {
  padding: 10px 20px;
  text-decoration: none;
  color: rgb(110, 109, 107);
  border-radius: 10px;
}

nav a:active,
nav a:focus {
  color: rgb(24, 66, 36);
  background: #eff0f1;
}

/* Botões */
button,
.button-user {
  background: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

.button-user {
  color: rgb(185, 181, 181);
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-user:hover,
.sidebar-button:hover {
  background-color: #f3f2f2;
  border-radius: 50%;
  color: rgb(95, 93, 93);
}

.exit-button {
  background-color: rgb(228, 225, 221);
  padding: 10px 15px;
  font-size: 1rem;
  margin-left: 1rem;
}

/* Usuário */
.user {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-demo {
  text-align: right;
}

#pontos {
  color: rgb(110, 109, 107);
}
</style>
