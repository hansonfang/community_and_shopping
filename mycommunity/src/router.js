import Vue from "vue";
import Router from "vue-router";
import Post from "./views/main/Post";
import Shopping from "./views/main/Shopping";
import Error from "@/views/404";
import store from "@/store";
/* 引入Post贴吧页面views */
import PostIndex from "@/views/post/PostIndex";
import PostBest from "@/views/post/PostBest";
import PostWrite from "@/views/post/PostWrite";
import PostPage from "@/views/post/PostPage";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "index"
    },
    {
      path: "/index",
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
      component: resolve =>
        require(["@/views/services/form/orderRepair"], resolve),
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/orderWater",
      name: "orderWater",
      component: resolve =>
        require(["@/views/services/form/orderWater"], resolve),
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/tellManager",
      name: "tellManager",
      component: resolve =>
        require(["@/views/services/form/tellManager"], resolve),
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/recordRepair",
      name: "recordRepair",
      component: resolve =>
        require(["@/views/services/records/Repair"], resolve),
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/recordWater",
      name: "recordWater",
      component: resolve =>
        require(["@/views/services/records/Water"], resolve),
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/recordManager",
      name: "recordManager",
      component: resolve =>
        require(["@/views/services/records/Manager"], resolve),
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
        },
        {
          path: "order",
          name: "order",
          component: re => require(["@/views/shop/order"], re)
        },
        {
          path: "cart",
          name: "cart",
          component: re => require(["@/views/shop/cart"], re)
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: re => require(["@/views/user/Login"], re) //登录，忘记密码页面
    },
    {
      path: "/register",
      name: "register",
      component: re => require(["@/views/user/Register"], re) //注册页面
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
          path: "info",
          name: "info",
          component: re => require(["@/views/user/modules/info"], re)
        }
      ],
      meta:{
        requireAuth:true
      }
    },
    {
      path: "*",
      name: "error404",
      component: Error
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
    // else next();
  } else next();
});
export default router;
