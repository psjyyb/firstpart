<template>
    <div class="container">
        <div>Search result</div>
        <div class="offcanvas-body justify-content-between">
       상품갯수 :  {{ productCnt }}
      </div>
      <div class="offcanvas-body justify-content-between">
        <b-breadcrumb>
            <b-breadcrumb-item @click="newItem">신상품순</b-breadcrumb-item>
            <b-breadcrumb-item @click="nameItem">상품 이름순</b-breadcrumb-item>
            <b-breadcrumb-item @click="hotItem"><i class="bi-fire"></i>상품 판매순</b-breadcrumb-item>
            <b-breadcrumb-item @click="highItem"><i class="bi bi-file-arrow-up"></i>가격 높은순</b-breadcrumb-item>
            <b-breadcrumb-item @click="rowItem"><i class="bi bi-file-arrow-down"></i>가격 낮은순</b-breadcrumb-item>
        </b-breadcrumb>
      </div>
      <div class="product-list">
          <!-- 상품1개 -->
          <div class="product-card" :key="i" v-for="(product, i) in productList" >
              <div class="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
                  New
              </div>
              <div class="card position-relative">
                  <a href="single-product.html">
                    <img src="images/item13.jpg" class="img-fluid rounded-4" alt="image">
                  </a>
                  <div class="card-body p-0">
                      <a @click="goToDetail(product.product_no)" >
                          <h3 class="card-title pt-4 m-0">{{ product.product_name }}</h3>
                      </a>
                      <div class="card-text">
                          <h3 class="secondary-font text-primary">{{ product.product_price }}</h3>
                          <div class="d-flex flex-wrap mt-3">
                              <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3">
                                  <h5 class="text-uppercase m-0" @click="cartGo">Add to Cart</h5>
                              </a>
                              <a href="#" class="btn-wishlist px-4 pt-3">
                                  <iconify-icon icon="fluent:heart-28-filled" class="fs-5" @click="wishGo"></iconify-icon>
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Swal from 'sweetalert2'

export default{
    data(){
        return {
            keyword : {},
            productList: [],
            productCnt : 0,
        };
    },
    created () {
        this.keyword = this.$route.query.keyword;
        this.searchProductList();
    },
    watch: {
    '$route.query.keyword': {
      handler: 'searchProductList',
      immediate: true
    }
    },
    methods :{
        async searchProductList(){
            let result = await axios.get(`/api/category/search/${this.keyword}`);
            this.productList = result.data.products;
            this.productCnt = result.data.total;
        },
        goToDetail(no) {
            this.$router.push({ path: "/detail", query: { no: no } });
        },
        newItem(){
        (this.productList).sort((a,b)=>{
            return b.product_no-a.product_no});
        },
        hotItem(){
            (this.productList).sort((a,b)=>{
                return b.product_no-a.product_no});
        },
        nameItem(){
            (this.productList).sort((a,b)=>{   
            if(a.product_name>b.product_name)   return 1;
            else if(a.product_name==b.product_name) return 0;
            else return -1;
        });
        },
        highItem(){
            (this.productList).sort((a,b)=>{
                return b.product_price-a.product_price});
        },
        rowItem(){
            (this.productList).sort((a,b)=>{
                return a.product_price-b.product_price});
        },
        wishGo(){
        Swal.fire({
        position: "center",
        icon: "success",
        title: "Wish completed",
        showConfirmButton: false,
        timer: 1500
        });
        },
        cartGo(){
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
        },
    }
}
</script>
<style></style>
