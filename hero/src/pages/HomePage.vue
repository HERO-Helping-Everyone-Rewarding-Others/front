<script setup>
import FeedComponent from '../components/FeedComponent.vue'
</script>

<template>
  <main>
    <div class="welcome">
      <h1>Bem-vindo ao HERO</h1>
      <p>
        Junte-se a comunidades que fazem a diferença e seja recompensado por ajudar!
      </p>
      <ul>
        <li>
          <span class="mdi mdi-account-group-outline"></span>
          <p class="number">5</p>
          <p>Comunidades Ativas</p>
        </li>
        <li>
          <span class="hand"><font-awesome-icon :icon="['far', 'hand']"></font-awesome-icon></span>
          <p class="number">92</p>
          <p>Voluntários</p>
        </li>
        <li>
          <span class="mdi mdi-eye-outline"></span>
          <p class="number">3</p>
          <p>Ações Realizadas</p>
        </li>
      </ul>
    </div>
    <div class="feed-text">
      <h2>Feed de Atividades</h2>
    </div>
    <main class="feed">
      <FeedComponent />
    </main>

  </main>
</template>

<style scoped>
.welcome {
  text-align: center;
  margin: 3vw 0 5vw 0;
  grid-area: welcome;
}

.welcome h1 {
  font-size: 2.5rem;
  margin: 0;
}

.welcome p {
  font-size: 1.4rem;
  color: rgb(94, 94, 93);
  margin: 1vw 0;
}

.welcome ul {
  display: flex;
  justify-content: center;
  list-style: none;
  gap: 20px;
  margin-top: 3vw;
  padding: 0;
}

.welcome ul li {
  background: white;
  width: 20vw;
  border-radius: 20px;
  border: 1px solid rgb(218, 215, 215, 0.5);
  box-shadow: 0 2px 5px 1px rgb(204, 202, 202, 0.6);
  padding: 2.5vw 0;
}

.welcome li .number {
  font-weight: 700;
  font-size: 2rem;
  color: black;
  margin-top: 1.5vw;
}

.welcome li p {
  font-size: 1.1rem;
  margin: 0;
}

.welcome li span {
  border-radius: 100%;
  font-size: 1.4rem;
}

.mdi-account-group-outline {
  color: #066ccc;
  background: rgba(6, 108, 204, 0.2);
  padding: 13px 17px;
}

.hand {
  color: rgb(6, 187, 0);
  background: rgba(6, 187, 0, 0.2);
  padding: 14px 16px;
}

.mdi-eye-outline {
  color: rgb(177, 6, 177);
  background: rgba(177, 6, 177, 0.2);
  padding: 13px 17px;
}

.feed {
  display: flex;
  justify-content: center;
}

.feed-text h2 {
  margin-left: 15vw;
}
</style>
