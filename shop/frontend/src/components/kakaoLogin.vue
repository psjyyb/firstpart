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
        success: async function (res) {
          const kakao_account = res.kakao_account;
          const kakao_id = res.id; // 카카오 사용자 ID
          const email = kakao_account.email;
          const user = {
            user_id: kakao_id,
            email: email,
          };

          // DB에 사용자 정보 저장
          await fetch('/api/user/insertKakaoUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });

          // Vuex 스토어에 사용자 정보 저장
          vm.$store.dispatch('loginUser', user);

          alert("로그인 성공!");

          // Redirect to BoardList.vue using Vue Router
          vm.$router.push('/home'); // Assuming '/info' is your route path
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

        // Vuex 스토어의 사용자 정보 제거
        vm.$store.dispatch('logoutUser');

        // Redirect to '/' after logout (adjust as needed)
        vm.$router.push('/home');
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
