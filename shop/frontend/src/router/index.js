import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductCategory from '../category/ProductCategory.vue'
import ProductDetail from '../category/ProductDetail.vue'
import ProductSearch from '../category/ProductSearch.vue'
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
import MypageOrderInfo from '../mypage/MypageOrderInfo.vue'
import MypageCancelInfo from '../mypage/MypageCancelInfo.vue'
import MypageReviewInsert from '../mypage/MypageReviewInsert.vue'


import AdminProductPage from '../views/AdminProductPage.vue'
import AdminMemberPage from '../views/AdminMemberPage.vue'
import AdminOrderPage from '../views/AdminOrderPage.vue'
import AdminNoticePage from '../views/AdminNoticePage.vue'
import AdminQaPage from '../views/AdminQaPage.vue'

// 주문결제
import CartView from '../order/CartView.vue'
import OrderView from '../order/OrderView.vue'


import joinForm from '../user/joinForm.vue'
import loginForm from '../user/loginForm.vue'
import userCheck from '../user/userCheck.vue'
import FindId from '@/user/FindId.vue'
import FindPw from '@/user/FindPw.vue'
const routes = [
  {
    path: '/FindId',
    name: 'FindId',
    component: FindId
  },
  {
    path: '/FindPw',
    name: 'FindPw',
    component: FindPw
  },
  {
    path: '/userCheck',
    name: 'userCheck',
    component: userCheck
  },
  {
    path: '/loginForm',
    name: 'loginForm',
    component: loginForm
  },
  {
    path: '/joinForm',
    name: 'joinForm',
    component: joinForm
  },
  {
    path: '/mypageReviewInsert',
    name: 'mypageReviewInsert',
    component: MypageReviewInsert
  },
  {
    path: '/mypageWishList',
    name: 'mypageWishList',
    component: MypageWishList
  },
  {
    path: '/mypageQnAList',
    name: 'mypageQnAList',
    component: MypageQnAList
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
    path: '/mypageCancelInfo',
    name: 'mypageCancelInfo',
    component: MypageCancelInfo
  },
  {
    path: '/mypageOrderInfo',
    name: 'mypageOrderInfo',
    component: MypageOrderInfo
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
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage,
    meta: { isAdmin: true }
  },
  {
    path: '/adminproduct',
    name: 'AdminProductPage',
    component: AdminProductPage
  },
  {
    path: '/adminmember',
    name: 'AdminMemberPage',
    component: AdminMemberPage
  },
  {
    path: '/adminorder',
    name: 'AdminOrderPage',
    component: AdminOrderPage
  },
  {
    path: '/adminnotice',
    name: 'AdminNoticePage',
    component: AdminNoticePage
  },
  {
    path: '/adminqa',
    name: 'AdminQaPage',
    component: AdminQaPage
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
