<template>
	<div class="container">
		<header class="d-flex	flex-wrap	justify-content-center	py-3	mb-4	border-bottom">
			<ul class="nav	nav-pills">
				<button type="button" @click="adminpage">
					<iconify-icon icon="mdi-account-convert" class="fs-4"></iconify-icon>
				</button>
				<li class="nav-item"><router-link to="/adminproduct" class="nav-link"><h3>상품관리</h3> </router-link></li>
				<li class="nav-item"><router-link to="/adminmember" class="nav-link"><h3>회원관리</h3></router-link></li>
				<li class="nav-item"><router-link to="/adminorder" class="nav-link"><h3>주문관리</h3></router-link></li>
				<li class="nav-item"><router-link to="/adminnotice" class="nav-link"><h3>공지사항관리</h3></router-link></li>
				<li class="nav-item"><router-link to="/adminqa" class="nav-link"><h3>Q&A관리</h3></router-link></li>
			</ul>
		</header>
	</div>
	<div class="container-fluid">
      <hr class="m-0">
    </div>
</template>
<script>
export default {
	name: 'Header'
	,
	props: ["isAdmin"],
	methods: {
		adminpage() {
			this.$emit("change",false)
		}
	}
}

</script>

  


<style scoped>
/* 관리자 헤더 스타일 */
.nav-item{
margin-top: 10px;

}

</style>


