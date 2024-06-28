<template>
    <div>
      <img width="120" height="120" :src="`/api/upload/${info.product_img}`">
      <h4>{{ info.product_name }}</h4>
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
        <textarea rows="8" cols="70" v-model="review.content"></textarea>
        <h4>사진첨부</h4>
        <input multiple @change="upload" ref="imageFile" type="file" id="file" accept="image/*">
        <button @click="editReview">등록</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        info: {},
        score: 0,
        review: {},
        imgFile: [],
        imageUrl: '',
        id:'9999',
        cnt:[]
      };
    },
    created() {
      axios.get(`api/mypage/ReviewInsertInfo/` + this.$route.query.no)
        .then(result => {
          console.log(result);
          this.info = result.data[0];
        });
    },
    methods: {
      check(index) {
        this.score = index + 1;
        console.log(index);
        this.review.star = index + 1; // 점수 범위를 1부터 5까지 맞추기 위해 수정
      },
      upload() {
        const files = Array.from(this.$refs.imageFile.files);
        this.imgFile = [...this.imgFile, ...files];
        console.log(this.imgFile);
      },
     async editReview() {
        let data = new FormData();
        for (let i = 1; i<= this.imgFile.length; i++) {
            this.cnt.push(i)
          data.append("files", this.imgFile[i]);
        }
        data.append("content", this.review.content);
        data.append("score", this.review.star);
        data.append("userId",this.id);
        data.append("productNo",this.$route.query.no);
        data.append("orderNo",this.info.order_no)
        data.append("cnt",this.cnt)
        console.log('zkzkzkzkdnsnsn',this.cnt);
       await axios.post('/api/mypage/ReviewInsert/', data,
        { headers:{'Content-Type':'multipart/form-data'}})
      }
    }
  };
  </script>
  
  <style>
  </style>