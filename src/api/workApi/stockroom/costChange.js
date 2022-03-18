/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2021-11-04 14:50:18
 * @Description:
 */
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
import request from "@/utils/request";
/*成本调整*/
const API = apiGenPlugin("stock_cost_change", apiType.COMMON);
export { API };
// 成本调整明细列表
export function stock_cost_change_Detail(data) {
  return request({
    url: "/stock_cost_change/item_list",
    method: "post",
    data,
  });
}
/*// 成本调整列表
export function getStockCostChangeList(data) {
  return request({
    url: "/stock_cost_change/list",
    method: "post",
    data,
  });
}
// 保存成本调整
export function saveStockCostChange(data) {
  return request({
    url: "/stock_cost_change/save",
    method: "post",
    data,
  });
}
// 根据Id获取成本调整
export function getStockCostChange(query) {
  return request({
    url: "/stock_cost_change/get",
    method: "get",
    params: query,
  });
}
// 根据Id删除成本调整
export function deleteStockCostChange(data) {
  return request({
    url: "/stock_cost_change/delete",
    method: "post",
    data,
  });
}
// 提交成本调整审核
export function submitStockCostChange(data) {
  return request({
    url: "/stock_cost_change/submit",
    method: "post",
    data,
  });
}
// 审核成本调整
export function auditStockCostChange(data) {
  return request({
    url: "/stock_cost_change/audit",
    method: "post",
    data,
  });
}
// 撤审成本调整
export function revokeAuditStockCostChange(data) {
  return request({
    url: "/stock_cost_change/withdraw",
    method: "post",
    data,
  });
}
// 审核拒绝成本调整
export function rejectStockCostChange(data) {
  return request({
    url: "/stock_cost_change/reject",
    method: "post",
    data,
  });
}*/
