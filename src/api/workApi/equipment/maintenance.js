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
console.log('API::: ', API);
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

// 开始保养
export function assets_device_maintenance_start(data){
  return request({
    url: "/assets_device_maintenance/start",
    method: "post",
    data,
  })
}

// 结束保养
export function assets_device_maintenance_end(data){
  return request({
    url: "/assets_device_maintenance/end",
    method: "post",
    data,
  })
}

//编辑保养单配件信息
export function assets_device_maintenance_save_accessory(data){
  return request({
    url: "/assets_device_maintenance/save_accessory",
    method: "post",
    data,
  })
}

// 保养单保存
export function assets_device_maintenance_save(data){
  return request({
    url: "/assets_device_maintenance/save",
    method: "post",
    data,
  })
}


