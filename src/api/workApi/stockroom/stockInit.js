/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2021-11-04 14:50:18
 * @Description:
 */
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
import request from "@/utils/request";
/*库存期初*/
const API = apiGenPlugin("stock_init", apiType.COMMON);
export { API };



/*// 库存期初列表
export function getStockInitList(data) {
  return request({
    url: "/stock_init/list",
    method: "post",
    data,
  });
}
// 保存库存期初
export function saveStockInit(data) {
  return request({
    url: "/stock_init/save",
    method: "post",
    data,
  });
}
// 根据Id获取库存期初
export function getStockInit(query) {
  return request({
    url: "/stock_init/get",
    method: "get",
    params: query,
  });
}
// 根据Id删除库存期初
export function deleteStockInit(data) {
  return request({
    url: "/stock_init/delete",
    method: "post",
    data,
  });
}
// 提交库存期初审核
export function submitStockInit(data) {
  return request({
    url: "/stock_init/submit",
    method: "post",
    data,
  });
}
// 审核库存期初
export function auditStockInit(data) {
  return request({
    url: "/stock_init/audit",
    method: "post",
    data,
  });
}
// 撤审库存期初
export function revokeAuditStockInit(data) {
  return request({
    url: "/stock_init/withdraw",
    method: "post",
    data,
  });
}
// 审核拒绝库存期初
export function rejectStockInit(data) {
  return request({
    url: "/stock_init/reject",
    method: "post",
    data,
  });
}*/
