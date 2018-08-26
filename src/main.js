import Vue from 'vue';

import bootstrap from 'bootstrap';
import adminlte from 'admin-lte';

//CSS imports
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'admin-lte/dist/css/AdminLTE.min.css';
import 'admin-lte/dist/css/skins/_all-skins.min.css';


import router from '@/router'; // helpper to route the endpoints

import App from '@/App.vue';
import Notifications from 'vue-notification';

Vue.use(Notifications);

// Instantiate application to the DOM
const app = new Vue({
    router,
    el: '#app',
    render: h => h(App)
});
