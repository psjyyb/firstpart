<template>
     <div>
        <div class="notice_mydw">
            <ul>
                <li class="last_child">보다 유익한 쇼핑을 위해 나의 다양한 소식을 빠르게 전달해드립니다.</li>
            </ul>
        </div>
        <table class="table table-success table-striped-columns">
            <thead>
                <tr>
                    <th>남바</th>
                    <th>제목</th>
                    <th>작성일</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="notice in notices">
                    <td>{{notice.notice_no}}</td>
                    <td @click="noticeInfo(notice.notice_no)">{{notice.notice_title}}</td>
                    <td>{{notice.notice_date}}</td>
                </tr>
            </tbody>
        </table>
        <PagingComponent v-bind="page" @go-page="goPage"></PagingComponent>
    </div>
</template>
<script>
    import pageCalcMixin from '../mixin.js'
    import PagingComponent from '../components/PagingComponent.vue'
    import axios from 'axios'
    export default{
    mixins:[pageCalcMixin],
    components: {PagingComponent },
    data(){
     return {
        notices:{},
        pageUnit:5,
        page:{}
     }; 
    },
    created(){
        this.goPage(1);
    },
    methods:{
        async goPage(page){
        let pageUnit =this.pageUnit;
        let result = await axios.get(`/api/mypage/NoticeList/?pageUnit=${pageUnit}&page=${page}`);
        this.notices = result.data.list;
        console.log('notices',result.data)
        this.page =this.pageCalc(page,result.data.count[0].cnt,5,pageUnit);
        console.log(this.page)
    },
    noticeInfo(no){
        this.$router.push({
                name: 'noticeInfo', query: {no: no}
            });
    }
    }
    }
</script>
<style></style>