import request from "@/utils/request";

//点检单列表
export function assets_device_spot_check_list(data) {
  return request({
    url: "/assets_device_spot_check/list",
    method: "post",
    data,
  });
}

//点检单删除
export function assets_device_spot_check_delete(data) {
  return request({
    url: "/assets_device_spot_check/delete",
    method: "post",
    data,
  });
}

// 点检单详情
export function assets_device_spot_check_get(query) {
  return request({
    url: "/assets_device_spot_check/get",
    method: "get",
    params: query,
  });
}

// 保存点检单结果
export function assets_device_spot_check_save_result(data) {
  return request({
    url: "/assets_device_spot_check/save_result",
    method: "post",
    data,
  })
}
