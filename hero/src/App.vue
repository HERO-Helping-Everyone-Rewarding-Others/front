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
 <Login/>
 <Register/>
 <body>
<HeaderComponent/> 



 </body>
<FooterComponent/>

</template>
<style scoped>
  template{
    display: ;
  }
</style>


