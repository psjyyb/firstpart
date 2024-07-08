<template>
    <SideVar></SideVar>
    <div id="padd">
   <div class="outer">
    <br> <h2 align="center">공지사항 등록</h2>
    <form action="#" method="post">
        <table align="center" id="enrollForm">
            <tr>
                <th width="10%">제목</th>
                <td><input  type="text" v-model ="notice_title" id="notice_title" required></td>
            </tr>
            <tr>
                <th>내용</th>
                <td></td>
            </tr>
            <tr>
                <td colspan="2">
                    <textarea  v-model ="notice_content" id="notice_content" cols="50" rows="20" style="resize:none;" 
                    required></textarea>
                </td>
            </tr>
            <tr>

                <th>사진 첨부 </th>
                <td>
                <img :src="p_notice_picture" />
                <v-file-input v-model="notice_picture" name="notice_picture"  @change="change_notice_picture(notice_picture)"/>
                </td>

            </tr>

        </table>
        <div class="noticebutton" align="center">
            <button type="button"  @click="addNotice"><h2>등록</h2></button>
            <button type="button"  @click="canBtn"><h2>취소</h2></button>
        </div>
    </form>
</div>
</div>
</template>
<script>
    import axios from 'axios' ;
    
    
    export default{
    components: {},
    data(){
     return {
        
        notice_title:"",
        notice_content:"",        
        p_notice_picture:'',
        notice_picture:"",
     }; 
    },
    created(){
    },
    methods:{
        upload() {
     
    },
    canBtn(){
        this.$router.push('/adminnotice');
    },
    async addNotice(){

        if((this.notice_title!='')&(this.notice_content!='')&(this.notice_picture!='')){
        let data = new FormData();
        data.append("notice_title",this.notice_title)
            data.append("notice_content",this.notice_content)
            data.append("notice_picture",this.notice_picture)
            const result= (await axios.post('api/adminnotice/insertnotice', data,{ headers:{'Content-Type':'multipart/form-data'}})).data;
         
         console.log(result .insertId);
      if(result .insertId >0 )	{
      alert("정상적으로	등록되었습니다.");
      //this.boardInfo.no	=	result.insertId;
      this.$router.push('/adminnotice');
     }	else {
      alert("정상적으로	저장되지	않았습니다.");
     }
        }
    },
    change_notice_picture(file)	{
        const fileData = (data) => {
        this.p_notice_picture = data
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener("load", function () {
        fileData(reader.result)
      }, false);
      console.log(this. notice_picture);
    },
    }
    }
</script>
<style>

.v-file-input{
    
    height: 50px;
    width: 400px;
}
.noticebutton{
    margin-top: 20px;
 }

 button + button {

margin-left: 30px

}
</style>
