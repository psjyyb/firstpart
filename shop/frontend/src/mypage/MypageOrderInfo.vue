<template>
    <SideVar></SideVar>
    <div id="padd">
<h2 class="mb-5">주문상세</h2>
    <div class="resume-section-content">
        <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
            <div class="flex-grow-1">
                <p>주문일자 : {{getDateFormat(order.order_date)}} 주문번호 : {{ order.order_no }}</p>
                <div class="subheading mb-3">
                    <p v-if="order.order_status==1">주문 상태 : 결제완료</p>
                    <p v-if="order.order_status==2">주문 상태 : 상품준비중</p>
                    <p v-if="order.order_status==3">주문 상태 : 배송중</p>
                    <p v-if="order.order_status==4">주문 상태 : 배송완료</p>
                    <p v-if="order.order_status==5">주문 상태 : 구매확정</p>
                    <p v-if="order.order_status==6">주문 상태 : 취소요청</p>
                    <p v-if="order.order_status==7">주문 상태 : 취소완료</p>
                </div>
                <button type="button" class="btn btn-warning"  v-if="order.order_status==1">주문취소</button>
            </div>
        </div>
    </div>
    <div id="paddd">
        <table class="sc-gnmni8-1 eSpcfO">
            <colgroup><col width="600"><col width=""></colgroup>
            <tbody class="sc-gnmni8-2 hryMPB">
                <tr v-for="order in orders">
        <td class="sc-gnmni8-5 hUzAOG"><div class="sc-ki5ja7-0 bQVZKC">
             <hr />
        </div>
        <div class="sc-fe2r96-0 hmCrGF"></div>
        <div class="sc-1jiyjbz-0 dGiGeF">
            <div class="sc-gnmni8-9 kCcQTc">
                <div class="sc-g8964r-0 oRzGt"></div>
                <div class="sc-9cwg9-1 gLgexz">
                    <div class="sc-9cwg9-2 cNiGzR">
                        <div class="sc-9cwg9-3 eEDOvs">
                            <a class="productLink"href="#"><img width="64"height="64":src="`/api/upload/${order.product_img}`"></a>
                        </div>
                        <div class="sc-9cwg9-5 bmwSdh">
                            <div class="sc-9cwg9-6 jBCCpd">
                                <a href="#"target="_blank"class="sc-gnmni8-10 sc-8q24ha-0 yma-DD hPjYZj">
                                <span class="sc-755zt3-1 sc-8q24ha-1 inmgHC ifMZxv">{{order.product_name}}</span></a>
                                        <div class="sc-uaa4l4-0 jxRaeI">
                                        <span font-weight="normal" class="sc-755zt3-0 eDgzyT"> {{getcurrencyFormat(order.product_price)}}원</span>
                                        <span class="sc-13xhsmd-0 kYtEGM">
                                        <span class="sc-13xhsmd-1 joIhoV"></span></span>
                                        <span class="sc-755zt3-0 jtWNEg">{{order.order_cnt}}개</span>
                                        </div>
                                        <div>
                                        <span>상품총금액:{{getcurrencyFormat(order.order_cnt*order.product_price)}}원</span>
                                        </div>
                                    </div>
                                <div class="sc-fxyxvg-0 igPkOG"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </td>
    </tr>
    </tbody>
    </table>
    </div>
    <div>
        <h3 class="mb-0">받는사람 정보</h3>
                <div> 받는 사람 : {{ order.delivery_name}}</div>
                <div>연락처 : {{ order.delivery_phone }}</div>
                <div>주소 :({{ order.delivery_post }}) {{ order.delivery_addr }}{{ order.delivery_detail_addr}}</div>
        <h3 class="mb-0">결제 정보</h3>
               <div>총 주문 금액 : {{ getcurrencyFormat(order.pay_price)}}원</div>
               <div>포인트 사용 금액 : {{ getcurrencyFormat(order. pay_point)}}원</div>
               <div>결제 금액 : {{ getcurrencyFormat(order.pay_price- order. pay_point)}}원</div>
    </div>
    <button type="button" class="btn btn-success" @click="goList">목록으로</button>
