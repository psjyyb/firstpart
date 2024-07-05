<template	>
    <div class ="container">
     <form @submit.prevent enctype="multipart/form-data">

        <table id="container">
			<tr>
				<td id="result" colspan="2"></td>
			</tr>
            <tr>
				<th><label for="product_no">상품번호</label></th>
				<td><input type ="text"id ="product_no"v-model ="this.productInfo.product_no" readonly/></td>
			</tr>			
			<tr>
				<th><label for="product_name">상품이름</label></th>
				<td><input type ="text"id ="product_name"v-model ="this.productInfo.product_name "/></td>      
      </tr>
            <tr>
				<th><label for="category_no">카테고리</label></th>
				<td> <select v-model="this.productInfo.category_no">
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
				<td><input type ="number"id ="product_price" v-model ="this.productInfo.product_price " /></td>
			</tr>
           <tr>
                <th><label for="product_point">포인트</label></th>
                <td>300</td>
            </tr>
            <tr>
                <th><label for="product_mfd">제조일자</label></th>
                <td><input type ="date"id ="product_mfd" v-model ="this.productInfo.product_mfd " /></td>
            </tr>
			<tr>
				<th><label for="product_exp">유통기한</label></th>
				<td><input type ="date"id ="product_exp" v-model ="this.productInfo.product_exp " /></td>
			</tr>
    
			<tr>
				<th><label for="product_img">제품 이미지</label></th>
				<td>
				<div class="product_img">
                    <img :src="p_product_img"/>
                </div>
                <v-file-input v-model="product_img_file" name="c_product_img" @change="change_product_img(product_img_file)"/>
            </td>
			</tr>
            <tr>
				<th><label for="product_detail_img">제품 상세 파일</label></th>
				<td>
				<div class="product_detail_img">
                    <img :src="p_product_detail_img"/>
                </div>
                <v-file-input v-model="product_detail_img_file" name="c_product_detail_img" @change="change_product_detail_img(product_detail_img_file)"/>

            </td>
			</tr>
			
		</table>

    <div class="productbutton" align="center">
      <button type ="button" class ="text-center" @click ="updateProduct"> <h2>상품수정</h2> </button	>
        <button type ="button" class ="text-center" @click ="resetProduct"> <h2>초기화</h2> </button	>
        <button type ="button" class ="text-center" @click ="deleteProduct"> <h2>상품삭제</h2> </button	>
          <button type="button" class ="text-center"  @click="canBtn"><h2>취소</h2></button>
    </div>
     </form	>
    </div	>
</template	>

<script	>
import axios from "axios";
import $dateFormat from '../mixin.js'

export	default {
    mixins: [$dateFormat],
 	data ()	{
 	 return {
 	  productNo:"",
 	  productInfo: {},
       p_product_img:'',
       p_product_detail_img:'',
       product_img_file:"",
       product_detail_img_file:"",
      
 	 };
 	},
 	created()	{
 	 this .productNo =	this .$route .query .product_no ;
 	 this .getProductInfo();

     
 	},
 	methods: {
 	 async getProductInfo()	{
 	  this .productInfo =(await axios .get(`/api/adminproduct/productInfo/${this .productNo }`)).data[0];
       this .productInfo.product_mfd= this.getDateFormat(this .productInfo.product_mfd );
       this .productInfo.product_exp = this.getDateFormat(this .productInfo.product_exp  );
       this.p_product_img=`/api/readproductImg/${this.productInfo.product_img}`,
       this.p_product_detail_img=`/api/readproductdetailimg/${this.productInfo.product_detail_img}`
 	 },
 	 getDateFormat(date )	{
 	  return this.$dateFormat(date );
 	 },
      async updateProduct()	{
        let data = new FormData();
            data.append("product_name",this.productInfo.product_name)
            data.append("product_price",this.productInfo.product_price)
            data.append("product_mfd",this.productInfo.product_mfd)
            data.append("product_exp",this.productInfo.product_exp)
            data.append("category_no",this.productInfo.category_no)
            data.append("product_img",this.productInfo.product_img)
            data.append("product_detail_img",this.productInfo.product_detail_img)
            
            data.append("c_product_img",this.product_img_file)
            data.append("c_product_detail_img",this.product_detail_img_file)   
        
        let result =(await axios .put(`/api/adminproduct/updateproduct/${this .productNo}`,data,{ headers:{'Content-Type':'multipart/form-data'}} )).data ;
 	   if(result .affectedRows >0 )	{
 	    alert("정상적으로	수정되었습니다.");
         this .$router .push({path:"/adminproduct" });
 	   }	else {
 	    alert("정상적으로	수정되지	않았습니다.");
 	   }
      },
 	 async deleteProduct()	{
 	  let result =	(await axios .delete(`/api/adminproduct/deleteproduct/${this .productNo}`)).data
 	   .affectedRows ;
 	  if (result ==	1 )	{
        alert("정상적으로	삭제되었습니다.");
 	   this .$router .push({path:"/adminproduct" });
 	  }	else {
 	   alert("정상적으로	삭제되지	않았습니다.");
 	  }
 	 },
 	 goToUpdateForm(no )	{
 	  this.$router.push({	path:"/form",	query: {	no:no }	});
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
      //this.productInfo.product_img=this.product_img;
      console.log(this.productInfo.product_img.name);
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
      //this.productInfo.product_detail_img=this.product_detail_img;
      console.log(this.productInfo.product_detail_img.name);
      
    },
    async resetProduct(){
      this .getProductInfo();

    },
    canBtn(){
        this.$router.push('/adminproduct');
    },

     
 	},
 	components: {
 	  
 	},
};
</script>




<style scoped >
button{

all: initial;
}

.container {
  margin-top: 40px;
    display: flex;
    justify-content: center;
 }
 .productbutton{
    margin-top: 20px;
 }
</style	>
