<template>
    <SideVar></SideVar>
    <div id="padd">
    <div class="wish-title st-wish-title">
        <h3 class="sr-only">♥찜한 상품♥</h3>
    <span class="st-wish-icon"></span><span class="total-count st-total-count"> 총<span>1</span>개</span>
    </div>
  <div>
        <table class="table table-success table-striped-columns">
            <thead>
                <tr>
                    <!-- <th><input type="checkbox" v-model="allChecked" @click="checkedAll($event.target.checked)"></th> -->
                    <th>남바</th>
                    <th>상품이미지</th>
                    <th>상품명</th>
                    <th>상품가격</th>
                    <th>상품갯수</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cart in carts">
                    <!-- <td><input type="checkbox" v-model="c.selected" @change="AllChecked"></td> -->
                    <td>{{cart.cart_no}}</td>
                    <td><img width="64"height="64":src="`/api/readproductImg/${cart.product_img}`"></td>
                    <td>{{cart.product_name}}</td>
                    <td>{{cart.product_price}}</td>
                    <td>{{cart.cart_cnt}}</td>
                </tr>
            </tbody>
        </table>
        <PagingComponent v-bind="page" @go-page="goPage"></PagingComponent>
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
        id:'user01',
        carts:{},
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
        let result = await axios.get(`/api/mypage/CartList/?pageUnit=${pageUnit}&page=${page}&id=${this.id}`);
        this.carts = result.data.list;
        console.log('carts',result.data)
        this.page =this.pageCalc(page,result.data.count[0].cnt,5,pageUnit);
        console.log(this.page)
    }
    }
    }
</script>
<style></style>