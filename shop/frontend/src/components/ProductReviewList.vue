<template>
    <div>
        리뷰릿트트트트트ㅡㅌ
    </div>
</template>
<script>
import axios from "axios";
    export default{
    data(){
     return {
        info:{}
     }; 
    },
    created(){
    },
    methods:{
        async getData(no){
            console.log(no,'여긴리스트')
            await axios.get(`/api/mypage/ProductReview/?prodNo=${no}`)
        }
    }
    }
</script>
<style></style>