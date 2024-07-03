<template>
    <div class="container my-5">
      <SideVar></SideVar>
      <div id="padd">
        <div>{{ user.user_id }}님 환영합니다!</div>
        <div class="points-section card p-3 mb-3">
          <h4>나의 포인트: <span class="text-primary">{{ user.user_point }}</span></h4>
        </div>
        <div class="info card p-3 mb-3">
          <div class="con mb-3">
            <h3>상품 Q&amp;A</h3>
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                답변 처리중인 질문
                <span><b><a href="/mypageQnAList">{{ qnaNoCount }}</a></b>건</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                답변 완료된 상담
                <span><b><a href="/mypageQnAList" title="답변 완료된 상담">{{ qnaYesCount }}</a></b>건</span>
              </li>
            </ul>
          </div>
          <div class="con last">
            <h3>리뷰</h3>
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                작성가능한 리뷰
                <span><b><a href="/mypageReviewList" title="작성해주실 상품평">{{ reviewYesCount }}</a></b>건</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                작성한 리뷰
                <span><b><a href="/mypageReviewList" title="작성하신 상품평">{{ reviewNoCount }}</a></b>건</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="b_order_list card p-3 mb-3">
          <h3 class="card-title">
            <img src="https://img.dongwonmall.com/dwmall/web/images/content/mydw/tit02_mydw_main.gif" alt="최근 주문내역">
          </h3>
          <div class="tbl_list_mydw c_black">
            <table class="table table-bordered border-primary">
              <thead>
                <tr>
                  <th>주문일</th>
                  <th>주문내역</th>
                  <th>주문상태</th>
                  <th>주문갯수</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="lastOrder">
                  <td>{{ getDateFormat(lastOrder.order_date) }}</td>
                  <td @click="orderInfo(lastOrder.order_no)">{{ lastOrder.product_name }}</td>
                  <td v-if="lastOrder.order_status == 1">결제완료</td>
                  <td v-else-if="lastOrder.order_status == 2">상품준비중</td>
                  <td v-else-if="lastOrder.order_status == 3">배송중</td>
                  <td v-else-if="lastOrder.order_status == 4">배송완료</td>
                  <td v-else-if="lastOrder.order_status == 5">구매확정</td>
                  <td v-else-if="lastOrder.order_status == 6">취소요청</td>
                  <td v-else-if="lastOrder.order_status == 7">취소완료</td>
                  <td>{{ lastOrder.prodcnt }}</td>
                </tr>
                <tr v-else>
                  <td colspan="4">
                    <div class="nodata text-center">
                      <p>최근 구매 상품이 없습니다.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
<script>
// import { mapGetters } from "vuex";
// import store from "@/store";
import pageCalcMixin from '../mixin.js'
import SideVar from '../components/SideVar.vue'
import axios from 'axios'
    export default{
        mixins:[pageCalcMixin],
        components: {SideVar },
    data(){
     return {
        id:9999,
        user:{},
        qnaNoCount:0,
        qnaYesCount:0,
        reviewYesCount:0,
        reviewNoCount:0,
        lastOrder:{}
     }; 
    },
    // computed: {
    //     ...mapGetters(["getUserInfo"]),
    //     user() {
    //         return this.getUserInfo;
    //     },
    // },
    created(){
        console.log(this.$store.getters.getUserInfo.user_id)
        this.id=this.$store.getters.getUserInfo.user_id
        axios.get('/api/mypage/firstPage/'+this.id)
        .then(result=>{console.log(result)
            this.reviewYesCount=result.data.revieYesCount[0].ycnt,
            this.reviewNoCount=result.data.revieNoCount[0].ncnt,
            this.qnaNoCount=result.data.qnaNoCount[0].ncnt,
            this.qnaYesCount=result.data.qnaYesCount[0].ycnt,
            this.user=result.data.userInfo[0],
            this.lastOrder=result.data.lastOrder[0],
            console.log(this.user)
            
        })
        .catch(err=>console.log(err))
    },
    methods:{
        orderInfo(no){
        this.$router.push({
                name: 'mypageOrderInfo', query: {no: no}
            });
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
    }
    }
</script>
<style>
#padd{
    padding-left: 14.3%;
}
</style>