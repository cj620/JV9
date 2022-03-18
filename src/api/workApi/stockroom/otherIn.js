/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2021-11-04 14:50:18
 * @Description:
 */

import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
import request from "@/utils/request";
/*其它入库*/

/*其它出库*/
const API = apiGenPlugin("stock_other_in", apiType.COMMON);
export { API };
// 其它出库明细列表
export function stock_other_in_Detail(data) {
  return request({
    url: "/stock_other_in/item_list",
    method: "post",
    data,
  });
}
/*
// 其它入库列表
export function getStockOtherInList(data) {
  return request({
    url: "/stock_other_in/list",
    method: "post",
    data,
  });
}

// 保存其它入库
export function saveStockOtherIn(data) {
  return request({
    url: "/stock_other_in/save",
    method: "post",
    data,
  });
}
// 根据Id获取其它入库
export function getStockOtherIn(query) {
  return request({
    url: "/stock_other_in/get",
    method: "get",
    params: query,
  });
}
// 根据Id删除其它入库
export function deleteStockOtherIn(data) {
  return request({
    url: "/stock_other_in/delete",
    method: "post",
    data,
  });
}
// 提交其它入库审核
export function submitStockOtherIn(data) {
  return request({
    url: "/stock_other_in/submit",
    method: "post",
    data,
  });
}
// 审核其它入库
export function auditStockOtherIn(data) {
  return request({
    url: "/stock_other_in/audit",
    method: "post",
    data,
  });
}
// 撤审其它入库
export function revokeAuditStockOtherIn(data) {
  return request({
    url: "/stock_other_in/withdraw",
    method: "post",
    data,
  });
}
// 审核拒绝其它入库
export function rejectStockOtherIn(data) {
  return request({
    url: "/stock_other_in/reject",
    method: "post",
    data,
  });
}
*/
