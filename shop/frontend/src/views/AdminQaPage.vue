<template	>
  <div class ="container">
   <table class ="table	table-hover">
    <thead	>
     <tr	>
      <th	>글 번호</th	>
      <th	>제목 </th	>
      <th	>날짜 </th	>
      <th	>답변 여부</th	>
      <th	>작성자 아이디 </th	>
     </tr	>
    </thead	>
    <tbody	>
     <!-- <tr
      :key ="i"
      v-for ="(board ,i )	in boardList"
      @click ="goToDetail(board.no )" 	   >
      <td	>{{board.no }}</td	>
     </tr	> -->
     <tr v-for="qna in qnas">
                    <td>{{ qna.qna_no }}</td>
                    <td>{{ qna.qna_title }}</td>
                    <td>{{ qna.qna_date }}</td>            
                    <td v-if="qna.qna_reply==null">답변대기중</td>
                    <td v-else>답변완료</td>
                    <td>{{ qna.user_id }}</td>
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
    qnas:{},
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
        let result = await axios.get(`/api/adminqa/qnaList/?pageUnit=${pageUnit}&page=${page}`);
        this.qnas = result.data.list;
        
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