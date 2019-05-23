import Vue from "vue";
import Router from "vue-router";

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from "../views/layout/Layout";

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/setting",
    component: Layout,
    children: [
      {
        path: "/",
        name: "setting",
        component: () => import("@/views/setting/index")
      }
    ],
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    name: "Dashboard",
    hidden: true,
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index")
      }
    ]
  },

  {
    path: "/announcements",
    component: Layout,
    redirect: "/announcements/property",
    name: "Announcements",
    meta: { title: "公告", icon: "example" },
    children: [
      {
        path: "property",
        name: "Property",
        component: () => import("@/views/announcements/property"),
        meta: { title: "物业公告", icon: "table" }
      },
      {
        path: "community",
        name: "Community",
        component: () => import("@/views/announcements/community"),
        meta: { title: "社区公告", icon: "tree" }
      }
    ]
  },
  {
    path: "/news",
    component: Layout,
    redirect: "/news/list",
    name: "news",
    meta: { title: "新闻", icon: "form" },
    children: [
      {
        path: "list",
        name: "newsList",
        component: () => import("@/views/news/index"),
        meta: { title: "新闻列表", icon: "table" }
      },
      {
        path: "create",
        name: "newsCreate",
        component: () => import("@/views/news/create"),
        meta: { title: "编辑新闻", icon: "tree" }
      }
    ]
  },
  {
    path: "/shop",
    component: Layout,
    redirect: "/shop/check",
    name: "shop",
    meta: { title: "商店", icon: "form" },
    children: [
      {
        path: "check",
        name: "shopCheck",
        component: () => import("@/views/shop/check"),
        meta: { title: "浏览商品", icon: "table" }
      },
      {
        path: "create",
        name: "shopCreate",
        component: () => import("@/views/shop/create"),
        meta: { title: "编辑商品", icon: "form" }
      },
      {
        path: "carousel",
        name: "shopCarousel",
        component: () => import("@/views/shop/carousel"),
        meta: { title: "类目轮播图", icon: "form" }
      }
    ]
  },
  {
    path: "external-link",
    component: Layout,
    children: [
      {
        path: "https://panjiachen.github.io/vue-element-admin-site/#/",
        meta: { title: "External Link", icon: "link" }
      }
    ]
  },

  { path: "*", redirect: "/404", hidden: true }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
