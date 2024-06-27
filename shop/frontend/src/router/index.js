import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductCategory from '../category/ProductCategory.vue'
import ProductDetail from '../category/ProductDetail.vue'
import ProductSearch from '../category/ProductSearch.vue'
import CartView from '../order/CartView.vue'
import OrderView from '../order/OrderView.vue'
//관리자
import AdminPage from '../views/AdminPage.vue'

// 마이페이지
import MypageView from '../mypage/MypageFirst.vue'
import MypageSideVar from '../components/SideVar.vue'
import MypageOrderList from '../mypage/MypageOrderList.vue'
import MypageCancelList from '../mypage/MypageCancelList.vue'
import MypageWishList from '../mypage/MypageWishList.vue'
import MypageQnAList from '../mypage/MypageQnAList.vue'
import MypageReviewList from '../mypage/MypageReviewList.vue'
import NoticeList from '../mypage/NoticeList.vue'
import NoticeInfo from '../mypage/NoticeInfo.vue'
import MypageCartList from '../mypage/MypageCartList.vue'


import joinForm from '../user/joinForm.vue'

const routes = [
  {
    path: '/joinForm',
    name: 'joinForm',
    component: joinForm
  },
  {
    path: '/noticeInfo',
    name: 'noticeInfo',
    component: NoticeInfo
  },
  {
    path: '/noticeList',
    name: 'noticeList',
    component: NoticeList
  },
  {
    path: '/mypageCartList',
    name: 'mypageCartList',
    component: MypageCartList
  },
  {
    path: '/mypageReviewList',
    name: 'mypageReviewList',
    component: MypageReviewList
  },
  {
    path: '/category',
    name: 'ProductCategory',
    component: ProductCategory
  },
  {
    path: '/detail',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/search',
    name: 'ProductSearch',
    component: ProductSearch
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
