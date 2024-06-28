<template>
    <div>
        f리리리리부부부ㅜㅂ잉노포
    </div>
</template>
<script>
    import axios from 'axios';
    export default{
        props:{
            review:{type:Object} 
        },
    data(){
     return {
            reviewData:{...this.review},
            info:{},
            img:{}
     }; 
    },
    created(){
    },
    // computed:{
    //     checkReview(){
    //         return this.reviewData.order_no == null ? true:false;
    //     }
    // },
    methods:{
       async getData(review){
            console.log('자식이벤트 호출',review.review_no,'이거맞아???')    
            await axios.get(`/api/mypage/reviewInfo/`+review.review_no)
        }
    }
    }
</script>
<style></style>