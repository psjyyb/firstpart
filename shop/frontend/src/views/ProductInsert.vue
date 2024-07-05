<template	>
    <div class ="container">
     <form @submit.prevent enctype="multipart/form-data">

        <table id="container">
			<tr>
				<td id="result" colspan="2"></td>
			</tr>			
			<tr>
				<th><label for="product_name">상품이름</label></th>
				<td><input type ="text"id ="product_name"v-model ="product_name "/></td>
			</tr>
            <tr>
				<th><label for="category_no">카테고리</label></th>
				<td> <select v-model="category_no">
                          <option value="1">사료</option>
                          <option value="2">간식</option>
                          <option value="3">건강관리</option>
                          <option value="4">배변용품</option>
                          <option value="5">장난감</option>
                          <option value="6">미용/목욕</option>
                          <option value="7">리빙</option>
                        </select>
                    </td>
			</tr>
			<tr>
				<th><label for="product_price">가격</label></th>
				<td><input type ="number"id ="product_price"v-model ="product_price "/></td>
			</tr>
            <tr>
				<th><label for="storage_cnt">수량</label></th>
				<td><input type ="number"id ="storage_cnt"v-model ="storage_cnt "/></td>
			</tr>
            <tr>
                <th><label for="product_mfd">제조일자</label></th>
                <td><input type ="date"id ="product_mfd" v-model ="product_mfd "/></td>
            </tr>
			<tr>
				<th><label for="product_exp">유통기한</label></th>
				<td><input type ="date"id ="product_exp" v-model ="product_exp "/></td>
			</tr>
    
			<tr>
				<th><label for="product_img">제품 이미지</label></th>
				<td>
				<div class="product_img">
                    <img :src="p_product_img" />
                </div>
                <v-file-input v-model="product_img" name="product_img" @change="change_product_img(product_img)"/>
            </td>
			</tr>
            <tr>
				<th><label for="product_detail_img">제품 상세 파일</label></th>
				<td>
				<div class="product_detail_img">
                    <img :src="p_product_detail_img" />
                </div>
                <v-file-input v-model="product_detail_img" name="product_detail_img" @change="change_product_detail_img(product_detail_img)"/>

            </td>
			</tr>
			
		</table>
        <div class="productbutton" align="center">
            <button type ="button" class ="text-center" @click ="insertproduct"> <h3>상품등록</h3> </button	>
            <button type="button" class="text-center" @click="canBtn"><h3>취소</h3></button>
     </div	>
     </form	>
    </div	>
</template	>
<script	>
import axios from "axios";

export	default {
    data ()	{
     return {
        p_product_img: '',
        p_product_detail_img: '',    
        product_name:"",
        category_no:"",
 	    product_price:"",
        storage_cnt:"",
        product_mfd:"",
        product_exp:"",
 	   product_img:"",
 	   product_detail_img:"",
 	  
     };
    },
    computed: {
     
    },
    created ()	{
     
    },
    watch: {
 	 
 	},
 	methods: {
        async insertproduct()	{
            console.log(this.productInfo);
            let data = new FormData();
            data.append("product_name",this.product_name)
            data.append("product_price",this.product_price)
            data.append("product_mfd",this.product_mfd)
            data.append("product_exp",this.product_exp)
            data.append("category_no",this.category_no)
            data.append("storage_cnt",this.storage_cnt)
            data.append("product_img",this.product_img)
            data.append("product_detail_img",this.product_detail_img)
            const result= (await axios.post('api/adminproduct/insertproduct', data,{ headers:{'Content-Type':'multipart/form-data'}})).data;
         
            console.log(result .insertId);
         if(result .insertId >0 )	{
 	    alert("정상적으로	등록되었습니다.");
 	    //this.boardInfo.no	=	result.insertId;
 	    this.$router.push('/adminproduct');
 	   }	else {
 	    alert("정상적으로	저장되지	않았습니다.");
 	   }
        //  this.$emit("changeRouter","/adminproduct");
    },
    change_product_img(file)	{
        const fileData = (data) => {
        this.p_product_img = data
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener("load", function () {
        fileData(reader.result)
      }, false);
      console.log(this. product_img);
    },
    change_product_detail_img(file)	{
        const fileData = (data) => {
        this.p_product_detail_img= data
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener("load", function () {
        fileData(reader.result)
      }, false);
    },
    canBtn(){
        this.$router.push('/adminproduct');
    },
 	 
 	},
};
</script>

<style scoped >
.container {
    margin-top: 40px;
    display: flex;
    justify-content: center;
 }
 .productbutton{
    margin-top: 20px;
 }
 button{

all: initial;
}
button + button {

margin-left: 30px

}
</style	>