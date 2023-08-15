import request from "@/utils/request";

// 生产排程结果
export function simulation_scheduling_list(data) {
  return request({
    // url: "/simulation_scheduling/gantt_chart",
    url: "/aps/query_latest_gantt_chart",
    method: "post",
    data,
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
