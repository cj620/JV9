/*
 * @Author: your name
 * @Date: 2021-09-09 18:53:00
 * @LastEditTime: 2022-02-10 13:59:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-element-admin-master\src\permission.js
 */
import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/auth-redirect",'/ProjectManage_Share_Demo','/ProjectManage_ProcessPeople_Share']; // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done(); // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch("user/getInfo");

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            roles
          );
          // dynamically add accessible routes
          /* router.addRoutes(accessRoutes)*/

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true });
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch("user/resetToken");

          console.error(error);
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      console.log(to,to.name==='ProjectManage_Share_Demo',885588);

      if(to.name==='ProjectManage_Share_Demo' || to.name === 'ProjectManage_ProcessPeople_Share'){
        // setToken(to.query.key)
        next({...to});
      }else{
        console.log(to.query,456);
        const  keys=Object.keys(to.query)
        const str =keys.length>0? to.path+'?'+keys[0]+'='+to.query.BillId:to.path
        next(`/login?redirect=${str}`);
      }

      NProgress.done();
    }
  }
});

router.afterEach((to) => {
  store.dispatch("page/open", { openNewPage: to });

  // finish progress bar
  NProgress.done();
});
