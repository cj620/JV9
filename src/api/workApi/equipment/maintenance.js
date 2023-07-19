/*
 * @Author: C. cj6209577@sina.com
 * @Date: 2022-05-30 15:30:56
 * @LastEditors: C. cj6209577@sina.com
 * @LastEditTime: 2022-05-30 15:35:34
 * @FilePath: \jvmmsv9-1front\src\api\workApi\equipment\maintenance.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// assets_device_maintenance
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";

import request from "@/utils/request";
// 维护单
const API = apiGenPlugin("assets_device_maintenance", apiType.COMMON);
export { API };
//类别保存
export function assets_device_managetype_add(data) {
  return request({
    url: "/assets_device_managetype/add",
    method: "post",
    data,
  });
}
//获取类别
export function assets_device_managetype_get_by_type(data) {
  return request({
    url: "/assets_device_managetype/get_by_type",
    method: "get",
    params:data,
  });
}

//类别删除
export function assets_device_managetype_del(data) {
  return request({
    url: "/assets_device_managetype/del",
    method: "get",
    params:data,
  });
}


