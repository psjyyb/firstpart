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
                  <!-- <img :src="require(`../../../backend/upload/productImg/${productInfo.product_img}`)" class="img-fluid rounded-4" alt="image"> -->
                  <img :src="require(`../../../backend/upload/productImg/${productInfo.product_img}`)" class="sub" alt="image">
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
              <!-- <h5 class="card-title">{{ productDetail.product_name }}</h5> -->
              <h2 class="card-title">{{ productInfo.product_name }}</h2>
              <h3>
                <p class="card-text pt-3 pb-3">
                  <!-- {{ getCurrencyFormat(productDetail.product_price) }}원 -->
                  {{ getCurrencyFormat(productInfo.product_price) }} 원
                </p>
              </h3>
              <div class="card-text pb-3 mb-4">
                <div class="row">
                  <div class="col-auto">
                    <nav style="padding-left: 0px">
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
                        <!-- {{ productDetail.product_description }} -->
                        <br /><br />제조일 <br />
                        <!-- {{
                          productDetail.product_color
                        }} -->
                        <br /><br />유통기한 <br />
                        <!-- {{ productDetail.product_fabric}} -->
                        <br /><br />[Model] <br />
                        <!-- {{
                          productDetail.product_model
                        }} -->
                      </div>
                      <div
                        class="tab-pane fade pt-3"
                        style="white-space: pre-line"
                        id="nav-profile"
                        role="tabpanel"
                        aria-labelledby="nav-profile-tab"
                      >
                        <!-- {{ productDetail.product_sizeGuide }} <br /><br />제품 -->
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
                        type="text"
                        class="form-control"
                        style="width: 40px"
                        v-model="total"
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
                    <button
                      type="button"
                      class="btn btn-lg btn-outline-dark"
                      @click="cartGo"
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

                    <button
                      type="button"
                      class="btn btn-lg btn-outline-dark"
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
      <b-nav-item  active>상품 상세</b-nav-item>
      <b-nav-item @click="infoForm">상품리뷰</b-nav-item>
      <b-nav-item @click="qnaForm" >상품 QnA</b-nav-item>
    </b-nav>
    </div>

    <div class="row-detail">
        <div class="col-6">

          <div class="img-fluid">
            <!-- <img :src="require(`../../../backend/upload/productdetailimg/10276_web_detailView_1715071344956708.jpg`)" class="img-fluid rounded-4" alt="image"> -->
            <img :src="require(`../../../backend/upload/productdetailimg/${productInfo.product_detail_img}`)" class="img-fluid rounded-4" alt="image">
          </div>

        </div>
      </div>

      <ReviewList ref="child"></ReviewList>
    </div>
    <div>
      <ReviewQnA ref="qchild"></ReviewQnA>
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

  };
  },
  created () {
    this.searchNo = this.$route.query.no;
   this.proInfo();
  },
  methods :{
    async proInfo() {
      this.productInfo = (await axios.get(`/api/category/detail/${this.searchNo}`)).data[0];
      //console.log('여긴 인포',this.productInfo)
    },
    getCurrencyFormat(value) {
      return this.$currencyFormat(value);
    },
      // 메소드 호출
    calculatePrice(cnt) {
      let total = this.total + cnt; 
      if (total < 0) total = 0; 
      this.total = total;
      this.totalPrice = this.productInfo.product_price * this.total; 
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
    shareMessage() {
        if (!window.Kakao) return;
        let productImageElement  = $('.carousel-inner').find('img').attr('src');
        // let productImageUrl = productImageElement ? productImageElement.getAttribute('src') : '';
        
        window.Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: this.productInfo.product_name,
            description: `${this.productInfo.product_price} 원`,
            // <img :src="require(`../../../backend/upload/productImg/${productInfo.product_img}`)" class="img-fluid rounded-4" alt="image">
            // imageUrl: `http://localhost:8080/img/${this.productInfo.product_img}`,
            // `http://localhost:8080/img/9935_web_list_L1_1695271064438511.5aab711d.jpg`
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
      infoForm(){
        //console.log(this.productInfo.product_no,'여긴디테일')
        this.$refs.child.getData(this.productInfo.product_no)
      },
      qnaForm(){
        this.$refs.qchild.getData(this.productInfo.product_no)
      }
}
}
</script>
<style>
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
</style>
