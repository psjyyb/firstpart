<template>
    <div class="menu">
      <ul>
        <li @click="goTo('/FindId')">아이디 찾기</li>
        <li @click="goTo('/FindPw')">비밀번호 찾기</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goTo(route) {
        this.$router.push(route); 
      }
    }
  }
  </script>
  
  <style scoped>
  .menu {
    width: 200px;
    background-color: #f0f0f0;
    padding: 10px;
  }
  
  .menu ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .menu ul li {
    cursor: pointer;
    padding: 8px 16px;
    margin-bottom: 5px;
    background-color: #ddd;
    border-radius: 5px;
  }
  
  .menu ul li:hover {
    background-color: #ccc;
  }
  </style>