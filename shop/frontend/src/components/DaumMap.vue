<template>
  <div class="daum-map-container">
    <div class="input-group">
      <input type="text" id="user_post" v-model="postcode" required readonly placeholder="우편번호" class="form-control postcode-input" />
      <button type="button" @click="openDaumPostcode" class="btn btn-secondary">우편번호 검색</button>
    </div>
    <br />
    <input type="text" id="user_address" v-model="fullAddress" required readonly placeholder="주소" class="form-control address-input" />
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
  padding: 10px 20px;
  background-color: #ff725e; /* 살색 계열의 버튼 배경색 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #f24c2e; /* 버튼 호버 시 배경색 변경 */
}

.form-control {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #797979; /* 살색 계열의 입력 필드 텍스트 색상 */
  border: none;
  border-bottom: 1px solid #cfcfcf;
  width: 100%;
  padding: 8px 10px;
}

.postcode-input {
  width: 40%; /* 우편번호 입력 필드 너비 조정 */
}

.address-input {
  width: 100%; /* 주소 입력 필드 너비 조정 */
}

.daum-map-container {
  margin-bottom: 20px;
}
</style>
