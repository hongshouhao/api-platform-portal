import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/views/index'
import OcelotView from '@/views/ocelot/'
import TemplateView from '@/views/template/'
import ServiceDiscoveryView from '@/views/servicediscovery/'
import TestView from '@/views/test/'
import StatisticView from '@/views/statistic/'
import AuthorityView from '@/views/authority/'
import LoginView from "@/views/login"
import SignInCallBack from "@/views/callback/"
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
      children: [{ //网关配置
        path: '/',
        name: 'ocelot',
        meta: {
          auth: true
        },
        component: OcelotView,
      }, { //模板配置
        path: '/template',
        name: 'template',
        meta: {
          auth: true
        },
        component: TemplateView,
      }, { //服务发现
        path: '/servicediscovery',
        name: 'servicediscovery',
        meta: {
          auth: true
        },
        component: ServiceDiscoveryView,
      }, { //接口测试
        path: '/test',
        name: 'test',
        meta: {
          auth: true
        },
        component: TestView,
      }, { //接口统计
        path: '/statistic',
        name: 'statistic',
        meta: {
          auth: true
        },
        component: StatisticView,
      }, { //权限
        path: '/authority',
        name: 'authority',
        meta: {
          auth: true
        },
        component: AuthorityView,
      }]
    },
    //  {
    //   path: "/login",
    //   name: "login",
    //   meta: {
    //     auth: false
    //   },
    //   component: LoginView
    // }
    {
      path: "/signincallback",
      name: "signincallback",
      meta: {
        auth: false
      },
      component: SignInCallBack
    }
  ]
})