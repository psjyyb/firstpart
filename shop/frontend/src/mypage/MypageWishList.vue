<template>
    <SideVar></SideVar>
    <div id="padd">
    <div class="wish-title st-wish-title">
        <h3 class="sr-only">♥찜한 상품♥</h3>
    <!-- <span class="st-wish-icon"></span><span class="total-count st-total-count"> 총<span>1</span>개</span> -->
    </div>
  <div>
        <table class="table table-success table-striped-columns">
            <thead>
                <tr>
                    <th>남바</th>
                    <th scope="col"><input type="checkbox" v-model="allChecked" @click="checkedAll($event.target.checked)"></th>
                    <th>상품이미지</th>
                    <th>상품명</th>
                    <th>상품가격</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="wish in wishs">
                    <td>{{wish.wish_no}}</td>
                    <td>
                        <p class="mb-0 mt-4"><input type="checkbox" v-model="wish.selected" @change="AllChecked"></p>
                    </td>
                    <td><img width="64"height="64":src="`/api/upload/${wish.product_img}`"></td>
                    <td>{{wish.product_name}}</td>
                    <td>{{wish.product_price}}</td>
                </tr>
            </tbody>
        </table>
        <PagingComponent v-bind="page" @go-page="goPage"></PagingComponent>
    </div>
    <div>
        <button @click="delSel" class="btn btn-warning">선택삭제</button>
    </div>
    <div>
        <button @click="orderSel" class="btn btn-primary">선택담기</button>
        <button @click="orderAll" class="btn btn-primary">전체담기</button>
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
        wishs:{},
        pageUnit:5,
        page:{}, allChecked : false
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
    },
    checkedAll(checked){
                    this.wishs.forEach(a => a.selected = checked);
                    console.log(checked)
                },
    async delSel(){
        this.wishs.forEach(a=>{if(a.selected==true){
            console.log(a.wish_no)
            axios.delete(`/api/mypage/wishDelete/`+a.wish_no)
            .then(this.goPage(1))
            // 선택삭제 포이치 돌려서 선택된 놈들의 번호 가지고 와서 삭제요청
        }})
    }
    }
    }
</script>
<style></style>