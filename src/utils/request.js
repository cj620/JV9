/*
 * @Author: your name
 * @Date: 2021-09-09 18:53:00
 * @LastEditTime: 2022-01-25 16:26:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-element-admin-master\src\utils\request.js
 */
import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import router from "@/router";
import { getToken, removeToken } from "@/utils/auth";
import { throttle } from "@/jv_doc/utils/optimization";
import { RequestLock } from "@/jv_doc/class/lock";
let loadLock=new RequestLock(500)
// create an axios instance
// console.log(process.env.VUE_APP_BASE_API, 999999999999999)
const service = axios.create({
  baseURL: window.global_config.Base_Url, // url = base url + request url http://192.168.1.22:8008
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 120000, // request timeout
});
// request interceptor
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers["Authorization"] = "Ba " + getToken();
    }
    if(config.loading){
      // console.log(String(config.url),666555);
      if(!loadLock.put(window.global_config.Base_Url+config.url)){
        return Promise.reject(new Error('repeat submit！'))
      }
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    loadLock.clearTask()
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {

    const res = response.data;
    if (res.Code === 401) {
      throttle(TokenExpired, 10000, true);
      loadLock.clearTask()
      return Promise.reject(res);
    } else if (res.Code === 500 || res.Code === 400) {
      responseFilter(res);
      loadLock.clearTask()
      return Promise.reject(res);
    } else {
      responseFilter(res);
      response.config.loading&&loadLock.del(response.config.url)
      return res.Data;
    }
  },
  (error) => {

    Message({
      message: tips(error.message),
      type: "error",
      duration: 5 * 1000,
    });
    loadLock.clearTask()
    return Promise.reject(error);
  }
);
// sunccess/warning/error/none
function responseFilter(res) {
  let { MsgType, Msg } = res;
  if (["success", "warning", "error"].includes(MsgType)) {
    Message({
      message: tips(Msg),
      type: MsgType,
      duration: 5 * 1000,
    });
  }
}

const tips = (msg) => {
  if (msg.slice(0, 2) === "P1") {
    if (msg.split(":").length === 2) {
      return (
        i18n.t(`backendMessage.${msg.split(":")[0]}`) + "：" + msg.split(":")[1]
      );
    }
    return i18n.t(`backendMessage.${msg}`);
  } else {
    return msg;
  }
};

// 401 token过期
function TokenExpired() {
  removeToken();
  router.push(`/login`);
  return Message.warning(i18n.t("Generality.Ge_MessageLog"));
}

export default service;
