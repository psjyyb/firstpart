<template>
  <div class="password-verification">
    <h2>비밀번호 확인</h2>
    <p v-if="user">로그인한 사용자 아이디: {{ user.user_id }}</p>
    <input class="input" type="password" placeholder="비밀번호를 입력하세요" v-model="user_pw"/>
    <button class="btn" @click="checkPassword">확인</button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
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
    }
  }
};
</script>

<style scoped>
.password-verification {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.input {
  margin-top: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #0068ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056e0;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.success-message {
  color: green;
  margin-top: 10px;
}
</style>
