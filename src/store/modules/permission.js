/*
 * @Author: your name
 * @Date: 2021-09-09 18:53:00
 * @LastEditTime: 2021-11-04 17:08:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-element-admin-master\src\store\modules\permission.js
 */
import { constantRoutes, asyncRoutes } from "@/router";
import Layout from "@/layout";
import { getMenuList } from "@/api/basicApi/systemSettings/menuInfo";
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach(route => {
    const tmp = {
      ...route
    };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const state = {
  routes: [],
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  }
};

var menuList = [];
var renderRoutes = [];

// 用来处理根目录菜单的数据
function customMenu(res) {
  //路由全部由后端给的
  res.forEach(item => {
    asyncRoutes.forEach(Titem => {
      if (item.key === Titem.key) {
        item.component = Titem.component;
        menuList.push(Titem);
      }
    });

  });
  asyncRoutes.forEach(Titem => {
    if (Titem.hidden) {
      menuList.push(Titem);
    }
  });
  // console.log(menuList,9999);
  menuList.forEach((m, i) => {
    if (m.Parent === null) {
      m.fullPath = "/" + m.path;
      const module = {
        path: "/" + m.path,
        component: Layout,
        alwaysShow: true,
        name: m.name,
        meta: {
          key: m.key,
          title: m.title,
          icon: m.icon,
          fullPath: "/" + m.path
        },
        children: []
      };
      renderRoutes.push(module);
    }
  });
}
// 用来处理下级菜单的数据
function convertTree(routers) {
  routers.forEach(r => {
    menuList.forEach((m, i) => {
      if (m.Parent && m.Parent === r.meta.key) {
        if (!r.children) r.children = [];
        m.fullPath = r.meta.fullPath + "/" + m.path;
        const menu = {
          path: m.path,
          name: m.name,
          hidden: m.hidden,
          meta: {
            key: m.key,
            title: m.title,
            fullPath: r.meta.fullPath + "/" + m.path
          }
        };
        r.children.push(menu);
      }
    });
    if (r.children) convertTree(r.children);
  });
}
const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      getMenuList().then(async res => {
        // 此处用来处理后端传来的路由，因为这个框架解析不了动态的必须前端来配合
        menuList = [];
        renderRoutes = [];
        await customMenu(res);
        convertTree(renderRoutes);
        let accessedRoutes;

        if (roles.includes("admin")) {
          accessedRoutes = renderRoutes || [];
        } else {
          accessedRoutes = filterAsyncRoutes(renderRoutes, roles);
        }
        // console.log(accessedRoutes,'菜单');
        commit("SET_ROUTES", accessedRoutes);

        resolve(accessedRoutes);
      });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
