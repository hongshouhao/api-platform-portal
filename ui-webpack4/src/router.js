import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { vuexOidcCreateRouterMiddleware } from 'vuex-oidc'

import HomeView from '@/views/index.vue'
import OcelotConfigView from '@/views/ocelot/config.vue'
import OcelotAdminView from '@/views/ocelot/admin.vue'
import TemplateView from '@/views/ocelot/template.vue'
import StatisticView from '@/views/statistic/index.vue'
import ConsulAdminView from '@/views/consul'
import SigninCallback from '@/oidc/signincallback'
import SigninCallbackError from '@/oidc/signincallbackerror'

import AlertsView from '@/views/alerts/'
import MonitorView from '@/views/dashbord/'
import AuthOptionsView from '@/views/auth/'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      meta: {
        auth: true
      },
      component: HomeView,
      children: [{
        path: '/',
        name: 'monitor',
        meta: {
          auth: true
        },
        component: MonitorView
      },
      {
        path: '/ocelotconfig',
        name: 'ocelotconfig',
        meta: {
          auth: true
        },
        component: OcelotConfigView
      },
      {
        path: '/ocelotadmin',
        name: 'ocelotadmin',
        meta: {
          auth: true
        },
        component: OcelotAdminView
      },
      {
        path: '/template',
        name: 'template',
        meta: {
          auth: true
        },
        component: TemplateView
      },
      {
        path: '/authoptions',
        name: 'authoptions',
        meta: {
          auth: true
        },
        component: AuthOptionsView
      },
      {
        path: '/consuladmin',
        name: 'consuladmin',
        meta: {
          auth: true
        },
        component: ConsulAdminView
      },
      {
        path: '/alerts',
        name: 'alerts',
        meta: {
          auth: true
        },
        component: AlertsView
      },
      {
        path: '/statistic',
        name: 'statistic',
        meta: {
          auth: true
        },
        component: StatisticView
      },
      {
        path: '/signincallback',
        name: 'signincallback',
        meta: {
          isOidcCallback: true,
          isPublic: true
        },
        component: SigninCallback
      },
      {
        path: '/signincallbackerror',
        name: 'signincallbackerror',
        meta: {
          isPublic: true
        },
        component: SigninCallbackError
      },
      {
        path: '/silentcallback',
        name: 'silentcallback'
      }]
    }]
})

router.beforeEach(vuexOidcCreateRouterMiddleware(store, 'oidcStore'))
export default router
