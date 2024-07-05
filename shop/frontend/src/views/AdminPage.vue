<template>
    <div class="hello" src="assets/logo.png">
      
      <div class="mb-5" >
      <h1>관리자님 환영합니다!{{ }}</h1>
       </div>  
      
    </div>

    <div></div>
</template>
<script>
    export default{
    data(){
    return {};
    },
    created () {},
    methods :{}
        }
</script>
<style scoped>
h1{
  font-size: 100px;
  color:white;
  
}


.hello{
  width: 1500px;    height: 750px;
  
  width:90%; margin:0 auto;

  background-image: url("../assets/bg_1.jpg");
  border-radius: 30px;
  background-size : cover;
}


</style>
