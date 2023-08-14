/*
 * @Author: H.
 * @Date: 2021-11-18 14:41:33
 * @LastEditTime: 2022-11-30 15:27:36
 * @Description: 生产模块加工任务
 */

import request from "@/utils/request";

// 获取所有加工任务
export function productionTaskList(data) {
  return request({
    url: "/production_task/list",
    method: "post",
    data,
  });
}

// 根据Id获取加工任务
export function getProductionTask(query) {
  return request({
    url: "/production_task/get",
    method: "get",
    params: query,
  });
}
// 保存加工任务
export function saveProductionTask(data) {
  return request({
    url: "/production_task/save",
    method: "post",
    data,
    loading: true,
  });
}
// 删除加工任务
export function deleteProductionTask(data) {
  return request({
    url: "/production_task/delete",
    method: "post",
    data,
  });
}
// 根据零件号获取加工任务零件信息
export function getPartsByPartNo(data) {
  return request({
    url: "/production_task/get_parts_by_partNo",
    method: "post",
    data,
  });
}
// 修改工单交期
export function update_plan_end(data) {
  return request({
    url: "/production_task/update_plan_end",
    method: "post",
    data,
  });
}
// 修改加工单任务记录实际结束日期
export function update_record_actual_end(data) {
  return request({
    url: "/production_task/update_record_actual_end",
    method: "post",
    data,
  });
}
// 获取加工任务列表
export function production_task_copy_list(data) {
  return request({
    url: "/production_task/copy_list",
    method: "post",
    data,
  });
}
// 复制加工任务列表
export function production_task_copy(data) {
  return request({
    url: "/production_task/copy",
    method: "post",
    data,
  });
}
// 修改加工任务单是否排程字段
export function update_is_partake_aps(data){
  return request({
    url:"/production_task/update_is_partake_aps",
    method:"post",
    data,
  })
}
