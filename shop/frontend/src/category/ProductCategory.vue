<template>
  <div class="container" >
    <div>category</div>
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
    <!-- <div class="product-list" v-infinite-scroll="loadMoreProducts" infinite-scroll-disabled="busy" infinite-scroll-distance="10" v-if="productList"> -->
      <div class="product-list" v-infinite-scroll="loadMoreProducts" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <!-- <div class="product-list" > -->
      <div class="product-card" :key="product.product_no" v-for="product in productList">
       <div class="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle">
          no. {{ product.product_no }}
        </div>
        <div class="card position-relative">
          <a @click="goToDetail(product.product_no)">
            <!-- <img :src="require(`../../../backend/upload/productImg/${product.product_img}`)" class="img-fluid rounded-4" alt="image"> -->
            <img :src="`/api/upload/productImg/${product.product_img}`" class="sub" alt="image">

          </a>
          <div class="card-body p-0">
            <a @click="goToDetail(product.product_no)">
              <h3 class="card-title pt-4 m-0">{{ product.product_name }}</h3>
            </a>
            <div class="card-text">
              <h3 class="secondary-font text-primary">{{ product.product_price }}</h3>
              <div class="d-flex flex-wrap mt-3">
                <a class="btn-cart me-3 px-4 pt-3 pb-3">
                  <h5 class="text-uppercase m-0" @click="checkCart(product.product_no)">Add to Cart</h5>
                </a>
                <a href="#" class="btn-wishlist px-4 pt-3">
                  <iconify-icon icon="fluent:heart-28-filled" class="fs-5" @click="wishGo"></iconify-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 상품1개 끝-->
      <div v-if="busy" class="text-center mt-3">
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'
// import InfiniteScroll from 'vue-infinite-scroll';

export default {
  data() {
    return {
      searchNo: "",
      productList: [],
      productCnt: 0,
      displayedProducts: [], 
      initialDisplayCount: 12,
      pno: 1,
      busy: false,  //true면 스크롤 안보임
      noMoreProducts: false,
      isLoading: false,
    };
  },
  computed: {
    // 로그인된 회원 아이디
    account() {
      return this.$store.state.user.user_id;
    },
  },
  created() {
    this.searchNo = this.$route.query.no;
    this.getProductList();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    async getProductList() {
      this.pno = 1;
      this.productList = [];
      this.displayedProducts = []; //새로 담김
      this.busy = false;
      this.noMoreProducts = false;
      this.initialDisplayCount = 12;
      this.searchNo = this.$route.query.no;
      await this.loadMoreProducts();
      this.isLoading = false;
    },
    async loadMoreProducts() {
      if (this.busy || this.noMoreProducts) return;
      this.busy = true;

    try {
      const response = await axios.get(`/api/category/${this.searchNo}`, {
        params: {
          pno: this.pno,
          perPage: 12,
        }
      });
      if (response.data.products.length) {
        this.displayedProducts.push(...response.data.products);
        this.productList.push(...response.data.products);
        this.productCnt = response.data.total;

        // 다음 페이지 여부 판단
        if (!response.data.hasNextPage) {
          this.noMoreProducts = true;
          } else {
            this.pno++;
          }
      } else {
        this.noMoreProducts = true;
      }
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    } finally {
      this.busy = false; 
    }
},

    async handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 50 && !this.isLoading) {
        this.page++;
        await this.loadMoreProducts();
      }
    },

    goToDetail(no) {
      this.$router.push({ path: "/detail", query: { no: no } });
    },
    newItem(){
      this.productList.sort((a,b)=>{
        return b.product_no - a.product_no;
      });
    },
    hotItem(){
      this.productList.sort((a,b)=>{
        return b.product_no - a.product_no;
      });
    },
    nameItem(){
      this.productList.sort((a,b)=>{
        if(a.product_name > b.product_name) return 1;
        else if(a.product_name == b.product_name) return 0;
        else return -1;
      });
    },
    highItem(){
      this.productList.sort((a,b)=>{
        return b.product_price - a.product_price;
      });
    },
    rowItem(){
      this.productList.sort((a,b)=>{
        return a.product_price - b.product_price;
      });
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
    cartGo(pno){
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
  }
}
</script>

<style>

.container {
    width: 100%;
}
.breadcrumb {
    display: inline-flex;
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
