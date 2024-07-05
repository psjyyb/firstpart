<template>
  <div class="password-verification-container">
    <div class="password-verification">
      <h2>회원정보 확인</h2>
      <p v-if="user">" {{ user.user_id }} "님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인합니다.</p>
      <table class="input-table">
        <tr>
          <td><strong>아이디</strong></td>
          <td>{{ user.user_id }}</td>
        </tr>
        <tr>
          <td><strong>비밀번호</strong></td>
          <td><input class="input" type="password" placeholder="비밀번호를 입력하세요" v-model="user_pw"/></td>
        </tr>
      </table>
      <div class="button-group">
        <button class="btn confirm-btn" @click="checkPassword">확인</button>
        <button class="btn cancel-btn" @click="cancelVerification">취소</button>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      user_pw: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  computed: {
    ...mapGetters(['getUserInfo']),
    user() {
      return this.getUserInfo;
    },
  },
  methods: {
    async checkPassword() {
      this.errorMessage = '';
      this.successMessage = '';
      try {
        const response = await axios.post('/api/user/pwCheck', { user_pw: this.user_pw });
        if (response.status === 200) {
          console.log('비밀번호가 일치합니다.');
          this.successMessage = '비밀번호가 일치합니다.';
          this.$router.push({ name: 'userInfo' });
        }
      } catch (error) {
        console.error('비밀번호 확인 중 오류 발생:', error);
        if (error.response && error.response.status === 401) {
          this.errorMessage = '비밀번호가 일치하지 않습니다.';
        } else {
          this.errorMessage = '서버 오류가 발생했습니다.';
        }
      }
    },
    cancelVerification() {
      this.$router.push('/home');
    }
  }
};
</script>

<style scoped>
.password-verification-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.password-verification {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
}

.input-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.input-table td {
  padding: 12px 0; /* 셀 안의 내용과의 간격 조정 */
  border-bottom: 1px solid #f0f0f0; /* 연한 회색으로 변경 */
}

.input {
  width: calc(100% - 20px); /* Adjusting input width to fit table */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: #0068ff;
}

.button-group {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.btn {
  padding: 12px 24px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.confirm-btn {
  background-color: #0068ff;
  color: white;
}

.cancel-btn {
  background-color: #ccc;
  color: #333;
}

.btn:hover {
  opacity: 0.8;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}

.success-message {
  color: green;
  margin-top: 10px;
  font-size: 14px;
}
</style>
