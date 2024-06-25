import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MypageView from '../mypage/MypageFirst.vue'
import AdminPage from '../views/AdminPage.vue'

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
