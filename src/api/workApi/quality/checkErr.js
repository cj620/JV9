/*
 * @Author: H.
 * @Date: 2021-11-30 15:05:33
 * @LastEditTime: 2021-12-17 14:43:25
 * @Description: 检验异常api
 */

import request from "@/utils/request";

// 获取检验异常
export function getCheckErr(data) {
  return request({
    url: "/qc_err/list",
    method: "post",
    data,
  });
}

// 保存检验异常
export function saveCheckErr(data) {
  return request({
    url: "/qc_err/save",
    method: "post",
    data,
  });
}

// 删除检验异常
export function deleteCheckErr(data) {
  return request({
    url: "/qc_err/delete",
    method: "post",
    data,
  });
}
