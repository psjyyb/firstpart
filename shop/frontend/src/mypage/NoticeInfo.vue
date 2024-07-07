<template>
    <div class="container mt-5">
        <div class="resume-section-content">
            <h2 class="mb-5">{{ notice.notice_no }}번 공지사항</h2>
            <div class="row mb-5">
                <div class="col-md-8">
                    <h3 class="mb-3 notice-title">{{ notice.notice_title }}</h3>
                    <p class="mb-3 notice-content">{{ notice.notice_content }}</p>
                    <img :src="`/api/upload/${notice.notice_picture}`" class="img-fluid mb-3 notice-image" alt="공지사항 이미지">
                </div>
                <div class="col-md-4 d-flex flex-column align-items-end">
                    <span class="text-primary mb-2">{{ getDateFormat(notice.notice_date) }}</span>
                    <button type="button" class="btn btn-success mb-2" @click="goList">목록으로</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import pageCalcMixin from '../mixin.js'
import axios from 'axios'

export default {
    mixins: [pageCalcMixin],
    data() {
        return {
            notice: {}
        };
    },
    created() {
        axios.get('/api/mypage/NoticeInfo/' + this.$route.query.no)
            .then(result => {
                console.log(result);
                this.notice = result.data[0];
            });
    },
    methods: {
        goList() {
            this.$router.push('/noticeList');
        },
        getDateFormat(date) {
            return this.$dateFormat(date);
        }
    }
}
</script>

<style scoped>
.container {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.resume-section-content {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.notice-title {
    font-weight: bold;
    color: #333;
    /* border-bottom: 2px solid #007bff; */
    padding-bottom: 10px;
    margin-bottom: 20px;
}

.notice-content {
    line-height: 1.6;
    color: #666;
}

.notice-image {
    border-radius: 10px;
    max-width: 100%;
    height: auto;
    margin-top: 20px;
}

.text-primary {
    font-size: 0.9em;
}

.btn-success {
    background-color: #28a745;
    border-color: #28a745;
}

.btn-success:hover {
    background-color: #218838;
    border-color: #1e7e34;
}
</style>
