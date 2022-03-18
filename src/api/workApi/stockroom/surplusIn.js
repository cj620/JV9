/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2021-11-04 14:50:18
 * @Description:
 */
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
import request from "@/utils/request";
/*报溢单*/
const API = apiGenPlugin("stock_surplus_in", apiType.COMMON);
export { API };
// 报溢单明细列表
export function stock_surplus_in_Detail(data) {
  return request({
    url: "/stock_surplus_in/item_list",
    method: "post",
    data,
  });
}
/*// 报溢单列表
export function getStockSurplusInList(data) {
  return request({
    url: "/stock_surplus_in/list",
    method: "post",
    data,
  });
}

// 保存报溢单
export function saveStockSurplusIn(data) {
  return request({
    url: "/stock_surplus_in/save",
    method: "post",
    data,
  });
}
// 根据Id获取报溢单
export function getStockSurplusIn(query) {
  return request({
    url: "/stock_surplus_in/get",
    method: "get",
    params: query,
  });
}
// 根据Id删除报溢单
export function deleteStockSurplusIn(data) {
  return request({
    url: "/stock_surplus_in/delete",
    method: "post",
    data,
  });
}
// 提交报溢单审核
export function submitStockSurplusIn(data) {
  return request({
    url: "/stock_surplus_in/submit",
    method: "post",
    data,
  });
}
// 审核报溢单
export function auditStockSurplusIn(data) {
  return request({
    url: "/stock_surplus_in/audit",
    method: "post",
    data,
  });
}
// 撤审报溢单
export function revokeAuditStockSurplusIn(data) {
  return request({
    url: "/stock_surplus_in/withdraw",
    method: "post",
    data,
  });
}
// 审核拒绝报溢单
export function rejectStockSurplusIn(data) {
  return request({
    url: "/stock_surplus_in/reject",
    method: "post",
    data,
  });
}*/
