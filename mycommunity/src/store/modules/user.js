import { login, logout, getInfo } from "@/api/user";
import qs from "querystring";

import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
  state: {
    token: getToken(),
    name: "",
    avatar: "",
    nickname: "",
    communityId: ""
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
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        logout().then(res => {
          resolve(res);
        });
      });
    }
  }
};

export default user;
