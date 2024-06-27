<template>
    <!-- <Header /> -->

     <SideVar></SideVar>
    <div id="padd">
    <SideVar></SideVar>
    <SideVar/>
    <div>

        <hr />
        <h4>나의 포인트:{{ user.user_point }}</h4>
        <hr />
        <div class="info">
            <div class="con">
                <h3>상품 Q&amp;A</h3>
                <ul>
                    <li>답변 처리중인 질문 <span><b><a href="/mypageQnAList">{{ qnaNoCount }}</a></b>건</span></li>
                    <li>답변 완료된 상담 <span><b><a href="/mypageQnAList" title="답변 완료된 상담">{{ qnaYesCount }}</a></b>건</span></li>
                </ul>
            </div>
            <div class="con last">
                <h3>리뷰</h3>
                <ul>
                    <li>작성한 리뷰 <span><b><a href="/mypageReviewList" title="작성해주실 상품평">{{ reviewYesCount }}</a></b>건</span></li>
                    <li>작성가능한 리뷰 <span><b><a href="/mypageReviewList" title="작성하신 상품평">{{ reviewNoCount }}</a></b>건</span></li>
                </ul>
            </div>
        </div>
        <hr />
        <div class="b_order_list item">
            <h3><img src="https://img.dongwonmall.com/dwmall/web/images/content/mydw/tit02_mydw_main.gif" alt="최근 주문내역"></h3>
            <div class="tbl_list_mydw c_black">
                <table class="table table-success table-striped-columns">
                    <thead>
                        <tr>
                            <th>주문일</th>
                            <th>주문내역</th>
                            <th>주문상태</th>
                            <th>주문관리</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr class="last"  v-if="lastOrder=[]">
                                <td colspan="4"><div class="nodata"><p>최근 구매 상품이 없습니다.</p></div></td>
                            </tr>
                            <tr v-else>
                                <td colspan="4">{{ lastOrder.orderDate }}</td>
                                <td colspan="4">{{ lastOrder.productName }}</td>
                                <td colspan="4">{{ lastOrder.orderStatus }}</td>
                                <td colspan="4">{{ lastOrder.prodcnt }}</td>
                            </tr>
                        </tbody>
                </table>
            </div>
        </div>
        </div>
    </div>
    <!-- <Footer /> -->
</template>
<script>

import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import SideVar from '../components/SideVar.vue'
import axios from 'axios'
    export default{
        components: { Header, Footer,SideVar },

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
    created(){
        axios.get('/api/mypage/'+this.id)
        .then(result=>{console.log(result)
            this.reviewYesCount=result.data.revieYesCount[0].ycnt,
            this.reviewNoCount=result.data.revieNoCount[0].ncnt,
            this.qnaNoCount=result.data.qnaNoCount[0].ncnt,
            this.qnaYesCount=result.data.qnaYesCount[0].ycnt,
            this.user=result.data.userInfo[0],
            this.lastOrder=result.data.lastOrder[0]
            
        })
        .catch(err=>console.log(err))
    },
    methods:{
    }
    }
</script>
<style>
#padd{
    padding-left: 14.3%;
}
</style>