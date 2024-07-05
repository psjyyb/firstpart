<template>
  <div class="find-password-container">
    <div class="card">
      <h2>FIND ID</h2>
      <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fpng-clipart%2F20231214%2Fourlarge%2Fpngtree-cute-cat-pet-illustration-png-image_11285605.png&type=sc960_832" alt="Cute Cat" class="cat-img" />
      <form @submit.prevent="findId">
        <label for="user_name">이름</label>
        <input type="text" id="user_name" v-model="user_id.user_name" required />
        <br>
        <label for="user_phone">전화번호</label>
        <input type="text" id="user_phone" v-model="user_id.user_phone" required />
        <br>
        <div class="button-group">
          <button class="btn find-btn">FIND</button>
          <button class="btn cancel-btn" @click="cancel">취소</button>
        </div>
      </form>
    </div>

    <!-- 모달 -->
    <div class="modal fade" id="idModal" tabindex="-1" role="dialog" aria-labelledby="idModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="idModalLabel">아이디 찾기 결과</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>찾은 아이디: {{ foundUserId }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal">닫기</button>
          </div>
        </div>
      </div>
    </div>
    <!-- /모달 -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user_id: {
        user_name: '',
        user_phone: ''
      },
      foundUserId: ''
    };
  },
  methods: {
    async findId() {
      try {
        const response = await axios.post('/api/user/findId', this.user_id);
        if (response.status === 200) {
          this.foundUserId = response.data.user_id; // 서버에서 받은 아이디를 저장
          $('#idModal').modal('show'); // 모달을 보여줌
        } else {
          alert('등록된 아이디가 없습니다');
        }
      } catch (error) {
        console.error(error);
        alert('아이디를 찾는 중 오류가 발생했습니다.');
      }
    },
    closeModal() {
      $('#idModal').modal('hide'); // 모달을 닫음
      this.$router.push({ name: 'loginForm' }); // 로그인 페이지로 이동
    },
    cancel() {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style scoped>
.find-password-container {
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

.find-btn {
  background-color: #f5deb3; 
  color: white;
}

.find-btn:hover {
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
