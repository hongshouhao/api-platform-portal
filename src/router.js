import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/views/index.vue'
import OcelotConfigView from '@/views/ocelotconfig/index.vue'
import OcelotAdminView from '@/views/ocelotadmin/index.vue'
import TemplateView from '@/views/ocelotconfig-template/index.vue'
import StatisticView from '@/views/statistic/index.vue'
import ConsulAdminView from '@/views/consul'
import SigninCallback from '@/views/callback'
import AlertsView from '@/views/alerts/'
import MonitorView from '@/views/dashbord/'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
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
          component: MonitorView,
        }, {
          //网关配置
          path: '/ocelotconfig',
          name: 'ocelotconfig',
          meta: {
            auth: true
          },
          component: OcelotConfigView,
        },
        {
          path: '/ocelotadmin',
          name: 'ocelotadmin',
          meta: {
            auth: true
          },
          component: OcelotAdminView,
        },
        {
          path: '/consuladmin',
          name: 'consuladmin',
          meta: {
            auth: true
          },
          component: ConsulAdminView,
        },
        {
          //模板配置
          path: '/template',
          name: 'template',
          meta: {
            auth: true
          },
          component: TemplateView,
        },
        {
          //接口测试
          path: '/alerts',
          name: 'alerts',
          meta: {
            auth: true
          },
          component: AlertsView,
        },
        {
          //接口统计
          path: '/statistic',
          name: 'statistic',
          meta: {
            auth: true
          },
          component: StatisticView,
        },
        {
          path: "/signincallback",
          name: "signincallback",
          meta: {
            auth: true
          },
          component: SigninCallback
        },
        {
          path: "/silentcallback",
          name: "silentcallback"
        }
      ]
    },
    {
      path: '*',
      component: OcelotConfigView
    },
    {
      path: "/login",
      name: 'login',
      redirect: "signincallback",
    }
  ]
})