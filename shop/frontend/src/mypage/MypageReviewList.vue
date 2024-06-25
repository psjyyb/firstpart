<template>
    <SideVar/>
    <div>
        리뷰리스트
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
     return {}; 
    },
    created(){
    },
    methods:{
    }
    }
</script>
<style></style>