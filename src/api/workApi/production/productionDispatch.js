/*
 * @Author: C.
 * @Date: 2021-12-28 14:42:59
 * @LastEditTime: 2022-01-21 15:34:18
 * @Description: file content
 */
import request from "@/utils/request";

// 站点匹配工序列表
export function production_dispatching_list(data) {
  return request({
    url: "/production_dispatching/list",
    method: "post",
    data
  });
}
// POST /api/production_dispatching/topping
// 生产调度置顶
export function production_dispatching_topping(data) {
  return request({
    url: "/production_dispatching/topping",
    method: "post",
    data
  });
}
// POST /api/production_dispatching/change_device
// 生产调度修改设备
export function production_dispatching_change_device(data) {
  return request({
    url: "/production_dispatching/change_device",
    method: "post",
    data
  });
}
// 生产调度锁定设备
export function production_dispatching_lock_device(data) {
  return request({
    url: "/production_dispatching/lock_device",
    method: "post",
    data
  });
}
