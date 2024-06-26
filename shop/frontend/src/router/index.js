import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MypageView from '../mypage/MypageFirst.vue'
import CartView from '../order/CartView.vue'
import OrderView from '../order/OrderView.vue'

import AdminPage from '../views/AdminPage.vue'

import MypageSideVar from '../components/SideVar.vue'
import MypageOrderList from '../mypage/MypageOrderList.vue'
import MypageCancelList from '../mypage/MypageCancelList.vue'
import MypageWishList from '../mypage/MypageWishList.vue'
import MypageQnAList from '../mypage/MypageQnAList.vue'
import MypageReviewList from '../mypage/MypageReviewList.vue'


const routes = [
  {
    path: '/mypageReviewList',
    name: 'mypageReviewList',
    component: MypageReviewList
  },
  {
    path: '/mypageQnAList',
    name: 'mypageQnAList',
    component: MypageQnAList
  },
  {
    path: '/mypageWishList',
    name: 'mypageWishList',
    component: MypageWishList
  },
  {
    path: '/mypageCancelList',
    name: 'mypageCancelList',
    component: MypageCancelList
  },
  {
    path: '/mypageOrderList',
    name: 'mypageOrderList',
    component: MypageOrderList
  },
  {
    path: '/mypageSideVar',
    name: 'mypageSideVar',
    component: MypageSideVar
  },
  {
    path: '/mypage',
    name: 'mypage',
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
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage,
    meta: { isAdmin: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
