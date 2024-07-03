<template	>
    <div class ="container">
     <div class ="row">
      <table class ="table	table-bordered">
       <thead	>
        <tr	>
         <th scope ="col"class ="text-center	table-primary">글 번호 </th	>
         <td scope ="col"class ="text-center">{{ this.qnaInfo.qna_no }}</td	>
         <th scope ="col"class ="text-center	table-primary">작성일 </th	>
         <td scope ="col"class ="text-center">
          {{ this.qnaInfo.qna_date	}}
         </td	>
         <th scope ="col"class ="text-center	table-primary">아이디 </th	>
         <td scope ="col"class ="text-center">{{ this.qnaInfo.user_id}}</td	>
        </tr	>
        <tr	>
         <th colspan = "2" class ="text-center	table-primary">제목 </th	>
         <td colspan = "2" class ="text-center">{{this.qnaInfo.qna_title }}</td	>
            <th scope ="col"class ="text-center	table-primary">상품 번호 </th	>
            <td scope ="col"class ="text-center">{{this.qnaInfo.product_no }}</td>	
        </tr>
        
        
       </thead	>
       <tbody	>
        <tr	>
         <td colspan ="6"class ="text-left"valign ="top"height ="200">
          <pre
           style ="
            white-space:	pre-wrap ;
            border:	none ;
            background-color:	white ;
           "
           >{{this.qnaInfo.qna_content }}</pre
          >
         </td	>
        </tr	>
        <tr	>
         <td colspan ="6"class ="text-center">

            <input type ="text" id ="answer" v-model ="this.qnaInfo.qna_reply"/>
          
          
         </td>
        </tr>
        
       </tbody>
      </table>
     </div	>
     <div align="center">
        <button  @click ="insertanser(this .qna_no)">등록</button>
        <button type="button"  @click="canBtn">취소</button>
     </div	>
    </div	>
</template	>


<script	>
import axios from "axios";
import $dateFormat from '../mixin.js'

export	default {
    mixins: [$dateFormat],
    data ()	{
        return {

            qna_no:"",
            qnaInfo: {},
        }
    },

    created()	{
 	 this .qna_no =	this .$route .query .qna_no ;
 	 this .getQnaInfo();

     
 	},
     methods: {
        async getQnaInfo()	{
 	    this .qnaInfo =(await axios .get(`/api/adminqa/qnaList/${this .qna_no }`)).data[0];
        
 	 },
      async insertanser(no)	{

        const result = (await axios .put(`/api/adminqa/insertqna/${no }`,this.qnaInfo)).data;
        if(result .affectedRows >0 )	{
 	    alert("정상적으로 답변되었습니다.");
         this.$router.push('/adminqa');
 	   }	else {
 	    alert("정상적으로 답변되지 않았습니다.");
 	   }
      },
      canBtn(){
        this.$router.push('/adminqa');
    },

     }


}


</script>

<style scoped >
     input{
        height: 250px;
        width: 400px;
     }
  
</style	>