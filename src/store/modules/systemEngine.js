import store from '@/api';

// initial state
const state = {
  isContentFreeze: true,
  isSearchBarOpen: false,
  isSideBarOpen: false,
};

// getters
const getters = {
  isSearchBarOpen: state => state.isSearchBarOpen,
  isContentFreeze: state => state.isContentFreeze,
  isSideBarOpen: state => state.isSideBarOpen,
};

// actions
const actions = {
  unFreezeContent ({ commit }) {
    commit('UNFREEZE_CONTENT');
  },
  freezeContent ({ commit }) {
    commit('FREEZE_CONTENT');
  },
  openSearchBar ({ commit }) {
    commit('OPEN_SEARCH_BAR');
  },
  closeSearchBar ({ commit }) {
    commit('CLOSE_SEARCH_BAR');
  },
  openSideBar ({ commit }, mobileMode) {
    commit('OPEN_SIDE_BAR');
  },
  closeSideBar ({ commit }, mobileMode) {
    commit('CLOSE_SIDE_BAR');
  },
};

// mutations
const mutations = {
  FREEZE_CONTENT(state) {
    state.isContentFreeze = true;
  },
  UNFREEZE_CONTENT(state) {
    state.isContentFreeze = false;
  },
  OPEN_SEARCH_BAR(state) {
    state.isSearchBarOpen = true;
    state.isContentFreeze = true;
  },
  CLOSE_SEARCH_BAR(state) {
    state.isSearchBarOpen = false;
    state.isContentFreeze = false;
  },
  OPEN_SIDE_BAR (state) {
    state.isSideBarOpen = true;
    state.isContentFreeze = true;
  },
  CLOSE_SIDE_BAR (state) {
    state.isSideBarOpen = false;
    state.isContentFreeze = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
