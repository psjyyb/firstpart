import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductCategory from '../category/ProductCategory.vue'
import ProductDetail from '../category/ProductDetail.vue'
import DetailTest from '../category/DetailTest.vue'

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


import joinForm from '../user/joinForm.vue'

const routes = [
  {
    path: '/joinForm',
    name: 'joinForm',
    component: joinForm
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
{    path: '/test',
    name: 'test',
    component: DetailTest
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
