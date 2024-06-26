<template>
    <div class="container">
        <form @submit.prevent>
            <label for="user_id">아이디</label>
            <input type="text" id="user_id" v-model="userInfo.user_id" required />
            <br>
            <label for="user_pw">비밀번호 </label>
            <input type="password" id="user_pw" v-model="userInfo.user_pw" />
            <br>
            <br>
            <label for="user_pw2" @click="">비밀번호확인 </label>
            <input type="password" id="user_pw2" />
            <br>

            <label for="user_name">이름 </label>
            <input type="text" id="user_name" v-model="userInfo.user_name" />
            <br>
            <!-- 우편번호 검색 컴포넌트 -->
            <DaumMap @address-selected="updateAddress" />

            <label for="user_detail_addr">상세주소 </label>
            <input type="text" id="user_detail_addr" v-model="userInfo.user_detail_addr" />
            <br>
            <label for="user_phone">전화번호 </label>
            <input type="text" id="user_phone" v-model="userInfo.user_phone" />
            <br>
            <label for="user_email">이메일 </label>
            <input type="text" id="user_email" v-model="userInfo.user_email" />
            <br>
            <button type="button" class="btn	btn-xs	btn-info" @click="joinUser()">
                회원 가입
            </button>
            <!-- 카카오 로그인 컴포넌트 -->
            <KakaoLogin />
        </form>
    </div>
</template>
<script>
import DaumMap from '@/components/DaumMap.vue'
import KakaoLogin from '@/components/kakaoLogin.vue'
import axios from "axios";
export default {
    components: {
        DaumMap, KakaoLogin
    },
    data() {
        return {
            searchNo: "",
            userInfo: [],
        };
    },
    computed: {},
    created() {
        this.searchNo = this.$route.query.user_id;
        if (this.searchNo > 0) {
            this.getuserInfo();
        }
    },

    methods: {
        updateAddress(data) {
            this.userInfo.user_post = data.postcode;
            this.userInfo.user_address = data.address;
        },
        confirmPassword() {
            // 비밀번호 확인 메서드
            if (this.userInfo.user_pw !== this.confirmPassword) {
                alert('비밀번호가 일치하지 않습니다.');
                return false;
            }
            return true;
        },
        async getuserInfo() {
            let result = await axios.get(`/api/user/${this.searchNo}`);
            this.userInfo = result.data[0];
        },
        async joinUser() {
            const url = "/api/user";
            let param = {
                user_id: this.userInfo.user_id,
                user_pw: this.userInfo.user_pw,
                user_name: this.userInfo.user_name,
                user_post: this.userInfo.user_post,
                user_address: this.userInfo.user_address,
                user_detail_addr: this.userInfo.user_detail_addr,
                user_phone: this.userInfo.user_phone,
                user_post: this.userInfo.user_post,
                user_email: this.userInfo.user_email
            };

            const result = (await axios.post(url, param)).data;
            alert("회원가입에 성공하셨습니다");
        }
    }
};
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