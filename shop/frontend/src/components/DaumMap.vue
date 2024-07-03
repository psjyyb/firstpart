<template>
  <div class="daum-map-container">
    <div class="input-group">
      <input type="text" id="user_post" v-model="postcode" required readonly placeholder="우편번호" class="form-control" />
      <button type="button" @click="openDaumPostcode" class="btn btn-secondary">우편번호 검색</button>
    </div>
    <br />
    <input type="text" id="user_address" v-model="fullAddress" required readonly placeholder="주소" class="form-control" />
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
.input-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn {
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

.form-control {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #797979;
  border: none;
  border-bottom: 1px solid #cfcfcf;
  width: 100%;
  padding: 5px 10px;
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.daum-map-container {
  margin-bottom: 20px;
}
</style>
