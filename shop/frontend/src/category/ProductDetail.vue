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
              <div>
                  <!-- <img src='../../public/images/item9.jpg'
                  class="d-block w-100"
                /> -->
                <div class="d-block w-100">
                  {{ productInfo.product_img }}
                </div>
                <!-- <img
                  :src="`/download/${productId}/${pimg.path}`"
                  class="d-block w-100"
                  alt="..."
                /> -->
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
              <h5 class="card-title">{{ productInfo.product_name }}</h5>
              <h5>
                <p class="card-text pt-3 pb-3">
                  <!-- {{ getCurrencyFormat(productDetail.product_price) }}원 -->
                  {{ getCurrencyFormat(productInfo.product_price) }} 원
                </p>
              </h5>
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
                        <br /><br />[color] <br />
                        <!-- {{
                          productDetail.product_color
                        }} -->
                        <br /><br />[Fabric] <br />
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
                        - 배송비 3,000원 (실구매금액 100,000원 이상 구매 시 무료
                        배송) <br /><br />
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
                </div>
              </div>
              <div class="row pt-3 pb-3">
                <div class="col-6">
                  <h3>총 상품 금액</h3>
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
                    @click="addCart"
                  >
                    ADD CART
                  </button>
                  <button
                    type="button"
                    class="btn btn-lg btn-outline-dark"
                    @click="addCart"
                  >
                    WISH LIST
                  </button>
                  <button
                    type="button"
                    class="btn btn-lg btn-outline-dark"
                    @click="addCart"
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <!-- <img src='../../public/images/blog1.jpg' class="img-fluid"
            style="width: 1000px"
          /> -->
          <div class="img-fluid" style="width: 1000px">{{ productInfo.product_detail_img }}</div>

          <!-- <img
            :src="`/download/${productId}/${productDetail.path}`"
            class="img-fluid"
            style="width: 1000px"
          /> -->
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import PageMixin from '../mixin.js';

export default{
  mixins : [PageMixin],

  data(){
  return {
      searchNo: "",
      productInfo: {},
      totalPrice: 0,
      total: 0,

  };
  },
  created () {
    this.searchNo = this.$route.query.no;
   this.proInfo();
  },
  methods :{
    async proInfo() {
    this.productInfo = (await axios.get(`/api/detail/${this.searchNo}`)).data[0];
    },
    getCurrencyFormat(value) {
      // 가격의 ,을 새겨주는 $currencyFormat 호출
      return this.$currencyFormat(value);
    },
      // 메소드 호출
    calculatePrice(cnt) {
      let total = this.total + cnt; // cnt를 받아 수량(total)을 나타냄 (total 초기값 = 0)
      if (total < 0) total = 0; // total이 0보다 작을 땐 total은 무조건 0
      this.total = total;
      this.totalPrice = this.productInfo.product_price * this.total; // totalPrice는 제품 가격 * 수량
    },
  }
      }
</script>
<style></style>
