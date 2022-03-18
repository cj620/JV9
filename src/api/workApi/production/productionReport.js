/*
 * @Author: H.
 * @Date: 2021-11-18 14:41:33
 * @LastEditTime: 2021-11-29 16:41:46
 * @Description: 生产模块报工
 */

import request from "@/utils/request";

// 站点匹配工序列表
export function siteMatchingProcessList(data) {
  return request({
    url: "/site_collection/site_matching_process_list",
    method: "post",
    data
  });
}

// 获取当前工单的数量
export function get_received_quantity(data) {
  return request({
    url: "/site_collection/get_received_quantity",
    method: "post",
    data
  });
}

// 获取站点任务单列表
export function currentSiteList(data) {
  return request({
    url: "/site_collection/current_site_list",
    method: "post",
    data
  });
}
// 入站
export function inSite(data) {
  return request({
    url: "/site_collection/in_site",
    method: "post",
    data,
    loading:true
  });
}
// 上机
export function upMachineCollection(data) {
  return request({
    url: "/site_collection/up_machine_collection",
    method: "post",
    data,
    loading:true
  });
}
// 下机
export function downMachineCollection(data) {
  return request({
    url: "/site_collection/down_machine_collection",
    method: "post",
    data,
    loading:true
  });
}
// 根据工序Id获取工序内容和图片
export function get_process(query) {
  return request({
    url: "/production_task/get_process",
    method: "get",
    params:query
  });
}
