import Vue from 'vue'
import './plugins/vuetify'
import vuetify from "vuetify"
import App from './App.vue'
import router from './router'
import axios from "axios"

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

//封装Axios
Vue.prototype.$axios=axios;

Vue.use(vuetify,{
  theme:{
    primary:"#1976D2"
  },
  iconfont:"fa"
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
