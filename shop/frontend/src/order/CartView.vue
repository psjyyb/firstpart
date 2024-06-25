<template>
  <div class="container">
    <div class="text-start fs-1">장바구니</div>
    <table class="table">
      <colgroup>
        <col width="50">
        <col width="*">
        <col width="*">
        <col width="120">
        <col width="200">
        <col width="100">
      </colgroup>
      <thead>
        <tr>
          <th><input type="checkbox"></th>
          <th colspan="2">상품</th>
          <th>수량</th>
          <th>가격</th>
          <th><button class="btn btn-outline-danger btn-sm">선택삭제</button></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type="checkbox"></td>
          <td>이미지</td>
          <td>상품명</td>
          <td>
            <div class="input-group input-group-sm">
              <button class="btn btn-outline-secondary">－</button>
              <input type="number" class="form-control text-center">
              <button class="btn btn-outline-secondary">＋</button>
            </div>
          </td>
          <td>00,000원</td>
          <td><button class="btn btn-outline-danger btn-sm">삭제</button></td>
        </tr>
      </tbody>
    </table>
    <div class="text-end">
      <ul>
        <li>총 결제 예정 금액 <span>00,000원</span></li>
        <li>예상 적립 포인트 <span>0,000점</span></li>
      </ul>
    </div>
    <div class="row">
      <div class="col-lg-6 text-start">
        <button type="button" class="btn btn-outline-primary">쇼핑계속하기</button>
      </div>
      <div class="col-lg-6 text-end">
        <button type="button" class="btn btn-primary">선택상품주문</button>&nbsp;
        <button type="button" class="btn btn-primary">전체상품주문</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    created() {},
    methods: {},
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