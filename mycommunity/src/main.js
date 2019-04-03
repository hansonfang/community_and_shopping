import Vue from "vue";
import "./plugins/vuetify";
import vuetify from "vuetify";
// import zhHans from 'vuetify/es5/locale/zh-Hans'
import App from "./App.vue";
import * as functions from "./functions/functions";
import router from "./router";
import Vuex from "vuex";
import store from "@/store";
import axios from "axios";
import VueCarousel from "vue-carousel";
import VueLogger from "vuejs-logger";
import VeeValidate from "@/validator";

import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@fortawesome/fontawesome-free/css/all.css";

const isProduction = process.env.NODE_ENV === "production";

Vue.config.productionTip = false;
Vue.prototype.bus = new Vue();

Vue.prototype.$axios = axios;

// 封装console.log
Vue.prototype.log = window.console.log;
Vue.prototype.dir = window.console.dir;

Vue.prototype.functions = functions;

Vue.prototype.baseUrl = "http://192.168.123.50:8585/chengfeng";

Vue.use(Vuex);

const options = {
  isEnabled: true,
  logLevel: isProduction ? "error" : "debug",
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: "|",
  showConsoleColors: true
};

Vue.use(VueLogger, options);
Vue.use(VueCarousel);
Vue.use(VeeValidate);

Vue.use(vuetify, {
  theme: {
    primary: "#1976D2"
  },
  iconfont: "fa"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
