import axios from "axios";
import store from "@/store";
import { getToken } from "@/utils/auth";
import router from "@/router";
import Vue from "vue";

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  baseURL: "http://192.168.123.50:8585/chengfeng", // api 的 base_url
  // baseURL: "http://www.fangxiaosong.me:8080/chengfeng", // api 的 base_url
  timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["Authorization"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  error => {
    // Do something with request error
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    if (
      error.toString().indexOf("timeout") != -1 ||
      error.toString().indexOf("Network Error") != -1
    ) {
      //网络超时
      Vue.prototype.$snackbar({
        text: "网络请求错误",
        color: "error",
        timeout: 10 * 1000
      });
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
