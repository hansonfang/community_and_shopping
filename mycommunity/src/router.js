import Vue from 'vue'
import Router from 'vue-router'
import Post from "./views/main/Post"
import Shopping from "./views/main/Shopping"


/* 引入Post贴吧页面views */
import PostIndex from "@/views/post/PostIndex"
import PostBest from "@/views/post/PostBest"
import PostWrite from "@/views/post/PostWrite"
import PostPage from "@/views/post/PostPage"

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
      path: '/announcements',
      name: 'announcements',
      component:(resolve)=>require(["@/views/main/Announcements"],resolve), //物业更多公告页面
     
    },
    {
      path:"/news",
      component:(resolve)=>require(["@/views/main/News"],resolve),
      children:[
        //新闻子路由
        {path:"",redirect:"index"},
        {path:"index",component:(re)=>require(["@/views/news/News"],re)},
        {path:"propertyA",component:(re)=>require(["@/views/news/PropertyA"],re)},
        {path:"communityA",component:(re)=>require(["@/views/news/CommunityA"],re)},
      ]
    },
    {path:"/orderRepair",name:"orderRepair",component:(resolve)=>require(["@/views/index/orderRepair"],resolve)},
    {path:"/orderWater",name:"orderWater",component:(resolve)=>require(["@/views/index/orderWater"],resolve)},
    {path:"/tellManager",name:"tellManager",component:(resolve)=>require(["@/views/index/tellManager"],resolve)},
    {
      path: '/post',
      component: Post,//贴吧页面
      children:[ //贴吧子路由
        {path:"",redirect:"index"},
        {path:"index",component:PostIndex},
        {path:"best",component:PostBest},
        {path:"write",component:PostWrite},
        {path:"poll",component: (resolve)=>require(["@/views/post/PostPoll"],resolve)},
        {path:":id",component:PostPage}
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
