<template>
  <section id="foodies" class="my-5">
    <div class="container my-5 py-5">
      <div class="section-header d-md-flex justify-content-between align-items-center">
        <h2 class="display-3 fw-normal">Category Best</h2>
        <div class="mb-4 mb-md-0">
          <p class="m-0">
            <button class="filter-button me-4 active" 
            @click="filterProducts(null)" :cla>ALL</button>

            <button class="filter-button me-4" 
            @click="filterProducts(1)">사료</button>

            <button class="filter-button me-4" 
            @click="filterProducts(2)">간식</button>

            <button class="filter-button me-4" 
            @click="filterProducts(3)">건강관리</button>

            <button class="filter-button me-4" 
            @click="filterProducts(4)">배변용품</button>

            <button class="filter-button me-4" 
            @click="filterProducts(5)">장난감</button>

            <button class="filter-button me-4" 
            @click="filterProducts(6)">미용/목욕</button>

            <button class="filter-button me-4" 
            @click="filterProducts(7)">리빙</button>
          </p>
        </div>
      </div>
      <div ref="isotopeContainer" class="isotope-container row">
        <div class="item cat col-md-4 col-lg-3 my-4" :key="i" v-for="(product, i) in displayedProducts">
          <div class="card position-relative">
            <a @click="goToDetail(product.product_no)">
              <img :src="`/api/readproductImg/${product.product_img}`" class="img-fluid rounded-4" alt="image">
            </a>
            <div class="card-body p-0">
              <a @click="goToDetail(product.product_no)">
                <h3 class="card-title pt-4 m-0">{{ product.product_name }}</h3>
              </a>
              <div class="card-text">
              
                <h3 class="secondary-font text-primary">{{ getCurrencyFormat(product.product_price) }} 원</h3>
                <div class="d-flex flex-wrap mt-3">
                  <a class="btn-cart me-3 px-4 pt-3 pb-3">
                    <h5 class="text-uppercase m-0" @click="checkCart(product.product_no)" style="cursor: pointer">Add to Cart</h5>
                  </a>
                  <a class="btn-wishlist px-4 pt-3">
                    <iconify-icon icon="fluent:heart-28-filled" class="fs-5" @click="wishGo(product.product_no)" style="cursor: pointer"></iconify-icon>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- <section id="service"> -->
  
  </template>
  
  <script>
  import Isotope from 'isotope-layout';
  import axios from 'axios';
  import Swal from 'sweetalert2'
  import PageMixin from '../mixin.js';

  export default {
    mixins : [PageMixin],

    data() {
      return {
        bestAll: [],
        bestCategory: [],
        currentCategory: null,
      };
    },
    computed: {
      displayedProducts() {
        return this.currentCategory ? this.bestCategory : this.bestAll;
      },
      // 로그인된 회원 아이디
      account() {
        return this.$store.state.user.user_id;
      },
    },
    created() {
      this.filterProducts(null);
    },
    mounted() {
      this.initIsotope();
    },
    methods: {
      getCurrencyFormat(value) {
        return this.$currencyFormat(value);
        },
      initIsotope() {
        this.$nextTick(() => {
          this.isotope = new Isotope(this.$refs.isotopeContainer, {
            itemSelector: '.item',
            layoutMode: 'masonry',
          });
        });
      },
      async filterProducts(categoryNo) {
        this.currentCategory = categoryNo;
        if (categoryNo === null) {
          let response = await axios.get(`/api/category`);
          this.bestAll = response.data.best8;
          this.bestCategory = [];
        } else {
          let response = await axios.get(`/api/category/best/${categoryNo}`);
          this.bestCategory = response.data;
        }
        this.$nextTick(() => {
          this.isotope.arrange({ filter: '*' });
        });
      },
      goToDetail(no) {
      this.$router.push({ path: "/detail", query: { no: no } });
      },
      checkCart(pno) {
        axios.get(`/api/cart/check/${this.account}/${pno}`)
        .then(result => {
          if(result.data[0].cnt == 1) {
            alert('이미 장바구니에 담겨있는 상품입니다.');
          } else {
            this.cartGo(pno);
          }
        })
      },
      async wishGo(pno){
        await axios.post(`/api/mypage/mywishList/?pno=${pno}&id=${this.account}`)
        .then(result=>{console.log(result)
          if(result.data=='none'){
            Swal.fire('이미 찜한 상품입니다!')
          }else{
            Swal.fire('찜하기 성공!')
          }
        })
        .catch(err=>console.log(err))

      },
      cartGo(pno) {
        axios.post('/api/cart', 
        {
          user_id: this.account,
          product_no: pno
        }
        )
        .then(result => {
          Swal.fire({
            title: "<strong>장바구니에 상품이 담겼습니다.</strong>",
            icon: "success",
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: `
            <a href="/cart">
            <i class="fa fa-thumbs-up"></i> 장바구니로 이동
            </a>
            `,
          });
        })
      },
    },
  };
  </script>
  
  <style>
  /* Add your styles here */
  #foodies{
    height: 1200px;
  }
  .card-title{
    height: 124.83px;
    font-size: 25px;

  }
  </style>
  