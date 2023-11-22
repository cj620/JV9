import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
// 维护单
import request from "@/utils/request";
const API = apiGenPlugin("assets_device_repair", apiType.COMMON);
export { API };
// 完成报修单
export function assets_device_repair_completed(data) {
  return request({
    url: "/assets_device_repair/completed",
    method: "post",
    data,
  });
}
export function assets_device_repair_updateState(data){
  return request({
    url: "/assets_device_repair/updateState",
    method: "post",
    data
  })
}
export function assets_device_repair_saveItems(data){
  return request({
    url: "/assets_device_repair/saveItmes",
    method: "post",
    data
  })
}
