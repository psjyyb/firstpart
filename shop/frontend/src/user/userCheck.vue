<template>
      <div class="auth-container">
        <div>
        <h2>개인 정보 수정</h2>
      </div>
       <table class="table splite-table table-hober">
      
        <input class="input" type="text" v-model="user.user_id" />
        <br>
        <input class="input" type="password" placeholder="PASSWORD" v-model="user.user_pw" />
        </table>
        <button class="btn" @click="checkHandler">확인</button>
        </div>
  </template>

  <script>
import axios from 'axios';

export default {
     data() {
      return {
        user: {
          user_id: '',
          user_pw: ''
        }
      };
    },
    computed: {
      account() {
        return this.$store.state.user.user_id;
      }
    },
    created() {
      axios.get("/api/user/account")
        .then(result => {
          this.$store.commit('user', result.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    methods: {
      cancelForm() {
      this.user_pw = ''; 
    }
  }
}
</script>
