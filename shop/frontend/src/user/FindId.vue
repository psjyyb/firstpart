<template>
  <div class="find-password-container">
    <h2>FIND ID</h2>
    <form @submit.prevent="findId">
      <label for="user_name">이름</label>
      <input type="text" id="user_name" v-model="userId.user_name" required />
      <br>
      <label for="user_phone">전화번호</label>
      <input type="text" id="user_phone" v-model="userId.user_phone" required />
      <br>

      <button class="btn find-btn">FIND</button>
      <button class="btn cancel-btn" @click="cancel">취소</button>
    </form>

    <!-- 모달 -->
    <div class="modal fade" id="idModal" tabindex="-1" role="dialog" aria-labelledby="idModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="idModalLabel">아이디 찾기 결과</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>찾은 아이디: {{ foundUserId }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
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
      userId: {
        user_name: '',
        user_phone: ''
      },
      foundUserId: '' 
    };
  },
  methods: {
    async findId() {

        const response = await axios.post('/api/user/findId', this.userId);
        if (response.status === 200) {
          this.foundUserId = response.data.user_id; // 서버에서 받은 아이디를 저장
          $('#idModal').modal('show'); // 모달을 보여줌
        } else {
          alert('등록된 아이디가 없습니다')
        }
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
}

form {
  width: 300px;
  margin-top: 20px;
}

label {
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.find-btn {
  background-color: #007bff;
  color: white;
}

.find-btn:hover {
  background-color: #0056b3;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
}

.cancel-btn:hover {
  background-color: #5a6268;
}
</style>
