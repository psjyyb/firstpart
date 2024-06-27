<template>
  <div class="container">
    <div class="fs-2">장바구니</div>
    <div v-if="this.cartlist.length > 0">
      <table class="table align-middle">
        <colgroup>
          <col width="50">
          <col width="150">
          <col width="*">
          <col width="120">
          <col width="200">
          <col width="100">
          <col width="150">
        </colgroup>
        <thead>
          <tr>
            <th><input type="checkbox" v-model="isCheckedAll" @change="checkAll"></th>
            <th colspan="2">상품</th>
            <th>수량</th>
            <th>금액</th>
            <th>포인트</th>
            <th><button class="btn btn-outline-danger btn-sm" @click="removeCheckedCart">선택삭제</button></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in cartlist">
            <td><input type="checkbox" :value="cart.cart_no" v-model="checkedCart"></td>
            <!-- <td><img :src="cart.product_img"></td> -->
            <td><img src="../assets/insta4.jpg" width="100px"></td>
            <td class="text-start">{{ cart.product_name }}</td>
            <td>
              <div class="input-group input-group-sm">
                <button class="btn btn-outline-secondary" @click="minusCnt(cart)">－</button>
                <input type="number" class="form-control text-center" :value="cart.cart_cnt" readonly>
                <button class="btn btn-outline-secondary" @click="plusCnt(cart)">＋</button>
              </div>
            </td>
            <td>{{ makeComma(cart.product_price * cart.cart_cnt) }}원</td>
            <td>+{{ makeComma(cart.product_point * cart.cart_cnt) }}점</td>
            <td><button class="btn btn-outline-danger btn-sm" @click="removeCart(cart.cart_no)">삭제</button></td>
          </tr>
        </tbody>
      </table>
      <div class="text-end">
        <ul>
          <li>총 예상 결제 금액 <span>{{ makeComma(totalPrice) }}원</span></li>
          <li>총 예상 적립 포인트 <span>{{ makeComma(totalPoint) }}점</span></li>
        </ul>
      </div>
      <div class="row">
        <div class="col-lg-6 text-start">
          <button type="button" class="btn btn-outline-primary" @click="goMain">쇼핑계속하기</button>
        </div>
        <div class="col-lg-6 text-end">
          <button type="button" class="btn btn-primary" @click="order">선택상품주문</button>&nbsp;
          <button type="button" class="btn btn-primary" @click="orderAll">전체상품주문</button>
        </div>
      </div>
    </div>
    <div v-else>
      <br><div class="fs-4">장바구니가 비어있습니다.</div><br>
      <button type="button" class="btn btn-outline-primary" @click="goMain">쇼핑계속하기</button>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import mixin from '../mixin.js'

  export default {
    mixins: [mixin],
    data() {
      return {
        cartlist: [],
        checkedCart: [],
        isCheckedAll: false,
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
        this.cartlist.forEach((cart) => {
          if(this.checkedCart.indexOf(cart.cart_no) != -1) {
            result += cart.product_price * cart.cart_cnt;
          }
        })
        return result;
      },
      // 총 포인트
      totalPoint() {
        let result = 0;
        this.cartlist.forEach((cart) => {
          if(this.checkedCart.indexOf(cart.cart_no) != -1) {
            result += cart.product_point * cart.cart_cnt;
          }
        })
        return result;
      },
      // 전체 장바구니 번호
      allCart() {
        let result = [];
        this.cartlist.forEach(cart => result.push(cart.cart_no));
        return result;
      }
    },
    created() {
      this.$store.commit('user', {userid: 'user01'})
      this.getCartlist();
    },
    methods: {
      // 장바구니 목록 불러오기
      getCartlist() {
        axios.get(`/api/cart/${this.account}`)
        .then(result => this.cartlist = result.data)
      },
      // 전체 선택, 해제
      checkAll() {
        if(this.isCheckedAll) {
          this.checkedCart = this.allCart;
        } else {
          this.checkedCart = [];
        }
      },
      // 수량 감소
      minusCnt(cart) {
        if(cart.cart_cnt > 1) {
          cart.cart_cnt--;
          axios.put(`api/cart/${cart.cart_no}`, {cart_cnt: cart.cart_cnt})
          .then(result => console.log(result))
        }
      },
      // 수량 증가
      plusCnt(cart) {
        cart.cart_cnt++;
        axios.put(`api/cart/${cart.cart_no}`, {cart_cnt: cart.cart_cnt})
        .then(result => console.log(result))
      },
      // 장바구니 상품 삭제
      removeCart(no) {
        axios.delete(`/api/cart/${no}`)
        .then(result => {
          this.cartlist = this.cartlist.filter(e => e.cart_no !== no);
        })
      },
      // 장바구니 선택 상품 삭제
      removeCheckedCart() {
        if(this.checkedCart.length > 0) {
          this.checkedCart.forEach(no => {
            this.removeCart(no);
          })
        }
      },
      // 메인으로 이동
      goMain() {
        this.$router.push('/')
      },
      // 선택 상품 주문
      order() {
        this.$router.push({
          name: 'order', 
          state: {
            cartNo: this.checkedCart.toString()
          }
        })
      },
      // 전체 상품 주문
      orderAll() {
        this.checkedCart = this.allCart;
        this.order();
      }
    },
  }
</script>
<style>
input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
ul {
  list-style: none;
}
</style>