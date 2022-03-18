/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2021-11-24 10:31:24
 * @Description:
 */
import request from "@/utils/request";

// 根据项目ID获取预算表
export function getBudgetCostById(data) {
  return request({
    url: "/project_budget_cost/get",
    method: "get",
    params: data,
  });
}
// 保存预算表
export function saveBudgetCost(data) {
  return request({
    url: "/project_budget_cost/save",
    method: "post",
    data,
  });
}
