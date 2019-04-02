import axios from "axios";
import store from "@/store";
import { getToken } from "@/utils/auth";
import router from "@/router";
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  baseURL: "http://192.168.123.50:8585/chengfeng", // api 的 base_url
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
    const res = error.response;
    if (res.data.status === 401 && res.data.message == "Token 已经失效") {
      router.push({
        path: "/login",
        query: { needAuth: true, message: res.data.message }
      });
      store.dispatch("FedLogout");
    }
    return Promise.reject(error);
  }
);

export default service;
