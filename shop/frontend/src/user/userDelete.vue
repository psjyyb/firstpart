<template>
  <div class="withdrawal-page">
    <h2>회원 탈퇴</h2>
    <div>
      <img
        src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20190130%2Fourlarge%2Fpngtree-ancient-hand-drawn-man-and-pet-warm-illustration-elements-paintedman-and-png-image_592492.jpg&type=sc960_832"
        alt="Hand-drawn man and pet illustration" style="max-width: 100%; height: auto; border-radius: 10px;">
    </div>
    <p v-if="user" class="user-info">" {{ user.user_id }} " 님 </p>

    <p class="confirmation-msg">정말 회원탈퇴 하시겠습니까?</p>

    <div class="btn-group">
      <button class="btn btn-danger" @click="confirmDeletion">회원 탈퇴</button>
      <button class="btn btn-cancel" @click="goHome">취소</button>
    </div>

    <p v-if="error" class="error-msg">{{ error }}</p>

    <!-- 확인 모달 -->
    <div v-if="showConfirmModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <p class="modal-msg">정말 탈퇴하시겠습니까?</p>
        <div class="btn-group">
          <button class="btn btn-confirm" @click="deleteAccountConfirmed">확인</button>
          <button class="btn btn-cancel" @click="closeModal">취소</button>
        </div>
      </div>
    </div>

    <!-- 탈퇴 완료 모달 -->
    <div v-if="showSuccessModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeSuccessModal">&times;</span>
        <img
          src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn-icons-png.freepik.com%2F256%2F9490%2F9490025.png&type=a340"
          alt="Success icon" class="success-icon">
        <p class="modal-msg">회원 탈퇴가 완료되었습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(["getUserInfo"]),
    user() {
      return this.getUserInfo;
    },
  },
  data() {
    return {
      error: '',
      showConfirmModal: false,
      showSuccessModal: false
    };
  },
  methods: {
    confirmDeletion() {
      if (!this.user) {
        this.error = '로그인이 필요합니다.';
        return;
      }
      this.showConfirmModal = true;
    },
    deleteAccountConfirmed() {
      const userId = this.user.user_id; // 로그인한 사용자의 user_id를 가져옵니다.

      axios.post('/api/user/delete', { userId })
        .then(response => {
            if (response.data.success) {
            this.showConfirmModal = false; // 확인 모달은 닫기
            this.showSuccessModal = true; // 성공 모달 열기
            this.$store.dispatch('logoutUser');
          }
        })
        .catch(error => {
          console.error('Error deleting account:', error);
          this.error = '회원 탈퇴 중 오류가 발생했습니다.';
        });
    },
    closeModal() {
      this.showConfirmModal = false;
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
      this.$router.push('/'); 
    },
    goHome() {
      this.$router.push('/'); 
    }
  }
}
</script>

<style scoped>
.withdrawal-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  background-color: #f9f9f9;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  font-family: 'Arial', sans-serif;
  /* 원하는 글꼴로 변경 */
}

.user-info {
  font-size: 16px;
  margin-bottom: 10px;
  font-family: 'Arial', sans-serif;
  /* 원하는 글꼴로 변경 */
}

.confirmation-msg {
  font-size: 18px;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
  /* 원하는 글꼴로 변경 */
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-confirm {
  background-color: #007bff;
  color: white;
}

.btn-cancel {
  background-color: #ccc;
  color: white;
}

.btn:hover {
  opacity: 0.8;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: 1px solid #dc3545;
  transition: background-color 0.3s;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #c82333;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 20% auto;
  padding: 20px;
  border: 1px solid #ccc;
  width: 80%;
  max-width: 300px;
  text-align: center;
  border-radius: 8px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #aaa;
  cursor: pointer;
}

.close:hover {
  color: #333;
}

.modal-msg {
  font-size: 18px;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
  /* 원하는 글꼴로 변경 */
}

.btn-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.success-icon {
  width: 80px;
  /* 이미지 크기 조정 */
  height: auto;
  margin-bottom: 10px;
}
</style>
