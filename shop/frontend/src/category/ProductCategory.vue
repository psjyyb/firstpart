<template>
  <div class="container">
      <div>category</div>
      <div class="offcanvas-body justify-content-between">
          <select class="filter-categories border-0 mb-0 me-5">
              <option>정렬</option>
              <option>상품 판매순</option>
              <option>가격 높은순</option>
              <option>가격 낮은순</option>
          </select>
      </div>

      <div class="product-list">
          <!-- 상품1개 -->
          <div class="product-card" :key="i" v-for="(product, i) in productList" @click="goToDetail(product.product_no)">
              <div class="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                  New
              </div>
              <div class="card position-relative">
                  <a href="single-product.html"><img src="images/item1.jpg" class="img-fluid rounded-4" alt="image"></a>
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
          <!-- 상품1개 끝-->
          <div v-if="isLoading">Loading...</div>
          <div v-else v-observe-visibility="onVisibilityChanged">Load more...</div>
      </div>
      <!-- <div class="result" v-for="comment in comments" :key="comment.id">
    <div>{{ comment.email }}</div>
    <div>{{ comment.id }}</div> -->
  </div>
  <InfiniteLoading @infinite="load" />
</template>


<script>
import axios from "axios";

export default {
  components: {
},
    data() {
        return {
            productList: [],
        };
    },
    created() {
        this.getProductList();
    },
    methods: {
        async getProductList() {
            let result = await axios.get(`/api/category`);
            this.productList = result.data;
        },
        goToDetail(no) {
            this.$router.push({ path: "/detail", query: { no: no } });
        },
    },
}
</script>


<style>

.container {
    width: 100%;
}

.product-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.product-card {
    width: calc(25% - 10px);
    margin-bottom: 20px;
}

.product-card img {
    width: 100%;
    height: auto;
}

.product-card .card {
    position: relative;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .result {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-weight: 300;
    width: 400px;
    padding: 10px;
    text-align: center;
    margin: 0 auto 10px auto;
    background: #eceef0;
    border-radius: 10px;
  }
</style>
