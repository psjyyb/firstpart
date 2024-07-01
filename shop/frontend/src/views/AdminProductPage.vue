<template	>
  <div class ="container">
   <table class ="table	table-hover">
    <thead	>
     <tr	>
      <th	>상품 번호</th	>
      <th	>상품 이름 </th	>
      <th	>상품 가격 </th	>
      <th	>상품 이미지</th	>
      <th	>상품 등록일자 </th	>
      <th	>상품 유통기한 </th	>
      <th	>카테고리 </th	>
      <th	>입고량 </th	>
      <th	>재고</th	>
      <th	>적립포인트</th	>
     </tr	>
    </thead	>
    <tbody	>
     <!-- <tr
      :key ="i"
      v-for ="(board ,i )	in boardList"
      @click ="goToDetail(board.no )" 	   >
      <td	>{{board.no }}</td	>
     </tr	> -->
     <tr v-for="product in products">
                    <td>{{ product.product_no }}</td>
                    <td>{{ product.product_name }}</td>
                    <td>{{ product.product_price }}</td>            
                    <td>{{ product.product_img }}</td>
                    <td>{{ product.product_mfd }}</td>
                    <td>{{ product.product_exp }}</td>
                    <td>{{ product.category_name }}</td>
                    <td>{{ product.storage_cnt }}</td>
                    <td>{{ product.stock_cnt }}</td>
                    <td>{{ product.product_point }}</td>
                </tr>
    </tbody	>
   </table	>
   <PagingComponent v-bind="page" @go-page="goPage"></PagingComponent>
  </div	>
</template	>
<script	>
import pageCalcMixin from '../mixin.js'
import PagingComponent from '../components/PagingComponent.vue'

import axios from "axios";
export	default {
  mixins:[pageCalcMixin],
    components: {PagingComponent },
  data ()	{
   return {
    products:{},
    pageUnit:5,
    page:{}
   };
  },
  created()	{
    this.goPage(1);
  //  this.getBoardList();
  },
  methods: {

    async goPage(page){
        let pageUnit =this.pageUnit;
        let result = await axios.get(`/api/adminproduct/productList/?pageUnit=${pageUnit}&page=${page}`);
        this.products = result.data.list;
        
        this.page =this.pageCalc(page,result.data.count[0].cnt,5,pageUnit);
        console.log(this.page)
  //  async getBoardList()	{
  //   let result =	await axios.get(`/api/board`);
  //   this.boardList =	result.data ;
  //  },
  //  goToDetail(no )	{
  //   this.$router.push({	path:"/info",	query: {	no:no }	});
  //  },
  //  getDateFormat(date )	{
  //   return this.$dateFormat(date );
    },
  },
};
</script	>
<style scoped >
table	* {
  text-align:	center ; }
</style	>