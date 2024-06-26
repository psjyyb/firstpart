
  <template	>
 	 <div class ="container">
 	 <header class ="d-flex	flex-wrap	justify-content-center	py-3	mb-4	border-bottom">
 	   <button type ="button"  @click="adminpage">
                    <iconify-icon icon="mdi-account-convert" class="fs-4"></iconify-icon>
                  </button>
 	  <ul class="nav	nav-pills">
 	    <li class="nav-item"><router-link	 to="/product"	 class="nav-link">상품관리 </router-link	></li	>
 	   <li class="nav-item"><router-link to="/member"	class="nav-link">회원관리</router-link	></li	>
 	   <li class="nav-item"><router-link to ="/order"	class="nav-link">주문관리</router-link	></li	>
      <li class="nav-item"><router-link to ="/notice"	class="nav-link">공지사항관리</router-link	></li	>
        <li class="nav-item"><router-link to ="/qa"	class="nav-link">Q&A관리</router-link	></li	>
 	  </ul	>
 	 </header>
 	</div>
</template>
<script	>
export	default {	 	
			 name:	'Header'
			,
			props:["isAdmin"],
			methods :{

adminpage(){
  this.$emit("change",false)
}


}
			
			
			}



</script	>
<template>
    <header>
      <h1>Admin Header</h1>
    </header>
  </template>
  
  <script>
  export default {
    name: 'AdminHeader'
  }
  </script>
  
  <style scoped>
  /* 관리자 헤더 스타일 */
  </style>
  
