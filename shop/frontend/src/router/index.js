import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MypageView from '../mypage/MypageFirst.vue'
import CartView from '../order/CartView.vue'
import WishListView from '../order/WishListView.vue'
import OrderView from '../order/OrderView.vue'


const routes = [
  {
    path: '/mypageView',
    name: 'mypageView',
    component: MypageView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/wish',
    name: 'wish',
    component: WishListView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
