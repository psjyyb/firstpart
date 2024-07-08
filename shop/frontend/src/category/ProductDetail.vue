<template>
  <main class="mt-3">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
                <div class="d-block w-100">
                  <img :src="`/api/readproductImg/${productInfo.product_img}`" class="sub" alt="image">
                </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card border-0 text-start">
            <div class="card-body">
              <h2 class="card-title">{{ productInfo.product_name }}</h2>
              <h3>
                  <div class ="secondary-font text-primary">
                  {{ getCurrencyFormat(productInfo.product_price) }} 원
                  <br><br>
                </div>
                <h4>재고 : {{ productInfo.stock_cnt }}</h4>
              </h3>
              <div class="card-text pb-3 mb-4">
                <div class="row">
                  <div class="col-auto" >
                    <nav style="padding-left: 0px" class="ProductPage">
                      <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button
                          class="nav-link active text-body"
                          id="nav-home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-home"
                          type="button"
                          role="tab"
                          aria-controls="nav-home"
                          aria-selected="true"
                        >
                          상품 정보
                        </button>
                        <button
                          class="nav-link text-body"
                          id="nav-profile-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-profile"
                          type="button"
                          role="tab"
                          aria-controls="nav-profile"
                          aria-selected="false"
                        >
                          구매 가이드
                        </button>
                        <button
                          class="nav-link text-body"
                          id="nav-contact-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-contact"
                          type="button"
                          role="tab"
                          aria-controls="nav-contact"
                          aria-selected="false"
                        >
                          배송
                        </button>
                        
                        <button 
                        class="nav-link text-body"
                        data-bs-toggle="tab"
                          data-bs-target="#nav-contact"
                          type="button"
                          role="tab"
                        aria-selected="false"
                        @click="shareMessage">
                          카카오 공유
                        </button>
                      </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                      <div
                        class="tab-pane fade show active pt-3"
                        style="white-space: pre-line"
                        id="nav-home"
                        role="tabpanel"
                        aria-labelledby="nav-home-tab"
                      >
                        [제조일] 
                        <br />
                        {{ getDateFormat(productInfo.product_mfd)}}
                        <br /><br />
                        <div v-if="productInfo.category_no <4 ">
                            [유통기한] 
                            <br />
                            {{ getDateFormat(productInfo.product_exp)}}
                        </div>
                      </div>
                      <div
                        class="tab-pane fade pt-3"
                        style="white-space: pre-line"
                        id="nav-profile"
                        role="tabpanel"
                        aria-labelledby="nav-profile-tab"
                      >
                        측정에 따라 1-3cm 차이가 있을 수 있습니다.
                      </div>
                      <div
                        class="tab-pane fade pt-3"
                        id="nav-contact"
                        role="tabpanel"
                        aria-labelledby="nav-contact-tab"
                      >
                        - 선주문 후 거래처 입고를 통해 상품 발송을 도와드리고
                        있습니다. <br />(당일 20시 이전 주문 건, 거래처 입고 후
                        다음날 발송) <br /><br />
                        - 영업일 기준 3-7일 정도의 배송기간이 소요되며, 입고
                        지연 발생 시 개별적 연락 도와드리고 있습니다.
                        <br /><br />
                        
                        - 도서산간 및 제주지역은 별도의 추가 운임비가 발생할 수
                        있습니다. <br /><br />
                        - 다폼목 주문시 합배송을 원칙으로 합니다. <br />
                        (개별상품 지연기간이 7일 이상일 경우 부분 발송)
                        <br /><br />
                        - 상품 준비중부터는 취소 및 교환, 환불이 불가능합니다.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-text pb-3">
                <div class="row">
                  <div class="col-auto">
                    <label class="col-form-label">구매수량</label>
                  </div>
                  <div class="col-auto">
                    <div class="input-group" >
                      <span
                        class="input-group-text"
                        style="cursor: pointer"
                        @click="calculatePrice(-1)"
                        >-</span
                      >
                      <input
                        type="number"
                        class="form-control"
                        style="width: 40px"
                        v-model.number="total"
                        @change="calculatePrice(0)"
                        />
                      <span
                        class="input-group-text"
                        style="cursor: pointer"
                        @click="calculatePrice(1)"
                        >+</span
                      >
                    </div>
                  </div>
                  <div class="col-auto">
                    <label class="col-form-label">포인트 : {{ productInfo.product_point }}</label>
                  </div>
                </div>
              </div>
              <div class="row pt-3 pb-3">
                <div class="col-6">
                  <h3>
                  <i class="bi bi-currency-dollar"></i>
                    총 상품 금액</h3>
                </div>
                <div class="col-6" style="text-align: right">
                  <h3>{{ getCurrencyFormat(totalPrice) }} 원</h3>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="col-12 d-grid p-1">
                    <button  v-if="productInfo.stock_cnt > 0"
                      type="button"
                      class="btn btn-lg btn-outline-dark"
                      @click="checkCart"
                    >
                    <i class="bi-basket3"></i>
                      ADD CART
                    </button>

                    <button
                      type="button"
                      class="btn btn-lg btn-outline-dark"
                      @click="wishGo"
                    >
                    <i class="bi-suit-heart" ></i>
                      WISH LIST
                    </button>

                    <button  v-if="productInfo.stock_cnt > 0"
                      type="button"
                      class="btn btn-lg btn-outline-dark"
                      @click="goOrderDirect"
                    >
                    <i class="bi-cart3"></i>
                      BUY NOW
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="fontSize">
    <b-nav tabs align="center" >
      <b-nav-item @click.prevent="noneAll">상품 상세</b-nav-item>
      <b-nav-item @click.prevent="activateReviewTab">상품 리뷰</b-nav-item>
      <b-nav-item @click.prevent="activateQnATab">상품 QnA</b-nav-item>
    </b-nav>
    </div>
    <div>
      <ReviewList ref="child" v-if="isActiveReview"></ReviewList>
      <ReviewQnA ref="qchild" v-if="isActiveQnA"></ReviewQnA>
    </div>
    <div class="row-detail">
        <div class="col-6">
          <div class="img-fluid" v-if="isActiveDetail">
            <img :src="`/api/readproductdetailimg/${productInfo.product_detail_img}`" class="img-fluid rounded-4" alt="image">
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import PageMixin from '../mixin.js';
import Swal from 'sweetalert2'
import ReviewList from '../components/ProductReviewList.vue'
import ReviewQnA from '../components/ProductQnAList.vue'

