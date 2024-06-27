<template>
    <div>
        <FindUsers />
    </div>
    <div>
        <h2>FIND ID</h2>
    </div>
    <form @submit.prevent>
        <label for="user_name">이름</label>
        <input type="text" id="user_name" v-model="userId.user_name" required />
        <br>
        <label for="user_phone">전화번호</label>
        <input type="text" id="user_phone" v-model="userId.user_phone" required/>
        <br>

        <button class="btn" @click="FindIdHandler()">FIND</button>
        <button class="btn" @click="cancel()">취소</button>
    </form>

</template>
<script>
import FindUsers from '@/components/FindUsers.vue'
export default {
    components:{
        FindUsers
    },
    data() {
        return {
            userId: { user_name: '', user_phone: '' }
        }
    },
    methods: {
        FindIdHandler(){
            axios.post("api/user/FindId",this.userId)
            .then(result =>{
                alert('회원님의 아이디는'+ user_id +'입니다')
            })
            .catch(err=>{
                console.log(err);
                alert('실패')
            });
        },
        cancel(){
        }
    }
}
</script>