/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2021-11-04 14:50:18
 * @Description:
 */
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
import request from "@/utils/request";
/*库存盘点*/
const API = apiGenPlugin("stock_check", apiType.COMMON);
export { API };
/*// 库存盘点列表
export function getStockCheckList(data) {
  return request({
    url: "/stock_check/list",
    method: "post",
    data,
  });
}
// 保存库存盘点
export function saveStockCheck(data) {
  return request({
    url: "/stock_check/save",
    method: "post",
    data,
  });
}
// 根据Id获取库存盘点
export function getStockCheck(query) {
  return request({
    url: "/stock_check/get",
    method: "get",
    params: query,
  });
}
// 根据Id删除库存盘点
export function deleteStockCheck(data) {
  return request({
    url: "/stock_check/delete",
    method: "post",
    data,
  });
}
// 提交库存盘点审核
export function submitStockCheck(data) {
  return request({
    url: "/stock_check/submit",
    method: "post",
    data,
  });
}
// 审核库存盘点
export function auditStockCheck(data) {
  return request({
    url: "/stock_check/audit",
    method: "post",
    data,
  });
}
// 撤审库存盘点
export function revokeAuditStockCheck(data) {
  return request({
    url: "/stock_check/withdraw",
    method: "post",
    data,
  });
}
// 审核拒绝库存盘点
export function rejectStockCheck(data) {
  return request({
    url: "/stock_check/reject",
    method: "post",
    data,
  });
}*/
