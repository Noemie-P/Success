import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import axios from 'axios'
import vueAxios from 'vue-axios'
import '../public/style.css'

axios.defaults.withCredentials = true

Vue.config.productionTip = false

new Vue({
  router,
  axios,
  vueAxios,
  render: h => h(App),
}).$mount('#app')
