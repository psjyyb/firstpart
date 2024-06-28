<template>
    <div class="find-password-container">
      <h2>FIND ID</h2>
      <form @submit.prevent="findPassword">
        <label for="user_name">이름</label>
        <input type="text" id="user_name" v-model="userId.user_name" required />
        <br>
        <label for="user_phone">전화번호</label>
        <input type="text" id="user_phone" v-model="userId.user_phone" required />
        <br>
  
        <button class="btn find-btn" type="submit">FIND</button>
        <button class="btn cancel-btn" @click="cancel()">취소</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        userId: {
          user_name: '',
          user_phone: ''
        }
      };
    },
    methods: {
        cancel(){
            this.$router.push({ name: 'home' });
        }
    }
  };
  </script>
  
  <style scoped>
  .find-password-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  form {
    width: 300px;
    margin-top: 20px;
  }
  
  label {
    margin-bottom: 5px;
  }
  
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    width: 100%;
    margin-bottom: 10px;
  }
  
  .btn {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .find-btn {
    background-color: #007bff;
    color: white;
  }
  
  .find-btn:hover {
    background-color: #0056b3;
  }
  
  .cancel-btn {
    background-color: #6c757d;
    color: white;
  }
  
  .cancel-btn:hover {
    background-color: #5a6268;
  }
  </style>
  