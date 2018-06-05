import Vue from 'vue';
import VueCarousel from 'vue-carousel'; // image slide component
import VueLazyload from 'vue-lazyload'; // pre-loading images
import AsyncComputed from 'vue-async-computed'; //computed can have async func
import VModal from 'vue-js-modal';


//CSS imports
import '@/assets/sass/main.scss';
import '@/assets/css/animate.css';

import router from '@/router'; // helpper to route the endpoints
import store from '@/store';

import App from '@/App.vue';

Vue.use(VueCarousel);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'static/thumbMask.png',
  loading: 'static/thumbMask.png',
  attempt: 1
});
Vue.use(AsyncComputed);
Vue.use(VModal);

// Instantiate application to the DOM
const app = new Vue({
    router,
    el: '#app',
    store,
    render: h => h(App)
});
