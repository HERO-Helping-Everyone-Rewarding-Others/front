<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      message: ''
    }
  },
  methods: {
    async register() {
      const res = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      })
      const data = await res.json()
      if (res.ok) {
        this.message = 'Usuário criado! Token: ' + data.token
      } else {
        this.message = data.error
      }
    }
  }
}
</script>
<template>
  <div>
    <h2>Registrar</h2>
    <input v-model="username" placeholder="Usuário" />
    <input v-model="password" type="password" placeholder="Senha" />
    <button @click="register">Criar conta</button>
    <p>{{ message }}</p>
  </div>
</template>


