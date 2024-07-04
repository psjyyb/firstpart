<template>
    <SideVar/>
    <div>
      <img width="120" height="120" :src="`/api/upload/${review.product_img}`">
      <h4>{{ review.product_name}}</h4>
      <div class="inner">
        <div class="star-rating">
          별점남기기
          <template class="star" v-for="index in 5">
            <span :key="index" @click="check(index)" v-if="index < score" v-bind="star">🍎</span>
            <span :key="index" @click="check(index)" v-if="index >= score" v-bind="star">🍏</span>
          </template>
        </div>
      </div>
      <hr />
      <div>
        <h3>리뷰 내용</h3>
        <textarea rows="8" cols="70" v-model="review.review_content"></textarea>
        <h4>사진첨부</h4>
        <input multiple @change="upload" ref="imageFile" type="file" id="file" accept="image/*">
        <hr />
        <button type="button" class="btn btn-success" @click="modReview">수정</button>
        <button type="button" class="btn btn-warning" @click="canBtn">취소</button>
      </div>
    </div>
  </template>
  
<script>
    import axios from 'axios';
    import Swal from 'sweetalert2'
    import SideVar from '../components/SideVar.vue'
    export default{
    components: { SideVar },
    data(){
     return { info:{},
              review: {},
              imgFile: [],
              score: 0,
    }; 
    },
    created(){
        axios.get(`/api/mypage/ReviewInfo/`+this.$route.query.no)
        .then(result=>{this.score=result.data[0].review_score,this.review=result.data[0],console.log('dldldldlslslsl',this.review)})
        //this.$route.query.no
    },
    methods:{
      check(index) {
        this.score = index + 1;
        console.log(index);
        this.review.review_score = index;
    },
    upload() {
      const files = Array.from(this.$refs.imageFile.files);
      this.imgFile = [...this.imgFile, ...files];
      console.log(this.imgFile);
    },
    async modReview() {
      let data = new FormData();
      for (let i = 0; i< this.imgFile.length; i++) {
        data.append("files", this.imgFile[i]);
      }
      data.append("content", this.review.review_content);
      data.append("score", this.review.review_score);
      data.append("reviewNo",this.review.review_no);
     await axios.post('/api/mypage/ReviewUpdate/', data,
      { headers:{'Content-Type':'multipart/form-data'}})
      .then(this.$router.push('/mypageReviewList'),Swal.fire('리뷰 수정완료!'))
      .catch(err=>console.log(err))
    },
    canBtn(){
        this.$router.push('/mypageReviewList');
    }
    }
    }
</script>
<style></style>