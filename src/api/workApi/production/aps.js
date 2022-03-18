import request from "@/utils/request";

// 排程结果
export function query_latest_aps_result(data) {
  return request({
    url: "/aps/query_latest_aps_result",
    method: "post",
    data,
  });
}
// 排程结果明细
export function query_latest_aps_result_for_chart(data) {
  return request({
    url: "/aps/query_latest_aps_result_for_chart",
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
  });
}
