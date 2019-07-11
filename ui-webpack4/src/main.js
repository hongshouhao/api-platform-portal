import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'

import iView from 'iview'
import echarts from 'echarts'
import axios from 'axios'

import vueHighlightJS from 'vue-highlight.js'
import hljsvue from 'vue-highlight.js/lib/languages/vue'
import css from 'highlight.js/lib/languages/css'
import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/paraiso-dark.css'
import 'iview/dist/styles/iview.css'
import 'echarts/theme/shine'

// import './assets/global.less'
import OcelotClient from './lib/ocelot'
import env from './global'
import './views/scraps.less'

Vue.use(Vuex)
Vue.use(vueHighlightJS, {
  languages: {
    css,
    json,
    hljsvue
  }
})

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

Vue.prototype.$ocelotAdmin = new OcelotClient(env.ocelot_host, env.ocelotAdmin_host, axios)
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.use(iView)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
