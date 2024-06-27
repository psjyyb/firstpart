<template>
    <Header></Header>
    <SideVar></SideVar>
    
    <Footer></Footer>
</template>
<script>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import SideVar from '../components/SideVar.vue'
    export default{
    components: { Header, Footer,SideVar},
    data(){
     return {}; 
    },
    created(){
    },
    methods:{
    }
    }
</script>
<style scoped>
/* @import "startbootstrap-resume/dist/css/styles.css";
@import "bootstrap";
@import "bootstrap/dist/css/bootstrap.min.css";  */
</style>