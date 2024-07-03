<template>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>알림</h3>
            <span class="modal-close" @click="closeModal">&times;</span>
          </div>
          <div class="modal-body">
            <p>{{ message }}</p>
            <button class="btn btn-info small-btn" @click="closeModal">확인</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['message'],
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-wrapper {
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
  }
  
  .modal-container {
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    padding: 20px;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }
  
  .modal-header h3 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
  }
  
  .modal-close {
    cursor: pointer;
    font-size: 24px;
    color: #888;
  }
  
  .modal-body {
    margin-top: 10px;
  }
  
  .btn {
    height: 40px;
    font-weight: 700;
    font-size: 16px;
    color: #fff;
    background-color: #4a90e2;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
  }
  
  .btn:hover {
    background-color: #357ebd;
  }
  
  .small-btn {
    width: 100%;
    margin-top: 10px;
  }
  </style>
  