/*
 * @Author: H.
 * @Date: 2021-11-16 11:04:46
 * @LastEditTime: 2021-12-29 16:49:54
 * @Description:采购入库
 */

import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
import request from "@/utils/request";

const API = apiGenPlugin("purchase_stock_in", apiType.COMMON);
export { API };
// 采购入库明细列表
export function purchase_stock_in_Detail(data) {
  return request({
    url: "/purchase_stock_in/item_list",
    method: "post",
    data,
  });
}
