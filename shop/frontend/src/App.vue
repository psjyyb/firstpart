<template>
  <div id="app">
    <component :is="headerComponent" />
    <router-view></router-view>
    <component :is="footerComponent" />
  </div>
</template>

<script>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import AdminHeader from "./components/AdminHeader.vue"
import AdminFooter from "./components/AdminFooter.vue"


export default {
  components: { Header, Footer, AdminHeader, AdminFooter },
  computed: {
    headerComponent() {
      return this.$route.meta.isAdmin ? 'AdminHeader' : 'Header';
    },
    footerComponent() {
      return this.$route.meta.isAdmin ? 'AdminFooter' : 'Footer';
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
