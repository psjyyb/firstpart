<template>
  <div class="container">
    <div class="fs-2">주문/결제</div>
    <div class="text-start fs-4">주문상품</div>
    <table class="table align-middle mb-5">
      <colgroup>
        <col width="200">
        <col width="*">
        <col width="200">
        <col width="200">
        <col width="200">
      </colgroup>
      <thead>
        <tr>
          <th colspan="2">상품</th>
          <th>수량</th>
          <th>금액</th>
          <th>포인트</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orderlist">
          <!-- <td><img :src="order.product_img"></td> -->
          <td><img src="../assets/insta4.jpg" width="100px"></td>
          <td class="text-start">{{ order.product_name }}</td>
          <td>{{ order.cart_cnt }}개</td>
          <td>{{ makeComma(order.product_price * order.cart_cnt) }}원</td>
          <td>+{{ makeComma(order.product_point * order.cart_cnt) }}점</td>
        </tr>
      </tbody>
    </table>
    <div class="text-start fs-4 mb-3">배송지 정보</div>
    <table class="table text-start mb-5">
      <colgroup>
        <col width="200">
        <col width="*">
      </colgroup>
      <tbody>
        <tr>
          <th>수령지 선택</th>
          <td>
            <label><input type="radio" :value="true" v-model="sameInfo"> 주문자 정보와 동일</label>&nbsp;
            <label><input type="radio" :value="false" v-model="sameInfo"> 주문자 정보와 다름</label>
          </td>
        </tr>
        <tr>
          <th>받으시는 분</th>
          <td>
            <div class="input-group-sm w-25">
              <input type="text" class="form-control" v-model="form.user_name" :readonly="sameInfo">
            </div>
          </td>
        </tr>
        <tr>
          <th>연락처</th>
          <td>
            <div class="input-group-sm w-25">
              <input type="text" class="form-control" v-model="form.user_phone" :readonly="sameInfo">
            </div>
          </td>
        </tr>
        <tr>
          <th>주소</th>
          <td>
            <div class="input-group-sm w-25 mb-3">
              <input type="text" class="form-control" v-model="form.user_post" readonly>
            </div>
            <div class="input-group-sm mb-3" v-if="!sameInfo">
              <button type="button" class="btn btn-outline-secondary" @click="openDaumPostcode">우편번호 검색</button>
            </div>
            <div class="input-group-sm w-50 mb-3">
              <input type="text" class="form-control" v-model="form.user_address" readonly>
            </div>
            <div class="input-group-sm w-50 mb-3">
              <input type="text" class="form-control" v-model="form.user_detail_addr" :readonly="sameInfo">
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-start fs-4 mb-3">결제</div>
    <table class="table text-start mb-5">
      <colgroup>
        <col width="200">
        <col width="*">
      </colgroup>
      <tbody>
        <tr>
          <th>총 상품 금액</th>
          <td>{{ makeComma(totalPrice) }}원</td>
        </tr>
        <tr>
          <th>총 적립 예정 포인트</th>
          <td>{{ makeComma(totalPoint) }}점</td>
        </tr>
        <tr>
          <th>보유 포인트</th>
          <td>{{ makeComma(form.user_point) }}점</td>
        </tr>
        <tr>
          <th>포인트 사용</th>
          <td>
            <div class="input-group-sm w-25 mb-3">
              <input type="number" class="form-control" v-model.number="point.amount" @change="checkPoint" :readonly="point.using">
            </div>
            <div class="input-group-sm">
              <button type="button" class="btn btn-outline-success" @click="setPoint">적용</button>&nbsp;
              <button type="button" class="btn btn-outline-danger" @click="resetPoint">취소</button>
            </div>
          </td>
        </tr>
        <tr>
          <th>최종 결제 금액</th>
          <td>{{ makeComma(totalPay) }}원<span v-if="point.using"> (포인트 {{ makeComma(point.amount) }}점 사용)</span></td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-primary" @click="payment">결제하기</button>
  </div>
