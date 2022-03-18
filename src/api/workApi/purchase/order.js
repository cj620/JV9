/*
 * @Author: H.
 * @Date: 2021-11-10 08:52:00
 * @LastEditTime: 2021-12-29 14:41:47
 * @Description:采购订单
 */
// import request from "@/utils/request";

import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
/*采购订单*/
import request from "@/utils/request";
const API = apiGenPlugin("purchase_order", apiType.COMMON);
export { API };

// 采购订单明细列表
export function purchase_order_Detail(data) {
  return request({
    url: "/purchase_order/item_list",
    method: "post",
    data,
  });
}
// 采购订单列表
// export function getPurchaseOrderList(data) {
//   return request({
//     url: "/purchase_order/list",
//     method: "post",
//     data,
//   });
// }

// // 获取采购订单详情
// export function getPurchaseOrderDetails(query) {
//   return request({
//     url: "/purchase_order/get",
//     method: "get",
//     params: query,
//   });
// }

// // 保存采购订单
// export function savePurchaseOrder(data) {
//   return request({
//     url: "/purchase_order/save",
//     method: "post",
//     data,
//   });
// }

// // 提交采购订单
// export function submitPurchaseOrder(data) {
//   return request({
//     url: "/purchase_order/submit",
//     method: "post",
//     data,
//   });
// }

// // 审核采购单
// export function auditPurchaseOrder(data) {
//   return request({
//     url: "/purchase_order/audit",
//     method: "post",
//     data,
//   });
// }

// // 撤审采购单
// export function revokeAuditPurchaseOrder(data) {
//   return request({
//     url: "/purchase_order/withdraw",
//     method: "post",
//     data,
//   });
// }

// // 删除采购单
// export function deleteAuditPurchaseOrder(data) {
//   return request({
//     url: "/purchase_order/delete",
//     method: "post",
//     data,
//   });
// }

// // 审核拒绝采购单
// export function rejectAuditPurchaseOrder(data) {
//   return request({
//     url: "/purchase_order/reject",
//     method: "post",
//     data,
//   });
// }
