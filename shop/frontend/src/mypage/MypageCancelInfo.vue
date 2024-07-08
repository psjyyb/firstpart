<template>
    <SideVar/>
    <div id="padd">
        <h2 class="mb-5">주문상세</h2>
  
        <div class="order-info">
            <p>주문번호: {{ fcancel.order_no }}</p>
            <p>주문일자: {{ getDateFormat(fcancel.order_date) }}</p>
            <div class="subheading mb-3">
                <p v-if="fcancel.cancel_state==1">취소 상태 : 취소요청</p>
                <p v-if="fcancel.cancel_state==2">취소 상태 : 취소완료</p>
            </div>
            <div class="sc-14f0hdm-3 nXoWQ">
                <p>취소일자 : {{getDateFormat(fcancel.cancel_date)}} 취소접수번호 : {{ fcancel.cancel_no }}</p>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>상품 정보</th>
                    <th>상품 가격</th>
                    <th>구매 갯수</th>
                    <th>총상품  가격</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in cancels" :key="item.id">
                    <td>
                        <img :src="`/api/readproductImg/${item.product_img}`" alt="상품 이미지없음 /">
                        {{ item.product_name }}
                    </td>
                    <td>{{ item.product_price }}원</td>
                    <td>{{ item.order_cnt }}</td>
                    <td>{{getcurrencyFormat(item.order_cnt*item.product_price)}}원</td>
                </tr>
            </tbody>
        </table>
  
        <!-- <div class="buyer-info">
            <h3>구매자 정보</h3>
            <p>주문자: {{ order.buyer.name }}</p>
            <p>연락처: {{ order.buyer.phone }}</p>
            <p>이메일: {{ order.buyer.email }}</p>
        </div> -->
  
        <!-- <div class="shipping-info">
            <h3>배송지 정보</h3>
            <p>수령인: {{ order.delivery_name }}</p>
            <p>연락처: {{ order.delivery_phone }}</p>
            <p>배송지: ({{ order.delivery_post }}) {{ order.delivery_addr }} {{ order.delivery_detail_addr }}</p>
        </div> -->
  
        <div class="payment-info">
            <h3>주문 금액 상세</h3>
            <p>주문금액: {{ getcurrencyFormat(fcancel.pay_price) }}원</p>
            <p>할인금액: {{ getcurrencyFormat(fcancel.pay_point) }}원</p>
            <p>총 주문금액: {{ getcurrencyFormat(fcancel.pay_price - fcancel.pay_point) }}원</p>
            <!-- <div class="price-details">
                <p>상품금액: {{ getcurrencyFormat(order.product_amount) }}원</p>
                <p>배송비: {{ getcurrencyFormat(order.shipping_cost) }}원</p>
                <p>회원 할인금액: {{ getcurrencyFormat(order.member_discount) }}원</p>
                <p>쿠폰: {{ getcurrencyFormat(order.coupon) }}원</p>
                <p>포인트: {{ getcurrencyFormat(order.point) }}원</p>
                <p>총 주문금액: {{ getcurrencyFormat(order.final_order_amount) }}원</p>
            </div> -->
        </div>
  
        <button type="button" class="btn btn-success" @click="goList">목록으로</button>
    </div>
  </template>
  
<script>
    import pageCalcMixin from '../mixin.js'
    import axios from 'axios' 
    import SideVar from '../components/SideVar.vue'
    export default{
    mixins:[pageCalcMixin],
    components: {SideVar},
    data(){
     return {
        cancels:{},fcancel:{}
     }; 
    },
    created(){
        axios.get(`/api/mypage/CancelInfo/?no=`+this.$route.query.no)
        .then(result=>{console.log('cancncnc',result),this.cancels=result.data,this.fcancel=result.data[0]})
        
    },
    methods:{
        goList(){
            this.$router.push('/mypageCancelList');
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
body {
  font-family: Arial, sans-serif;
  padding: 20px;
}
h2 {
  margin-bottom: 20px;
}
.order-info, .buyer-info, .shipping-info, .payment-info {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
}
.order-info p, .buyer-info p, .shipping-info p, .payment-info p {
  margin: 5px 0;
}
.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
.table th, .table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}
.table th {
  background-color: #f4f4f4;
}
.table img {
  width: 64px;
  height: 64px;
}
.price-details {
  text-align: right;
  margin-top: 20px;
}
</style>