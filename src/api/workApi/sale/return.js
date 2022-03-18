/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2022-03-01 11:06:44
 * @Description:
 */
/*import request from "@/utils/request";
/!*销售退货*!/

// 销售退货列表
export function getSalesReturnList(data) {
  return request({
    url: "/sales_return/list",
    method: "post",
    data,
  });
}

// 保存销售退货
export function saveSalesReturn(data) {
  return request({
    url: "/sales_return/save",
    method: "post",
    data,
  });
}
// 根据Id获取销售退货
export function getSalesReturn(query) {
  return request({
    url: "/sales_return/get",
    method: "get",
    params: query,
  });
}
// 根据Id删除销售退货
export function deleteSalesReturn(data) {
  return request({
    url: "/sales_return/delete",
    method: "post",
    data,
  });
}
// 提交销售退货审核
export function submitSalesReturn(data) {
  return request({
    url: "/sales_return/submit",
    method: "post",
    data,
  });
}
// 审核销售退货
export function auditSalesReturn(data) {
  return request({
    url: "/sales_return/audit",
    method: "post",
    data,
  });
}
// 撤审销售退货
export function revokeAuditSalesReturn(data) {
  return request({
    url: "/sales_return/withdraw",
    method: "post",
    data,
  });
}
// 审核拒绝销售退货
export function rejectSalesReturn(data) {
  return request({
    url: "/sales_return/reject",
    method: "post",
    data,
  });
}*/
import { apiGenPlugin,apiType } from "@/jv_doc/utils/system/apiGenPlugin";
import request from "@/utils/request";
/*销售订单*/
const API=apiGenPlugin('sales_return',apiType.COMMON)
export {
  API
}
export function getSaleReturnDetails(data) {
  return request({
    url: "/sales_return/item_list",
    method: "post",
    data,
  });
}