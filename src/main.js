import Vue from 'vue'
import iView from 'iview'
import router from './router'
import store from './store'
import 'iview/dist/styles/iview.css'
import echarts from 'echarts'

import VueHighlightJS from 'vue-highlight.js';
import css from '../node_modules/highlight.js/lib/languages/css';
import json from '../node_modules/highlight.js/lib/languages/json';
import hljsvue from '../node_modules/vue-highlight.js/lib/languages/vue';
import '../node_modules/highlight.js/styles/paraiso-dark.css';
import './assets/global.css'

import App from './App.vue'

// Vue.directive('highlightjs', {
//   update: function (el) {
//     debugger;
//     let blocks = el.querySelectorAll('pre code');
//     for (var i = 0; i < blocks.length; i++) {
//       blocks[i].innerHTML = blocks[i].innerHTML.replace("\n", "");
//     }
//   },
//   inserted: function (el) {
//     debugger;
//     let blocks = el.querySelectorAll('pre code');
//     for (var i = 0; i < blocks.length; i++) {
//       blocks[i].innerHTML = blocks[i].innerHTML.replace("\n", "");
//     }
//   }
// })

Vue.use(VueHighlightJS, {
  languages: {
    css,
    json,
    hljsvue
  }
});

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(iView);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')