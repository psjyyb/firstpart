<template>
  <div class="container">
    <div class="text-start fs-1">찜 목록</div>
    <table class="table">
      <colgroup>
        <col width="50">
        <col width="*">
        <col width="*">
        <col width="200">
        <col width="200">
      </colgroup>
      <thead>
        <tr>
          <th><input type="checkbox"></th>
          <th colspan="2">상품</th>
          <th>가격</th>
          <th><button class="btn btn-outline-danger btn-sm">선택삭제</button></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="wish in wishlist">
          <td><input type="checkbox"></td>
          <td>이미지</td>
          <td>{{ wish.product_name }}</td>
          <td>{{ makeComma(wish.product_price) }}</td>
          <td><button class="btn btn-outline-danger btn-sm" @click="removeWish">삭제</button></td>
        </tr>
      </tbody>
    </table>
    <div>
      <button type="button" class="btn btn-outline-primary">쇼핑계속하기</button>&nbsp;
      <button type="button" class="btn btn-primary">장바구니담기</button>
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
        wishlist: []
      };
    },
    computed: {
      account() {
        return this.$store.state.user.userid
      }
    },
    created() {
      this.$store.commit('user', {userid: 'user01'})
      axios.get(`/api/wish/${this.account}`)
      .then(result => {
        this.wishlist = result.data
      })
    },
    methods: {
      removeWish() {

      }
    },
  }
</script>
<style>
  
</style>