<template>
  <div class="container">
    <div class="fs-2">주문/결제</div><br>
    <div class="fs-5">주문이 정상적으로 완료되었습니다.</div><br>
    <div>
      <button type="button" class="btn btn-outline-primary" @click="goMain">쇼핑계속하기</button>&nbsp;
      <button type="button" class="btn btn-primary" @click="goMyPage">마이페이지로</button>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data() {
      return {};
    },
    created() {},
    methods: {
      // 메인으로 이동
      goMain() {
        this.$router.push('/')
      },
      goMyPage() {
        this.$router.push('/mypage')
      }
    },
  }
</script>
<style>
  
</style>