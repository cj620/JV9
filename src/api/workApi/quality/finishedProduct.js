/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2023-06-01 15:25:02
 * @Description:
 */
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
import request from "@/utils/request";

const API = apiGenPlugin("qc_finished_product", apiType.COMMON);
export { API };
export function get_qc_finished_product_item_list(data) {
  return request({
    url: "/qc_finished_product/item_list",
    method: "post",
    data,
  });
}
export function get_qc_finished_product_export(data) {
  return request({
    url: "/qc_finished_product/export",
    method: "get",
    data,
  });
}

export function get_qc_finished_product_update_reason_for_nonconformity(data) {
  return request({
    url: "/qc_finished_product/update_reason_for_nonconformity",
    method: "post",
    data,
  });
}
// 保存成品检测信息
export function qc_finished_product_save(data) {
  return request({
    url: "/qc_finished_product/save",
    method: "post",
    data,
  });
}
