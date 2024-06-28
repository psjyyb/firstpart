<template>
  <div class="auth-container">
    <h2>LOGIN</h2>
    <div v-if="isLoggedIn" class="user-info">
      <p>{{ userInfo && userInfo.user_id }}</p>
      <button class="btn" @click="logoutHandler">로그아웃</button>
    </div>
    <div v-else class="login-form">
      <input class="input" type="text" placeholder="ID" v-model="form.user_id" />
      <input class="input" type="password" placeholder="PASSWORD" v-model="form.user_pw" />
      <button class="btn" @click="loginHandler">로그인</button>
      <div class="links">
        <router-link to="/FindId" class="link">아이디 찾기</router-link>
        <router-link to="/FindPw" class="link">비밀번호 찾기</router-link>
      </div>
    </div>
    <!-- 카카오 로그인 컴포넌트 -->
    <kakaoLogin v-if="!isLoggedIn" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import kakaoLogin from '@/components/kakaoLogin.vue';
import axios from 'axios'; 

export default {
  components: {
    kakaoLogin,
  },
  data() {
    return {
      form: {
        user_id: '',
        user_pw: '',
      },
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'getUserInfo']),
    userInfo() {
      return this.getUserInfo;
    },
  },
  methods: {
  ...mapActions(['loginUser', 'logoutUser']),
  loginHandler() {
    axios
      .post('/api/user/login', this.form)
      .then(result => {
        this.loginUser(result.data); // Vuex store에 사용자 정보 저장
        alert('로그인 성공');
        this.$router.push({ name: 'HomePage' });
      })
      .catch(err => {
        console.error('로그인 실패:', err);
        if (err.response && err.response.status === 401) {
          alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        } else {
          alert('로그인 실패');
        }
      });
  },
  logoutHandler() {
    axios
      .post('/api/user/logout')
      .then(() => {
        this.logoutUser(); // Vuex store에서 사용자 정보 제거
        alert('로그아웃');
      })
      .catch(err => {
        console.error('로그아웃 실패:', err);
      });
  },
}
}
</script>



<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.user-info {
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 10px;
}

.input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
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

.links {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.link {
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
}

.link:hover {
  text-decoration: underline;
}
</style>
