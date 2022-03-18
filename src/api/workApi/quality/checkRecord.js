/*
 * @Author: H.
 * @Date: 2021-11-30 15:05:33
 * @LastEditTime: 2021-11-30 15:07:07
 * @Description: 检验记录api
 */

import request from "@/utils/request";

// 获取检验记录
export function getCheckRecord(data) {
  return request({
    url: "/qc_check_record/list",
    method: "post",
    data,
  });
}

// 保存检验记录
export function saveCheckRecord(data) {
  return request({
    url: "/qc_check_record/save",
    method: "post",
    data,
  });
}

// 删除检验记录
export function deleteCheckRecord(data) {
  return request({
    url: "/qc_check_record/delete",
    method: "post",
    data,
  });
}
