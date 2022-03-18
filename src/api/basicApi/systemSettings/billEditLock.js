/*
 * @Author: your name
 * @Date: 2021-11-01 15:54:15
 * @LastEditTime: 2021-11-01 16:52:53
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \JvMmsV9Front\src\api\basicApi\systemSettings\currency.js
 */
import request from "@/utils/request";

// 获取单据编辑权限
export function editLock(query) {
  return request({
    url: "/bill/edit_lock/get",
    method: "get",
    params: query,
  });
}
// 解除单据编辑权限
export function releaseEditLock(query) {
  return request({
    url: "/bill/edit_lock/release",
    method: "get",
    params: query,
  });
}
