/*
 * @Author: H.
 * @Date: 2021-11-15 13:46:18
 * @LastEditTime: 2021-12-29 16:47:57
 * @Description: 采购退货api
 */
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
/*销售订单*/
import request from "@/utils/request";

const API = apiGenPlugin("purchase_return", apiType.COMMON);
export { API };

// 采购退货明细列表
export function getPurchaseReturnDetails(data) {
  return request({
    url: "/purchase_order/item_list",
    method: "post",
    data,
  });
}
