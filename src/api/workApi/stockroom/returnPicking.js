/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2021-11-04 14:50:18
 * @Description:
 */

import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
import request from "@/utils/request";
/*生产领料*/
const API = apiGenPlugin("stock_return_picking", apiType.COMMON);
export { API };
/*// 生产领料列表
export function getStockReturnPickingList(data) {
  return request({
    url: "/stock_return_picking/list",
    method: "post",
    data,
  });
}
// 保存生产领料
export function saveStockReturnPicking(data) {
  return request({
    url: "/stock_return_picking/save",
    method: "post",
    data,
  });
}
// 根据Id获取生产领料
export function getStockReturnPicking(query) {
  return request({
    url: "/stock_return_picking/get",
    method: "get",
    params: query,
  });
}
// 根据Id获取生产领料
export function deleteStockReturnPicking(data) {
  return request({
    url: "/stock_return_picking/delete",
    method: "post",
    data,
  });
}
// 提交生产领料审核
export function submitStockReturnPicking(data) {
  return request({
    url: "/stock_return_picking/submit",
    method: "post",
    data,
  });
}
// 审核生产领料
export function auditStockReturnPicking(data) {
  return request({
    url: "/stock_return_picking/audit",
    method: "post",
    data,
  });
}
// 撤审生产领料
export function revokeAuditStockReturnPicking(data) {
  return request({
    url: "/stock_return_picking/withdraw",
    method: "post",
    data,
  });
}
// 审核拒绝生产领料
export function rejectStockReturnPicking(data) {
  return request({
    url: "/stock_return_picking/reject",
    method: "post",
    data,
  });
}*/
