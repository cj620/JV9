/*
 * @Author: H.
 * @Date: 2021-11-24 10:29:38
 * @LastEditTime: 2021-11-25 09:11:20
 * @Description:
 */

import request from "@/utils/request";

// 获取所有项目工序
export function getAllProjectProcess(data) {
  return request({
    url: "/project_process/get_all",
    method: "get",
    params: data,
  });
}

// 根据项目名称获取项目信息
export function project_process_get_by_name(data) {
  return request({
    url: "/project_process/get_by_name",
    method: "get",
    params: data,
  });
}

// 根据项目名称获取项目信息
export function project_process_get_by_type(data) {
  return request({
    url: "/project_process/get_by_type",
    method: "get",
    params: data,
  });
}

// 编辑项目工序
export function editProjectProcess(data) {
  return request({
    url: "/project_process/save",
    method: "post",
    data,
  });
}

// 删除项目工序
export function deleteProjectProcess(data) {
  return request({
    url: "/project_process/delete",
    method: "post",
    data,
  });
}

// 删除项目工序
export function updateSort(data) {
  return request({
    url: "/project_process/update_sort",
    method: "post",
    data,
  });
}

// 获取所有项目工序模板
export function getAllProjectProcessTemplate() {
  return request({
    url: "/project_process_template/get_all",
    method: "get",
  });
}

// 保存项目工序模板
export function saveProjectProcessTemplate(data) {
  return request({
    url: "/project_process_template/save",
    method: "post",
    data,
  });
}

// 删除项目工序模板
export function deleteProjectProcessTemplate(data) {
  return request({
    url: "/project_process_template/delete",
    method: "post",
    data,
  });
}
