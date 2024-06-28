<template>
  <div class="password-verification">
    <h2>비밀번호 확인</h2>
    <p v-if="isLoggedIn" class="user-info">로그인 아이디: {{ account.user_id }}님 환영합니다</p>
    <p v-if="isLoggedIn && account.user_address" class="user-info">주소: {{ account.user_address }}님 환영합니다</p>
    <input class="input" type="password" placeholder="비밀번호를 입력하세요" v-model="password" />
    <button class="btn" @click="checkPassword">확인</button>
    <p v-if="error" class="error-msg">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      password: '',
      error: ''
    };
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isLoggedIn', 'getUserInfo']),
    account() {
      return this.getUserInfo; // getUserInfo getter를 이용하여 사용자 정보를 가져옴
    }
  },
  methods: {
    checkPassword() {
      // 서버에 비밀번호 확인 요청
      axios.post("/api/user/checkPw", { password: this.password })
        .then(response => {
          if (response.data.valid) {
            // 비밀번호 확인 성공
            this.$emit('password-verified'); // 부모 컴포넌트로 이벤트 발송
          } else {
            // 비밀번호 확인 실패
            this.error = '비밀번호가 일치하지 않습니다.';
          }
        })
        .catch(error => {
          console.error('비밀번호 확인 오류:', error);
          this.error = '서버 오류로 인해 비밀번호를 확인할 수 없습니다.';
        });
    }
  }
};
</script>

<style scoped>
.password-verification {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.user-info {
  margin-bottom: 10px;
}

.input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 300px;
  margin-bottom: 10px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}

.error-msg {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
