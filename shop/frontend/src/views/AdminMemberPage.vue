<template	>
  <div class ="container">
   <table class ="table	table-hover">
    <thead	>
     <tr	>
      <th	>회원 아이디</th	>
      <th	>회원 이름 </th	>
      <th	>우편 번호</th	>
      <th	>주소 </th	>
      <th	>상세 주소 </th	>
      <th	>전화번호 </th	>
      <th	>이메일</th	>
      <th	>적립금</th	>
      <th	>삭제</th	>
     </tr	>
    </thead	>
    <tbody	>
     <!-- <tr
      :key ="i"
      v-for ="(board ,i )	in boardList"
      @click ="goToDetail(board.no )" 	   >
      <td	>{{board.no }}</td	>
     </tr	> -->
     <tr v-for="user in users">
                    <td>{{ user.user_id }}</td>
                    <td>{{ user.user_name }}</td>            
                    <td>{{ user.user_post }}</td>
                    <td>{{ user.user_address }}</td>
                    <td>{{ user.user_detail_addr }}</td>
                    <td>{{ user.user_phone }}</td>
                    <td>{{ user.user_email }}</td>
                    <td>{{ user.user_point }}</td>
                    <td><button class="btn btn-outline-danger btn-sm" @click="removeUser(user.user_id)">삭제</button></td>
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
    users:{},
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
        let result = await axios.get(`/api/adminmember/userList/?pageUnit=${pageUnit}&page=${page}`);
        this.users = result.data.list;
        
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

    async removeUser(user_id) {
      let result =	(await axios .delete(`/api/adminmember/useDelete/${user_id }`)).data
 	   .affectedRows ;
 	  if (result ==	1 )	{
 	   alert("정상적으로	삭제되었습니다.");
 	  }	else {
 	   alert("정상적으로	삭제되지	않았습니다.");
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