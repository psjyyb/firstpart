<template>
    <SideVar/>
    <div id="padd">
   <div class="notice_mydw">
        <ul>
            <li>주문취소는 주문접수, 결제완료 시점에서 전체취소만 가능하며, 이 외의 경우엔 고객센터(8509-3418)로 문의하시기 바랍니다.</li>
            <li>입력하신 배송 주소가 정확한지 다시 한 번 확인해 주세요. 주소 오류로 인한 배송 지연 또는 문제에 대해 책임지지 않습니다</li>
            <li>주문과 관련하여 궁금한 사항이 있으면 언제든지 고객 센터로 문의해 주세요.</li>
            <li>주문 후 변경이나 추가 주문을 원하실 경우, 발송 전에 고객 센터로 연락해 주세요.</li>
            <li>상품이 파손되었거나 분실된 경우, 즉시 고객 센터로 연락해 주세요. 문제 해결을 도와드리겠습니다.</li>
            <li>상품의 자세한 설명과 사용법은 상품 페이지에서 확인해 주세요. 올바른 사용법을 숙지하시기 바랍니다.</li>
            <li>적립금을 사용하실 경우, 주문 시 적용해 주세요. 주문 후에는 할인 적용이 불가능합니다</li>
        </ul>
    </div>
    <div>
        <table class="table table-bordered border-primary">
            <thead>
                <tr>
                    <th>상품이미지</th>
                    <th>주문일</th>
                    <th>상품명</th>
                    <th>주문상태</th>
                    <th>주문갯수</th>
                    <th>주문취소</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders">
                    <td><img width="64"height="64":src="`/api/upload/${order.product_image}`"></td>
                    <td>{{ order.order_date }}</td>
                    <td @click="orderInfo(order.order_no)">{{ order.product_name }}</td>
                    <td v-if="order.order_status==1">결제완료</td>
                    <td v-else-if="order.order_status==2">상품준비중</td>
                    <td v-else-if="order.order_status==3">배송중</td>
                    <td v-else-if="order.order_status==4">배송완료</td>
                    <td v-else-if="order.order_status==5">구매확정</td>
                    <td v-else>배송지연</td>
                    <td>{{ order.product_count }}</td>
                    <td><button type="button" class="btn btn-warning" v-if="order.order_status==1" @click="orderDel(order.order_no)">주문취소</button></td>
                </tr>
            </tbody>
        </table>
        <PagingComponent v-bind="page" @go-page="goPage"></PagingComponent>
    </div>
    <div class="step_guide_mydw">
        <h4>주문현황 단계</h4>
        <div class="con item6">
            <ol class="ostep1">
                <li>
                    <span class="ostep1_2">STEP 1 결제완료 : 주문/결제가 확인된 상태입니다.</span><br>
                    본 단계에서는 온라인상<br>에서 주문에 대한 취소가 <br>가능 합니다.
                </li>
                <li>
                    <span class="ostep1_5">STEP 2 배송중 : 택배사 인계되어 상품이 배송중 입니다.</span><br>
                    <span class="otxt1">업체배송 상품일 경우 <br>발송완료 3일 후 <br><strong>[배송완료]</strong>로 처리됩니다.</span>
                </li>
                <li class="l">
                    <span class="ostep1_6">STEP 3 배송완료 : 상품이 배송완료 되었습니다.</span><br>
                    배송을 받지 못하셨을 <br>경우 고객센터로 연락 <br>바랍니다. (8509-3418)
                </li>
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
        orders:{},
        pageUnit:5,
        page:{}
     }; 
    },
    created(){
        this.goPage(1);
        // axios.get('/api/mypage/orderList/' + this.id)
        // .then(result=>{console.log(result),this.orders=result.data})
    },
    methods:{
        async goPage(page){
        let pageUnit =this.pageUnit;
        let result = await axios.get(`/api/mypage/orderList/?pageUnit=${pageUnit}&page=${page}&id=${this.id}`);
        this.orders = result.data.list;
        console.log('orders',result.data)
        this.page =this.pageCalc(page,result.data.count[0].cnt,5,pageUnit);
        console.log(this.page)
    },
    orderInfo(no){
        this.$router.push({
                name: 'mypageOrderInfo', query: {no: no}
            });
    },
    async orderDel(no){
        console.log(no);
        await axios.delete(`/api/mypage/orderDelete/`+no)
        .then( await axios.post(`/api/mypage/cancelInsert/?no=${no}&id=${this.id}`)
            .then(result=>console.log(result))
            .catch(err=>console.log(err))
            )
        .catch(err=>console.log(err))
        .then(this.goPage(1))
        // 삭제가 아니라 주문을 취소하게 되면 주문 테이블에서는 삭제가 되고
        // 취소테이블에 해당 주문번호로 추가되어야한다//트랜잭션
    }
    }
    }
</script>
<style></style>