/*
 * @Author: your name
 * @Date: 2021-11-26 13:56:09
 * @LastEditTime: 2022-02-10 10:12:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\api\workApi\project\mouldDetail.js
 */
import request from "@/utils/request";

// 获取模具详情
export function getToolingDetail(data) {
  return request({
    url: "/project_info/get_tooling_details",
    method: "get",
    params:data
  });
}
// 删除模具动态
export function delete_project_dynamic(data) {
  return request({
    url: "/project_info/delete_project_dynamic",
    method: "post",
    data,
  });
}
// 保存模具动态
export function save_project_dynamic(data) {
  return request({
    url: "/project_info/save_project_dynamic",
    method: "post",
    data,
  });
}

// gantt
export function project_gantt_progress(data) {
  return request({
    url: "/project_info/project_gantt_progress",
    method: "get",
    params:data
  });
}

// 保存技术要求
export function save_tooling_specs(data) {
  return request({
    url: "/project_info/save_tooling_specs",
    method: "post",
    data,
  });
}

// 获取上一次技术要求
export function get_tooling_spec_tpl() {
  return request({
    url: "/project_info/get_tooling_spec_tpl",
    method: "get",
  });
}
// 生成分享链接
export function create_data_sharing(data) {
  return request({
    url: "/project_info/create_data_sharing",
    method: "post",
    data,
  });
}