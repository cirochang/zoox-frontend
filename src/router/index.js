import Vue from 'vue';
import VueRouter from 'vue-router';

import PageNotFound from '@/components/PageNotFound.vue';
import System from '@/components/System.vue';
import Manager from '@/components/system/container/Manager.vue';
import ApplicationsList from '@/components/system/container/ApplicationsList.vue';
import MyApplications from '@/components/system/container/manager/MyApplications.vue';
import Application from '@/components/system/container/Application.vue';
import CreateEditApplication from '@/components/system/container/manager/CreateEditApplication.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '',
      component: System,
      children: [
        {
          name: 'ApplicationsList',
          path: '/',
          component: ApplicationsList
        },
        {
          name: 'Manager',
          path: '/',
          component: Manager,
          children: [
            {
              name: 'MyApplications',
              path: 'my_applications',
              component: MyApplications
            },
            {
              name: 'CreateApplication',
              path: 'application/create',
              component: CreateEditApplication
            },
            {
              name: 'EditApplication',
              path: 'application/:id/edit',
              component: CreateEditApplication
            }
          ]
        },
        {
          name: 'Application',
          path: '/application/:id',
          component: Application
        },
      ]
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound,
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
