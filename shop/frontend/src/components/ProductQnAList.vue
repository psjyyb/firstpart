<template>
    <div>
      <h1>Product Q&A</h1>
      <table class="qna-table">
        <thead>
          <tr>
            <th>Q&A NO</th>
            <th>Title</th>
            <th>Date</th>
            <th>Content</th>
            <th>userId</th>
            <th>Photos</th>
          </tr>
        </thead>
        <tbody v-for="qna in qnas" :key="qna.qna_id">
          <tr>
            <td>{{ qna.qna_no }}</td>
            <td>{{ qna.qna_title }}</td>
            <td>{{ getDateFormat(qna.qna_date) }}</td>
            <td>{{ qna.qna_content }}</td>
            <td>{{ qna.user_id }}</td>
            <td v-if="qna.add_names">
                <div class="photos">
              <img v-for="photo in qna.add_names.split(',')" :key="photo" :src="`/api/upload/${photo.trim()}`" :alt="`Photo of review ${qna.qna_no}`">
            </div>
            </td>
            <td v-else>사진첨부없음</td>
          </tr>
          <tr v-if="qna.qna_reply">
            <td colspan="6"> ┖≫ {{ qna.qna_reply }}</td>
          </tr>
        </tbody>
        <tbody v-if="qnas==''">
            <tr>
                <td colspan="8">조회한 결과가 없습니다</td>
            </tr>
        </tbody>
      </table>
    </div>
    <div><button type="button" class="btn btn-primary" @click="addBtn">QnA등록</button></div>
  </template>
<script>
import pageCalcMixin from '../mixin.js'
import axios from "axios";
    export default{
        mixins:[pageCalcMixin],
    data(){
     return {
        qnas:{},
        prodNo:0
     }; 
    },
    created(){
    },
    methods:{
        async getData(no){
            this.prodNo=no
            console.log(no,'여긴리스트')
            await axios.get(`/api/mypage/ProductQnA/?pno=${no}`)
            .then(result=>{console.log('qnaqnaqnaqnaqna',result.data),this.qnas=result.data})
            .catch(err=>console.log(err))
        },
        getDateFormat(date) {
      return this.$dateFormat(date);
    },
    addBtn(){
      this.$router.push({
                name: 'mypageQnAInsert', query: {no: this.prodNo}
            });
    }
    }
    }
</script>
<style scoped>
.qna-table {
  width: 100%;
  border-collapse: collapse;
}

.qna-table th, .qna-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.qna-table th {
  background-color: #f2f2f2;
}

.qna-table img {
  max-width: 100px;
  height: auto;
  margin-right: 5px;
}
</style>