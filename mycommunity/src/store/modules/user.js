import { login, logout, getInfo } from "@/api/user";
import qs from "querystring";

import { getToken, setToken, removeToken } from "@/utils/auth";
import { setObject, removeObject, getObject } from "@/utils/persistent";
const user = {
  state: {
    token: getToken(),
    name: "",
    avatar: "",
    nickname: "",
    communityId: "",
    user: getObject("user_info")
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NICKNAME: (state, name) => {
      state.nickname = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_COMMUNITY: (state, id) => {
      state.communityId = id;
    },
    SET_USER: (state, payload) => {
      state.user = payload;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(qs.stringify({ nickname: username, password: userInfo.password }))
          .then(response => {
            const data = response.data;
            setToken(data.data.Authorization); //  localStorage存token
            commit("SET_TOKEN", data.data.Authorization); //  Vuex存token
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(response => {
            const info = response.data.data.base_info;
            commit("SET_NICKNAME", info.nickname);
            commit("SET_AVATAR", info.avatar);
            commit("SET_COMMUNITY", info.communityId);
            commit("SET_USER", info);
            setObject("user_info", info);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(res => {
            commit("SET_TOKEN", "");
            commit("SET_USER", null);
            removeToken();
            removeObject("user_info");
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    //前端登出
    FedLogout({ commit }) {
      commit("SET_TOKEN", "");
      commit("SET_USER", null);
      removeToken();
      removeObject("user_info");
    }
  }
};

export default user;
