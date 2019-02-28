import Vue from 'vue'
import Router from 'vue-router'
import Post from "./views/main/Post"
import Shopping from "./views/main/Shopping"
import Moreannouncement from "./views/Moreannouncement"

/* 引入Post贴吧页面views */
import PostIndex from "@/views/post/PostIndex"
import PostBest from "@/views/post/PostBest"
import PostWrite from "@/views/post/PostWrite"

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
      component:(resolve)=>require(["@/views/main/Index"],resolve),
    },
    {
      path: '/common',//常用功能页面
      name: 'common',
      component: (resolve)=>require(["@/views/main/Common"],resolve),
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
      component: Post,//贴吧页面
      children:[ //贴吧子路由
        {path:"",redirect:"index"},
        {path:"index",component:PostIndex},
        {path:"best",component:PostBest},
        {path:"write",component:PostWrite},
        {path:"poll",component: (resolve)=>require(["@/views/post/PostPoll"],resolve)},
      ]
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
