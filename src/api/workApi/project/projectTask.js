/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2024-07-24 10:10:25
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
// 编辑报工记录
export function update_record_actual_end(data) {
  return request({
    url: "/project_task_log/update_record_actual_end",
    method: "post",
    data,
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

// 试模任务列表
export function trial_tooling_list(data) {
  return request({
    url: "/project_task/trial_tooling_list",
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
// 生产编程任务单列表
export function production_programing_task_list(data) {
  return request({
    url: "/production_programing_task/list",
    method: "post",
    data,
  });
}
// 生产编程任务单明细
export function production_programing_task_items(data) {
  return request({
    url: "/production_programing_task/items",
    method: "post",
    data,
  });
}
// 编辑生产加工编程任务
export function production_programing_task_edit(data) {
  return request({
    url: "/production_programing_task/edit",
    method: "post",
    data,
  });
}
// 批量编辑生产加工编程任务
export function production_programing_task_batch_edit(data) {
  return request({
    url: "/production_programing_task/batch_edit",
    method: "post",
    data,
  });
}
// 删除生产加工编程任务
export function production_programing_task_delete(data) {
  return request({
    url: "/production_programing_task/delete",
    method: "post",
    data,
  });
}
// 生产加工编程任务明细点检列表
export function production_programing_task_item_inspection_list(data) {
  return request({
    url: "/production_programing_task/item_inspection_list",
    method: "post",
    data,
  });
}
// 保存试模任务动态扩充内容信息
export function save_trial_tooling_dynamic(data) {
  return request({
    url: "/project_task/save_trial_tooling_dynamic",
    method: "post",
    data,
    loading: true,
  });
}
// 钳工任务列表
export function assy_task_list(data) {
  return request({
    url: "/assy_task/list",
    method: "post",
    data,
  });
}
// 项目任务明细点检列表
export function item_inspection_list(data) {
  return request({
    url: "/project_task/item_inspection_list",
    method: "post",
    data,
  });
}
// 点检项目任务明细
export function item_inspection(data) {
  return request({
    url: "/project_task/inspection",
    method: "post",
    data,
  });
}
// 点检处理项目任务明细
export function item_inspection_handle(data) {
  return request({
    url: "/project_task/inspection_handle",
    method: "post",
    data,
  });
}
// 点检编程加工任务明细
export function production_programing_task_inspection(data) {
  return request({
    url: "/production_programing_task/inspection",
    method: "post",
    data,
  });
}
// 点检处理项目任务明细
export function production_programing_task_inspection_handle(data) {
  return request({
    url: "/production_programing_task/inspection_handle",
    method: "post",
    data,
  });
}
// 项目任务单明细延期列表
export function item_delay_list(data) {
  return request({
    url: "/project_task/item_delay_list",
    method: "post",
    data,
  });
}
// 批量完成项目任务单明细延期列表
export function complete_delay_list(data) {
  return request({
    url: "/project_task/complete_delay_list",
    method: "post",
    data,
  });
}
