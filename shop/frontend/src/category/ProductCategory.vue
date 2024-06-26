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

        <div class=" swiper swiper-initialized swiper-horizen ">
        <div class="swiper-wrapper" id="swiper-wrapper-784e93d5962a7f8e" aria-live="polite">

            <!-- 상품1개 -->

          <div class="swiper-slide swiper-slide-active" role="group" aria-label="1 / 6" style="width: 211.5px; margin-right: 30px;"
          :key="i" v-for="(product, i) in productList" @click="goToDetail(product.product_no)">
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
                    5.0</span>

                  <h3 class="secondary-font text-primary">{{ product.product_price }}</h3>

                  <div class="d-flex flex-wrap mt-3">
                    <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3">
                      <h5 class="text-uppercase m-0">Add to Cart</h5>
                    </a>
                    <a href="#" class="btn-wishlist px-4 pt-3 ">
                      <iconify-icon icon="fluent:heart-28-filled" class="fs-5"></iconify-icon>
                    </a>
                  </div>


                </div>

              </div>
            </div>
          </div>
        <!-- 상품1개 끝-->


        </div>
      <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
    
    </div>

</div>


</template>
<script>
import axios from "axios";

export default {

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
<style></style>
