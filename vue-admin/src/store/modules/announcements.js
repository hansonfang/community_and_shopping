import { submit } from "@/api/announcements";
import { getToken, setToken, removeToken } from "@/utils/auth";

const announcements = {
  state: {
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  },

  actions: {
    // 登录
    Submit({ commit }, data) {
      return new Promise((resolve, reject) => {
        submit(data)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default announcements;
