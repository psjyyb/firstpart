<template>
    <div class="container mt-5">
        <div class="resume-section-content">
            <h2 class="mb-5">{{ notice.notice_no }}번 공지사항</h2>
            <div class="row mb-5">
                <div class="col-md-8">
                    <h3 class="mb-3">{{ notice.notice_title }}</h3>
                    <p class="mb-3">{{ notice.notice_content }}</p>
                    <img :src="`/api/upload/${notice.notice_picture}`" class="img-fluid mb-3" alt="공지사항 이미지">
                </div>
                <div class="col-md-4 d-flex flex-column align-items-end">
                    <span class="text-primary mb-2">{{ getDateFormat(notice.notice_date) }}</span>
                    <button type="button" class="btn btn-success" @click="goList">목록으로</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import pageCalcMixin from '../mixin.js'
    import axios from 'axios'
    export default{
    mixins:[pageCalcMixin],
    data(){
     return {
        notice:{}
     }; 
    },
    created(){
        axios.get('/api/mypage/NoticeInfo/'+this.$route.query.no)
        .then(result=>{console.log(result),this.notice=result.data[0]})
    },
    methods:{
        goList(){
            this.$router.push('/noticeList');
        },
        getDateFormat(date) {
      return this.$dateFormat(date);
    },
    }
    }
</script>
<style></style>