/*
 * @Author: H.
 * @Date: 2021-12-08 14:25:57
 * @LastEditTime: 2021-12-08 14:28:01
 * @Description:委外需求
 */
import request from "@/utils/request";

// 获取委外需求
export function getOutsourcingrRequirement(data) {
  return request({
    url: "/purchase_outsourcing_requirement/list",
    method: "post",
    data,
  });
}

// 新增委外需求
export function addOutsourcingrRequirement(data) {
  return request({
    url: "/purchase_outsourcing_requirement/add",
    method: "post",
    data,
  });
}

// 删除委外需求
export function deleteOutsourcingrRequirement(data) {
  return request({
    url: "/purchase_outsourcing_requirement/delete",
    method: "post",
    data,
  });
}

// 更新委外需求状态
export function updateOutsourcingrRequirement(data) {
  return request({
    url: "/purchase_outsourcing_requirement/update_state",
    method: "post",
    data,
  });
}
// 更新委外需求状态
export function checkPurchaseOutsourcingrRequirement(data) {
  return request({
    url: "/purchase_outsourcing_requirement/check",
    method: "post",
    data,
  });
}
