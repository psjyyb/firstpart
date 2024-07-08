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
     <tr :key="i" v-for="(product,i) in products"  >
                    <td >{{ product.product_no }}</td>
                    <td @click ="goToDetail(product.product_no)">{{ product.product_name }}</td>
                    <td>{{ makeComma(product.product_price) }}</td>            
                    <td><img :src="`/api/readproductImg/${product.product_img}`" height="180" width="180"></td>
                    <td>{{ this.$dateFormat(product.product_mfd )}}</td>
                    <td>{{ this.$dateFormat(product.product_exp) }}</td>
                    <td>{{ product.category_name }}</td>
                    <td>{{ makeComma(product.product_point) }}</td>
                    <td>{{ makeComma(product.storage_cnt) }}</td>
                    <td>
                      <td>{{ makeComma(product.stock_cnt) }}
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
   <div >
     <table class =seachdiv>
     <tr>
    <label >분류</label>
    <select v-model="this.seachcatecory">
      <option value="product_no">번호</option>
      <option value="product_name">상품 이름</option>
                              
                        </select>

                        <label >검색어</label>
                        <input type ="text" v-model="this.seachname" id ="seachname">
                      </tr>
                      <!-- <tr	><input type ="date"id ="start" v-model ="this.start "/><input type ="date"id ="end" v-model ="this.end "/></tr> -->
                      <tr	>    <button @click="seach(1)"><h3>검색</h3></button></tr>
                      <tr	>    <button @click="goPage(1)"><h3>검색초기화</h3></button></tr>
                      </table>
   </div>
   <PagingComponent v-bind="page" @go-page="goPage" ></PagingComponent>
   
   <router-link to ="/insertproduct"	class="insert"><h2>상품 등록</h2></router-link	>
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
    seachcatecory:'',
    seachname:'',
    start:'',
    end:'',
    products:{},
    stock_cnt:[],
    pageUnit:5,
    page:{}
   };
  },
  created()	{
    this.goPage(1);
    
  },
  methods: {
    async seach(page){
      if((this.seachcatecory!='')&(this.seachname!='')){
      let pageUnit =this.pageUnit;

      let result = await axios.get(`/api/adminproduct/productList/seach/?seachcatecory=${this.seachcatecory}&seachname=${this.seachname}&pageUnit=${pageUnit}&page=${page}`);
      this.products = result.data.list;
      this.page =this.pageCalc(page,result.data.count[0].cnt,5,pageUnit);
      console.log(this.page)
      }
    },
    async goPage(page){
        let pageUnit =this.pageUnit;
        let result = await axios.get(`/api/adminproduct/productList/?pageUnit=${pageUnit}&page=${page}`);
        this.products = result.data.list;        
        this.page =this.pageCalc(page,result.data.count[0].cnt,5,pageUnit);
        console.log(this.page)
  
    },
    goToDetail(no )	{
 	  this.$router.push({	path:"/infoproduct",	query: {	product_no:no }	});
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
      change_product_img(file)	{
        const fileData = (data) => {
        this.p_product_img = data
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener("load", function () {
        fileData(reader.result)
      }, false);
      console.log(this. product_img);
    },


    
  },
};
</script	>
<style scoped >
table	* {
  text-align:	center ; }
  .insert{
    
  }
  .seachdiv{
    width: 100%;
  }
  button{

all: initial;
}
</style	>
