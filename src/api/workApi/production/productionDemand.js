/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2023-03-14 09:55:48
 * @Description:
 */
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
/*生产需求*/
import request from "@/utils/request";

const API = apiGenPlugin("Production_demand", apiType.COMMON);
export { API };
export function Production_demand_item_list(data) {
  return request({
    url: "/Production_demand/item_list",
    method: "post",
    data,
  });
}

//改变需求单状态
export function Production_demand_set_item_status(data) {
  return request({
    url: "/Production_demand/set_item_status",
    method: "post",
    data,
  });
}
//检查是否已提交生产加工单
export function Production_demand_create_task_check(data) {
  return request({
    url: "/Production_demand/create_task_check",
    method: "post",
    data,
  });
}

//提交生产加工单
export function Production_demand_create_task(data) {
  return request({
    url: "/Production_demand/create_task",
    method: "post",
    data,
  });
}

//检查是否已提交物料需求
export function Production_demand_create_material_requirement_check(data) {
  return request({
    url: "/Production_demand/create_material_requirement_check",
    method: "post",
    data,
  });
}

//提交物料需求
export function Production_demand_create_material_requirement(data) {
  return request({
    url: "/Production_demand/create_material_requirement",
    method: "post",
    data,
  });
}
//生产需求对接日志列表
export function Production_demand_log_list(data) {
  return request({
    url: "/Production_demand_log/list",
    method: "post",
    data,
  });
}
//处理生产需求对接日志
export function Production_demand_log_dispose(data) {
  return request({
    url: "/Production_demand_log/dispose",
    method: "post",
    data,
  });
}
// 生产需求对接日志详情
export function Production_demand_log_get(data) {
  return request({
    url: "/Production_demand_log/get",
    method: "get",
    params: data,
  });
}
// 待处理生产需求创建采购申请
export function Create_PRD_PR(data) {
  return request({
    url: "/Production_demand_log/create_purchase_requisition ",
    method: "post",
    data,
  });
}

// 生产需求批量导入日志
export function Production_demand_log_batch_save(data) {
  return request({
    url: "/Production_demand_log/batch_save",
    method: "post",
    data,
    loading: true,
  });
}

// 保存生产需求跟踪任务:
export function save_track_task(data) {
  return request({
    url: "/Production_demand_log/save_track_task",
    method: "post",
    data,
  });
}

// 生产需求对接日志追踪任务列表:
export function track_task_list(data) {
  return request({
    url: "/Production_demand_log/track_task_list",
    method: "post",
    data,
  });
}
// 生产需求对接日志追踪任务列表:
export function Production_demand_log_delete(data) {
  return request({
    url: "/Production_demand_log/delete",
    method: "post",
    data,
  });
}

// 完成生产需求明细 api/Production_demand/completed_item

export function Production_demand_completed_item(data) {
  return request({
    url: "/Production_demand/completed_item",
    method: "post",
    data,
  });
}

// 作废生产需求明细 api/Production_demand/discard_item
export function Production_demand_discard_item(data) {
  return request({
    url: "/Production_demand/discard_item",
    method: "post",
    data,
  });
}
export function get_material_cost(data) {
  return request({
    url: "/Production_demand_log/get_material_cost",
    method: "post",
    data,
    loading: true,
  });
}
// 修改客户交期
export function Production_demand_log_update_delivery_date(data) {
  return request({
    url: "/Production_demand_log/update_delivery_date",
    method: "post",
    data,
    loading: true,
  });
}
// 修改待处理需求状态
export function Production_demand_log_update_state(data) {
  return request({
    url: "/Production_demand_log/update_state",
    method: "post",
    data,
    loading: true,
  });
}
// 查询已删除生产需求对接日志
export function Production_demand_log_list_has_been_deleted(data) {
  return request({
    url: "/Production_demand_log/list_has_been_deleted",
    method: "post",
    data,
    loading: true,
  });
}
// 恢复已删除生产需求对接日志
export function Production_demand_log_recovery_deleted(data) {
  return request({
    url: "/Production_demand_log/recovery_deleted",
    method: "post",
    data,
    loading: true,
  });
}
