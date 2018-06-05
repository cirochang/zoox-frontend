import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// Modules
import application from './modules/application';
import artifacts from './modules/artifacts';
import user from './modules/user';
import systemEngine from './modules/systemEngine';

Vue.use(Vuex);

const debug = process.env.NODE_ENV === 'dev';

export default new Vuex.Store({
  modules: {
    systemEngine,
    application,
    artifacts,
    user,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
