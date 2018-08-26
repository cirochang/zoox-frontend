import Vue from 'vue';
import VueRouter from 'vue-router';

import PageNotFound from '@/components/PageNotFound.vue';
import System from '@/components/System.vue';
import Home from '@/components/system/container/Home.vue';
import Cities from '@/components/system/container/Cities.vue';
import States from '@/components/system/container/States.vue';
import CreateCity from '@/components/system/container/cities/Create.vue';
import CreateState from '@/components/system/container/states/Create.vue';
import EditCity from '@/components/system/container/cities/Edit.vue';
import EditState from '@/components/system/container/states/Edit.vue';


Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '',
      component: System,
      children: [
        {
          name: 'Home',
          path: '/',
          component: Home
        },
        {
          name: 'Cities',
          path: '/cities',
          component: Cities
        },
        {
          name: 'States',
          path: '/states',
          component: States
        },
        {
          name: 'Create City',
          path: '/cities/create',
          component: CreateCity
        },
        {
          name: 'Create State',
          path: '/states/create',
          component: CreateState
        },
        {
          name: 'Edit City',
          path: '/cities/edit',
          component: EditCity
        },
        {
          name: 'Edit State',
          path: '/states/edit',
          component: EditState
        }
      ],
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound,
    }
  ],
});
