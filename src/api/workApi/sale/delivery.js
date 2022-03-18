/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2022-03-01 10:55:52
 * @Description:
 */
import request from "@/utils/request";
/*
import request from "@/utils/request";
/!*销售发货*!/

// 销售发货列表
export function getSalesDeliveryList(data) {
  return request({
    url: "/sales_delivery/list",
    method: "post",
    data,
  });
}

// 保存销售发货
export function saveSalesDelivery(data) {
  return request({
    url: "/sales_delivery/save",
    method: "post",
    data,
  });
}
// 根据Id获取销售发货
export function getSalesDelivery(query) {
  return request({
    url: "/sales_delivery/get",
    method: "get",
    params: query,
  });
}
// 根据Id删除销售发货
export function deleteSalesDelivery(data) {
  return request({
    url: "/sales_delivery/delete",
    method: "post",
    data,
  });
}
// 提交销售发货审核
export function submitSalesDelivery(data) {
  return request({
    url: "/sales_delivery/submit",
    method: "post",
    data,
  });
}
// 审核销售发货
export function auditSalesDelivery(data) {
  return request({
    url: "/sales_delivery/audit",
    method: "post",
    data,
  });
}
// 撤审销售发货
export function revokeAuditSalesDelivery(data) {
  return request({
    url: "/sales_delivery/withdraw",
    method: "post",
    data,
  });
}
// 审核拒绝销售发货
export function rejectSalesDelivery(data) {
  return request({
    url: "/sales_delivery/reject",
    method: "post",
    data,
  });
}
*/

import { apiGenPlugin,apiType } from "@/jv_doc/utils/system/apiGenPlugin";
/*销售订单*/
const API=apiGenPlugin('sales_delivery',apiType.COMMON)
export {
  API
}

export function getSaleDeliveryDetails(data) {
  return request({
    url: "/sales_delivery/item_list",
    method: "post",
    data,
  });
}