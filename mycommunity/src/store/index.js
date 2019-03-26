import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 
const store = new Vuex.Store({
 
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',

    user:localStorage.getItem("user")?localStorage.getItem("user"):null,
  },
 
  mutations: {
    // 修改token，并将token存入localStorage
    setToken (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    },
    deleteToken(state){
        state.Authorization="";
        localStorage.removeItem("Authorization");
    },
    setUser(state,user){
        state.user=JSON.stringify(user);
        localStorage.setItem('user', JSON.stringify(user));
    },
    deleteUser(state){
      state.user=null;
      localStorage.removeItem("user");
    }
  }
});

export default store;