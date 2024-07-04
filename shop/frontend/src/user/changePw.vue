<template>
  <div class="password-setup-container">
    <h2>비밀번호 설정</h2>
    <form @submit.prevent="submitPassword">
      <div>
        <label for="new-password">새 비밀번호:</label>
        <input type="password" id="new-password" v-model="newPassword" required>
      </div>
      <div>
        <label for="confirm-password">비밀번호 확인:</label>
        <input type="password" id="confirm-password" v-model="confirmPassword" required>
      </div>
      <button type="submit">설정</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
    };
  },
  methods: {
    async submitPassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      const response = await fetch('/api/user/setPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: this.newPassword }),
      });

      if (response.ok) {
        alert('비밀번호가 설정되었습니다.');
        this.$router.push({ name: 'home' }); // or any other route you want to redirect to
      } else {
        alert('비밀번호 설정 중 오류가 발생했습니다.');
      }
    },
  },
};
</script>

<style scoped>
.password-setup-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

form div {
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
}
</style>
