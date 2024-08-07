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
import MypageReviewUpdate from '../mypage/MypageReviewUpdate.vue'
import MypageQnAInfo from '../mypage/MypageQnAInfo.vue'
import MypageQnAInsert from '../mypage/MypageQnAInsert.vue'
import MypageQnAUpdate from '../mypage/MypageQnAUpdate.vue'


import AdminProductPage from '../views/AdminProductPage.vue'
import AdminMemberPage from '../views/AdminMemberPage.vue'
import AdminOrderPage from '../views/AdminOrderPage.vue'
import AdminNoticePage from '../views/AdminNoticePage.vue'
import AdminQaPage from '../views/AdminQaPage.vue'


// 주문결제
import CartView from '../order/CartView.vue'
import OrderView from '../order/OrderView.vue'
import OrderDirectView from '../order/OrderDirectView.vue'
import OrderSuccessView from '../order/OrderSuccessView.vue'
import OrderDirectSuccessView from '../order/OrderDirectSuccessView.vue'


import ProductInsert from '../views/ProductInsert.vue'
import NoticeInsert from '../views/NoticeInsert.vue'
import InfoProduct from '../views/ProductInfo.vue'
import InsertAnser from '../views/AnserInsert.vue'
import InfoOrder from '../views/OrderInfo.vue'


import joinForm from '../user/joinForm.vue'
import loginForm from '../user/loginForm.vue'
import userCheck from '../user/userCheck.vue'
import FindId from '@/user/FindId.vue'
import FindPw  from '@/user/FindPw.vue'
import userInfo from '@/user/ModifyInfo.vue'
import userDelete from '@/user/userDelete.vue'
import setPassword from '@/user/changePw.vue'
const routes = [
  {
    path: '/setPassword',
    name: 'setPassword',
    component: setPassword
  },
  {
    path: '/userDelete',
    name: 'userDelete',
    component: userDelete
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: userInfo
  },
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
    path: '/mypageReviewUpdate',
    name: 'mypageReviewUpdate',
    component: MypageReviewUpdate
  },
  {
    path: '/mypageQnAUpdate',
    name: 'mypageQnAUpdate',
    component: MypageQnAUpdate
  },
  {
    path: '/mypageQnAInsert',
    name: 'mypageQnAInsert',
    component: MypageQnAInsert
  },
  {
    path: '/mypageQnAInfo',
    name: 'mypageQnAInfo',
    component: MypageQnAInfo
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
    path: '/order',
    name: 'order',
    component: OrderView
  },
  {
    path: '/orderDirect',
    name: 'orderDirect',
    component: OrderDirectView
  },
  {
    path: '/orderSuccess',
    name: 'orderSuccess',
    component: OrderSuccessView
  },
  {
    path: '/orderDirectSuccess',
    name: 'orderDirectSuccess',
    component: OrderDirectSuccessView
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
  {
    path: '/insertproduct',
    name: 'ProductInsert',
    component: ProductInsert
  },
  {
    path: '/insertnotice',
    name: 'NoticeInsert',
    component: NoticeInsert
  },
  {
    path: '/infoproduct',
    name: 'InfoProduct',
    component: InfoProduct
  },
  {
    path: '/insertanser',
    name: 'InsertAnser',
    component: InsertAnser
  },
  {
    path: '/orderinfo',
    name: 'InfoOrder',
    component: InfoOrder
  },
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
