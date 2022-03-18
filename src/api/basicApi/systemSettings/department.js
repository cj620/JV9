/*
 * @Author: your name
 * @Date: 2021-10-28 13:27:35
 * @LastEditTime: 2021-11-02 13:08:59
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \JvMmsV9Front\src\api\basicApi\systemSettings\department.js
 */
import request from "@/utils/request";

// 获取所有部门信息
export function getDepartmentList(data) {
  return request({
    url: "/department/get_all",
    method: "get",
    data
  });
}

// 编辑部门信息
export function editDepartment(data) {
  return request({
    url: "/department/add",
    method: "post",
    data
  });
}

// 删除部门
export function deleteDepartment(data) {
  return request({
    url: "/department/delete",
    method: "post",
    data
  });
}
