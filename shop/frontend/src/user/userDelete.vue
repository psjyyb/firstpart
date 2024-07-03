<template>
  <div class="withdrawal-page">
    <h2>회원 탈퇴</h2>
    
    <p v-if="user" class="user-info">로그인한 사용자 아이디: {{ user.user_id }}</p>
    
    <p class="confirmation-msg">정말 회원탈퇴 하시겠습니까?</p>
    
    <button class="btn" @click="confirmDeletion">회원 탈퇴</button>
    
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
      showConfirmModal: false
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
          alert(response.data.message);
          if (response.data.success) {
            this.$store.dispatch('logoutUser');
            this.$router.push('/'); // 홈 페이지로 이동
          }
        })
        .catch(error => {
          console.error('Error deleting account:', error);
          this.error = '회원 탈퇴 중 오류가 발생했습니다.';
        });
      
      this.showConfirmModal = false;
    },
    closeModal() {
      this.showConfirmModal = false;
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
}

.user-info {
  font-size: 16px;
  margin-bottom: 10px;
}

.confirmation-msg {
  font-size: 18px;
  margin-bottom: 20px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;
}

.btn-confirm {
  background-color: #007bff;
  color: white;
}

.btn-cancel {
  background-color: #dc3545;
  color: white;
}

.btn:hover {
  opacity: 0.8;
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
}

.btn-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
