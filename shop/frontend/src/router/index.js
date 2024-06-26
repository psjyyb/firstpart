import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MypageView from '../mypage/MypageFirst.vue'
import CartView from '../order/CartView.vue'
import OrderView from '../order/OrderView.vue'

import AdminPage from '../views/AdminPage.vue'

import MypageNoReview from '../components/MypageNoReview.vue'
import MypageYesReview from '../components/MypageYesReview.vue'
import MypageSideVar from '../components/SideVar.vue'
import MypageOrderList from '../mypage/MypageOrderList.vue'
import MypageCancelList from '../mypage/MypageCancelList.vue'
import MypageWishList from '../mypage/MypageWishList.vue'
import MypageQnAList from '../mypage/MypageQnAList.vue'
import MypageReviewList from '../mypage/MypageReviewList.vue'
import MypageLayout from '../mypageLayout/MypageLayout.vue'

import joinForm from '../user/joinForm.vue'

const routes = [
  {
    path: '/joinForm',
    name: 'joinForm',
    component: joinForm
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
  {
  path:'/mypageLayout',
  component:MypageLayout,
  children:[
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
      path: '/mypageNoReview',
      name: 'mypageNoReview',
      component: MypageNoReview
    },
    {
      path: '/mypageYesReview',
      name: 'mypageYesReview',
      component: MypageYesReview
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
  ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
