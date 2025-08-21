<script>
import api from './services/axios';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
export default {
  components: {
    Login,
    Register,
    HeaderComponent,
    FooterComponent
  }
}

</script>

<template>
 <body>


<Login />

 </body>

</template>


