<template>
  <div id="app">
    <component :is="headerComponent" :isAdmin="isAdmin" @change="change"/>
    <router-view :key="$route.fullPath"></router-view>
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
    },
    // changeRouter(value){
    //        console.log(value);
    //   this.$router.push('/');
      
    // }
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
  padding: 0% !important;
  
}

.result {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-weight: 300;
    width: 400px;
    padding: 10px;
    text-align: center;
    margin: 0 auto 10px auto;
    background: #eceef0;
    border-radius: 10px;
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
