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
        <th	>적립포인트</th	>
      <th	>입고량 </th	>
      <th	>재고</th	>
     </tr	>
    </thead	>
    <tbody	>
     <!-- <tr
      :key ="i"
      v-for ="(board ,i )	in boardList"
      @click ="goToDetail(board.no )" 	   >
      <td	>{{board.no }}</td	>
     </tr	> -->
     <tr :key="i" v-for="(product,i) in products">
                    <td>{{ product.product_no }}</td>
                    <td>{{ product.product_name }}</td>
                    <td>{{ product.product_price }}</td>            
                    <td><img :src="`/api/upload/${product.product_img}`" height="180" width="180"></td>
                    <td>{{ product.product_mfd }}</td>
                    <td>{{ product.product_exp }}</td>
                    <td>{{ product.category_name }}</td>
                    <td>{{ product.product_point }}</td>
                    <td>{{ product.storage_cnt }}</td>
                    <td>
                      <td>{{ product.stock_cnt }}
                      <div class="input-group input-group-sm">
                      <button class="btn btn-outline-secondary" @click="outCnt(product,i)">출고</button>
                      <input  type="number" class="form-control text-center" v-model=this.stock_cnt[i]>
                      <button class="btn btn-outline-secondary" @click="inCnt(product,i)">입고</button>
                      
                    </div>
                  </td>
                    </td>
                </tr>
    </tbody	>
   </table	>
   <PagingComponent v-bind="page" @go-page="goPage"></PagingComponent>
   <router-link to ="/insertproduct"	class="nav-link">상품 등록</router-link	>
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
    stock_cnt:[],
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

        this.stock_cnt=[];
        this.products.forEach(product => this.stock_cnt.push(0));
        console.log(this.stock_cnt);

        
        this.products
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
    async outCnt(product,i) {
        if(this.stock_cnt[i] > product.stock_cnt) {

          alert("개수부족으로 출고가 불가능 합니다.");

        }
        else{

          let product_no=product.product_no;
          let stock_cnt = {out:this.stock_cnt[i]};
          const result =(await axios.put(`api/adminproduct/outproductstock/${product_no}`, stock_cnt)).data
          if(result .affectedRows >0 )	{
 	    alert("정상적으로	출고되었습니다.");

 	   }	else {
 	    alert("정상적으로	출고되지	않았습니다.");
 	   }
        }
      this.goPage(this.page);
        
      },
      
      async inCnt(product,i) {
        
        let product_no=product.product_no;
          let stock_cnt = {in:this.stock_cnt[i]};
        const result = (await axios.put(`api/adminproduct/inproductstock/${product_no}`, stock_cnt)).data
        if(result .affectedRows >0 )	{
 	    alert("정상적으로	입고되었습니다.");

 	   }	else {
 	    alert("정상적으로	입고되지	않았습니다.");
 	   }
      this.goPage(this.page);
        
      },


    
  },
};
</script	>
<style scoped >
table	* {
  text-align:	center ; }
  
</style	>