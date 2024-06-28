<template>
  <header>
    <div class="container py-2">
      <div class="row py-4 pb-0 pb-sm-4 align-items-center">

        <div class="col-sm-4 col-lg-3 text-center text-sm-start">
          <div class="main-logo">
            <a href="/">
              <img src="images/logo.png" alt="logo" class="img-fluid">
            </a>
          </div>
        </div>

        <div class="col-sm-6 offset-sm-2 offset-md-0 col-lg-5 d-none d-lg-block">
          <div class="search-bar border rounded-2 px-3 border-dark-subtle">
            <form id="search-form" class="text-center d-flex align-items-center" action="" method="">
              <input type="text" class="form-control border-0 bg-transparent"
                placeholder="Search for more than 10,000 products" />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z" />
              </svg>
            </form>
          </div>
        </div>

        <div class="col-sm-8 col-lg-4 d-flex justify-content-end gap-5 align-items-center mt-4 mt-sm-0 justify-content-center justify-content-sm-end">
          <div class="d-none d-xl-block">
            <!-- 로그인 상태에 따라 로그아웃 또는 로그인 링크를 표시 -->
            <div class="support-box text-end">
      <a v-if="isLoggedIn" @click="handleLogout" class="nav-link">로그아웃</a>
      <router-link v-else to="/loginForm" class="nav-link">로그인</router-link>
    </div>
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
                <a class="nav-link" style="cursor:pointer;">{{ category.category_name }}</a>
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
                  <a href="wishlist.html" class="mx-3">
                    <iconify-icon icon="mdi:heart" class="fs-4"></iconify-icon>
                  </a>
                </li>

                <li class="">
                  <a href="/cart" class="mx-3" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                    <iconify-icon icon="mdi:cart" class="fs-4 position-relative"></iconify-icon>
                    <span class="position-absolute translate-middle badge rounded-circle bg-primary pt-2">
                      03
                    </span>
                  </a>
                </li>
                <li v-if="isLoggedIn">
                  <!-- 로그인 상태에 따라 공지사항 또는 다른 메뉴 표시 -->
                  <a href="noticeList" class="nav-link">공지사항</a>
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
import { mapGetters, mapActions } from 'vuex';
import axios from "axios";

export default {
  data() {
    return {
      categoryList: [],
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn']),

  },
  methods: {
    ...mapActions(['logoutUser']),
    async handleLogout() {
      try {
        await this.logoutUser();
        alert('로그아웃되었습니다.');
        this.$router.push({ name: 'home' });
      } catch (error) {
        console.error('로그아웃 오류:', error);
        alert('로그아웃 중 오류가 발생했습니다.');
      }
    },
  
    async getCategoryList() {
      try {
        let result = await axios.get(`/api/category`);
        this.categoryList = result.data;
      } catch (error) {
        console.error("Error fetching category list:", error);
      }
    },
    goToCategory(no) {
      this.$router.push({ path: "/category", query: { no: no } });
    },
  },
  created() {
    this.getCategoryList();
  },
};
</script>
