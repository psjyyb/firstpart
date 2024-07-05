<template>
  <div class="container">
    <form @submit.prevent="joinUser" class="member-container">
      <div class="header">Join</div>

      <div class="user-info">
        <div class="form-group">
          <div class="input-group">
            <input type="text" id="user_id" v-model="userInfo.user_id" placeholder="아이디" autofocus required class="form-control" />
            <button type="button" id="check-user-id-btn" class="btn btn-secondary small-btn-check" @click="checkUserId">중복 체크</button>
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
        <button type="submit" class="btn btn-primary small-btn">가입하기</button>
        <button type="button" class="btn btn-secondary small-btn" @click="cancelJoin">취소</button>
      </div>

      <span v-if="!userIdSuccess" class="error message">중복 체크를 해주세요.</span>
      
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
}

body {
  display: flex;
  justify-content: center;
  background-color: #f5f5f5; /* 배경색상 변경 */
}

.container {
  width: 100%;
  max-width: 670px; /* 컨테이너 최대 너비 설정 */
  padding: 20px;
  background-color: #ffffff; /* 배경색상 변경 */
  border-radius: 10px; /* 테두리 둥글게 처리 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
}

.header {
  font-size: 32px;
  font-weight: 700;
  color: #000000; /* 헤더 색상 변경 */
  text-align: center;
  margin-bottom: 20px;
}

.user-info {
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
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none; /* 입력 필드 테두리 제거 */
  border-bottom: 1px solid #e0e0e0; /* 밑줄 테두리 추가 */
  border-radius: 0; /* 입력 필드 둥글게 처리 제거 */
  transition: border-color 0.3s ease; /* 테두리 색상 변화 효과 추가 */
}

.user-info-email input {
  border-bottom-color: #ff725e; /* 이메일 입력 필드 밑줄 테두리 색상 변경 */
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn {
  width: 49%; /* 버튼 너비 조정 */
  height: 40px;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  border: none;
  border-radius: 5px; /* 버튼 둥글게 처리 */
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center; /* 텍스트 가운데 정렬 추가 */
  align-items: center; /* 텍스트 가운데 정렬 추가 */
}

.btn-primary {
  background-color: #ff8474; /* 주 버튼 연한 색상으로 변경 */
}

.btn-secondary {
  background-color: #6abf69; /* 보조 버튼 연한 색상으로 변경 */
}

.btn:hover {
  opacity: 0.9; /* 버튼 호버 시 투명도 변경 */
}

.error {
  color: #ff725e; /* 에러 메시지 색상 변경 */
  font-size: 14px;
  margin-top: 5px;
}

.success {
  color: #4caf50; /* 성공 메시지 색상 변경 */
  font-size: 14px;
  margin-top: 5px;
}

.message {
  font-size: 14px;
  color: #ff725e; /* 메시지 색상 변경 */
  margin-top: 5px;
}

.small-btn-check {
  width: 30%; /* 중복 체크 버튼 너비 조정 */
}
</style>
