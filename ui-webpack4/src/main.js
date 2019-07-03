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
