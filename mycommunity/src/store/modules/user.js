import {
  login,
  logout,
  getInfo,
  uploadAvatar,
  getCommunityList
} from "@/api/user";
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
    user: getObject("user_info"),
    communityList: []
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
    },
    SET_COMMUNITYS: (state, list) => {
      state.communityList = list;
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

    //上传头像
    UploadAvatar({ commit }, formData) {
      return new Promise((resolve, reject) => {
        uploadAvatar(formData)
          .then(response => {
            const avatarUrl = response.data.data;
            commit("SET_AVATAR", avatarUrl);
            resolve(response);
          })
          .catch(e => {
            reject(e);
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

    //获取社区列表
    getCommunityList({ commit }) {
      return new Promise((resolve, reject) => {
        getCommunityList()
          .then(response => {
            resolve(response);
            commit("SET_COMMUNITYS", response.data.data);
          })
          .catch(e => {
            reject(e);
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
