<template>
    <div>
      <h4>작성한 리뷰</h4>
          <table class="table table-success table-striped-columns">
              <thead>
                  <tr>
                     <th>이미지</th>
                     <th>상품명</th>
                     <th>상품가격</th>
                     <th>작성일</th>
                     <th>리뷰삭제</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="review in reviews">
                      <td>{{ review.product_img }}</td>
                      <td>{{ review.product_name }}</td>
                      <td>{{ review.product_price }}</td>
                      <td>{{ review.review_date }}</td>
                      <td><button>리뷰삭제</button></td>
                  </tr>
              </tbody>
          </table>
          <PagingComponent v-bind="page" @go-page="goPage"></PagingComponent>
      </div>
  </template>
  <script>
      import pageCalcMixin from '../mixin.js'
      import PagingComponent from './PagingComponent.vue'
      import axios from 'axios'
      export default{
      mixins:[pageCalcMixin],
      components: {PagingComponent },
      data(){
       return {
          id:9999,
          reviews:{},
          pageUnit:5,
          page:{}
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
          console.log('reviews',result.data)
          this.page =this.pageCalc(page,result.data.count[0].ncnt,5,pageUnit);
          console.log(this.page)
      }
      }
      }
  </script>
  <style></style>