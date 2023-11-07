import request from "@/utils/request";

// 生产排程结果
export function simulation_scheduling_list(data) {
  return request({
    // url: "/simulation_scheduling/gantt_chart",
    url: "/aps/query_latest_gantt_chart",
    method: "post",
    data,
    loading: true,
  });
}
// 生产排程·超期及陈旧加工任务单列表
export function overdue_and_obsolete_list(data) {
  return request({
    url: "/production_task/overdue_and_obsolete_list",
    method: "post",
    data,
  });
}

/*
* UpdateAll":"是否更新全部待排状态"
* "BillIds":"编号"
* "IsPartakeAPS":"是否参与排程枚举"
*   /// 待排 ToBeArranged = 0,/// 陈旧工单 ObsoleteWorkOrder = 1,/// 标记陈旧工单 MarkObsoleteWorkOrder = 2,/// 正常 Normal = 3,
* */

// 待排工单添加到参排工单(全部)
export function update_is_partake_aps(data) {
  return request({
    url: "/production_task/update_is_partake_aps",
    method: "post",
    data,
  });
}
