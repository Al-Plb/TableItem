import Vue from 'vue'
import App from './App.vue'
import './quasar'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import _ from "lodash";
Vue.prototype._ = _;

Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
