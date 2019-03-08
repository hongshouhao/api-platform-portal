import Vue from 'vue'
import iView from 'iview'
import router from './router'
import store from './store'
import App from './App.vue'
import 'iview/dist/styles/iview.css'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(iView)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')