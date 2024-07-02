<template>
    <hr>
    <hr>
    <hr>
    <hr>
     <div>
        상품명:<input v-model="info.product_name" readonly >
    </div>
    <div>
        상품가격:<input v-model="info.product_price" readonly>
    </div>
    <img width="64"height="64":src="`/api/upload/${info.product_img}`">
    <hr>
    <div>
        리뷰번호:<input v-model="info.review_no" readonly>
    </div>
    <div>
        리뷰내용:<input v-model="info.review_content">
    </div>
    <div>
        작성일:<input v-model="info.review_date" readonly>
    </div>
    <div v-for="img in imgs">
        <img :src="`/api/upload/${img.add_name}`">
    </div>
       <div><button type="button" class="btn btn-info" @click="modBtn">수정</button></div>
</template>
<script>
    import axios from 'axios';
    export default{
        
    data(){
     return {
            info:{},
            imgs:{}
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
            this.info=review;
            console.log('dddddd',this.info)
            //console.log('자식이벤트 호출',review,'<- 여기 내용 다 들어있고 이미지만 불러오면됨')    
            await axios.get(`/api/mypage/reviewImg/`+review.review_no)
            .then(result=>{console.log('이미지지지지지',result),this.imgs=result.data })
            .catch(err=>console.log(err))
        },
       async modBtn(){
            console.log(this.info)
           await axios.put(`/api/mypage/reviewUpdate?content=${this.info.review_content}&rno=${this.info.review_no}`)
           .then(alert('리뷰수정 완료!'))
           .catch(err=>console.log(err))
        }
    }
    }
</script>
<style></style>