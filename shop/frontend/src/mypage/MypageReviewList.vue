<template>
    <SideVar/>
    <div id="padd">
    <div>
        <yesReview/>
    </div>
    <div>
        <noReview/>
    </div>
    </div>
</template>
<script>
    import noReview from '../components/MypageNoReview.vue'
    import yesReview from '../components/MypageYesReview.vue'
    import pageCalcMixin from '../mixin.js'
    import SideVar from '../components/SideVar.vue'
    import PagingComponent from '../components/PagingComponent.vue'
    import axios from 'axios'
    export default{
    mixins:[pageCalcMixin],
    components: {SideVar,PagingComponent,yesReview,noReview },
    data(){
     return {
        id:9999,
        // yreviews:{},
        // pageUnit:5,
        // page:{}
     }; 
    },
    created(){
    },
    methods:{
    //     async goPage(page){
    //     let pageUnit =this.pageUnit;
    //     let result = await axios.get(`/api/mypage/YesReviewList/?pageUnit=${pageUnit}&page=${page}&id=${this.id}`);
    //     this.yreviews = result.data.list;
    //     console.log('yreviews',result.data.count[0].cnt)
    //     this.page =this.pageCalc(page,result.data.count[0].cnt,5,pageUnit);
    //     console.log(this.page)
    // }
    }
    }
</script>
<style></style>