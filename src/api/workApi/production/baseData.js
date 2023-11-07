/*
 * @Author: H.
 * @Date: 2021-11-18 14:41:33
 * @LastEditTime: 2022-01-24 17:11:45
 * @Description: 生产模块基础数据
 */

import request from "@/utils/request";

// 获取所有加工工序
export function getAllProcess() {
  return request({
    url: "/production_process/get_all",
    method: "get",
  });
}
// 根据工序信息获取加工工序
export function getByProcess(query) {
  return request({
    url: "/production_process/get_by_process",
    method: "get",
    params: query,
  });
}
// 编辑加工工序
export function editProcess(data) {
  return request({
    url: "/production_process/save",
    method: "post",
    data,
  });
}

// 删除加工工序
export function deleteProcess(data) {
  return request({
    url: "/production_process/delete",
    method: "post",
    data,
  });
}

// 获取所有设备
export function getAllDevice() {
  return request({
    url: "/production_device/get_all",
    method: "get",
  });
}

// 获取所有设备
export function equipment_status_dashboard(data) {
  return request({
    url: "/data_report/equipment_status_dashboard",
    method: "get",
    data,
  });
}
// 分页获取设备
export function production_device_list(data) {
  return request({
    url: "/production_device/list",
    method: "post",
    data,
  });
}

// 根据站点获取设备
export function currentSiteDeviceList(data) {
  return request({
    url: "/production_device/current_site_device_list",
    method: "post",
    data,
  });
}
// 根据设备编号获取设备
export function getByIdProductionDevice(query) {
  return request({
    url: "/production_device/get_by_id",
    method: "get",
    params: query,
  });
}

// 编辑设备
// export function editDevice(data) {
//   return request({
//     url: "/production_device/save",
//     method: "post",
//     data,
//   });
// }

// 新增设备
export function AddDevice(data) {
  return request({
    url: "/production_device/add",
    method: "post",
    data,
  });
}

// 更新设备
export function UpdateDevice(data) {
  return request({
    url: "/production_device/update",
    method: "post",
    data,
  });
}

// 删除设备
export function deleteDevice(data) {
  return request({
    url: "/production_device/delete",
    method: "post",
    data,
  });
}

// 获取所有资源组
export function getAllResource() {
  return request({
    url: "/production_resource/get_all",
    method: "get",
  });
}

// 新增资源组
export function editResource(data) {
  return request({
    url: "/production_resource/add",
    method: "post",
    data,
  });
}

// 删除资源组
export function deleteResource(data) {
  return request({
    url: "/production_resource/delete",
    method: "post",
    data,
  });
}

// 编辑资源组成员
export function editResourceMember(data) {
  return request({
    url: "/production_resource/save_resource_member",
    method: "post",
    data,
  });
}

// 获取资源组成员
export function getResourceMember(query) {
  console.log(query, 123456465);
  return request({
    url: "/production_resource/get_resource_member",
    method: "get",
    params: query,
  });
}

// 获取工厂日历
export function getCalendar() {
  return request({
    url: "/factory_calendar/List",
    method: "get",
  });
}

// 更新工厂日历状态
export function editCalendarState(data) {
  return request({
    url: "/factory_calendar/set_state",
    method: "post",
    data,
  });
}

// 新增工厂日历
export function addCalendar(data) {
  return request({
    url: "/factory_calendar/save",
    method: "post",
    data,
  });
}

// 删除工厂日历
export function deleteCalendar(data) {
  return request({
    url: "/factory_calendar/delete",
    method: "post",
    data,
  });
}
// 获取零件工艺模板
export function getAllProcessTemplate() {
  return request({
    url: "/part_process_template/get_all",
    method: "get",
  });
}
// 删除工序模板
export function deleteProcessTemplate(data) {
  return request({
    url: "/part_process_template/delete",
    method: "post",
    data,
  });
}

// 编辑工序模板
export function saveProcessTemplate(data) {
  return request({
    url: "/part_process_template/save",
    method: "post",
    data,
  });
}

// 获取钳工收料记录
export function RCVRecordList(data){
  return request({
    url: "/production_assy/rcv_record/list",
    method: "post",
    data,
  })
}
// 保存钳工收料记录
export function saveRCVRecord(data){
  return request({
    url: "/production_assy/rcv_record/save",
    method: "post",
    data,
  })
}
