/*
 * @Author: H.
 * @Date: 2021-11-17 11:00:38
 * @LastEditTime: 2021-12-29 16:19:57
 * @Description:委外对账
 */

import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
/*销售订单*/
import request from "@/utils/request";

const API = apiGenPlugin("purchase_outsourcing_account", apiType.COMMON);
export { API };

// 采购外协对账获取订单明细
export function getOutsourcingAccountDetails(data) {
  return request({
    url: "/purchase_outsourcing_account/list_purchase_outsourcing_item",
    method: "post",
    data,
  });
}
