import Vuex from 'vuex';
import { shallow, createLocalVue } from 'vue-test-utils';
import System from '@/components/System.vue';

import sinon from 'sinon';
import mockUser from '@/api/mocks/user';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('System.vue', () => {


  let store;
  let getters;
  beforeEach(() => {
    getters = {
      currentUser: () => mockUser,
      isContentFreeze: () => false,
    };
    store = new Vuex.Store({ getters });
  });

  it('Minimum pre loading page time', () => {
    const wrapper = shallow(System, {
       store,
       localVue
    });
    expect(wrapper.vm.minPageLoaded).to.equal(false);
    let clock = sinon.useFakeTimers();
    wrapper.vm.minLoadingPage();
    clock.tick(wrapper.vm.minPageLoadingTime);
    expect(wrapper.vm.minPageLoaded).to.equal(true);
    clock.restore();
  });

  it('Full pre loading page time', () => {
    const wrapper = shallow(System, {
       store,
       localVue
    });
    expect(wrapper.vm.pageIsLoaded).to.equal(false);
    let clock = sinon.useFakeTimers();
    wrapper.vm.minLoadingPage();
    clock.tick(wrapper.vm.minPageLoadingTime);
    wrapper.update();
    expect(wrapper.vm.pageIsLoaded).to.be.equal(true);
    clock.restore();
  });

  it('Full pre loading page time is false without a currentUser', () => {
    getters = {
      currentUser: () => null,
      isContentFreeze: () => false,
    };
    store = new Vuex.Store({ getters });
    const wrapper = shallow(System, {
       store,
       localVue
    });
    expect(wrapper.vm.pageIsLoaded).to.equal(false);
    let clock = sinon.useFakeTimers();
    wrapper.vm.minLoadingPage();
    clock.tick(wrapper.vm.minPageLoadingTime);
    wrapper.update();
    expect(wrapper.vm.pageIsLoaded).to.equal(false);
    clock.restore();
  });



});
