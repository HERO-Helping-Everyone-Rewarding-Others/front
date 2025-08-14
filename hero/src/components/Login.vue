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
    async login() {
      const res = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('token', data.token)
        this.message = 'Login bem-sucedido!'
      } else {
        this.message = data.error
      }
    }
  }
}
</script>

<template>
  <div>
    <h2>Login</h2>
    <input v-model="username" placeholder="Usuário" />
    <input v-model="password" type="password" placeholder="Senha" />
    <button @click="login">Entrar</button>
    <p>{{ message }}</p>
  </div>
</template>

