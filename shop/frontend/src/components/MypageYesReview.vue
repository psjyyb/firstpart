<template>
  <div>
        <table class="table table-bordered border-primary">
            <thead>
                <tr>
                   <th style="text-align: center;">이미지</th>
                   <th style="text-align: center;">상품명</th>
                   <th style="text-align: center;">상품가격</th>
                   <th style="text-align: center;">주문일</th>
                   <th style="text-align: center;">리뷰남기기</th>
                </tr>
            </thead>
            <tbody v-if="reviews != ''">
                <tr v-for="review in reviews">
                    <td style="text-align: center;"><img width="64"height="64":src="`/api/readproductImg/${review.product_img}`"></td>
                    <td>{{ review.product_name }}</td>
                    <td style="text-align: right;">{{getcurrencyFormat(review.product_price) }}원</td>
                    <td>{{ getDateFormat(review.order_date) }}</td>
                    <td style="text-align: center;"><button type="button" class="btn btn-primary" @click="addReview(review.product_no)">리뷰쓰기</button></td>
                </tr>
            </tbody>
            <tbody v-else>
                    <tr>
                        <td colspan="8">조회한 결과가 없습니다</td>
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
        this.id=this.$store.getters.getUserInfo.user_id
        this.goPage(1);
    },
    methods:{
        async goPage(page){
        let pageUnit =this.pageUnit;
        let result = await axios.get(`/api/mypage/YesReviewList/?pageUnit=${pageUnit}&page=${page}&id=${this.id}`);
        this.reviews = result.data.list;
        console.log('yyreviews',result.data)
        this.page =this.pageCalc(page,result.data.count[0].ycnt,5,pageUnit);
        console.log(this.page)
    },
    addReview(no){
        
        this.$router.push({
                name: 'mypageReviewInsert', query: {no: no}
            });
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
    getcurrencyFormat(value){
        return this.$currencyFormat(value);
    }
    }
    }
</script>
<style></style>