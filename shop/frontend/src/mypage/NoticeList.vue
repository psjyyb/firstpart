<template>
    <div class="container mt-5">
        <div class="notice_mydw mb-4">
            <ul>
                <li class="last_child">보다 유익한 쇼핑을 위해 나의 다양한 소식을 빠르게 전달해드립니다.</li>
            </ul>
        </div>
        <table class="table table-success table-striped-columns">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성일</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="notice in notices" :key="notice.notice_no" @click="noticeInfo(notice.notice_no)" style="cursor: pointer;">
                    <td>{{ notice.notice_no }}</td>
                    <td>{{ notice.notice_title }}</td>
                    <td>{{ getDateFormat(notice.notice_date) }}</td>
                </tr>
            </tbody>
        </table>
        <PagingComponent v-bind="page" @go-page="goPage"></PagingComponent>
    </div>
</template>

<script>
import axios from 'axios';
import PagingComponent from '../components/PagingComponent.vue';
import pageCalcMixin from '../mixin.js';

export default {
    mixins: [pageCalcMixin],
    components: { PagingComponent },
    data() {
        return {
            notices: [],
            pageUnit: 5,
            page: {}
        };
    },
    created() {
        this.goPage(1);
    },
    methods: {
        async goPage(page) {
            let pageUnit = this.pageUnit;
            let result = await axios.get(`/api/mypage/NoticeList/?pageUnit=${pageUnit}&page=${page}`);
            this.notices = result.data.list;
            this.page = this.pageCalc(page, result.data.count[0].cnt, 5, pageUnit);
        },
        noticeInfo(no) {
            this.$router.push({ name: 'noticeInfo', query: { no: no } });
        },
        getDateFormat(date) {
            // Implement your date formatting logic here if needed
            return date; // Example format, adjust as per your requirement
        }
    }
};
</script>

<style scoped>
.notice_mydw {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
}
.last_child {
    color: #555;
    font-style: italic;
}
.table {
    font-size: 16px;
}
.table thead th {
    background-color: #28a745;
    color: white;
    font-weight: bold;
}
.table-striped-columns tbody tr:nth-child(odd) {
    background-color: #f8f9fa;
}
.table-striped-columns tbody tr:hover {
    background-color: #e9ecef;
}
</style>