<template>
    <div class="row">
        <div class="col-md 12 col-lg-7 border p-5">
      <h4>작성한 리뷰</h4>
          <table class="table table-bordered border-primary">
              <thead>
                  <tr>
                     <th>이미지</th>
                     <th>별점</th>
                     <th>상품명</th>
                     <th>상품가격</th>
                     <th>작성일</th>
                     <th>리뷰삭제</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="review in reviews">
                      <td><img width="64"height="64":src="`/api/upload/${review.product_img}`"></td>
                      <td><div><template v-for="star in review.review_score">★</template></div></td>
                      <td @click="infoForm(review)">{{ review.product_name }}</td>
                      <td>{{ review.product_price }}</td>
                      <td>{{ getDateFormat(review.review_date) }}</td>
                      <td><button type="button" class="btn btn-danger" @click="delBtn(review.review_no)">리뷰삭제</button></td>
                  </tr>
              </tbody>
          </table>
          <PagingComponent v-bind="page" @go-page="goPage"></PagingComponent>
      </div>
      <div class="col-md 12 col-lg-5 border">
            <ReviewInfo ref="child" :review="review"></ReviewInfo>
        </div>
    </div>
  </template>
  <script>
      import pageCalcMixin from '../mixin.js'
      import PagingComponent from './PagingComponent.vue'
      import axios from 'axios'
      import ReviewInfo from '../components/MypageReviewInfo.vue'
      export default{
      mixins:[pageCalcMixin],
      components: {PagingComponent,ReviewInfo },
      data(){
       return {
          id:9999,
          reviews:{},
          pageUnit:5,
          page:{},
          review:{}
       }; 
      },
      created(){
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
            .then(result=>{alert('리뷰 삭제완료!'),
            this.goPage(1);
            })
            .catch(err=>{console.log(err),alert('삭제실패!')})
        },
        infoForm(review){
            //this.review=review;
            this.$refs.child.getData(review)
        },
        getDateFormat(date) {
      return this.$dateFormat(date);
    },
      }
      }
  </script>
  <style></style>