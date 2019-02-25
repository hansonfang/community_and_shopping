import Vue from 'vue'
import Router from 'vue-router'
import Index from "./views/main/Index"
import Common from "./views/main/Common"
import Post from "./views/main/Post"
import Shopping from "./views/main/Shopping"
import Moreannouncement from "./views/Moreannouncement"

import Login from "./views/Login.vue"
import Register from "./views/Register.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",//首页
      component:Index,
    },
    {
      path: '/common',//常用功能页面
      name: 'common',
      component: Common,
      meta: {
        key: 0,
      }
    },
    {
      path: '/moreannouncement',
      name: 'moreannouncement',
      component: Moreannouncement,//物业更多公告页面
      meta: {
        key: 1,
      }
    },
    {
      path: '/post',
      name: 'post',
      component: Post,//贴吧页面
      meta: {
        key: 3,
      }
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: Shopping,//拼购商城页面
      meta: {
        key: 4,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,//登录，忘记密码页面
    },
    {
      path: '/register',
      name: 'register',
      component: Register,//注册页面
    },
  ]
})
