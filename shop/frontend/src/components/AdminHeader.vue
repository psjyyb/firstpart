<template>
	<div class="container">
		<header class="d-flex	flex-wrap	justify-content-center	py-3	mb-4	border-bottom">
			<button type="button" @click="adminpage">
				<iconify-icon icon="mdi-account-convert" class="fs-4"></iconify-icon>
			</button>
			<ul class="nav	nav-pills">
				<li class="nav-item"><router-link to="/adminproduct" class="nav-link">상품관리 </router-link></li>
				<li class="nav-item"><router-link to="/adminmember" class="nav-link">회원관리</router-link></li>
				<li class="nav-item"><router-link to="/adminorder" class="nav-link">주문관리</router-link></li>
				<li class="nav-item"><router-link to="/adminnotice" class="nav-link">공지사항관리</router-link></li>
				<li class="nav-item"><router-link to="/adminqa" class="nav-link">Q&A관리</router-link></li>
			</ul>
		</header>
	</div>
</template>
<script>
export default {
	name: 'Header'
	,
	props: ["isAdmin"],
	methods: {
		adminpage() {
			this.$emit("change", false)
		}
	}
}

</script>

  


<style scoped>
/* 관리자 헤더 스타일 */
</style>
