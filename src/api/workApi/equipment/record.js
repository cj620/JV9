/*
 * @Author: C.
 * @Date: 2022-06-01 13:59:48
 * @LastEditTime: 2022-06-01 14:02:35
 * @Description: file content
 */
// assets_device_usage_record
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
// 维护单
const API = apiGenPlugin("assets_device_usage_record", apiType.CURD);
export { API };
import request from "@/utils/request";

//设备使用记录列表
export function assets_device_usage_record_list(data) {
  return request({
    url: "/assets_device_usage_record/list",
    method: "post",
    data,
  });
}
//设备使用记录新增
export function assets_device_usage_record_add(data) {
  return request({
    url: "/assets_device_usage_record/add",
    method: "post",
    data,
  });
}
//设备使用记录删除
export function assets_device_usage_record_delete(data) {
  return request({
    url: "/assets_device_usage_record/delete",
    method: "post",
    data,
  });
}
//出入库记录列表
export function assets_device_stock_ops_list(data) {
  return request({
    url: "/assets_device_stock_ops/list",
    method: "post",
    data,
  });
}
//出入库记录新增
export function assets_device_stock_ops_add(data) {
  return request({
    url: "/assets_device_stock_ops/add",
    method: "post",
    data,
  });
}
