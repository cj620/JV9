import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
import request from "@/utils/request";
// 设备
const API = apiGenPlugin("assets_device", apiType.COMMON);
export { API };
//设备列表
export function assets_device_list(data) {
  return request({
    url: "/assets_device/list",
    method: "post",
    data,
  });
}
//设备详情
export function assets_device_get(query) {
  return request({
    url: "/assets_device/get",
    method: "get",
    params: query,
    loading:true
  });
}
//设备新增
export function assets_device_add(data) {
  return request({
    url: "/assets_device/add",
    method: "post",
    data,
  });
}
//设备编辑
export function assets_device_update(data) {
  return request({
    url: "/assets_device/update",
    method: "post",
    data,
  });
}
//根据设备编号获取
export function assets_device_get_by_id(data) {
  return request({
    url: "/assets_device/get_by_id",
    method: "post",
    data,
  });
}

//设备删除
export function assets_device_delete(data) {
  return request({
    url: "/assets_device/delete",
    method: "post",
    data,
  });
}
