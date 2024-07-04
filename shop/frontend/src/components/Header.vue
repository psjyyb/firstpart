<template>
  <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasCart" aria-labelledby="My Cart">
      <div class="offcanvas-header justify-content-center">
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="order-md-last">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Your cart</span>
            <span class="badge bg-primary rounded-circle pt-2">3</span>
          </h4>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 class="my-0">Grey Hoodie</h6>
                <small class="text-body-secondary">Brief description</small>
              </div>
              <span class="text-body-secondary">$12</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 class="my-0">Dog Food</h6>
                <small class="text-body-secondary">Brief description</small>
              </div>
              <span class="text-body-secondary">$8</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 class="my-0">Soft Toy</h6>
                <small class="text-body-secondary">Brief description</small>
              </div>
              <span class="text-body-secondary">$5</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span class="fw-bold">Total (USD)</span>
              <strong>$20</strong>
            </li>
          </ul>
  
          <button class="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
        </div>
      </div>
    </div>
    <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasSearch"
      aria-labelledby="Search">
      <div class="offcanvas-header justify-content-center">
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
  
        <div class="order-md-last">
          <h4 class="text-primary text-uppercase mb-3">
            Search
          </h4>
          <div class="search-bar border rounded-2 border-dark-subtle">
            <form id="search-form" class="text-center d-flex align-items-center" action="" method="">
              <input type="text" class="form-control border-0 bg-transparent" placeholder="Search Here" />
              <iconify-icon icon="tabler:search" class="fs-4 me-3"></iconify-icon>
            </form>
          </div>
        </div>
      </div>
    </div>
      <header>
      <div class="container py-2">
        <div class="row py-4 pb-0 pb-sm-4 align-items-center ">
          <div class="col-sm-4 col-lg-3 text-center text-sm-start">
            <div class="main-logo">
              <a href="/">
                <img src="images/logo.png" alt="logo" class="img-fluid">
              </a>
            </div>
          </div>
          <div class="col-sm-6 offset-sm-2 offset-md-0 col-lg-5 d-none d-lg-block">
            <div class="search-bar border rounded-2 px-3 border-dark-subtle">
              <!-- 써치 -->
              <form @submit.prevent id="search-form" class="text-center d-flex align-items-center" action="" method="">
                <input v-model="keyword" @keyup.enter="nameSearch(keyword)" type="text" class="form-control border-0 bg-transparent"
                  placeholder="Search for more than 10,000 products" />
                <svg @click="nameSearch(keyword)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z" />
                </svg>
              </form>
            </div>
          </div>
          <div class="col-sm-8 col-lg-4 d-flex justify-content-end gap-5 align-items-center mt-4 mt-sm-0 justify-content-center justify-content-sm-end">
            <div class="support-box text-end d-none d-xl-block">
              <a v-if="isLoggedIn" @click="handleLogout" class="nav-link">로그아웃</a>
              <router-link v-else to="/loginForm" class="nav-link">로그인</router-link>
            </div>
            <div class="support-box text-end d-none d-xl-block">
              <a href="/joinForm" class="nav-link">회원가입</a>
            </div>
          </div>
        </div>
      </div>
  
      <div class="container-fluid">
        <hr class="m-0">
      </div>
  
      <div class="container">
        <nav class="main-menu d-flex navbar navbar-expand-lg ">
          <div class="d-flex d-lg-none align-items-end mt-3">
            <ul class="d-flex justify-content-end list-unstyled m-0">
              <li>
                <a href="account.html" class="mx-3">
                  <iconify-icon icon="healthicons:person" class="fs-4"></iconify-icon>
                </a>
              </li>
              <li>
                <a href="wishlist.html" class="mx-3">
                  <iconify-icon icon="mdi:heart" class="fs-4"></iconify-icon>
                </a>
              </li>
              <li>
                <a href="#" class="mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart"
                  aria-controls="offcanvasCart">
                  <iconify-icon icon="mdi:cart" class="fs-4 position-relative"></iconify-icon>
                  <span class="position-absolute translate-middle badge rounded-circle bg-primary pt-2">
                    03
                  </span>
                </a>
              </li>
              <li>
                <a href="#" class="mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSearch"
                  aria-controls="offcanvasSearch">
                  <iconify-icon icon="tabler:search" class="fs-4"></iconify-icon>
                </a>
              </li>
            </ul>
          </div>
  
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
  
          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header justify-content-center">
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body justify-content-between">
              <ul class="navbar-nav menu-list list-unstyled d-flex gap-md-3 mb-0">
                <li class="nav-item" :key="i" v-for="(category, i) in categoryList" @click="goToCategory(category.category_no)">
                  <a class="nav-link" style="cursor:pointer;" @onclick="clickColor">{{ category.category_name }}</a>
                </li>
              </ul>
              <div class="d-none d-lg-flex align-items-end">
                <ul class="d-flex justify-content-end list-unstyled m-0">
                  <li>
                    <a href="/mypage" class="mx-3">
                      <iconify-icon icon="healthicons:person" class="fs-4"></iconify-icon>
                    </a>
                  </li>
                  <li>
                    <a href="/mypageWishList" class="mx-3">
                      <iconify-icon icon="mdi:heart" class="fs-4"></iconify-icon>
                    </a>
                  </li>
                  <li class="">
                    <a href="/cart" class="mx-3"  data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                      <iconify-icon icon="mdi:cart" class="fs-4 position-relative"></iconify-icon>
                    </a>
                  </li>
                  <li>
                    <!-- 여기 -->
                    <a href="noticeList" class="nav-link">공지사항</a>
                  </li>
                  <li>
                    <button type ="button"  @click="adminpage">
                      <iconify-icon icon="mdi-account-convert" class="fs-4"></iconify-icon>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  </template>
  
  <script>
  import axios from "axios";
  import { mapGetters, mapActions } from 'vuex';
  
  export default{
      data(){
        return {
        categoryList:[],
        keyword: this.$route.query.keyword,
      };
      },
      created () {
        this.getCategoryList();
      },
      computed: {
    ...mapGetters(['isLoggedIn']),
      },
      props:["isAdmin"],
      methods :{
        ...mapActions(['logoutUser']),
        adminpage(){
        },
        async getCategoryList() {
          let result = await axios.get(`/api/category`);
          this.categoryList = result.data.resultCategory;
          // this.bestAll = result.data.best8;
              },
        goToCategory(no) {
              this.$router.push({ path: "/category", query: { no: no } });
          },
        nameSearch(keyword){
          if (this.keyword !== ''){ 
            this.$router.push({ path: "/search", query: { keyword : this.keyword } });
          } else {
              alert('검색어를 입력해주세요!')  
          }
      },
      handleLogout() {
        this.logoutUser()
        .then(() => {
          // 로그아웃 성공 시 카카오 API로 인증된 세션도 해제
          Kakao.Auth.logout(function() {
            console.log('카카오 로그아웃 성공');
          });
          this.$router.push({ name: 'home' });
          alert('로그아웃되었습니다');
        })
        .catch(error => {
          console.error('Error logging out:', error);
        });
      },
      clickColor(){
        let items = document.querySelectorAll(".nav-item");
          btns.forEach(function (btn, i) {
          if (e.currentTarget == btn) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        });
        console.log(e.currentTarget);
      },
      }
  }
  </script>
  
  <style>
  button{
    border: none;
    background-color: white;
  }
  a:active {
  background-color: yellow;
  }
  </style>