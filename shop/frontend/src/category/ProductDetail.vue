<template>
    <div class="container">
        <div>detail</div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>No.</th>
          <th>상품 이름</th>
          <th>상품 가격</th>
          <th>상품 이미지</th>
          <th>상품 상세 이미지</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ productInfo.product_no }}</td>
          <td>{{ productInfo.product_name }}</td>
          <td>{{ productInfo.product_price }}</td>
          <td>{{ productInfo.product_img }}</td>
          <td>{{ productInfo.product_detail_img }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";

    export default{
    data(){
    return {
        searchNo: "",
        productInfo: {},
    };
    },
    created () {
    this.searchNo = this.$route.query.no;
    this.proInfo();

    },
    methods :{
    async proInfo() {
    this.productInfo = (await axios.get(`/api/category/${this.searchNo}`)).data[0];
    },
    }
        }
</script>
<style></style>
