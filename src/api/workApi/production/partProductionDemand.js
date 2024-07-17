/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2024-07-16 16:03:01
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
export function get_parts_by_partNo(data) {
  return request({
    url: "/part_production_demand/get_parts_by_partNo",
    method: "post",
    data,
  });
}
export function quickly_create_task(data) {
  return request({
    url: "/part_production_demand/quickly_create_task",
    method: "post",
    data,
  });
}
export { API };
