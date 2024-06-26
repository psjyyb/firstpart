<template>
    <div>
        <div class="resume-section-content">
            <h2 class="mb-5">{{notice.notice_no }}번 공지사항</h2>
            <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
                <div class="flex-grow-1">
                    <h3 class="mb-0">{{notice.notice_title}}</h3>
                    <div class="subheading mb-3">{{notice.notice_content}}</div>
                    <div>{{notice.notice_picture}}</div>
                </div>
                <div class="flex-shrink-0"><span class="text-primary">{{notice.notice_date}}</span></div>
            </div>
        </div>
        <button type="button" class="btn btn-success" @click="goList">목록으로</button>
    </div>
</template>
<script>
    import axios from 'axios'
    export default{
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
            this.$router.push('/noticeList')
        }
    }
    }
</script>
<style></style>