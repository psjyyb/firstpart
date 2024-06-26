<template>
    <SideVar></SideVar>
    <div id="padd">
        <h2>취소 상세보기</h2>
        <div class="resume-section-content">
        <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
            <div class="flex-grow-1">
                <p>주문일자 : {{fcancel.order_date}} 주문번호 : {{ fcancel.order_no }}</p>
                <div class="subheading mb-3">
                    <p v-if="fcancel.cancel_state==1">취소 상태 : 취소요청</p>
                    <p v-if="fcancel.cancel_state==2">취소 상태 : 취소완료</p>
                </div>
            </div>
        </div>
    </div>
    <div id="paddd">
        <table class="sc-gnmni8-1 eSpcfO">
            <colgroup><col width="600"><col width=""></colgroup>
            <tbody class="sc-gnmni8-2 hryMPB">
                <tr v-for="cancel in cancels">
        <td class="sc-gnmni8-5 hUzAOG"><div class="sc-ki5ja7-0 bQVZKC">
             <hr />
        </div>
        <div class="sc-fe2r96-0 hmCrGF"></div>
        <div class="sc-1jiyjbz-0 dGiGeF">
            <div class="sc-gnmni8-9 kCcQTc">
                <div class="sc-g8964r-0 oRzGt"></div>
                <div class="sc-9cwg9-1 gLgexz">
                    <div class="sc-9cwg9-2 cNiGzR">
                        <div class="sc-9cwg9-3 eEDOvs">
                            <a class="productLink"href="#"><img width="64"height="64":src="`/api/upload/${cancel.product_img}`"></a>
                        </div>
                        <div class="sc-9cwg9-5 bmwSdh">
                            <div class="sc-9cwg9-6 jBCCpd">
                                <a href="#"target="_blank"class="sc-gnmni8-10 sc-8q24ha-0 yma-DD hPjYZj">
                                <span class="sc-755zt3-1 sc-8q24ha-1 inmgHC ifMZxv">{{cancel.product_name}}</span></a>
                                        <div class="sc-uaa4l4-0 jxRaeI">
                                        <span font-weight="normal" class="sc-755zt3-0 eDgzyT"> {{cancel.product_price}}원</span>
                                        <span class="sc-13xhsmd-0 kYtEGM">
                                        <span class="sc-13xhsmd-1 joIhoV"></span></span>
                                        <span class="sc-755zt3-0 jtWNEg">{{cancel.order_cnt}}개</span>
                                        </div>
                                        <div>
                                        <span>상품총금액:{{cancel.order_cnt*cancel.product_price}}원</span>
                                        </div>
                                    </div>
                                <div class="sc-fxyxvg-0 igPkOG"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </td>
    </tr>
    </tbody>
    </table>
    </div>
    <div>
        <div class="sc-14f0hdm-3 nXoWQ">
        <p>취소일자 : {{fcancel.cancel_date}} 취소접수번호 : {{ fcancel.cancel_no }}</p>
    </div>
    <div>
        <h3 class="mb-0">결제 정보</h3>
        <div>총 주문 금액 : {{fcancel.pay_price}}</div>
        <div>포인트 사용 금액 : {{ fcancel. pay_point}}</div>
        <div>환불받을 금액 : {{ fcancel.pay_price - fcancel.pay_point}}</div>
    </div>
    </div>
    <button type="button" class="btn btn-success" @click="goList">목록으로</button>
    </div>
</template>
<script>
    import axios from 'axios' 
    import SideVar from '../components/SideVar.vue'
    export default{
    components: {SideVar},
    data(){
     return {
        cancels:{},fcancel:{}
     }; 
    },
    created(){
        axios.get(`/api/mypage/CancelInfo/?no=`+this.$route.query.no)
        .then(result=>{console.log(result),this.cancels=result.data,this.fcancel=result.data[0]})
        
    },
    methods:{
        goList(){
            this.$router.push('/mypageCancelList');
        }
    }
    }
</script>
<style></style>