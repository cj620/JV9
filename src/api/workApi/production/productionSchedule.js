import request from "@/utils/request";

// 生产排程
export function simulation_scheduling_list(data) {
  return request({
    url: "/simulation_scheduling/gantt_chart",
    method: "post",
    data
  });
}