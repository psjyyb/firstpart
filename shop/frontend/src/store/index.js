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
      commit('setUser', user);
    },
    async logoutUser({ commit }) {
      commit('clearUser');
    },
  },
  getters: {
    isLoggedIn: state => !!state.user,
    getUserInfo: state => state.user,
  },
  plugins: [persistedstate({ paths: ['user'] })],
});

export default store;