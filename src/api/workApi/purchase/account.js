/*
 * @Author: H.
 * @Date: 2021-11-16 13:58:32
 * @LastEditTime: 2021-12-29 15:05:24
 * @Description: 采购对账
 */

import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
/*销售订单*/
import request from "@/utils/request";

const API = apiGenPlugin("purchase_account", apiType.COMMON);
export { API };

// 采购对账获取入库退货明细
export function getPurchaseStockinAndReturnItem(data) {
  return request({
    url: "/purchase_account/list_stockin_and_return_item",
    method: "post",
    data,
  });
}
