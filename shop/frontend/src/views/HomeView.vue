<template>
    <Banner />
    <Categories />
    <Clothing />
    <Etc />
</template>

<script>
import Banner from '@/components/Banner.vue'
import Categories from '@/components/Categories.vue'
import Clothing from '@/components/Clothing.vue'
import Etc from '@/components/Etc.vue'


export default {
  name: 'HomeView',
  components: {
    Banner,Categories,Clothing,Etc
  },
  // mounted() {
  //   // 외부 스크립트를 동적으로 로드
  //   const scripts = [
  //     "../js/jquery-1.11.0.min.js",
  //     "https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js",
  //     "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js",
  //     "../js/plugins.js",
  //     // "../assets/js/plugins.js",
  //     "../js/script.js",
  //     "https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
  //   ];

  //   scripts.forEach(src => {
  //     const script = document.createElement('script');
  //     script.src = src;
  //     script.async = false; // 순서 보장을 위해 async를 false로 설정
  //     document.body.appendChild(script);
  //   });
  // }
}
</script>

<style>
@import url('../assets/css/vendor.css');
@import url('../assets/css/style.css');
</style>
