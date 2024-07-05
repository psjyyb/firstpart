<template>
    <SideVar/>
    <div id="padd">
      <h3>♡Q&A리스트♡</h3>
    <div>
        <table class="table table-bordered border-primary">
            <thead>
                <tr>
                    <th style="text-align: center;">번호</th>
                    <th style="text-align: center;">제목</th>
                    <th style="text-align: center;">작성일</th>
                    <th style="text-align: center;">답변상태</th>
                </tr>
            </thead>
            <tbody v-if="QnAs != ''">
                <tr v-for="QnA in QnAs" @click="qnaInfo(QnA.qna_no)">
                    <td>{{QnA.qna_no}}</td>
                    <td>{{QnA.qna_title}}</td>
                    <td>{{getDateFormat(QnA.qna_date)}}</td>
                    <td v-if="QnA.qna_reply==null">답변미완료</td>
                    <td v-else>답변완료</td>
                </tr>
            </tbody>
            <tbody v-else>
                    <tr>
                        <td colspan="8">조회한 결과가 없습니다</td>
                    </tr>
                </tbody>
        </table>
        <PagingComponent v-bind="page" @go-page="goPage"></PagingComponent>
    </div>
    <hr />
    <div><button type="button" class="btn btn-primary" @click="addBtn">Q&A등록</button></div>
    </div>
</template>
<script>
    import pageCalcMixin from '../mixin.js'
    import SideVar from '../components/SideVar.vue'
    import PagingComponent from '../components/PagingComponent.vue'
    import axios from 'axios'
    export default{
    mixins:[pageCalcMixin],
    components: {SideVar,PagingComponent },
    data(){
     return {
        id:9999,
        QnAs:{},
        pageUnit:5,
        page:{}
     }; 
    },
    created(){
        this.id=this.$store.getters.getUserInfo.user_id
        this.goPage(1);
    },
    methods:{
        async goPage(page){
        let pageUnit =this.pageUnit;
        let result = await axios.get(`/api/mypage/QnAList/?pageUnit=${pageUnit}&page=${page}&id=${this.id}`);
        this.QnAs = result.data.list;
        console.log('QnAs',result)
        this.page =this.pageCalc(page,result.data.count[0].cnt,5,pageUnit);
        console.log(this.page)
    },
    qnaInfo(no){
        this.$router.push({
                name: 'mypageQnAInfo', query: {no: no}
            });
    },
    addBtn(){
        this.$router.push('/mypageQnAInsert');
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
    }
    }
</script>
<style></style>