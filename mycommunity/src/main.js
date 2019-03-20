import Vue from 'vue'
import './plugins/vuetify'
import vuetify from "vuetify"
// import zhHans from 'vuetify/es5/locale/zh-Hans'
import App from './App.vue'
import router from './router'
import axios from "axios"
import VueCarousel from 'vue-carousel';

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

//封装Axios
Vue.prototype.$axios=axios;

// 封装console.log
Vue.prototype.log=window.console.log;
Vue.prototype.error=window.console.error;

Vue.use(VueCarousel);

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
