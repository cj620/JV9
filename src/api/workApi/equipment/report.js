import request from "@/utils/request";

//设备占用图
export function data_report_device_occupancy_diagram(data) {
  return request({
    url: "/data_report/device_occupancy_diagram",
    method: "post",
    data,
  });
}
//获取设备采集信息
export function data_report_get_device_collection_info(data) {
  return request({
    url: "/data_report/get_device_collection_info",
    method: "post",
    data,
  });
}
