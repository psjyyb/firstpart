<template	>
  <div class ="container">
   <table class ="table	table-hover">
    <thead	>
     <tr	>
      <th	>공지사항 번호</th	>
      <th	>제목 </th	>
      <th	>게시 날짜 </th	>
     </tr	>
    </thead	>
    <tbody	>
     <!-- <tr
      :key ="i"
      v-for ="(board ,i )	in boardList"
      @click ="goToDetail(board.no )" 	   >
      <td	>{{board.no }}</td	>
     </tr	> -->
     <tr v-for="notice in notices">
                    <td>{{ notice.notice_no }}</td>
                    <td>{{ notice.notice_title }}</td>
                    <td>{{ notice.notice_date }}</td>                                
                </tr>
    </tbody	>
   </table	>
   <PagingComponent v-bind="page" @go-page="goPage"></PagingComponent>
   <router-link to ="/insertnotice"	class="nav-link">공지사항 등록</router-link	>
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
    notices:{},
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
        let result = await axios.get(`/api/adminnotice/noticeList/?pageUnit=${pageUnit}&page=${page}`);
        this.notices = result.data.list;
        
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