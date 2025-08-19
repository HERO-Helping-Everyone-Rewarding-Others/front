<script>
import api from './services/axios';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import PostForm from './components/PostForm.vue';
import PostList from './components/PostList.vue';
import Feed from './components/Feed.vue';
export default {
  components: {
    Login,
    Register,
    Feed,
    PostList,
    PostForm
  }
}

</script>

<template>


 <Login/>
 <Register/>
 <PostForm/>

 <PostList/>




</template>
<style scoped>
  template{
    display: ;
  }
</style>


