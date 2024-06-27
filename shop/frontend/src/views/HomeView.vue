<template>
    <Banner />
    <Categories />
    <Etc />
</template>

<script>
import Banner from '@/components/Banner.vue'
import Categories from '@/components/Categories.vue'
import Etc from '@/components/Etc.vue'

export default {
  name: 'HomeView',
  components: {
    Banner,Categories,Etc
  },
 
}
</script>
<style>
@import url('../assets/css/vendor.css');
@import url('../assets/css/style.css');
</style>
