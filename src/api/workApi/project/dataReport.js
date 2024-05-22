/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2021-12-21 13:13:38
 * @Description:
 */
import request from "@/utils/request";

// 项目成本表
export function project_cost_list(data) {
  return request({
    url: "/data_report/project_cost_list",
    method: "post",
    data,
  });
}
// 项目成本的图标数据
export function project_cost_chart(data) {
  return request({
    url: "/data_report/project_cost_chart",
    method: "post",
    data,
  });
}
// 项目成本明细
export function project_cost_details(data) {
  return request({
    url: "/data_report/project_cost_details",
    method: "post",
    data,
  });
}
// 项目成本明细
export function project_cost_details_list(data) {
  return request({
    url: "/data_report/project_cost_details_list",
    method: "post",
    data,
  });
}
// 项目任务周看板
export function project_task_weekly_dashboard(data) {
  return request({
    url: "/data_report/project_task_weekly_dashboard",
    method: "post",
    data,
  });
}
