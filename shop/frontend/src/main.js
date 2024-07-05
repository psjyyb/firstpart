import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue3 from 'bootstrap-vue-3';
import vuetify from './plugins/vuetify'
// jQuery와 Isotope 임포트

import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import $ from 'jquery'
import Isotope from 'isotope-layout'
import '@fortawesome/fontawesome-free/js/all.js'

import mixins from "./mixin.js";


// import 'v3-infinite-loading/lib/style.css';
import InfiniteScroll from 'vue-infinite-scroll';

// jQuery와 Isotope를 글로벌로 설정
window.$ = $
window.jQuery = $
window.Isotope = Isotope

// jQuery 플러그인으로 Isotope 추가
$.fn.isotope = function (options) {
    return new Isotope(this[0], options)
}



createApp(App).use(store).use(router).use(vuetify).use(BootstrapVue3).use(VueSweetalert2).use(InfiniteScroll).mount('#app')

// component('InfiniteLoading', InfiniteLoading)


window.Kakao.init("e440154fb509449508e887c15f543fe1");
