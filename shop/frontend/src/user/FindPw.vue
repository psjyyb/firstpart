<template>
    <div class="find-password-container">
      <h2>FIND PASSWORD</h2>
      <form @submit.prevent="findPassword">
        <label for="user_id">아이디</label>
        <input type="text" id="user_id" v-model="userPw.user_id" required />
        <br>
        <label for="user_name">이름</label>
        <input type="text" id="user_name" v-model="userPw.user_name" required />
        <br>
        <label for="user_phone">전화번호</label>
        <input type="text" id="user_phone" v-model="userPw.user_phone" required />
        <br>
  
        <button class="btn find-btn" type="submit">FIND</button>
        <button class="btn cancel-btn" @click="cancel">취소</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        userPw: {
          user_id: '',
          user_name: '',
          user_phone: ''
        }
      };
    },
    methods: {
      findPassword() {
        axios.post('/api/user/findPw', this.userPw)
          .then(response => {
            alert(`회원님의 아이디는 ${response.data.user_id} 입니다`);
            // 아이디를 찾은 후에 추가적인 동작 구현 가능
          })
          .catch(error => {
            console.error('아이디 찾기 실패:', error);
            alert('아이디 찾기에 실패했습니다.');
          });
      },
      cancel() {
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
  