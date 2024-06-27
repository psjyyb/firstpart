<template>
    <section class="user-modify">
      <h2 class="user-modify-title">개인정보 수정</h2>
        <div class="form-group">
          <label for="user_id">아이디(이메일)</label>
         <p>{{userInfo.user_id}}</p>
        </div>
        <div class="form-group">
          <label for="user_name">이름</label>
          <p>{{ userInfo.user_name }}</p>
        </div>
        <div class="form-group">
          <label for="user_pw">새 비밀번호</label>
          <input id="user_pw" type="password" v-model="userInfo.user_pw">
        </div>
        <div class="form-group">
          <label for="user_phone">전화번호</label>
          <input id="user_phone" type="text" v-model="userInfo.user_phone">
        </div>
        <button type="submit" class="btn-submit" @click="ModifyHandelr()">수정 완료</button>
        <button type="submit" class="btn-submit">회원 탈퇴</button>
    </section>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        userInfo:[],
      }
    },
    created()	{
     this.getUserInfo();
    },
    methods: {
      async getUserInfo(){
        let result = await axios.get(`/api/user/info`);
        this.userInfo= result.data;
      },
      ModifyHandelr(){
        
      }
    }
  }
  </script>
  
  <style scoped>
  .user-modify {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .user-modify-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .user-modify-form .form-group {
    margin-bottom: 15px;
  }
  
  .user-modify-form label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .user-modify-form input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .user-modify-form .btn-submit {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .user-modify-form .btn-submit:hover {
    background-color: #0056b3;
  }
  </style>
  