import Vuex from 'vuex';
import { shallow, createLocalVue } from 'vue-test-utils';
import App from '@/App.vue';
import Login from '@/components/Login.vue';
import System from '@/components/System.vue';
import router from '@/router';

import sinon from 'sinon';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('App.vue', () => {

  it('Show loggin page if is loggedIn', () => {
    let getters = {
      isLoggedIn: () => false,
    };
    let actions = {getCurrentUser() {}};
    let store = new Vuex.Store({ getters, actions });
    const wrapper = shallow(App, {
       store,
       localVue,
       router,
    });
    const divArray = wrapper.findAll('div');
    expect(divArray.contains(Login)).to.equal(true);
  });

  it('Show system page if is NOT loggedIn', () => {
    let getters = {
      isLoggedIn: () => true,
    };
    let actions = {getCurrentUser() {}};
    let store = new Vuex.Store({ getters, actions });
    const wrapper = shallow(App, {
       store,
       localVue,
       router,
    });
    const divArray = wrapper.findAll('div');
    expect(divArray.contains(Login)).to.equal(false);
  });

});
