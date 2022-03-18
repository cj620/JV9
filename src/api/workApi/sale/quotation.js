/*
 * @Author: your name
 * @Date: 2021-11-24 16:36:02
 * @LastEditTime: 2022-01-12 16:54:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\api\workApi\sale\quotation.js
 */
import request from "@/utils/request";
import { apiGenPlugin,apiType } from "@/jv_doc/utils/system/apiGenPlugin";
export function sales_quotation_get_last() {
  return request({
    url: "/sales_quotation/get_last",
    method: "get",
  });
}
/*销售订单*/
const API=apiGenPlugin('sales_quotation',apiType.COMMON)
export {
  API
}