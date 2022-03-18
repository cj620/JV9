/*
 * @Author: H.
 * @Date: 2021-11-16 13:58:32
 * @LastEditTime: 2021-12-29 16:31:04
 * @Description: 采购申请
 */

import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
/*销售订单*/
import request from "@/utils/request";

const API = apiGenPlugin("purchase_requisition", apiType.COMMON);
export { API };

// 采购申请明细列表
export function getPu_Requisition_Detail(data) {
  return request({
    url: "/purchase_requisition/item_list",
    method: "post",
    data,
  });
}
