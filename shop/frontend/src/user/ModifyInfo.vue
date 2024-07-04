<template>
  <div class="container">
    <form @submit.prevent="updateUserInfo" class="user-info-container">
      <div class="header">개인정보 수정</div>

      <div class="form-group">
        <label for="user_id">아이디</label>
        <input type="text" id="user_id" v-model="userInfo.user_id" class="form-control readonly" />
      </div>
      <div class="form-group">
        <label for="user_name">이름</label>
        <input type="text" id="user_name" v-model="userInfo.user_name"  class="form-control" />
      </div>

      <div class="form-group">
        <label for="user_post">우편번호</label>
        <input type="text" id="user_post" v-model="userInfo.user_post" placeholder="우편번호" readonly class="form-control" />
        <button type="button" @click="openDaumPostcode" class="btn btn-secondary">우편번호 검색</button>
      </div>

      <div class="form-group">
        <label for="user_address">주소</label>
        <input type="text" id="user_address" v-model="userInfo.user_address" placeholder="주소" readonly class="form-control" />
      </div>

      <div class="form-group">
        <label for="user_detail_addr">상세주소</label>
        <input type="text" id="user_detail_addr" v-model="userInfo.user_detail_addr" placeholder="상세주소"
               class="form-control" />
      </div>

      <div class="form-group">
        <label for="user_phone">전화번호</label>
        <input type="text" id="user_phone" v-model="userInfo.user_phone" placeholder="전화번호" class="form-control" />
      </div>
      
      <div class="form-group">
        <label for="user_email">이메일</label>
        <input type="text" id="user_email" v-model="userInfo.user_email" placeholder="이메일" class="form-control" />
      </div>

      <div class="form-group">
        <label for="user_point">보유중인 적립금</label>
        <input type="text" id="user_point" v-model="userInfo.user_point" readonly class="form-control readonly" />
      </div>

      <div class="button-group">
        <button type="submit" class="btn btn-info small-btn">수정하기</button>
        <button type="button" class="btn btn-cancel small-btn" @click="cancelEdit">취소</button>
        <a href="/userDelete" class="btn btn-withdraw small-btn">회원탈퇴</a>
      </div>
    </form>

    <!-- 모달 컴포넌트 -->
    <Modal v-if="showModal" :message="modalMessage" @close="showModal = false" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import Modal from '@/components/UpdateUserModal.vue';

export default {
  components: {
    Modal
  },
  data() {
    return {
      userInfo: {
        user_id: '',
        user_name: '',
        user_post: '',
        user_address: '',
        user_detail_addr: '',
        user_phone: '',
        user_email: '',
        user_point: ''
      },
      showModal: false,
      modalMessage: ''
    };
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  methods: {
    async updateUserInfo() {
      try {
        const response = await axios.put('/api/user/updateUser', this.userInfo);
        console.log(response.data); // 성공 메시지 확인
        this.showModal = true;
        this.modalMessage = '사용자 정보가 성공적으로 업데이트되었습니다.';
      } catch (error) {
        console.error('Error updating user info:', error);
      }
    },
    cancelEdit() {
      this.$router.push({ name: 'home' });
    },
    openDaumPostcode() {
      // Daum 우편번호 서비스 API를 이용한 우편번호 검색 기능
      new daum.Postcode({
        oncomplete: (data) => {
          this.userInfo.user_post = data.zonecode;
          this.userInfo.user_address = data.address;
        }
      }).open();
    }
  },
  created() {
    const user = this.getUserInfo;
    if (user) {
      this.userInfo = { ...user };
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 500px;
  margin: 60px auto;
  background: #f5f5f5;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 20px;
}

.user-info-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.header {
  width: 100%;
  font-weight: 700;
  font-size: 28px;
  line-height: 1.5;
  color: #4a90e2;
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #4a90e2;
}

.form-control {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #333;
  border: none;
  border-bottom: 1px solid #ccc;
  width: 100%;
  padding: 8px 12px;
  background-color: #fff;
  border-radius: 6px;
  transition: border-color 0.2s ease;
}

.form-control:focus {
  outline: none;
  border-color: #4a90e2;
}

.form-control.readonly {
  font-weight: bold;
  font-style: italic;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn {
  width: 100%;
  height: 40px;
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  background-color: #4a90e2;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #357ebd;
}

.small-btn {
  width: 48%;
  margin-left: 4%;
}

.btn-withdraw {
  background-color: #dc3545;
  text-decoration: none;
  display: inline-block;
  padding: 10px 20px;
  border-radius: 6px;
  color: #fff;
  text-align: center;
  transition: background-color 0.3s ease;
}

.btn-withdraw:hover {
  background-color: #c82333;
}
</style>
