<template>
  <div class="reset-password-container">
    <div class="card">
      <h2>FIND PASSWORD</h2>
      <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fpng-clipart%2F20231214%2Fourlarge%2Fpngtree-cute-cat-pet-illustration-png-image_11285605.png&type=sc960_832" alt="Cute Cat" class="cat-img" />
      <form @submit.prevent="resetPassword">
        <label for="user_id">아이디</label>
        <input type="text" id="user_id" v-model="userInfo.user_id" required />
        <br>
        <label for="user_name">이름</label>
        <input type="text" id="user_name" v-model="userInfo.user_name" required />
        <br>
        <label for="user_phone">전화번호</label>
        <input type="text" id="user_phone" v-model="userInfo.user_phone" required />
        <br>
        <div class="button-group">
          <button class="btn reset-btn">비밀번호 초기화 및 변경</button>
          <button class="btn cancel-btn" @click="cancel">취소</button>
        </div>
      </form>
    </div>

    <!-- 비밀번호 수정 모달 -->
    <div class="modal fade" id="passwordModal" tabindex="-1" role="dialog" aria-labelledby="passwordModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="passwordModalLabel">새로운 비밀번호 입력</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label for="new_password">새로운 비밀번호</label>
            <input type="password" id="new_password" v-model="newPassword" required />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="changePassword">비밀번호 변경</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
          </div>
        </div>
      </div>
    </div>
    <!-- /비밀번호 수정 모달 -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userInfo: {
        user_id: '',
        user_name: '',
        user_phone: ''
      },
      newPassword: ''
    };
  },
  methods: {
    async resetPassword() {
      try {
        const { user_id, user_name, user_phone } = this.userInfo;
        const response = await axios.post('/api/user/FindPw', { user_id, user_name, user_phone });
        
        if (response.data) {
          // 사용자 정보가 정확할 경우, 비밀번호 수정 모달을 열어 새로운 비밀번호를 입력할 수 있도록 함
          $('#passwordModal').modal('show');
        } else {
          alert('사용자 정보를 확인해 주세요.');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Axios 오류인 경우
          console.error('Axios Error:', error.message);
          alert('서버 오류: 비밀번호 초기화 또는 수정에 실패했습니다.');
        } else {
          // 기타 오류인 경우
          console.error('Error:', error.message);
          alert('비밀번호 초기화 또는 수정에 실패했습니다.');
        }
      }
    },
    async changePassword() {
      try {
        const { user_id } = this.userInfo;
        const changePasswordResponse = await axios.put(`/api/user/changePassword/${user_id}`, { new_password: this.newPassword });
        
        if (changePasswordResponse.status === 200) {
          alert('비밀번호가 성공적으로 변경되었습니다.');
          $('#passwordModal').modal('hide');
          // 성공적으로 변경되면 로그인 페이지로 이동
          this.$router.push({ name: 'loginForm' });
        } else {
          alert('비밀번호 변경에 실패했습니다.');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Axios 오류인 경우
          console.error('Axios Error:', error.message);
          alert('서버 오류: 비밀번호 변경에 실패했습니다.');
        } else {
          // 기타 오류인 경우
          console.error('Error:', error.message);
          alert('비밀번호 변경에 실패했습니다.');
        }
      }
    },
    cancel() {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style scoped>
.reset-password-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 70vh;
  background-color: #f8f9fa;
  margin: 0 auto;
}

.card {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.cat-img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
}

form {
  width: 100%;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
  width: 48%;
}

.reset-btn {
  background-color: #f5deb3; 
  color: white;
}

.reset-btn:hover {
  background-color: #f5deb3; 
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
}

.cancel-btn:hover {
  background-color: #5a6268;
}
</style>
