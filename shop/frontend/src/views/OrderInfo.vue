<template>
    
    <div id="padd">
        <h2 class="mb-5">주문상세정보</h2>
  
        <div class="order-info">
            <p>주문번호: {{ order.order_no }}</p>
            <p>주문일자: {{ order.user_id }}</p>
            <p>주문일자: {{ order.order_date }}</p>
            <div class="subheading mb-3">
                <select v-model="order.order_status" @change="change_order_status(order.order_no,order.order_status)">
                          <option v-if="order.order_status<6" value="1">결제완료</option>
                          <option v-if="order.order_status<6" value="2">상품준비중</option>
                          <option v-if="order.order_status<6" value="3">배송중</option>
                          <option v-if="order.order_status<6" value="4">배송완료</option>
                          <option v-if="order.order_status<6" value="5">구매확정</option>
                          <option v-if="order.order_status>=6" value="6">취소요청</option>
                          <option v-if="order.order_status>=6" value="7">취소완료</option>
                        </select>
                  </div>
                  
        </div>
  
        <table class="table">
            <thead>
                <tr>
                    
                    <th>상품 정보</th>
                    <th>상품 가격</th>
                    <th>구매 갯수</th>
                    <th>총상품  가격</th>
                    <th>적립금</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in orders" :key="item.id">
                    
                    <td>
                        <img :src="`/api/readproductImg/${item.product_img}`" alt="상품 이미지없음 /">
                        {{ item.product_name }}
                    </td>
                    <td>{{ item.product_price }}원</td>
                    <td>{{ item.order_cnt }}</td>
                    <td>{{getcurrencyFormat(item.order_cnt*item.product_price)}}원</td>
                    <td>{{getcurrencyFormat(item.product_price*0.03)}}원</td>
                </tr>
            </tbody>
        </table>
  
        <div class="shipping-info">
            <h3>배송지 정보</h3>
            <p>수령인: {{ order.delivery_name }}</p>
            <p>연락처: {{ order.delivery_phone }}</p>
            <p>배송지: ({{ order.delivery_post }}) {{ order.delivery_addr }} {{ order.delivery_detail_addr }}</p>
        </div>
  
        <div class="payment-info">
            <h3>주문 금액 상세</h3>
            <p>주문금액: {{ getcurrencyFormat(order.pay_price) }}원</p>
            <p>할인금액: {{ getcurrencyFormat(order.pay_point) }}원</p>
            <p>총 주문금액: {{ getcurrencyFormat(order.pay_price - order.pay_point) }}원</p>
            <p>총 적립금액: {{ getcurrencyFormat(point) }}원</p>
            
        </div>
  
        <button type="button" @click="goList"><h2>목록으로</h2></button>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  import pageCalcMixin from '../mixin.js'
  
  export default {
    
    mixins: [pageCalcMixin],
    data() {
        return {
            order: {},
            orders: {},
            point:0
        };
    },
    created() {
        axios.get(`/api/mypage/OrderInfo/?no=` + this.$route.query.order_no)
            .then(result => {
                this.order = result.data.order[0],
                    this.orders = result.data.orderDetail,
                    result.data.orderDetail.forEach(a=>{
                     this.point += a.product_price*0.03
                    })
                    console.log(result.data)
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
        },
        goList(){
        this.$router.push('/adminorder');
    },
    async change_order_status(i,order_status){
      
        let orderstate={no:i,state:order_status}
        console.log(orderstate);
      
        let result = (await axios.put(`/api/adminorder/orderstate/`,orderstate)).data;

      },

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
  #padd{
margin-top: 10px;

}
  </style>