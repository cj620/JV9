/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2021-11-04 14:50:18
 * @Description:
 */
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
import request from "@/utils/request";
/*调拨单*/
const API = apiGenPlugin("stock_dispatch", apiType.COMMON);
export { API };
/*
// 调拨单列表
export function getStockDispatchList(data) {
  return request({
    url: "/stock_dispatch/list",
    method: "post",
    data,
  });
}
// 保存调拨单
export function saveStockDispatch(data) {
  return request({
    url: "/stock_dispatch/save",
    method: "post",
    data,
  });
}
// 根据Id获取调拨单
export function getStockDispatch(query) {
  return request({
    url: "/stock_dispatch/get",
    method: "get",
    params: query,
  });
}
// 根据Id删除调拨单
export function deleteStockDispatch(data) {
  return request({
    url: "/stock_dispatch/delete",
    method: "post",
    data,
  });
}
// 提交调拨单审核
export function submitStockDispatch(data) {
  return request({
    url: "/stock_dispatch/submit",
    method: "post",
    data,
  });
}
// 审核调拨单
export function auditStockDispatch(data) {
  return request({
    url: "/stock_dispatch/audit",
    method: "post",
    data,
  });
}
// 撤审调拨单
export function revokeAuditStockDispatch(data) {
  return request({
    url: "/stock_dispatch/withdraw",
    method: "post",
    data,
  });
}
// 审核拒绝调拨单
export function rejectStockDispatch(data) {
  return request({
    url: "/stock_dispatch/reject",
    method: "post",
    data,
  });
}
*/
