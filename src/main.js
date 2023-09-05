/*
 * @Author: your name
 * @Date: 2021-09-09 18:53:00
 * @LastEditTime: 2022-09-14 13:36:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-element-admin-master\src\main.js
 */
import Vue from "vue";

import Cookies from "js-cookie";

import "normalize.css/normalize.css"; // a modern alternative to CSS resets

import Element from "element-ui";
import "./styles/element-variables.scss";
// import enLang from 'element-ui/lib/locale/lang/en' // 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
// 注册全局组件
import "@/jv_doc/cpn/global.js";
import "@/styles/index.scss"; // global css
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
import App from "./App";
import store from "./store";
import router from "./router";

// 多国语
import i18n from "./i18n/i18n";
import "./icons"; // icon
import "./permission"; // permission control
import "./utils/error-log"; // error log
import VueParticles from "vue-particles";

import * as filters from "./filters"; // global filters
import "devextreme/dist/css/dx.light.css";

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
/* if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
 */
Vue.use(VueParticles);
Vue.use(dataV)
Vue.use(Element, {
  size: Cookies.get("size") || "medium", // set element-ui default size
  // 如果使用中文，无需设置，请删除
});
window.i18n = i18n;
// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  i18n,
  router,
  store,

  render: (h) => h(App),
});
