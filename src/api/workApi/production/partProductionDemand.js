/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2024-07-11 14:44:07
 * @Description:
 */
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
/*销售订单*/
import request from "@/utils/request";

const API = apiGenPlugin("part_production_demand", apiType.COMMON);
export function part_production_demand_item_list(data) {
  return request({
    url: "/part_production_demand/item_list",
    method: "post",
    data,
  });
}
export { API };
