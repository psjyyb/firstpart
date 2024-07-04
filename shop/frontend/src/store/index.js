import { createStore } from 'vuex';
import persistedstate from 'vuex-persistedstate';

const store = createStore({
  state() {
    return {
      user: null,
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
    async loginUser({ commit }, user) {
      if (user.is_kakao_user) {
        user.is_kakao_user = true; // 카카오 로그인 시 true로 설정
      } else {
        user.is_kakao_user = false;
      }
      commit('setUser', user);
    },
    async logoutUser({ commit }) {
      commit('clearUser');
    },
  },
  getters: {
    isLoggedIn: state => !!state.user,
    getUserInfo: state => state.user,
    isKakaoUser: state => state.user && state.user.is_kakao_user,
  },
  plugins: [persistedstate({ paths: ['user'] })],
});

export default store;