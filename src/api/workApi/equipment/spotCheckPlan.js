import request from "@/utils/request";

//点检单计划列表
export function assets_device_spot_check_plan_list(data) {
  return request({
    url: "/assets_device_spot_check_plan/list",
    method: "post",
    data,
  });
}
//点检单计划列表
export function assets_device_spot_check_plan_delete(data) {
  return request({
    url: "/assets_device_spot_check_plan/delete",
    method: "post",
    data,
  });
}
