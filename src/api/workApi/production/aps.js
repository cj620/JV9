import request from "@/utils/request";
// 排程结果
export function query_aps_result(data) {
  return request({
    url: "/aps/query_aps_result",
    method: "post",
    data,
  });
}
// 最近一次排程结果
export function query_latest_aps_result(data) {
  return request({
    url: "/aps/query_latest_aps_result",
    method: "post",
    data,
  });
}
// 最近一次排程结果明细
export function query_latest_aps_result_for_chart(data) {
  return request({
    url: "/aps/query_latest_aps_result_for_chart",
    method: "post",
    data,
  });
}
// 排程版本记录
export function query_aps_version(data) {
  return request({
    url: "/aps/query_aps_version",
    method: "post",
    data,
  });
}

// 计算排程
export function do_aps(data) {
  return request({
    url: "/aps/do_aps",
    method: "post",
    data,
  });
}
export function do_aps1(data) {
  return request({
    url: "/aps/do_aps1",
    method: "post",
    data,
    loading: true
  });
}
// 手动修改APS结果
export function modify_aps_result(data) {
  return request({
    url: "/aps/modify_aps_result",
    method: "post",
    data,
  });
}
// 发布APS结果
export function do_publish(data) {
  return request({
    url: "/aps/do_publish",
    method: "post",
    data,
    loading: true,
  });
}
// 一键处理APS结果
export function one_click_processing(data) {
  return request({
    url: "/aps/one_click_processing",
    method: "post",
    data,
    loading: true,
  });
}

// 查询模拟排程饼状图数据
export function pie_chart(data) {
  return request({
    url: "/simulation_scheduling/piec_hart",
    method: "post",
    data,
    // loading: true,
  });
}
// 查询模拟排程甘特图数据
export function gantt_chart(data) {
  return request({
    url: "/simulation_scheduling/gantt_chart",
    method: "post",
    data,
  });
}
// 查询模拟排程表格数据
export function table_list(data) {
  return request({
    url: "/simulation_scheduling/table_list",
    method: "post",
    data,
  });
}
// 计算模拟排程
export function simulation_calculate(data) {
  return request({
    url: "/simulation_scheduling/calculate",
    method: "post",
    data,
  });
}
// 以机床为单位的甘特图
export function latest_device_gantt_chart(data) {
  return request({
    url: "/aps/latest_device_gantt_chart",
    method: "post",
    data,
  });
}
