<template>
    <div class="container">
        <div v-if="account">
            {{ account.userid }}
            <button type="button" @click="logoutHandler">로그아웃</button>
        </div>
        <div v-else>
            <label for="user_id">아이디</label>
            <input v-model="form.user_id">
            <br>
            <label for="user_pw">비밀번호 </label>
            <input v-model="form.user_pw" type="password">
            <br>
            <button type="button" @click="loginHandler">로그인</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            form: { user_id: '', user_pw: '' },
        }
    },
    computed: {
        account() {
            return this.$store.state.user.userid
        }
    },
    created() {
        axios.get("/api/account")
            .then(result => {
                this.$store.commit('user', result.data);
            }).catch((err) => { console.log(err) });
    },
    methods: {
        loginHandler() {
            axios.post("/api/login", this.form)
                .then((result) => {
                    if (result.data.success) {
                        this.$store.commit('user', result.data.user);
                        alert('로그인 성공');
                    } else {
                        alert('로그인 실패: ' + result.data.message);
                    }
                })
                .catch((err) => {
                    console.error('로그인 실패:', err);
                    alert('로그인 실패');
                })
        },
        logoutHandler() {
            axios.post("/api/logout")
                .then(() => {
                    this.$store.commit('user', {});
                    alert('로그아웃');
                })
                .catch((err) => {
                    console.error('로그아웃 실패:', err);
                    alert('로그아웃 실패');
                });
        },
    },
}
</script>

<style scoped>
.container {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
}

label {
    display: inline-block;
    width: 100px;
    margin-bottom: 8px;
    font-weight: bold;
}

input {
    margin-bottom: 12px;
    width: calc(100% - 100px);
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.btn {
    margin-top: 16px;
    padding: 10px 15px;
    background-color: #5bc0de;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn:hover {
    background-color: #31b0d5;
}

form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
