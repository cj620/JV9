/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2021-11-04 14:50:18
 * @Description:
 */
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
import request from "@/utils/request";
/*物料拆装*/
const API = apiGenPlugin("stock_split_assemble", apiType.COMMON);
export { API };
/*// 物料拆装列表
export function getStockSplitAssembleList(data) {
  return request({
    url: "/stock_split_assemble/list",
    method: "post",
    data,
  });
}
// 保存物料拆装
export function saveStockSplitAssemble(data) {
  return request({
    url: "/stock_split_assemble/save",
    method: "post",
    data,
  });
}
// 根据Id获取物料拆装
export function getStockSplitAssemble(query) {
  return request({
    url: "/stock_split_assemble/get",
    method: "get",
    params: query,
  });
}
// 根据Id删除物料拆装
export function deleteStockSplitAssemble(data) {
  return request({
    url: "/stock_split_assemble/delete",
    method: "post",
    data,
  });
}
// 提交物料拆装审核
export function submitStockSplitAssemble(data) {
  return request({
    url: "/stock_split_assemble/submit",
    method: "post",
    data,
  });
}
// 审核物料拆装
export function auditStockSplitAssemble(data) {
  return request({
    url: "/stock_split_assemble/audit",
    method: "post",
    data,
  });
}
// 撤审物料拆装
export function revokeAuditStockSplitAssemble(data) {
  return request({
    url: "/stock_split_assemble/withdraw",
    method: "post",
    data,
  });
}
// 审核拒绝物料拆装
export function rejectStockSplitAssemble(data) {
  return request({
    url: "/stock_split_assemble/reject",
    method: "post",
    data,
  });
}*/