</template>
<script>
  import axios from 'axios'
  import mixin from '../mixin'
  import * as PortOne from "@portone/browser-sdk/v2"
  import { v4 } from "uuid"

  export default {
    mixins: [mixin],
    data() {
      return {
        cartNoList: history.state.cartNo.split(','),
        orderlist: [],
        sameInfo: true,
        form: {},
        point: {
          using: false,
          amount: 0
        },
        totalPay: 0,
      }
    },
    watch: {
      // 배송지 정보와 주문자 정보 일치 여부
      sameInfo(value) {
        if(value) {
          this.getUserInfo();
        } else {
          let {user_point, ...remain} = this.form;
          this.form = {user_point};
        }
      }
    },
    computed: {
      // 로그인된 회원 아이디
      account() {
        return this.$store.state.user.user_id;
      },
      // 총 상품 금액
      totalPrice() {
        let result = 0;
        this.orderlist.forEach((order) => {
          result += order.product_price * order.cart_cnt;
        })
        this.totalPay = result;
        return result;
      },
      // 총 적립 포인트
      totalPoint() {
        let result = 0;
        this.orderlist.forEach((order) => {
          result += order.product_point * order.cart_cnt;
        })
        return result;
      },
    },
    created() {
      this.getOrderList();
      this.getUserInfo();
    },
    methods: {
      // 주문 상품 불러오기
      getOrderList() {
        this.cartNoList.forEach(no => {
          axios.get(`/api/order/${no}`)
          .then(result => {
            this.orderlist.push(result.data[0])
          })
        })
      },
      // 주소 api
      openDaumPostcode() {
        new daum.Postcode({
          oncomplete: (data) => {
            this.form.user_post = data.zonecode;
            this.form.user_address = data.address;
          }
        }).open();
      },
      // 주문 회원 정보 불러오기
      getUserInfo() {
        axios.get(`/api/order/info/${this.account}`)
        .then(result => {
          this.form = result.data[0]
        })
      },
      // 포인트 사용 체크
      checkPoint() {
        if(this.point.amount < 0 || this.point.amount > this.form.user_point) {
          alert(`포인트는 ${this.form.user_point}점까지 사용 가능합니다.`);
          this.point.amount = 0;
        }
      },
      // 포인트 적용
      setPoint() {
        this.totalPay -= this.point.amount;
        this.point.using = true;
      },
      // 포인트 적용 취소
      resetPoint() {
        this.totalPay = this.totalPrice;
        this.point.amount = 0;
        this.point.using = false;
      },
      // 결제
      payment() {
        const orderName = this.orderlist.length > 1 ? `${this.orderlist[0].product_name} 외 ${this.orderlist.length - 1}건` : `${this.orderlist[0].product_name}`;
        const totalAmount = this.totalPay;

        async function requestPayment() {
          const response = await PortOne.requestPayment({
            storeId: "store-40bbe7f1-02aa-486e-8049-26324a1a258f",
            channelKey: "channel-key-7dc5a544-efa0-4e55-af07-a7209657747c",
            paymentId: `payment-${v4()}`,
            orderName,
            totalAmount,
            currency: "CURRENCY_KRW",
            payMethod: "EASY_PAY",
          })
          // 오류 발생
          if (response.code != null) {
            return alert(response.message);
          }
        }

        requestPayment();

        // 주문 데이터
        const orderData = {
          order_status: 1,
          user_id: this.account,
          delivery_name: this.form.user_name,
          delivery_post: this.form.user_post,
          delivery_addr: this.form.user_address,
          delivery_detail_addr: this.form.user_detail_addr,
          delivery_phone: this.form.user_phone,
          pay_price: this.totalPay,
          pay_point: this.point.amount
        }
        // 주문상품 데이터
        const orderListData = this.orderlist;
        // 회원 최종 포인트
        const point = this.form.user_point - this.point.amount;

        async function request() {
          // 주문 테이블에 주문 추가
          await axios.post('/api/order', orderData)
          // 추가한 주문의 주문번호 가져오기
          const result = await axios.get(`/api/order/detail/${orderData.user_id}`)
          const orderNo = result.data[0].order_no
          // 주문상세 테이블에 주문상세 추가
          orderListData.forEach(ele => {
            let orderDetailData = {
              order_cnt: ele.cart_cnt,
              order_no: orderNo,
              product_no: ele.product_no,
              product_price: ele.product_price,
              point: ele.product_point
            }
            axios.post('/api/order/detail', orderDetailData)
          })
          // 회원 포인트 수정
          await axios.put(`api/order/info/${orderData.user_id}`, {user_point: point})
        }
        // 실행
        request();
      },
    }
  }
</script>
<style>

</style>