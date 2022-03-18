/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2021-12-16 09:09:04
 * @Description:
 */
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
/*销售订单*/
import request from "@/utils/request";

const API = apiGenPlugin("sales_order", apiType.COMMON);
export { API };

export function getSaleOrderDetails(data) {
  return request({
    url: "/sales_order/item_list",
    method: "post",
    data,
  });
}
