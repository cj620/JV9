/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2022-03-02 14:42:27
 * @Description:
 */
import request from "@/utils/request";

// 获取项目列表
export function getProjectBillList(data) {
  return request({
    url: "/project_info/list",
    method: "post",
  data,
  });
}
// 模糊查询项目
export function getProjectQuery(data) {
  return request({
    url: "/project_info/query",
    method: "post",
    data
  });
}
// 根据项目ID获取零件列表
export function getPartById(data) {
  return request({
    url: "/project_info/list_part_by_tooling_no",
    method: "get",
    params:data
  });
}
// 根据项目ID获取分享零件列表
export function list_part_by_tooling_no(data) {
  return request({
    url: "/project_data_sharing/list_part_by_tooling_no",
    method: "get",
    params:data
  });
}
// 保存项目
export function saveProjectInfo(data) {
  return request({
    url: "/project_info/save",
    method: "post",
    data,
  });
}


// 根据项目ID获取项目人员
export function project_worker_progress(data) {
  return request({
    url: "/project_info/project_worker_progress",
    method: "get",
    params:data
  });
}

// 根据项目ID获取项目人员
export function project_data_sharing_list(data) {
  return request({
    url: "/project_data_sharing/list",
    method: "get",
    params:data
  });
}

// 项目管理基础信息列表页  
export function get_basic_info_list(data) {
  return request({
    url: "/project_info/basic_info_list",
    method: "post",
    data
  });
}
// 删除项目
export function projectDelete(data) {
  return request({
    url: "/project_info/delete",
    method: "post",
    data
  });
}