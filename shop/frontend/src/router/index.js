import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductCategory from '../category/ProductCategory.vue'
import ProductDetail from '../category/ProductDetail.vue'

//관리자
import AdminPage from '../views/AdminPage.vue'

// 마이페이지
import MypageView from '../mypage/MypageFirst.vue'
import MypageSideVar from '../components/SideVar.vue'
import MypageOrderList from '../mypage/MypageOrderList.vue'
import MypageCancelList from '../mypage/MypageCancelList.vue'


const routes = [
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
