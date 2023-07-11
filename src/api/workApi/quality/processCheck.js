/*
 * @Author: C.
 * @LastEditTime: 2022-08-09 11:37:43
 * @FilePath: \JvMEs9.1\src\api\workApi\quality\processCheck.js
 * @Description: /
 */
import request from "@/utils/request";
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
const API = apiGenPlugin("qc_process_check", apiType.COMMON);
export { API };
// 获取工序检验列表
export function qc_process_check_list(data) {
  return request({
    url: "/qc_process_check/list",
    method: "post",
    data,
  });
}
// 根据加工单获取工序检测相关信息
export function qc_process_check_get_relevant_info(query) {
  return request({
    url: "/qc_process_check/get_relevant_info",
    method: "get",
    params: query,
  });
}
// 获取工序检测信息
export function qc_process_check_get(query) {
  return request({
    url: "/qc_process_check/get",
    method: "get",
    params: query,
  });
}
// 保存工序检测信息
export function qc_process_check_save(data) {
  return request({
    url: "/qc_process_check/save",
    method: "post",
    data,
  });
}
// 删除工序检测信息
export function qc_process_check_delete(data) {
  return request({
    url: "/qc_process_check/delete",
    method: "post",
    data,
  });
}
// 获取不合格原因明细
export function qc_process_check_get_unqualified_reason(query) {
  return request({
    url: "/qc_process_check/get_unqualified_reason",
    method: "get",
    params: query,
  });
}