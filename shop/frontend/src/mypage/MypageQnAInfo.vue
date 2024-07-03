<template>
    <SideVar></SideVar>
    <div id="padd">
        <div class="resume-section-content">
            <h1 class="mb-0"v-if="qnas.product_no!=null">
                {{qnas.product_no}} 번 상품문의
            
                <span class="text-primary">{{qnas.qna_title}}</span>
            </h1>
            <h1 class="mb-0"v-else>
                기타 문의
                <span class="text-primary">{{qnas.qna_title}}</span>
            </h1>
            <div class="subheading mb-5">
                {{ qnas.qna_date }}
                <a href="mailto:name@email.com" v-if="qnas.reply==null">답변미완료</a>
                <a href="mailto:name@email.com" v-else>답변완료</a>
            </div>
            <p class="lead mb-5">{{qnas.qna_content}}</p>
            <div  v-for="img in imgs">
            <img :src="`/api/upload/${img.add_name}`">
        </div>
        </div>
        <hr />
        <p v-if="qnas.qna_reply">{{qnas.qna_reply}}</p>
        <button type="button" class="btn btn-success" @click="goList">목록으로</button>
        <button type="button" class="btn btn-warning" @click="delBtn">삭제</button>
        <button type="button" class="btn btn-info" @click="modBtn(qnas.qna_no)">수정</button>
  </div>
</template>
<script>
   import axios from 'axios' 
    import SideVar from '../components/SideVar.vue'
    export default{
    components: {SideVar},
    data(){
     return {
        qnas:{},
        imgs:{}

     }; 
    },
    created(){
        axios.get(`/api/mypage/QnAInfo/`+this.$route.query.no)
        .then(result=>{console.log(result),this.qnas=result.data.info[0],this.imgs=result.data.img})
        console.log(this.imgs)
    },
    methods:{
        goList(){
            this.$router.push('/mypageQnAList');
        },
        async delBtn(){
            await axios.delete(`/api/mypage/QnADelete/`+this.$route.query.no)
            .then(this.$router.push('/mypageQnAList'),alert('나문의 삭제완료!'))
            .catch(err=>console.log(err))
        },
        modBtn(no){
            this.$router.push({
                name: 'mypageQnAUpdate', query: {no: no}
            });
        }
    }
    }
</script>
<style></style>