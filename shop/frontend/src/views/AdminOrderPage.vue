<template	>
  <div class ="container">
   <table class ="table	table-hover">
    <thead	>
     <tr	>
      <th	>주문 번호</th	>
      <th	>주문자 아이디 </th	>
      <th	>주문 날짜 </th	>
      <th	>판매가 </th	>
      <th	>주문상태 </th	>
     </tr	>
    </thead	>
    <tbody	>
     <!-- <tr
      :key ="i"
      v-for ="(board ,i )	in boardList"
      @click ="goToDetail(board.no )" 	   >
      <td	>{{board.no }}</td	>
     </tr	> -->
     <tr :key="i" v-for="(order,i) in orders">
                    <td>{{ order.order_no }}</td>
                    <td>{{ order.user_id }}</td>
                    <td>{{ order.order_date }}</td>
                    <td>{{ order.pay_price }}</td>
                    <td>
                        <select v-model="order.order_status" @change="change_order_status(i,order.order_status)">
                          <option value="1">결제완료</option>
                          <option value="2">상품준비중</option>
                          <option value="3">배송중</option>
                          <option value="4">배송완료</option>
                          <option value="5">구매확정</option>
                        </select>

                    </td>
                    <!-- 
                    <td v-if="order.order_status==1">결제완료</td>
                    <td v-else-if="order.order_status==2">상품준비중</td>
                    <td v-else-if="order.order_status==3">배송중</td>
                    <td v-else-if="order.order_status==4">배송완료</td>
                    <td v-else-if="order.order_status==5">구매확정</td>                                    -->
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
    orders:{},
    
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
        let result = await axios.get(`/api/adminorder/orderList/?pageUnit=${pageUnit}&page=${page}`);
        this.orders = result.data.list;
        
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
    
    async change_order_status(i,order_status){
        console.log(this.orders[i]);
        console.log(order_status);
        let orderstate={no:this.orders[i].order_no,state:order_status}
        console.log(orderstate);
      
        let result = (await axios.put(`/api/adminorder/orderstate/`,orderstate)).data;

      }

    ,
  },
};
</script	>
<style scoped >
table	* {
  text-align:	center ; }
</style	>