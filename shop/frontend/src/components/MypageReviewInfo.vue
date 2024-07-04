<template>
    <div class="container">
      <div class="product-info card p-3 mb-3">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">상품명:</label>
          <div class="col-sm-10">
            <input v-model="info.product_name" class="form-control" readonly>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">상품가격:</label>
          <div class="col-sm-10">
            <input v-model="info.product_price" class="form-control" readonly>
          </div>
        </div>
        <div class="text-center">
          <img :src="`/api/upload/${info.product_img}`" class="img-thumbnail" width="128" height="128">
        </div>
      </div>
      
      <div class="review-info card p-3 mb-3">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">리뷰번호:</label>
          <div class="col-sm-10">
            <input v-model="info.review_no" class="form-control" readonly>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">리뷰내용:</label>
          <div class="col-sm-10">
            <textarea v-model="info.review_content" class="form-control"></textarea>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">작성일:</label>
          <div class="col-sm-10">
            <p class="form-control-plaintext">{{ getDateFormat(info.review_date) }}</p>
          </div>
        </div>
        <div class="review-images row">
          <div class="col-6 col-sm-4 col-md-3 mb-2" v-for="img in imgs" :key="img.add_name">
            <img :src="`/api/upload/${img.add_name}`" class="img-fluid img-thumbnail">
          </div>
        </div>
        <div class="text-center mt-3">
          <button type="button" class="btn btn-primary" @click="modBtn">수정</button>
        </div>
      </div>
    </div>
  </template>
  
<script>
    import pageCalcMixin from '../mixin.js'
    import axios from 'axios';
    import Swal from 'sweetalert2'
    export default{
    mixins:[pageCalcMixin],
    data(){
     return {
            info:{},
            imgs:{}
     }; 
    },
    created(){
    },
    // computed:{
    //     checkReview(){
    //         return this.reviewData.order_no == null ? true:false;
    //     }
    // },
    methods:{
       async getData(review){
            this.info=review;
            console.log('dddddd',this.info)
            //console.log('자식이벤트 호출',review,'<- 여기 내용 다 들어있고 이미지만 불러오면됨')    
            await axios.get(`/api/mypage/reviewImg/`+review.review_no)
            .then(result=>{console.log('이미지지지지지',result),this.imgs=result.data })
            .catch(err=>console.log(err))
        },
       async modBtn(){
            console.log(this.info)
           await axios.put(`/api/mypage/reviewUpdate?content=${this.info.review_content}&rno=${this.info.review_no}`)
           .then(Swal.fire('리뷰수정 완료!'))
           .catch(err=>console.log(err))
        },
        getDateFormat(date) {
      return this.$dateFormat(date);
    },
    
    }
    }
</script>
<style></style>