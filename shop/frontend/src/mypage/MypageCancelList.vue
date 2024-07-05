<template>
    <SideVar />
    <div id="padd">
        <div class="notice_mydw">
            <ul>
                <li>주문취소는 주문접수, 결제완료 시점에서 전체취소만 가능하며, 이 외의 경우(부분취소, 발송준비/발송완료 시점)엔 <b>고객센터(8509-3418)</b>로 문의하시기 바랍니다.</li>
                <li>부분 취소는 불가능합니다. 전체 주문에 대해서만 취소가 가능합니다.</li>
                <li>주문 취소를 원하시면 고객 센터에 문의하거나, 주문 내역 페이지에서 직접 취소 요청을 해주세요</li>
                <li>주문 취소 시 회원 혜택(적립금, 포인트 등)은 취소됩니다.</li>
                <li>주문 취소 시 취소 사유를 제공해 주시면, 더 나은 서비스 제공을 위해 참고하겠습니다.</li>
                <li>취소 요청은 영업일 기준으로 24시간 이내에 처리됩니다.</li>
            </ul>
        </div>
        <div>
            <table class="table table-bordered border-primary">
                <thead>
                    <tr>
                        <th style="text-align: center;">주문번호</th>
                        <th style="text-align: center;">주문일자</th>
                        <th style="text-align: center;">상품명</th>
                        <th style="text-align: center;">이미지</th>
                        <th style="text-align: center;">주문가격</th>
                        <th style="text-align: center;">취소일자</th>
                        <th style="text-align: center;">취소상태</th>
                    </tr>
                </thead>
                <tbody v-if="cancels!=''">
                    <tr v-for="cancel in cancels" :key="cancel.cancel_no">
                        <td>{{ cancel.order_no }}</td>
                        <td>{{ getDateFormat(cancel.order_date) }}</td>
                        <td  @click="goInfo(cancel.cancel_no)">{{ cancel.product_name }}</td>
                        <td style="text-align: center;"><img width="64" height="64" :src="`/api/readproductImg/${cancel.product_img}`" alt="상품 이미지"></td>
                        <td style="text-align: right;">{{ getcurrencyFormat(cancel.pay_price) }}원</td>
                        <td>{{ getDateFormat(cancel.cancel_date) }}</td>
                        <td>
                            <span v-if="cancel.cancel_state == 1">취소요청</span>
                            <span v-else>취소완료</span>
                        </td>
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
        <div class="step_guide_mydw">
            <h4>취소/교환/반품 현황 단계 안내</h4>
            <div class="con item4">
                <ol class="ostep3">
                    <li>STEP 1 신청 : 고객님께서 상품의 취소/교환/반품을 신청하셨습니다.</li>
                    <li>STEP 2 접수 : 고객님의 취소/교환/반품 요청을 정상적으로 접수하여 확인중인 단계입니다.</li>
                    <li>STEP 3 처리중 : 취소/교환/반품이 확정되어 처리가 되는 단계 입니다.</li>
                    <li>STEP 4 완료 : 고객님의 요청이 정상적으로 처리 완료 되었습니다.</li>
                </ol>
            </div>
        </div>
    </div>
</template>
<script>
    import pageCalcMixin from '../mixin.js'
    import SideVar from '../components/SideVar.vue'
    import PagingComponent from '../components/PagingComponent.vue'
    import axios from 'axios'
    export default{
    mixins:[pageCalcMixin],
    components: {SideVar,PagingComponent },
    data(){
     return {
        id:9999,
        cancels:{},
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
        let result = await axios.get(`/api/mypage/cancelList/?pageUnit=${pageUnit}&page=${page}&id=${this.id}`);
        this.cancels = result.data.list;
        console.log('cancels',result)
        this.page =this.pageCalc(page,result.data.count[0].cnt,5,pageUnit);
        console.log(this.page)
        console.log('취소록곡',this.cancels)
    },
    goInfo(no){
        this.$router.push({
                name: 'mypageCancelInfo', query: {no: no}
            });
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
    getcurrencyFormat(value){
        return this.$currencyFormat(value);
    },
    }
    }
</script>
<style>

</style>