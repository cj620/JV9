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
    loading: true
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
// 恢复已删除生产任务
export function production_task_Recovery_list_has_been_deleted(data) {
  return request({
    url: "/production_task/recovery_has_been_deleted",
    method: "post",
    data
  });
}
// 查询已删除生产任务列表
export function production_task_list_has_been_deleted(data) {
  return request({
    url: "/production_task/list_has_been_deleted",
    method: "post",
    data
  });
}
// 修改加工任务单状态 // 编辑工单为已完成
export function update_state(data){
  return request({
    url:"/production_task/update_state",
    method:"post",
    data,
  })
}
// 领用生产编程任务
export function update_worker(query){
  return request({
    url:"/production_programing_task/updateWorker",
    method:"get",
    params: query,
  })
}
