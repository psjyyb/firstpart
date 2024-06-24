import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// jQuery 임포트
import $ from 'jquery';
window.$ = $;
window.jQuery = $;


// CSS 파일들 임포트
import './assets/css/style.css';
import './assets/css/vendor.css';
import './assets/css/normalize.css';

// JS 파일들 임포트
import '../public/assets/js/script.js';
// import './assets/js/script.js';
import '../public/assets/js/jquery-1.11.0.min.js';
// import './assets/js/jquery-1.11.0.min.js';
import '../public/assets/js/modernizr.js';
// import './assets/js/modernizr.js';
import '../public/assets/js/plugins.js';        //jquery 사용부분
// import './assets/js/plugins.js';        //jquery 사용부분




createApp(App).use(store).use(router).mount('#app')

