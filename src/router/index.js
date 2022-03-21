import Vue from "vue";

import Router from "vue-router";

Vue.use(Router);
import i18n from "@/i18n/i18n.js";
/* Layout */
import Layout from "@/layout";
import system from "./basicModule/system";
import sale from "./workModule/sale";
import project from "./workModule/project";
import design from "./workModule/design";
import purchase from "./workModule/purchase";
import production from "./workModule/production";
import stockroom from "./workModule/stockroom";
import program from "./workModule/program";
import quality from "./workModule/quality";
/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
/*var str =resolve=>required.ensure([],()=>resolve(require)) '@/views/sys/login/index'*/
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/sys/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/sys/login/index"),
    hidden: true,
  },
  {
    path: "/se_DSe_MoldProgressKanbanesk",
    name: "Se_MoldProgressKanban",
    component: () => import("@/views/basicModule/KanBan/MoldProgressKanban"),
    hidden: true,
  },
   // 项目分享
   {
    component: () =>
    import("@/views/workModule/project/projectManage/shareDemo"),
    name: "ProjectManage_Share_Demo",
    path: "/projectManage_Share_Demo",
    hidden: true,
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/sys/login/auth-redirect"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/sys/error-page/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/sys/error-page/401"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: {
          title: i18n.t("Generality.Ge_Dashboard"),
          icon: "dashboard",
          affix: true,
        },
      },
    ],
  },
    {
    path: "/demo",
    component: Layout,
    redirect: "/table",
    children: [
      {
        path: "list",
        component: () => import("@/views/basicModule/demo/Table"),
        name: "list",
        meta: { title: "list", icon: "design" },
      },
      {
        path: "form",
        component: () => import("@/views/basicModule/demo/Form"),
        name: "form",
        meta: { title: "form", icon: "dashboard" },
      },
      {
        path: "detail",
        component: () => import("@/views/basicModule/demo/Detail"),
        name: "detail",
        meta: { title: "detail", icon: "dashboard" },
      },
      {
        path: "editTable",
        component: () => import("@/views/basicModule/demo/EditTable"),
        name: "editTable",
        meta: { title: "editTable", icon: "dashboard" },
      },
      {
        path: "treeTable",
        component: () => import("@/views/basicModule/demo/TreeTable"),
        name: "treeTable",
        meta: { title: "treeTable", icon: "dashboard" },
      },
      {
        path: "ProjectAnalyze",
        component: () => import("@/views/basicModule/demo/ProjectAnalyze"),
        name: "ProjectAnalyze",
        meta: { title: "ProjectAnalyze", icon: "dashboard" },
      },
      {
        path: "test",
        component: () => import("@/views/basicModule/demo/Test"),
        name: "Test",
        meta: { title: "测试数据页面", icon: "dashboard" },
      },
      {
        path: "test1",
        component: () => import("@/views/basicModule/demo/Test1"),
        name: "Test1",
        meta: { title: "测试数据页面1", icon: "dashboard" },
      },
      {
        path: "test2",
        component: () => import("@/views/basicModule/demo/Test2"),
        name: "Test2",
        meta: { title: "dev测试页面2", icon: "dashboard" },
      },
      {
        path: "test3",
        component: () => import("@/views/basicModule/demo/Test3"),
        name: "Test3",
        meta: { title: "dev测试页面3", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/print",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "view",
        component: () => import("@/views/basicModule/print/printView"),
        name: "printView",
        meta: { title: i18n.t("setup.PrintPreview") },
      },
      {
        path: "edit",
        component: () => import("@/views/basicModule/print/printEditor"),
        name: "printEdit",
        meta: { title: i18n.t("Generality.Ge_PrintTemplate") },
      },
      {
        path: "printTagView",
        component: () => import("@/views/basicModule/print/printTagView"),
        name: "printTagView",
        meta: { title: i18n.t("menu.Pr_LabelPrint") },
      },
    ],
  },
  {
    path: "/oaDesigner",
    hidden: true,
    component: () => import("@/views/basicModule/OADesginer"),
  },
  /*  {
    path: "/error",
    component: Layout,
    redirect: "noRedirect",
    name: "ErrorPages",
    meta: {
      title: "Error Pages",
      icon: "404",
    },
    children: [
      {
        path: "401",
        component: () => import("@/views/sys/error-page/401"),
        name: "Page401",
        meta: { title: "401", noCache: true },
      },
      {
        path: "404",
        component: () => import("@/views/sys/error-page/404"),
        name: "Page404",
        meta: { title: "404", noCache: true },
      },
    ],
  },*/
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  ...system,
  ...sale,
  ...project,
  ...design,
  ...purchase,
  ...production,
  ...stockroom,
  ...program,
  ...quality,
  /*   ...produce,
  ...enterprise,
  ...equipment, */
  ...[
    /** when your routing map is too long, you can split it into small modules **/

    {
      path: "/error",
      component: Layout,
      redirect: "noRedirect",
      name: "ErrorPages",
      meta: {
        title: "Error Pages",
        icon: "404",
      },
      children: [
        {
          path: "401",
          component: () => import("@/views/sys/error-page/401"),
          name: "Page401",
          meta: { title: "401", noCache: true },
        },
        {
          path: "404",
          component: () => import("@/views/sys/error-page/404"),
          name: "Page404",
          meta: { title: "404", noCache: true },
        },
      ],
    },

    {
      path: "/error-log",
      component: Layout,
      children: [
        {
          path: "log",
          component: () => import("@/views/sys/error-log/index"),
          name: "ErrorLog",
          meta: { title: "Error Log", icon: "bug" },
        },
      ],
    },

    // 404 page must be placed at the end !!!
    { path: "*", redirect: "/404", hidden: true },
  ],
];
var renderRoutes = [];

//此处是为了解决三级菜单路由不缓存做的处理，三级路由不缓存属于框架问题，如果不需要的话可以关闭掉

////开始
var asyncRoutesArr = asyncRoutes;
asyncRoutesArr.forEach((item) => {
  if (item.Parent === null) {
    item.fullPath = "/" + item.path;
    const module = {
      path: "/" + item.path,
      component: Layout,
      alwaysShow: true,
      name: item.name,
      meta: {
        key: item.key,
        title: item.title,
        fullPath: "/" + item.path,
      },
      children: [],
    };
    renderRoutes.push(module);
  }
});
convertTree(renderRoutes);
function convertTree(routers) {
  routers.forEach((r) => {
    asyncRoutesArr.forEach((m, i) => {
      if (m.Parent && m.Parent === r.meta.key) {
        if (!r.children) r.children = [];
        m.fullPath = r.meta.fullPath + "/" + m.path;
        var menu = {
          path: r.path + "/" + m.path,
          name: m.name,
          component: m.component,
          hidden: m.hidden,
          meta: {
            key: m.key,
            title: m.title,
            fullPath: r.meta.fullPath + "/" + m.path,
          },
        };
        r.children.push(menu);
      }
    });
    if (r.children) convertTree(r.children);
  });
}
renderRoutes.forEach((item) => {
  if (item.children) {
    item.children.forEach((Titem) => {
      if (Titem.children) {
        Titem.children.forEach((TTitem) => {
          item.children.push(TTitem);
        });
      }
    });
  }
});
renderRoutes.forEach((item) => {
  if (item.children) {
    item.children.forEach((Titem) => {
      if (Titem.children) {
        Titem.children = [];
      }
    });
  }
});
///  结束

var routes = [...constantRoutes, ...renderRoutes];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
