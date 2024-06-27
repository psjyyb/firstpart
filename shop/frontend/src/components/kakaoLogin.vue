<template>
    <div class="login-container">
        <div class="login-wrapper">
          <form method="post" action="서버의url" id="login-form">
            </form>
        </div>
        <hr>
        <div style="text-align: center;">
          <a id="custom-login-btn" @click="kakaoLogin()">
            <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="222"
              alt="카카오 로그인 버튼" />
          </a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      kakaoLogin() {
        window.Kakao.Auth.login({
          scope: "profile_image, account_email",
          success: this.getKakaoAccount,
        });
      },
      getKakaoAccount() {
        const vm = this; // Store the Vue instance context
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            const kakao_account = res.kakao_account;
            const nickname = kakao_account.profile.nickname;
            const email = kakao_account.email;
            console.log("nickname", nickname);
            console.log("email", email);
  
            // Example of storing data in sessionStorage
            sessionStorage.setItem('nickname', nickname);
            sessionStorage.setItem('email', email);
  
            alert("로그인 성공!");
  
            // Redirect to BoardList.vue using Vue Router
            vm.$router.push('/info'); // Assuming '/boardlist' is your route path
          },
          fail: function (error) {
            console.log(error);
          },
        });
      },
      kakaoLogout() {
        const vm = this; // Store the Vue instance context
        window.Kakao.Auth.logout(function () {
          // Clear sessionStorage
          sessionStorage.removeItem('nickname');
          sessionStorage.removeItem('email');
  
          // Optional: Clear any other state or UI related to logged-in state
          // For example, resetting the UI or redirecting to a login page
  
          // Redirect to '/' after logout (adjust as needed)
          vm.$router.push('/');
        });
      },
    },
  };
  </script>
 <style scoped>
 .login-container {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   padding: 20px;
 }
 
 .login-wrapper {
   margin-bottom: 20px;
 }
 
 .login-button-container {
   text-align: center;
 }
 
 #custom-login-btn {
   display: inline-block;
   cursor: pointer;
   transition: transform 0.3s ease;
 }
 
 #custom-login-btn img {
   border-radius: 10px;
   transition: box-shadow 0.3s ease;
 }
 
 #custom-login-btn:hover {
   transform: scale(1.05);
 }
 
 #custom-login-btn img:hover {
   box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
 }
 </style>