<template>
    <SideVar></SideVar>
    <div id="padd">
    <div class="wish-title st-wish-title">
        <h3 class="sr-only">♥찜한 상품♥</h3>
    <!-- <span class="st-wish-icon"></span><span class="total-count st-total-count"> 총<span>1</span>개</span> -->
    </div>
  <div>
        <table class="table table-bordered border-primary">
            <thead>
                <tr>
                    <th>남바</th>
                    <th scope="col"><input type="checkbox" v-model="allChecked" @click="checkedAll($event.target.checked)"></th>
                    <th>상품이미지</th>
                    <th>상품명</th>
                    <th>상품가격</th>
                </tr>
            </thead>
            <tbody v-if="wishs != ''">
                <tr v-for="wish in wishs">
                    <td>{{wish.wish_no}}</td>
                    <td>
                        <p class="mb-0 mt-4"><input type="checkbox" v-model="wish.selected" @change="AllChecked"></p>
                    </td>
                    <td><img width="64"height="64":src="`/api/readproductImg/${wish.product_img}`"></td>
                    <td>{{wish.product_name}}</td>
                    <td>{{getcurrencyFormat(wish.product_price)}}원</td>
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
    <div>
        <button @click="delSel" class="btn btn-warning">선택삭제</button>
        <button @click="getCart" type="button" class="btn btn-success">선택담기</button>
    </div>

    </div>
</template>
<script>
  import pageCalcMixin from '../mixin.js'
    import SideVar from '../components/SideVar.vue'
    import PagingComponent from '../components/PagingComponent.vue'
    import axios from 'axios'
    import Swal from 'sweetalert2'
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
        this.id=this.$store.getters.getUserInfo.user_id
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
            .then(result=>{console.log(result),Swal.fire('삭제완료!'),this.goPage(1);})
            .catch(err=>console.log(err));
            
            // 선택삭제 포이치 돌려서 선택된 놈들의 번호 가지고 와서 삭제요청
        }
    })
        this.goPage(1);
    },
    getCart(){
        this.wishs.forEach(a=>{if(a.selected==true){
            console.log(a.product_no)
            axios.post(`/api/mypage/wishGetCart/?id=${this.id}&pno=${a.product_no}`)
            .then(result=>{console.log(result),Swal.fire('장바구니에 담기 성공!'),this.goPage(1);})
            .catch(err=>console.log(err));
        }})
        this.goPage(1);
    },
    getcurrencyFormat(value){
        return this.$currencyFormat(value);
    }
    }
    }
</script>
<style></style>