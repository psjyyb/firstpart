import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// jQuery와 Isotope 임포트
// import InfiniteLoading from "v3-infinite-loading";
// import "v3-infinite-loading/lib/style.css"; //required if you're not going to override default slots


import $ from 'jquery'
import Isotope from 'isotope-layout'


// app.component('infinite-loading', InfiniteLoading)

// import InfiniteLoading from 'vue-infinite-loading';

// jQuery와 Isotope를 글로벌로 설정
window.$ = $
window.jQuery = $
window.Isotope = Isotope


// jQuery 플러그인으로 Isotope 추가
$.fn.isotope = function (options) {
    return new Isotope(this[0], options)
}

// component('InfiniteLoading', InfiniteLoading)
createApp(App).use(store).use(router).mount('#app')

window.Kakao.init("e440154fb509449508e887c15f543fe1");
