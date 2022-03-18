/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2021-11-04 14:50:18
 * @Description:
 */
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
import request from "@/utils/request";
/*其它出库*/
const API = apiGenPlugin("stock_other_out", apiType.COMMON);
export { API };
// 其它出库明细列表
export function stock_other_out_Detail(data) {
  return request({
    url: "/stock_other_out/item_list",
    method: "post",
    data,
  });
}
/*
// 其它出库列表
export function getStockOtherOutList(data) {
  return request({
    url: "/stock_other_out/list",
    method: "post",
    data,
  });
}

// 保存其它出库
export function saveStockOtherOut(data) {
  return request({
    url: "/stock_other_out/save",
    method: "post",
    data,
  });
}
// 根据Id获取其它出库
export function getStockOtherOut(query) {
  return request({
    url: "/stock_other_out/get",
    method: "get",
    params: query,
  });
}
// 根据Id删除其它出库
export function deleteStockOtherOut(data) {
  return request({
    url: "/stock_other_out/delete",
    method: "post",
    data,
  });
}
// 提交其它出库审核
export function submitStockOtherOut(data) {
  return request({
    url: "/stock_other_out/submit",
    method: "post",
    data,
  });
}
// 审核其它出库
export function auditStockOtherOut(data) {
  return request({
    url: "/stock_other_out/audit",
    method: "post",
    data,
  });
}
// 撤审其它出库
export function revokeAuditStockOtherOut(data) {
  return request({
    url: "/stock_other_out/withdraw",
    method: "post",
    data,
  });
}
// 审核拒绝其它出库
export function rejectStockOtherOut(data) {
  return request({
    url: "/stock_other_out/reject",
    method: "post",
    data,
  });
}
*/
