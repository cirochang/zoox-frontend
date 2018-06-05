import store from '@/api';
import Cookies from 'js-cookie';

// initial state
const state = {
  currentUser: null,
  isLoggedIn: !!Cookies.get('token')
};

// getters
const getters = {
  currentUser: state => state.currentUser,
  isLoggedIn: state => state.isLoggedIn,
  isManager: state => state.currentUser && !!state.currentUser.roles.filter(item => item.kind === "globostore" && item.name === "manager").length,
};

// actions
const actions = {
  async getCurrentUser ({ commit }) {
    const { data } = await store.getCurrentUser();
    commit('SET_CURRENT_USER', data.user);
  },
  async login({ commit }, credentials) {
    const { data } = await store.login(credentials);
    commit('LOGIN_SUCCESS', data.token);
  },
  logout({ commit }) {
    commit('LOGOUT');
  },
  async seeTutorial({commit}) {
    const { data } = await store.seeTutorial();
    commit('SET_CURRENT_USER', data.user);
  }
};

// mutations
const mutations = {
  LOGIN_SUCCESS (state, token) {
    Cookies.set('token', token, { expires: 1});
    state.isLoggedIn = true;
  },
  LOGOUT (state) {
    Cookies.remove('token');
    state.currentUser = null;
    state.isLoggedIn = false;
  },
  SET_CURRENT_USER (state, user) {
    state.currentUser = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
