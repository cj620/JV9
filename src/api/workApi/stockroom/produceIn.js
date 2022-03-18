/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2021-11-04 14:50:18
 * @Description:
 */
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
import request from "@/utils/request";
/*生产入库*/
const API = apiGenPlugin("stock_produce_in", apiType.COMMON);
export { API };


/*// 生产入库列表
export function getStockProduceInList(data) {
  return request({
    url: "/stock_produce_in/list",
    method: "post",
    data,
  });
}
// 保存生产入库
export function saveStockProduceIn(data) {
  return request({
    url: "/stock_produce_in/save",
    method: "post",
    data,
  });
}
// 根据Id获取生产入库
export function getStockProduceIn(query) {
  return request({
    url: "/stock_produce_in/get",
    method: "get",
    params: query,
  });
}
// 根据Id获取生产入库
export function deleteStockProduceIn(data) {
  return request({
    url: "/stock_produce_in/delete",
    method: "post",
    data,
  });
}
// 提交生产入库审核
export function submitStockProduceIn(data) {
  return request({
    url: "/stock_produce_in/submit",
    method: "post",
    data,
  });
}
// 审核生产入库
export function auditStockProduceIn(data) {
  return request({
    url: "/stock_produce_in/audit",
    method: "post",
    data,
  });
}
// 撤审生产入库
export function revokeAuditStockProduceIn(data) {
  return request({
    url: "/stock_produce_in/withdraw",
    method: "post",
    data,
  });
}
// 审核拒绝生产入库
export function rejectStockProduceIn(data) {
  return request({
    url: "/stock_produce_in/reject",
    method: "post",
    data,
  });
}*/
