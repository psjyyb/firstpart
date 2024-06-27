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
              <input type="text" class="form-control" v-model="form.user_name">
            </div>
          </td>
        </tr>
        <tr>
          <th>연락처</th>
          <td>
            <div class="input-group-sm w-25">
              <input type="text" class="form-control" v-model="form.user_phone">
            </div>
          </td>
        </tr>
        <tr>
          <th>주소</th>
          <td>
            <div class="input-group-sm w-25 mb-3">
              <input type="text" class="form-control" v-model="form.user_post">
            </div>
            <div class="input-group-sm mb-3">
              <button type="button" class="btn btn-outline-secondary" @click="openDaumPostcode">우편번호 검색</button>
            </div>
            <div class="input-group-sm w-50 mb-3">
              <input type="text" class="form-control" v-model="form.user_address">
            </div>
            <div class="input-group-sm w-50 mb-3">
              <input type="text" class="form-control" v-model="form.user_detail_addr">
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
          <th>보유 포인트</th>
          <td>{{ form.user_point }}점</td>
        </tr>
        <tr>
          <th>포인트 사용</th>
          <td>
            <div class="input-group-sm w-25 mb-3">
              <input type="number" class="form-control" placeholder="0점까지 사용 가능">
            </div>
            <div class="input-group-sm">
              <button type="button" class="btn btn-outline-success">적용</button>&nbsp;
              <button type="button" class="btn btn-outline-danger">취소</button>
            </div>
          </td>
        </tr>
        <tr>
          <th>총 적립 예정 포인트</th>
          <td>{{ makeComma(totalPoint) }}점</td>
        </tr>
        <tr>
          <th>최종 결제 금액</th>
          <td>{{ makeComma(totalPrice) }}원</td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-primary">결제하기</button>
  </div>
</template>
<script>
  import axios from 'axios'
  import mixin from '../mixin'

  export default {
    mixins: [mixin],
    data() {
      return {
        cartNoList: history.state.cartNo.split(','),
        orderlist: [],
        sameInfo: true,
        form: {},
      }
    },
    computed: {
      // 로그인된 회원 아이디
      account() {
        return this.$store.state.user.userid;
      },
      // 총 금액
      totalPrice() {
        let result = 0;
        this.orderlist.forEach((order) => {
          result += order.product_price * order.cart_cnt;
        })
        return result;
      },
      // 총 포인트
      totalPoint() {
        let result = 0;
        this.orderlist.forEach((order) => {
          result += order.product_point * order.cart_cnt;
        })
        return result;
      },
    },
    watch: {
      sameInfo: value => {
        if(value) {
          this.getUserInfo()
        } else {
          // user_point 남겨야함
          // this.form = {}
        }
      }
    },
    created() {
      this.$store.commit('user', {userid: 'user01'})
      this.cartNoList.forEach(no => {
        axios.get(`/api/order/${no}`)
        .then(result => {
          this.orderlist.push(result.data[0])
        })
      })
      this.getUserInfo();
    },
    methods: {
      openDaumPostcode() {
        new daum.Postcode({
          oncomplete: (data) => {
            this.form.user_post = data.zonecode;
            this.form.user_address = data.address;
          }
        }).open();
      },
      getUserInfo() {
        axios.get(`/api/order/info/${this.account}`)
        .then(result => {
          this.form = result.data[0]
        })
      }
    },
  }
</script>
<style>

</style>