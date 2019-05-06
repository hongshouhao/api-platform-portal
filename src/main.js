import Vue from 'vue'
import iView from 'iview'
import router from './router'
import store from './store'
import 'iview/dist/styles/iview.css'
import echarts from 'echarts'
import axios from 'axios'

import VueHighlightJS from 'vue-highlight.js';
import hljsvue from '../node_modules/vue-highlight.js/lib/languages/vue';
import css from '../node_modules/highlight.js/lib/languages/css';
import json from '../node_modules/highlight.js/lib/languages/json';
import '../node_modules/highlight.js/styles/paraiso-dark.css';

import './assets/global.less'
import 'echarts/theme/shine'

import App from './App.vue'

Vue.use(VueHighlightJS, {
  languages: {
    css,
    json,
    hljsvue
  }
});

Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(iView);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')