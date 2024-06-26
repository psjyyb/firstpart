<template>
  <div>
    <label for="user_post">우편번호 </label>
    <input type="text" id="user_post" v-model="postcode" />
    <button type="button" @click="openDaumPostcode">우편번호 검색</button>
    <br>
    <label for="user_address">주소 </label>
    <input type="text" id="user_address" v-model="fullAddress" />
    <br>
    </div>

</template>

<script>
export default {
  data() {
    return {
      postcode: '',
      fullAddress: ''
    };
  },
  methods: {
    openDaumPostcode() {
      new daum.Postcode({
        oncomplete: (data) => {
          this.postcode = data.zonecode;
          this.fullAddress = data.address;
          this.$emit('address-selected', {
            postcode: this.postcode,
            address: this.fullAddress
          });
        }
      }).open();
    }
  }
};
</script>

<style scoped>

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


</style>
