<template>
  <section id="foodies" class="my-5">
    <div class="container my-5 py-5">
      <div class="section-header d-md-flex justify-content-between align-items-center">
        <h2 class="display-3 fw-normal">Category Best</h2>
        <div class="mb-4 mb-md-0">
          <p class="m-0">
            <button class="filter-button me-4 active" @click="filterProducts(null)">ALL</button>
            <button class="filter-button me-4" @click="filterProducts(1)">사료</button>
            <button class="filter-button me-4" @click="filterProducts(2)">간식</button>
            <button class="filter-button me-4" @click="filterProducts(3)">건강관리</button>
            <button class="filter-button me-4" @click="filterProducts(4)">배변용품</button>
            <button class="filter-button me-4" @click="filterProducts(5)">장난감</button>
            <button class="filter-button me-4" @click="filterProducts(6)">미용/목욕</button>
            <button class="filter-button me-4" @click="filterProducts(7)">리빙</button>
          </p>
        </div>
      </div>
      <div ref="isotopeContainer" class="isotope-container row">
        <div class="item cat col-md-4 col-lg-3 my-4" :key="i" v-for="(product, i) in displayedProducts">
          <div class="card position-relative">
            <a href="single-product.html">
              <!-- <img :src="product.product_img" class="img-fluid rounded-4" alt="image"> -->
              <img src="images/item2.jpg" class="img-fluid rounded-4" alt="image">

            </a>
            <div class="card-body p-0">
              <a href="single-product.html">
                <h3 class="card-title pt-4 m-0">{{ product.product_name }}</h3>
              </a>
              <div class="card-text">
                <span class="rating secondary-font">
                  <iconify-icon icon="clarity:star-solid" class="text-primary"></iconify-icon>
                  <iconify-icon icon="clarity:star-solid" class="text-primary"></iconify-icon>
                  <iconify-icon icon="clarity:star-solid" class="text-primary"></iconify-icon>
                  <iconify-icon icon="clarity:star-solid" class="text-primary"></iconify-icon>
                  <iconify-icon icon="clarity:star-solid" class="text-primary"></iconify-icon>
                  5.0
                </span>
                <h3 class="secondary-font text-primary">{{ product.product_price }}</h3>
                <div class="d-flex flex-wrap mt-3">
                  <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3">
                    <h5 class="text-uppercase m-0">Add to Cart</h5>
                  </a>
                  <a href="#" class="btn-wishlist px-4 pt-3">
                    <iconify-icon icon="fluent:heart-28-filled" class="fs-5"></iconify-icon>
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
  
  export default {
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
    },
    created() {
      this.filterProducts(null);
    },
    mounted() {
      this.initIsotope();
    },
    methods: {
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
    },
  };
  </script>
  
  <style>
  /* Add your styles here */
  #foodies{
    height: 1200px;
  }
  </style>
  