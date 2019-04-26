import axios from "axios";
import store from "@/store";
import router from "@/router";
import Vue from "vue";
import { nodeBaseUrl } from "@/config";

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  baseURL: nodeBaseUrl, // api 的 base_url
  timeout: 5000 // 请求超时时间
});

// response 拦截器
service.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    if (error.toString().indexOf("timeout") != -1 || error.toString().indexOf("Network Error") != -1) {
      //网络超时
      Vue.prototype.$snackbar({
        text: "网络请求错误",
        color: "error",
        duration: 10 * 1000
      });
      store.dispatch("FedLogout");
      return Promise.reject(error);
    }
    const res = error.response;
    if (res.data.status === 401 || res.data.message.indexOf("401") != -1) {
      router.push({
        path: "/login",
        query: { needAuth: true, message: "Token 已经失效" }
      });
      store.dispatch("FedLogout");
    }
    return Promise.reject(error);
  }
);
export default service;
