/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2021-11-04 14:50:18
 * @Description:
 */
import request from "@/utils/request";
/*销售对账*/

/*// 销售对账列表
export function getSalesAccountList(data) {
  return request({
    url: "/sales_account/list",
    method: "post",
    data,
  });
}

// 保存销售对账
export function saveSalesAccount(data) {
  return request({
    url: "/sales_account/save",
    method: "post",
    data,
  });
}
// 根据Id获取销售对账
export function getSalesAccount(query) {
  return request({
    url: "/sales_account/get",
    method: "get",
    params: query,
  });
}
// 根据Id删除销售对账
export function deleteSalesAccount(data) {
  return request({
    url: "/sales_account/delete",
    method: "post",
    data,
  });
}
// 提交销售对账
export function submitSalesAccount(data) {
  return request({
    url: "/sales_account/submit",
    method: "post",
    data,
  });
}
// 审核销售对账
export function auditSalesAccount(data) {
  return request({
    url: "/sales_account/audit",
    method: "post",
    data,
  });
}
// 撤审销售对账
export function revokeAuditSalesAccount(data) {
  return request({
    url: "/sales_account/withdraw",
    method: "post",
    data,
  });
}
// 审核拒绝销售对账
export function rejectSalesAccount(data) {
  return request({
    url: "/sales_account/reject",
    method: "post",
    data,
  });
}*/
// 销售对账获取退货发货明细
function listDeliveryAndReturnItem(data) {
  return request({
    url: "/sales_account/list_delivery_and_return_item",
    method: "post",
    data,
  });
}
import { apiGenPlugin,apiType } from "@/jv_doc/utils/system/apiGenPlugin";
/*销售订单*/
const API=apiGenPlugin('sales_account',apiType.COMMON)
export {
  API,
  listDeliveryAndReturnItem
}
