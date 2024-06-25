<template>
    <SideVar></SideVar>
    <div class="wish-title st-wish-title">
        <h3 class="sr-only">♥찜한 상품♥</h3>
    <span class="st-wish-icon"></span><span class="total-count st-total-count"> 총<span>1</span>개</span>
    </div>
  <div>
        <table class="table table-success table-striped-columns">
            <thead>
                <tr>
                    <th>남바</th>
                    <th>상품이미지</th>
                    <th>상품명</th>
                    <th>상품가격</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="wish in wishs">
                    <td>{{wish.wish_no}}</td>
                    <td>{{wish.product_img}}</td>
                    <td>{{wish.product_name}}</td>
                    <td>{{wish.product_price}}</td>
                </tr>
            </tbody>
        </table>
        <PagingComponent v-bind="page" @go-page="goPage"></PagingComponent>
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
        wishs:{},
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
        let result = await axios.get(`/api/mypage/WishList/?pageUnit=${pageUnit}&page=${page}&id=${this.id}`);
        this.wishs = result.data.list;
        console.log('wishs',result.data)
        this.page =this.pageCalc(page,result.data.count[0].cnt,5,pageUnit);
        console.log(this.page)
    }
    }
    }
</script>
<style></style>