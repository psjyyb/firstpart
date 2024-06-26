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
      <td	>{{board.title }}</td	>
      <td	>{{board.writer }}</td	>
      <td	>{{getDateFormat(board.created_date )	}}</td	>
      <td	>{{board.comment }}</td	>
     </tr	> -->
    </tbody	>
   </table	>
  </div	>
</template	>
<script	>
import axios from "axios";
export	default {
  data ()	{
   return {
    boardList: [],
   };
  },
  created()	{
  //  this.getBoardList();
  },
  methods: {
  //  async getBoardList()	{
  //   let result =	await axios.get(`/api/board`);
  //   this.boardList =	result.data ;
  //  },
  //  goToDetail(no )	{
  //   this.$router.push({	path:"/info",	query: {	no:no }	});
  //  },
  //  getDateFormat(date )	{
  //   return this.$dateFormat(date );
  //  },
  },
};
</script	>
<style scoped >
table	* {
  text-align:	center ; }
</style	>