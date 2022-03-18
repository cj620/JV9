/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2021-11-04 14:50:18
 * @Description:
 */
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";

import request from "@/utils/request";
/*生产领料*/
const API = apiGenPlugin("stock_picking", apiType.COMMON);
export { API };

// 生产领料单明细列表
export function StockPickingItemList(data) {
  return request({
    url: "/stock_picking/item_list",
    method: "post",
    data,
  });
}
/*// 生产领料列表
export function getStockPickingList(data) {
  return request({
    url: "/stock_picking/list",
    method: "post",
    data,
  });
}

// 保存生产领料
export function saveStockPicking(data) {
  return request({
    url: "/stock_picking/save",
    method: "post",
    data,
  });
}
// 根据Id获取生产领料
export function getStockPicking(query) {
  return request({
    url: "/stock_picking/get",
    method: "get",
    params: query,
  });
}
// 根据Id获取生产领料
export function deleteStockPicking(data) {
  return request({
    url: "/stock_picking/delete",
    method: "post",
    data,
  });
}
// 提交生产领料审核
export function submitStockPicking(data) {
  return request({
    url: "/stock_picking/submit",
    method: "post",
    data,
  });
}
// 审核生产领料
export function auditStockPicking(data) {
  return request({
    url: "/stock_picking/audit",
    method: "post",
    data,
  });
}
// 撤审生产领料
export function revokeAuditStockPicking(data) {
  return request({
    url: "/stock_picking/withdraw",
    method: "post",
    data,
  });
}
// 审核拒绝生产领料
export function rejectStockPicking(data) {
  return request({
    url: "/stock_picking/reject",
    method: "post",
    data,
  });
}*/

