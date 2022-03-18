/*
 * @Author: H.
 * @Date: 2021-12-09 15:18:14
 * @LastEditTime: 2021-12-09 15:19:14
 * @Description:
 */
import request from "@/utils/request";

// 生产计划
export function getProductionPlan(data) {
  return request({
    url: "/aps/query_aps_result",
    method: "post",
    data,
  });
}
