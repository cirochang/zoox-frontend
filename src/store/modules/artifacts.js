import store from '@/api';

// initial state
const state = {
  uploadProgress: 0,
  artifacts: {
    android: null,
    ios: null
  }
};

// getters
const getters = {
  lastArtifacts: state => state.lastArtifacts,
  artifacts: state => os => state.artifacts[os],
  uploadProgress: state => state.uploadProgress,
};

// actions
const actions = {
  async saveArtifact ({ commit }, artifact) {
    commit('SET_UPLOAD_PROGRESS', 0);
    const onUploadProgress = progressEvent => {
      const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
      commit('SET_UPLOAD_PROGRESS', percentCompleted);
    };
    const { data } = (artifact.id)
      ? await store.updateArtifact(artifact, onUploadProgress)
      : await store.createArtifact(artifact, onUploadProgress);
    commit('ADD_ARTIFACT', data.version);
  },
  async getArtifacts ({ commit }, applicationId) {
    commit('SET_ARTIFACTS', {android: null, ios: null});
    const { data } = await store.getArtifactsByApplicationId(applicationId);
    commit('SET_ARTIFACTS', data.versions);
  },
  async deleteArtifact ({ commit }, artifactId) {
    const { data } = await store.deleteArtifact(artifactId);
  },
};

// mutations
const mutations = {
  SET_UPLOAD_PROGRESS (state, progress) {
    state.uploadProgress = progress;
  },
  ADD_ARTIFACT (state, artifact) {
    const os = artifact.os;
    state.artifacts[os].push(artifact);
  },
  SET_ARTIFACTS (state, artifacts) {
    state.artifacts = artifacts;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
