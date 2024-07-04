<template>
    <div class="container mt-5">
        <SideVar></SideVar>
        <div id="padd" class="p-4">
            <div class="resume-section-content">
                <h1 class="mb-0" v-if="qnas.product_no !== 0">
                    {{ qnas.product_no }} 번 상품문의
                    <span class="text-primary">{{ qnas.qna_title }}</span>
                </h1>
                <h1 class="mb-0" v-else>
                    기타 문의
                    <span class="text-primary">{{ qnas.qna_title }}</span>
                </h1>
                <div class="subheading mb-5">
                    {{ getDateFormat(qnas.qna_date) }}
                    <span class="badge" :class="qnas.reply === null ? 'badge-warning' : 'badge-success'">
                        {{ qnas.reply === null ? '답변미완료' : '답변완료' }}
                    </span>
                </div>
                <p class="lead mb-5">{{ qnas.qna_content }}</p>
                <div class="row">
                    <div class="col-md-4 mb-3" v-for="img in imgs" :key="img.add_name">
                        <img :src="`/api/upload/${img.add_name}`" class="img-fluid" alt="첨부 이미지">
                    </div>
                </div>
            </div>
            <hr />
            <div v-if="qnas.qna_reply" class="alert alert-info">{{ qnas.qna_reply }}</div>
            <div v-else>답변 미완료</div>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-success" @click="goList">목록으로</button>
                <button type="button" class="btn btn-warning" @click="delBtn">삭제</button>
                <button type="button" class="btn btn-secondary" @click="modBtn(qnas.qna_no)">수정</button>
            </div>
        </div>
    </div>
</template>

<script>
    import pageCalcMixin from '../mixin.js'
    import axios from 'axios' 
    import SideVar from '../components/SideVar.vue'
    import Swal from 'sweetalert2'
    export default{
    mixins:[pageCalcMixin],
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
            .then(this.$router.push('/mypageQnAList'),Swal.fire('문의 삭제완료!'))
            .catch(err=>console.log(err))
        },
        modBtn(no){
            this.$router.push({
                name: 'mypageQnAUpdate', query: {no: no}
            });
        },
        getDateFormat(date) {
      return this.$dateFormat(date);
    },
    }
    }
</script>
<style></style>