/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2022-08-25 17:22:17
 * @Description:
 */
// import request from "@/utils/request";
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
import request from "@/utils/request";
// 项目任务
const API = apiGenPlugin("project_task", apiType.COMMON);
export { API };

// 获取项目列表
export function getProject_task_log(data) {
  return request({
    url: "/project_task_log/list",
    method: "post",
    data,
  });
}

// 获取报工记录
export function getJobRecord(query) {
  return request({
    url: "/project_task_log/get",
    method: "get",
    params: query,
  });
}
// 完成项目任务
export function successProjectTask(data) {
  return request({
    url: "/project_task/completed",
    method: "post",
    data,
  });
}
     //提交设计方案，钳工方案，编程方案
export function submit_solution(data) {
  return request({
    url: "/project_task/submit_solution",
    method: "post",
    data,
  });
}
// 获取项目明细列表
export function project_task_item_list(data) {
  return request({
    url: "/project_task/item_list",
    method: "post",
    data,
  });
}

// 编辑项目明细
export function project_task_save_item(data) {
  return request({
    url: "/project_task/save_item",
    method: "post",
    data,
  });
}
// 获取子任务
export function project_task_get_children_item(query) {
  return request({
    url: "/project_task/get_children_item",
    method: "get",
    params: query,
  });
}

// 下推项目明细
export function project_task_push_item(data) {
  return request({
    url: "/project_task/push_item",
    method: "post",
    data,
  });
}



// 删除子任务
export function project_task_delete_item(data) {
  return request({
    url: "/project_task/delete_item",
    method: "post",
    data,
  });
}

// 项目任务无单报工
export function project_task_special_report_work(data) {
  return request({
    url: "/project_task/special_report_work",
    method: "post",
    data,
  });
}

// 修改项目任务报工
export function project_task_update_log(data) {
  return request({
    url: "/project_task/update_log",
    method: "post",
    data,
  });
}



// 检查报工时间
export function project_task_check_report_work_date(data) {
  return request({
    url: "/project_task/check_report_work_date",
    method: "post",
    data,
  });
}