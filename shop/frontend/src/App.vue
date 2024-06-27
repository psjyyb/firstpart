<template>
  <div id="app">
    <component :is="headerComponent" :isAdmin="isAdmin" @change="change"/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import AdminHeader from "./components/AdminHeader.vue"
import AdminFooter from "./components/AdminFooter.vue"
import { useRouter, useRoute } from 'vue-router'

export default {
  components: { Header, Footer, AdminHeader, AdminFooter },
  data(){
    return{
      isAdmin:false
    };
  },
  computed: {
    headerComponent() {
      return this.isAdmin ? 'AdminHeader' : 'Header';
    }
  },
  methods:{
    change(value){
      const router = useRouter();
      this.isAdmin=value;
      if(this.isAdmin){
      this.$router.push('/admin');
      }
      else{
        this.$router.push('/');
      }
    }
  }
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
