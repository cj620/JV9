import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
// 维护单
import request from "@/utils/request";
const API = apiGenPlugin("assets_device_repair", apiType.COMMON);
export { API };

// 删除保修单
export function assets_device_repair_delete(data){
  return request({
    url: "/assets_device_repair/delete",
    method: "post",
    data
  })
}
// 完成报修单
export function assets_device_repair_completed(data) {
  return request({
    url: "/assets_device_repair/completed",
    method: "post",
    data,
  });
}
// 更新保修单状态
export function assets_device_repair_updateState(data){
  return request({
    url: "/assets_device_repair/updateState",
    method: "post",
    data
  })
}
// 保存报修配件
export function assets_device_repair_saveItems(data){
  return request({
    url: "/assets_device_repair/saveItmes",
    method: "post",
    data
  })
}
