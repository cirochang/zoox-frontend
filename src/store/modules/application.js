import store from '@/api';

// initial state
const state = {
  all: null,
  currentApplication: null,
};

// getters
const getters = {
  applications: state => state.all,
  currentApplication: state => state.currentApplication
};

// actions
const actions = {
  async setProductionArtifact ({ commit }, artifact) {
    const { data } = await store.setProductionArtifact({
      applicationId: artifact.applicationId,
      artifactId: artifact.id,
    });
    commit('SET_CURRENT_APPLICATION', data.app);
  },
  async saveApplication ({ commit }, application) {
    const { data } = (application.id)
      ? await store.updateApplication(application)
      : await store.createApplication(application);
    commit('SET_CURRENT_APPLICATION', data.app);
    if (!application.id)
      commit('SET_ARTIFACTS', { android: [], ios: [] });
  },
  async getApplications ({ commit }, query) {
    commit('SET_APPLICATIONS', null);
    const { data } = await store.getApplications(query);
    commit('SET_APPLICATIONS', data.apps);
  },
  async getMoreApplications ({ commit }, query) {
    const { data } = await store.getApplications(query);
    commit('CONCAT_APPLICATIONS', data.apps);
  },
  async getApplicationById ({ commit }, applicationId) {
    commit('SET_CURRENT_APPLICATION', null);
    const { data } = await store.getApplicationById(applicationId);
    commit('SET_CURRENT_APPLICATION', data.app);
  },
  async getMyApplications ({ commit }) {
    commit('SET_APPLICATIONS', null);
    const { data } = await store.getMyApplications();
    commit('SET_APPLICATIONS', data.apps);
  },
  clearCurrentApplication ({ commit }) {
    commit('SET_CURRENT_APPLICATION', null);
  },
  async deleteApplication ({ commit }, applicationId) {
    const { data } = await store.deleteApplication(applicationId);
  },
};

// mutations
const mutations = {
  SET_APPLICATIONS (state, applications) {
    state.all = applications;
  },
  CONCAT_APPLICATIONS (state, applications) {
    state.all = state.all.concat(applications);
  },
  SET_CURRENT_APPLICATION (state, application) {
    state.currentApplication = application;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
