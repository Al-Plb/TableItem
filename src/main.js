import Vue from 'vue'
import App from './App.vue'
import './quasar'
import {router} from './router'
import store  from './store.js'

import axios from 'axios'
import VueAxios from 'vue-axios'

import _ from "lodash";
Vue.prototype._ = _;

import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))

Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
