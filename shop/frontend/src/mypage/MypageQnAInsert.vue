<template>
    <SideVar></SideVar>
    <div id="padd">
   <div class="outer">
    <br> <h2 align="center">Q&A 등록</h2>
    <form action="#" method="post">
        <table align="center" id="enrollForm">
            <tr>
                <th width="10%">제목</th>
                <td><input v-model="qna.title" type="text" name="title" id="title" required></td>
            </tr>
            <tr>
                <th>내용</th>
                <td></td>
            </tr>
            <tr>
                <td colspan="2">
                    <textarea v-model="qna.content" name="content" id="content" cols="50" rows="20" style="resize:none;" 
                    required></textarea>
                </td>
            </tr>
        </table>
            <div>사진 첨부  <input multiple @change="upload" ref="imageFile" type="file" id="file" accept="image/*"></div>
        <div align="center">
            <button type="button" class="btn btn-success" @click="addQna">등록</button>
            <button type="button" class="btn btn-warning" @click="canBtn">취소</button>
        </div>
    </form>
</div>
</div>
</template>
<script>
    import axios from 'axios' 
    import SideVar from '../components/SideVar.vue'
    import Swal from 'sweetalert2'
    export default{
    components: {SideVar},
    data(){
     return {
        imgFile: [],
        qna:{},
        id:'9999'
     }; 
    },
    created(){
    },
    methods:{
        upload() {
      const files = Array.from(this.$refs.imageFile.files);
      this.imgFile = [...this.imgFile, ...files];
      console.log(this.imgFile);
    },
    canBtn(){
        this.$router.push('/mypageQnAList');
    },
    async addQna(){
        let data = new FormData();
        for (let i = 0; i< this.imgFile.length; i++) {
        data.append("files", this.imgFile[i]);
      }
      data.append("title",this.qna.title);
      data.append("content",this.qna.content);
      data.append("userId",this.id);
      await axios.post(`/api/mypage/QnAInsert/`,data,
      { headers:{'Content-Type':'multipart/form-data'}})
      .then(this.$router.push('/mypageQnAList'),Swal.fire('문의 등록완료!'))
      .catch(err=>console.log(err))
    }
    }
    }
</script>
<style></style>