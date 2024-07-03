<template>
  <div class="container">
    <form @submit.prevent="changePassword" class="change-password-form">
      <div class="header">비밀번호 변경</div>

      <div class="form-group">
        <label for="current_pw">현재 비밀번호</label>
        <input type="password" id="current_pw" v-model="currentPassword" class="form-control" />
      </div>

      <div class="form-group">
        <label for="new_pw">새로운 비밀번호</label>
        <input type="password" id="new_pw" v-model="newPassword" class="form-control" />
      </div>

      <div class="form-group">
        <label for="confirm_pw">새로운 비밀번호 확인</label>
        <input type="password" id="confirm_pw" v-model="confirmPassword" class="form-control" />
      </div>

      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success">{{ successMessage }}</div>

      <div class="button-group">
        <button type="submit" class="btn btn-info">비밀번호 변경</button>
        <router-link :to="{ name: 'home' }" class="btn btn-cancel">취소</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = '새로운 비밀번호가 일치하지 않습니다.';
        return;
      }

      try {
        const response = await axios.post('/api/changePassword', {
          current_pw: this.currentPassword,
          new_pw: this.newPassword
        });
        
        if (response.status === 200) {
          this.successMessage = '비밀번호가 성공적으로 변경되었습니다.';
          this.errorMessage = '';
          // 성공적으로 변경되면, 필요한 추가 작업 수행 (예: 홈 페이지로 이동)
          // this.$router.push({ name: 'home' });
        } else {
          this.errorMessage = '비밀번호 변경에 실패했습니다.';
          this.successMessage = '';
        }
      } catch (error) {
        console.error('비밀번호 변경 오류:', error);
        this.errorMessage = '서버 오류: 비밀번호 변경을 처리할 수 없습니다.';
        this.successMessage = '';
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.change-password-form {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.header {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #4a90e2;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  color: #4a90e2;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}

.button-group {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.btn {
  width: 48%;
  padding: 10px;
  font-size: 16px;
  text-align: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-info {
  background-color: #4a90e2;
  color: white;
}

.btn-cancel {
  background-color: #ccc;
  color: black;
}
</style>
