<template>
    <div class="row">
       
          <table class="table table-bordered border-primary">
              <thead>
                  <tr>
                     <th style="text-align: center;">이미지</th>
                     <th style="text-align: center;">별점</th>
                     <th style="text-align: center;">상품명</th>
                     <th style="text-align: center;">상품가격</th>
                     <th style="text-align: center;">작성일</th>
                     <th style="text-align: center;">리뷰수정</th>
                     <th style="text-align: center;">리뷰삭제</th>
                  </tr>
              </thead>
              <tbody v-if=" reviews != ''">
                <tr :key ="i" v-for ="(review, i) in reviews">
                      <td style="text-align: center;"><img width="64"height="64":src="`/api/readproductImg/${review.product_img}`"></td>
                      <td style="text-align: center;"><i :key = "i" v-for="(i) in Number(review.review_score)" class="fa fa-star"></i>
                        <i :key = "i" v-for="(i) in 5- Number(review.review_score)"class="fa fa-star text-secondary"></i></td>
                      <td @click="infoForm(review)">{{ review.product_name }}</td>
                      <td style="text-align: right;">{{getcurrencyFormat(review.product_price) }}원</td>
                      <td>{{ getDateFormat(review.review_date) }}</td>
                      <td style="text-align: center;"><button type="button" class="btn btn-warning" @click="modBtn(review.review_no)">리뷰수정</button></td>
                      <td style="text-align: center;"><button type="button" class="btn btn-danger" @click="delBtn(review.review_no)">리뷰삭제</button></td>
                  </tr>
              </tbody>
              <tbody v-else>
                    <tr>
                        <td colspan="8">조회한 결과가 없습니다</td>
                    </tr>
                </tbody>
          </table>
          <PagingComponent v-bind="page" @go-page="goPage"></PagingComponent>
    
      <div class="col-md 12 col-lg-5 border">
            <ReviewInfo ref="child" :review="review" v-show="watchRe"></ReviewInfo>
        </div>
    </div>
    <div><a class="btn btn-light" href="#">Top</a></div>
  </template>
  <script>
      import pageCalcMixin from '../mixin.js'
      import PagingComponent from './PagingComponent.vue'
      import axios from 'axios'
      import ReviewInfo from '../components/MypageReviewInfo.vue'
      import Swal from 'sweetalert2'
      export default{
      mixins:[pageCalcMixin],
      components: {PagingComponent,ReviewInfo },
      data(){
       return {
          id:9999,
          reviews:{},
          pageUnit:5,
          page:{},
          review:{},
          watchRe:false
       }; 
      },
      created(){
        this.id=this.$store.getters.getUserInfo.user_id
          this.goPage(1);
      },
      methods:{
          async goPage(page){
          let pageUnit =this.pageUnit;
          let result = await axios.get(`/api/mypage/NoReviewList/?pageUnit=${pageUnit}&page=${page}&id=${this.id}`);
          this.reviews = result.data.list;
          console.log('reviewssss',result.data)
          this.page =this.pageCalc(page,result.data.count[0].ncnt,5,pageUnit);
          console.log(this.page)
      },
      async delBtn(no){
        console.log(no);
            await axios.delete(`/api/mypage/ReviewDelete/`+no)
            .then(result=>{Swal.fire('리뷰 삭제완료!'),
            this.goPage(1);
            })
            .catch(err=>{console.log(err),Swal.fire('삭제실패!')})
        },
        infoForm(review){
          this.watchRe=true;
            //this.review=review;
            this.$refs.child.getData(review)
        },
        getDateFormat(date) {
      return this.$dateFormat(date);
    },
    getcurrencyFormat(value){
        return this.$currencyFormat(value);
    },
    modBtn(no){
      this.$router.push({ name: 'mypageReviewUpdate', query: { no: no } });
    }
      }
      }
  </script>
  <style>
  .nav-tabs {
    style: none;
  }

</style>