</div>
</template>
<script>
    import axios from 'axios' 
    import SideVar from '../components/SideVar.vue'
    import pageCalcMixin from '../mixin.js'
    export default{
    components: {SideVar},
    mixins:[pageCalcMixin],
    data(){
     return {
        order:{},orders:{}
     }; 
    },
    created(){
        axios.get(`/api/mypage/OrderInfo/?no=`+this.$route.query.no)
        .then(result=>{
                        this.order=result.data.order[0],
                        this.orders=result.data.orderDetail,
                        console.log(result.data)
                    })
    },
    methods:{
        goList(){
            this.$router.push('/mypageOrderList');
        },
        getDateFormat(date) {
      return this.$dateFormat(date);
    },
    getcurrencyFormat(value){
        return this.$currencyFormat(value);
    }
    }
    }
</script>
<style>
#paddd{
    padding-left: 30%;
}
</style>

<!-- <template>
    <SideVar></SideVar>
    <div id="padd" class="container mt-5">
      <h2 class="mb-5 text-center">주문 상세</h2>
      <div class="resume-section-content">
        <div class="order-info mb-5">
          <p>주문 일자: {{ getDateFormat(order.order_date) }}</p>
          <p>주문 번호: {{ order.order_no }}</p>
          <p v-if="order.order_status == 1">주문 상태: 결제 완료</p>
          <p v-if="order.order_status == 2">주문 상태: 상품 준비 중</p>
          <p v-if="order.order_status == 3">주문 상태: 배송 중</p>
          <p v-if="order.order_status == 4">주문 상태: 배송 완료</p>
          <p v-if="order.order_status == 5">주문 상태: 구매 확정</p>
          <p v-if="order.order_status == 6">주문 상태: 취소 요청</p>
          <p v-if="order.order_status == 7">주문 상태: 취소 완료</p>
          <button type="button" class="btn btn-warning" v-if="order.order_status == 1">주문 취소</button>
        </div>
      </div>
      <div class="order-details mb-5">
        <h3 class="mb-4">주문 상품</h3>
        <div v-for="orderDetail in orders" :key="orderDetail.product_no" class="order-item d-flex mb-4">
          <img :src="`/api/upload/${orderDetail.product_img}`" class="product-img mr-3" />
          <div>
            <h5>{{ orderDetail.product_name }}</h5>
            <p>{{ getcurrencyFormat(orderDetail.product_price) }}원</p>
            <p>{{ orderDetail.order_cnt }}개</p>
            <p>상품 총 금액: {{ getcurrencyFormat(orderDetail.order_cnt * orderDetail.product_price) }}원</p>
          </div>
        </div>
      </div>
      <div class="recipient-info mb-5">
        <h3 class="mb-4">받는 사람 정보</h3>
        <p>받는 사람: {{ order.delivery_name }}</p>
        <p>연락처: {{ order.delivery_phone }}</p>
        <p>주소: ({{ order.delivery_post }}) {{ order.delivery_addr }} {{ order.delivery_detail_addr }}</p>
      </div>
      <div class="payment-info mb-5">
        <h3 class="mb-4">결제 정보</h3>
        <p>총 주문 금액: {{ getcurrencyFormat(order.pay_price) }}원</p>
        <p>포인트 사용 금액: {{ getcurrencyFormat(order.pay_point) }}원</p>
        <p>결제 금액: {{ getcurrencyFormat(order.pay_price - order.pay_point) }}원</p>
      </div>
      <button type="button" class="btn btn-success" @click="goList">목록으로</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import SideVar from '../components/SideVar.vue'
  import pageCalcMixin from '../mixin.js'
  
  export default {
    components: { SideVar },
    mixins: [pageCalcMixin],
    data() {
      return {
        order: {},
        orders: []
      }
    },
    created() {
      axios.get(`/api/mypage/OrderInfo/?no=` + this.$route.query.no)
        .then(result => {
          this.order = result.data.order[0];
          this.orders = result.data.orderDetail;
          console.log(result.data);
        })
    },
    methods: {
      goList() {
        this.$router.push('/mypageOrderList');
      },
      getDateFormat(date) {
        return this.$dateFormat(date);
      },
      getcurrencyFormat(value) {
        return this.$currencyFormat(value);
      }
    }
  }
  </script>
  
  <style>
  #padd {
    padding: 20px;
  }
  
  .order-info,
  .order-details,
  .recipient-info,
  .payment-info {
    margin-bottom: 30px;
  }
  
  .order-item {
    display: flex;
    align-items: center;
  }
  
  .product-img {
    width: 64px;
    height: 64px;
  }
  
  .order-item h5 {
    margin-bottom: 10px;
  }
  </style> -->
  