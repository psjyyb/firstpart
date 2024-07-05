<template>
  <div class="login-container">
    <form method="post" action="서버의url" id="login-form">
    </form>
    <hr>
    <a id="custom-login-btn" @click="kakaoLogin()">
      <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="222" alt="카카오 로그인 버튼" />
    </a>
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
    async getKakaoAccount() {
      const vm = this; // Store the Vue instance context
      try {
        const res = await window.Kakao.API.request({
          url: "/v2/user/me",
        });

        const kakao_account = res.kakao_account;
        const kakao_id = res.id; // 카카오 사용자 ID
        const user_email = kakao_account.email;
        const user = {
          user_id: kakao_id,
          user_email: user_email,
          is_kakao_user: true,
          user_point: 0,
          user_name: "",
          user_post: "", // 초기화
          user_address: "", // 초기화
          user_detail_addr: "", // 초기화
          user_phone: "", // 초기화
        };

        // DB에 사용자 정보 저장
        const response = await fetch("/api/user/insertKakaoUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          throw new Error("사용자 정보 저장 중 오류 발생");
        }

        // Vuex 스토어에 사용자 정보 저장
        vm.$store.dispatch("loginUser", user);

        alert("로그인 성공!");

        // Redirect to '/home' using Vue Router
        vm.$router.push("/home");
      } catch (error) {
        console.error("사용자 정보 저장 오류:", error);
        // 사용자에게 오류 메시지를 표시하거나 적절히 처리
        alert(
          "로그인 실패! 사용자 정보를 저장하는 중 문제가 발생했습니다."
        );
      }
    },
    kakaoLogout() {
      const vm = this; // Store the Vue instance context
      window.Kakao.Auth.logout(function () {
        // Clear sessionStorage
        sessionStorage.removeItem("nickname");
        sessionStorage.removeItem("email");

        // Vuex 스토어의 사용자 정보 제거
        vm.$store.dispatch("logoutUser");

        // Redirect to '/' after logout (adjust as needed)
        vm.$router.push("/home");
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
