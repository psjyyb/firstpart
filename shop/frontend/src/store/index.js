import { createStore } from 'vuex';
import persistedstate from 'vuex-persistedstate';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      user: {}, // 로그인한 사용자 정보를 담을 객체
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    async loginUser({ commit }, { user_id, user_pw }) {
      try {
        const response = await axios.post('/api/user/login', { user_id, user_pw });
        commit('setUser', response.data);
      } catch (error) {
        console.error('Error logging in:', error);
        throw error;
      }
    },
    async logoutUser({ commit }) {
      try {
        await axios.post('/api/user/logout');
        commit('clearUser');
      } catch (error) {
        console.error('Error logging out:', error);
        throw error;
      }
    },
  },
  getters: {
    isLoggedIn: state => !!state.user,
    getUserInfo: state => state.user,
  },
  plugins: [persistedstate({ paths: ['user'] })], // user 상태를 지속적으로 유지
});

export default store;
