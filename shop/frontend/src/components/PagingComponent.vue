<template>
   <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#" @click.prevent="prevPage">Prev</a></li>
    <li class="page-item" v-for=" page in pageArr"><a @click.prevent="goPage(page)" class="page-link" href="#">{{page}}</a></li>
    <li class="page-item"><a class="page-link" href="#" @click.prevent="nextPage">Next</a></li>
  </ul>
</nav>
</template>
<script>
    export default{
        props:['lastPage', // 제일 마지막 페이지 번호
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
       
    }
    }
</script>
<style></style>