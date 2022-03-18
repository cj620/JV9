/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2021-11-04 14:50:18
 * @Description:
 */
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
import request from "@/utils/request";
/*报损单*/
const API = apiGenPlugin("stock_waste_out", apiType.COMMON);
export { API };
// 报损单明细列表
export function stock_waste_out_Detail(data) {
  return request({
    url: "/stock_waste_out/item_list",
    method: "post",
    data,
  });
}
/*// 报损单列表
export function getStockWasteOutList(data) {
  return request({
    url: "/stock_waste_out/list",
    method: "post",
    data,
  });
}
// 保存报损单
export function saveStockWasteOut(data) {
  return request({
    url: "/stock_waste_out/save",
    method: "post",
    data,
  });
}
// 根据Id获取报损单
export function getStockWasteOut(query) {
  return request({
    url: "/stock_waste_out/get",
    method: "get",
    params: query,
  });
}
// 根据Id删除报损单
export function deleteStockWasteOut(data) {
  return request({
    url: "/stock_waste_out/delete",
    method: "post",
    data,
  });
}
// 提交报损单审核
export function submitStockWasteOut(data) {
  return request({
    url: "/stock_waste_out/submit",
    method: "post",
    data,
  });
}
// 审核报损单
export function auditStockWasteOut(data) {
  return request({
    url: "/stock_waste_out/audit",
    method: "post",
    data,
  });
}
// 撤审报损单
export function revokeAuditStockWasteOut(data) {
  return request({
    url: "/stock_waste_out/withdraw",
    method: "post",
    data,
  });
}
// 审核拒绝报损单
export function rejectStockWasteOut(data) {
  return request({
    url: "/stock_waste_out/reject",
    method: "post",
    data,
  });
}*/
