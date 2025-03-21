/*
 * @Author: H.
 * @Date: 2021-11-17 09:32:34
 * @LastEditTime: 2021-12-29 16:03:16
 * @Description:委外加工
 */

import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
/*销售订单*/
import request from "@/utils/request";

const API = apiGenPlugin("purchase_outsourcing", apiType.COMMON);
export { API };

// 完成外协单
export function successOutsourcing(data) {
  return request({
    url: "/purchase_outsourcing/completed",
    method: "post",
    data,
  });
}
//外协单明细
export function purchase_outsourcing_Detail(data) {
  return request({
    url: "/purchase_outsourcing/item_list",
    method: "post",
    data,
  });
}

//供应商评估
export function supplier_evaluation(data) {
  return request({
    url: "/data_report/outsourced_supplier_assess",
    method: "post",
    data,
  });
}

//外协费用统计
export function outsourced_cos_statistics(data) {
  return request({
    url: "/data_report/outsourced_cos_statistics",
    method: "post",
    data,
  });
}
