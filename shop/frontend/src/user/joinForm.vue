<template>
  <div class="container">
    <form @submit.prevent="joinUser" class="member-container">
      <div class="header">회원 가입</div>

      <div class="user-info">
        <div class="form-group">
          <div class="input-group">
            <input type="text" id="user_id" v-model="userInfo.user_id" placeholder="아이디" autofocus required class="form-control" />
            <button type="button" class="btn btn-secondary" @click="checkUserId">중복 체크</button>
          </div>
          <span v-if="userIdError" class="error">{{ userIdError }}</span>
          <span v-if="userIdSuccess" class="success">사용 가능한 아이디입니다.</span>
        </div>

        <div class="form-group">
          <input type="password" id="user_pw" v-model="userInfo.user_pw" placeholder="비밀번호" required class="form-control" />
        </div>

        <div class="form-group">
          <input type="password" id="user_pw2" v-model="userInfo.user_pw2" placeholder="비밀번호 확인" required class="form-control" @input="confirmPassword" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
          <span v-if="passwordMatch" class="success">비밀번호가 일치합니다.</span>
        </div>

        <div class="form-group">
          <input type="text" id="user_name" v-model="userInfo.user_name" placeholder="이름" required class="form-control" />
        </div>

        <!-- 다음 우편번호 검색 컴포넌트 추가 -->
        <DaumMap @address-selected="updateAddress" />

        <div class="form-group">
          <input type="text" id="user_detail_addr" v-model="userInfo.user_detail_addr" placeholder="상세주소" required class="form-control" />
        </div>

        <div class="form-group">
          <input type="text" id="user_phone" v-model="userInfo.user_phone" placeholder="전화번호" required class="form-control" />
        </div>

        <div class="form-group">
          <input type="email" id="user_email" v-model="userInfo.user_email" placeholder="이메일" required class="form-control user-info-email" />
        </div>
      </div>

      <div class="button-group">
        <button type="submit" class="btn btn-info small-btn" :disabled="!isFormValid">회원 가입</button>
        <button type="button" class="btn btn-cancel small-btn" @click="cancelJoin">취소</button>
        <span v-if="!userIdSuccess" class="error">중복 체크를 해주세요.</span>
        <span v-if="passwordError">{{ passwordError }}</span>
      </div>

      <!-- 카카오 로그인 컴포넌트 -->
      <kakaoLogin />
    </form>
  </div>
</template>

<script>
import DaumMap from '@/components/DaumMap.vue';
import kakaoLogin from '@/components/kakaoLogin.vue';
import axios from 'axios';

export default {
  components: {
    DaumMap,
    kakaoLogin
  },
  data() {
    return {
      userIdError: null,
      userIdSuccess: false,
      passwordError: null,
      userInfo: {
        user_id: '',
        user_pw: '',
        user_pw2: '',
        user_name: '',
        user_post: '',
        user_address: '',
        user_detail_addr: '',
        user_phone: '',
        user_email: ''
      },
    };
  },
  computed: {
    isFormValid() {
      return this.passwordMatch && this.userIdSuccess;
    },
    passwordMatch() {
      return this.userInfo.user_pw === this.userInfo.user_pw2;
    }
  },
  methods: {
    updateAddress(data) {
      this.userInfo.user_post = data.postcode;
      this.userInfo.user_address = data.address;
    },
    async checkUserId() {
      if (!this.userInfo.user_id) {
        this.userIdError = '아이디를 입력해주세요.';
        this.userIdSuccess = false;
        return;
      }
      try {
        const response = await axios.post('/api/user/checkId', { user_id: this.userInfo.user_id });
        if (response.data.exists) {
          this.userIdError = '이미 사용 중인 아이디입니다.';
          this.userIdSuccess = false;
        } else {
          this.userIdError = null;
          this.userIdSuccess = true;
        }
      } catch (error) {
        console.error('아이디 중복 체크 실패:', error);
        this.userIdError = '아이디 중복 체크 중 오류가 발생했습니다.';
        this.userIdSuccess = false;
      }
    },
    confirmPassword() {
      if (this.userInfo.user_pw !== this.userInfo.user_pw2) {
        this.passwordError = '비밀번호가 일치하지 않습니다.';
      } else {
        this.passwordError = null;
      }
    },
    async joinUser() {
      if (!this.passwordMatch || !this.userIdSuccess) {
        return;
      }
      const url = "/api/user/insert";
      let param = {
        user_id: this.userInfo.user_id,
        user_pw: this.userInfo.user_pw,
        user_name: this.userInfo.user_name,
        user_post: this.userInfo.user_post || 0,
        user_address: this.userInfo.user_address,
        user_detail_addr: this.userInfo.user_detail_addr,
        user_phone: this.userInfo.user_phone,
        user_email: this.userInfo.user_email
      };

      try {
        const result = await axios.post(url, param);
        alert("회원가입에 성공하셨습니다");
        this.resetForm();
        this.$router.push({ name: 'loginForm' });
      } catch (error) {
        console.error("회원가입 실패:", error);
        alert("회원가입 중 오류가 발생했습니다");
      }
    },
    resetForm() {
      this.userInfo.user_id = '';
      this.userInfo.user_pw = '';
      this.userInfo.user_pw2 = '';
      this.userInfo.user_name = '';
      this.userInfo.user_post = '';
      this.userInfo.user_address = '';
      this.userInfo.user_detail_addr = '';
      this.userInfo.user_phone = '';
      this.userInfo.user_email = '';

      this.userIdError = null;
      this.userIdSuccess = false;
      this.passwordError = null;
    },
    cancelJoin() {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
}

body {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 670px;
  margin-top: 60px;
  margin-bottom: 60px;
  background: #ffffff;
  border: 1px solid #aacdff;
  box-shadow: 7px 7px 39px rgba(0, 104, 255, 0.25);
  border-radius: 20px;
  padding: 20px;
}

.member-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.header {
  width: 100%;
  font-weight: 700;
  font-size: 32px;
  line-height: 47px;
  color: #0068ff;
  text-align: center;
  margin-bottom: 20px;
}

.user-info {
  width: 100%;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.input-group {
  display: flex;
  align-items: center;
}

.input-group-append {
  margin-left: 10px;
}

.form-control {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #797979;
  border: none;
  border-bottom: 1px solid #cfcfcf;
  width: 100%;
  padding: 5px 10px;
}

.user-info-email input {
  border-bottom: 1px solid #0068ff;
}

.button-group {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
  align-items: center;
}

.btn {
  width: auto;
  height: 40px;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #ffffff;
  background: #0068ff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056e0;
}

.small-btn {
  height: 35px;
  font-size: 16px;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
