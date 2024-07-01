<template>
   <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#" @click="prevPage">Prev</a></li>
    <li class="page-item" v-for=" page in pageArr"><a @click="goPage(page)" class="page-link">{{page}}</a></li>
    <li class="page-item"><a class="page-link" href="#" @click="nextPage">Next</a></li>
  </ul>
</nav>
</template>
<script>
    export default{
        props:['currentPage',
                'lastPage', // 제일 마지막 페이지 번호
               'firstPage',  // 시작 페이지 번호
               'startIdx', // 페이지 그룹내에서 시작
               'endIdx'], // 페이지 그룹내에서 마지막
    data(){
     return { }
    },
    computed:{
           pageArr(){
            const pages = [];
            console.log()
            for(let i=this.startIdx; i<=this.endIdx; i++){
                pages.push(i);
            }
            return pages;
           } 
        },
    created(){
    },
    methods:{
        goPage(page){
            console.log('pgcp',page)
            this.$emit('go-page',page)
        },
        prevPage() {
            if (this.currentPage > this.firstPage) {
            this.$emit('go-page', this.currentPage - 1);
            }
        },
        nextPage() {
            if (this.currentPage < this.lastPage) {
            this.$emit('go-page', this.currentPage + 1);
            }
        }
       
    }
    }
</script>
<style></style>