export default{
  mixins : [PageMixin],
  components: {ReviewList,ReviewQnA},
  data(){
  return {
      searchNo: "",
      productInfo: {},
      totalPrice: 0,
      total: 0,
      emits: [],
      isActiveReview: false, // 리뷰 탭 활성화 상태
      isActiveQnA: false,    // Q&A 탭 활성화 상태
      isActiveDetail: true
  };
  },
  created () {
   this.searchNo = this.$route.query.no;
   console.log('fsdfsdf',this.$route.query.no)
   this.proInfo();
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods :{
    async proInfo() {
      this.productInfo = [];
      this.productInfo = (await axios.get(`/api/category/detail/${this.searchNo}`)).data[0];
    },
    getCurrencyFormat(value) {
      return this.$currencyFormat(value);
    },
    getDateFormat(date){
      return this.$dateFormat2(date);
    },
      calculatePrice(cnt) {
      let total = this.total + cnt;
      if (total < 0) total = 0;
      if (total > this.productInfo.stock_cnt) {
        this.total = this.productInfo.stock_cnt;
        Swal.fire('최대구매수량입니다');
      } else {
        this.total = total;
      }
      this.totalPrice = this.productInfo.product_price * this.total;
    },
    async wishGo(){
      await axios.post(`/api/mypage/mywishList/?pno=${this.$route.query.no}&id=${this.$store.getters.getUserInfo.user_id}`)
      .then(result=>{console.log(result)
        if(result.data=='none'){
          Swal.fire('이미 찜한 상품입니다!')
        }else{
          Swal.fire('찜하기 성공!')
        }
      })
      .catch(err=>console.log(err))

    },
    checkCart() {
      if(this.total == 0) {
        return alert('상품의 수량을 선택해주세요.');
      }
      axios.get(`/api/cart/check/${this.account}/${this.productInfo.product_no}`)
      .then(result => {
        if(result.data[0].cnt == 1) {
          alert('이미 장바구니에 담겨있는 상품입니다.');
        } else {
          this.cartGo();
        }
      })
    },
    cartGo() {
      axios.post('/api/cart', 
        {
          user_id: this.account,
          product_no: this.productInfo.product_no,
          cart_cnt: this.total
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
    goOrderDirect() {
      if(this.total == 0) {
        return alert('상품의 수량을 선택해주세요.');
      }
      this.$router.push({
        name: 'orderDirect', 
        state: {
          pno: this.productInfo.product_no,
          cnt: this.total
        }
      })
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
    shareMessage() {
        if (!window.Kakao) return;
        let productImageElement  = $('.carousel-inner').find('img').attr('src');
        window.Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: this.productInfo.product_name,
            description: `${this.productInfo.product_price} 원`,
            imageUrl: productImageElement,
            link: {
              mobileWebUrl: `http://localhost:8080/detail?no=${this.searchNo}`,
              webUrl: `http://localhost:8080/detail?no=${this.searchNo}`,
            },
          },
          buttons: [
            {
              title: '웹으로 보기',
              link: {
                mobileWebUrl: `http://localhost:8080/detail?no=${this.searchNo}`,
                webUrl: `http://localhost:8080/detail?no=${this.searchNo}`,
              },
            },
            {
              title: '앱으로 보기',
              link: {
                mobileWebUrl: `http://localhost:8080/detail?no=${this.searchNo}`,
                webUrl: `http://localhost:8080/detail?no=${this.searchNo}`,
              },
            },
          ],
        });
      },
      activateReviewTab() {
    this.isActiveReview = true;
    this.isActiveQnA = false;
    this.isActiveDetail =false;
    // 리뷰 탭이 활성화되었을 때 자식 컴포넌트에 데이터 전달
    this.$nextTick(() => {
  this.$refs.child.getData(this.productInfo.product_no);
});
  },
  activateQnATab() {
    this.isActiveQnA = true;
    this.isActiveReview = false;
    this.isActiveDetail =false;
    // Q&A 탭이 활성화되었을 때 자식 컴포넌트에 데이터 전달
    this.$nextTick(() => {
      this.$refs.qchild.getData(this.productInfo.product_no);
    });
  },
  noneAll(){
    this.isActiveDetail =true;
    this.isActiveReview = false;
    this.isActiveQnA = false;
  }
      // infoForm(){
      //   //console.log(this.productInfo.product_no,'여긴디테일')
      //   this.$refs.child.getData(this.productInfo.product_no)
      // },
      // qnaForm(){
      //   this.$refs.qchild.getData(this.productInfo.product_no)
      // }
}
}
</script>
<style>
[type=button]:not(:disabled){
  margin: 0;
}
.ProductPage .nav-tabs {
  --bs-nav-tabs-link-active-bg: #ffecc8;
  --bs-nav-tabs-link-active-border-color: #ff7f21 #ff7f21 #ff7f21;
  border-bottom: var(--bs-nav-tabs-border-width) solid #ff7f21
}
h4 {
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }

.swal2-title{
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.fontSize{
  font-size: 30px;
  margin: 50px;
}
.carousel {
    position: relative;
    margin-top: 100px;
}
.col-md-6{
  margin-top:100px;
}
.sub {
  width: 400px;
  height: 400px;
}

.col-6 {
    flex: 0 0 auto;
    width: 100%;
}
.secondary-font{
  font-size: 35px;
}
.card-title{
  font-weight: bold;
  font-size: 30px;
  line-height: 50px;
}
</style>
<style scoped>
.text-primary {
    --bs-text-opacity: 1;
    color: rgba(var(--bs-primary-rgb), var(--bs-text-opacity)) !important;
}
</style>
