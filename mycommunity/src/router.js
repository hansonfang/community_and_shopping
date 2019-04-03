import Vue from "vue";
import Router from "vue-router";
import Post from "./views/main/Post";
import Shopping from "./views/main/Shopping";

import store from "@/store";
/* 引入Post贴吧页面views */
import PostIndex from "@/views/post/PostIndex";
import PostBest from "@/views/post/PostBest";
import PostWrite from "@/views/post/PostWrite";
import PostPage from "@/views/post/PostPage";

import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index", //首页
      component: resolve => require(["@/views/main/Index"], resolve),
      meta: {
        requireAuth: true
      }
    },

    {
      path: "/news",
      component: resolve => require(["@/views/main/News"], resolve),
      children: [
        //新闻子路由
        { path: "", redirect: "index" },
        { path: "index", component: re => require(["@/views/news/News"], re) },
        {
          path: "propertyA",
          name: "property",
          component: re => require(["@/views/news/PropertyA"], re)
        },
        {
          path: "communityA",
          name: "community",
          component: re => require(["@/views/news/PropertyA"], re)
        }
      ]
    },
    {
      path: "/news/:id",
      name: "newsDetail",
      component: re => require(["@/views/news/NewsDetail"], re)
    },
    {
      path: "/orderRepair",
      name: "orderRepair",
      component: resolve => require(["@/views/index/orderRepair"], resolve),
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/orderWater",
      name: "orderWater",
      component: resolve => require(["@/views/index/orderWater"], resolve),
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/tellManager",
      name: "tellManager",
      component: resolve => require(["@/views/index/tellManager"], resolve),
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/post",
      component: Post, //贴吧页面
      children: [
        //贴吧子路由
        { path: "", redirect: "index" },
        { path: "index", component: PostIndex },
        { path: "best", component: PostBest },
        { path: "write", component: PostWrite },
        {
          path: "poll",
          component: resolve => require(["@/views/post/PostPoll"], resolve)
        },
        { path: ":id", component: PostPage }
      ]
    },
    {
      path: "/shopping",
      component: Shopping, //拼购商城页面
      children: [
        { path: "", redirect: "food" },
        {
          path: "baby",
          name: "baby",
          component: re => require(["@/views/shop/baby"], re)
        },
        {
          path: "food",
          name: "food",
          component: re => require(["@/views/shop/food"], re)
        },
        {
          path: "home",
          name: "home",
          component: re => require(["@/views/shop/home"], re)
        },
        {
          path: "service",
          name: "service",
          component: re => require(["@/views/shop/service"], re)
        },
        {
          path: "goods",
          name: "goods",
          component: re => require(["@/views/shop/goods"], re)
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login //登录，忘记密码页面
    },
    {
      path: "/register",
      name: "register",
      component: Register //注册页面
    },
    {
      path: "/userinfo",
      component: re => require(["@/views/user/index"], re),
      children: [
        { path: "", redirect: "activities" },
        {
          path: "activities",
          name: "activities",
          component: re => require(["@/views/user/modules/activities"], re)
        },
        {
          path: "services",
          name: "services",
          component: re => require(["@/views/user/modules/services"], re)
        },
        {
          path: "info",
          name: "info",
          component: re => require(["@/views/user/modules/info"], re)
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  Vue.prototype.bus.$emit("hint", {
    hide: true
  });
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.getters.token) next();
    else next({ path: "/login", query: { needAuth: true } });
  } else next();
});
export default router;
