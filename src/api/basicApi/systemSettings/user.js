/*
 * @Author: your name
 * @Date: 2021-09-09 18:53:00
 * @LastEditTime: 2022-10-20 10:42:40
 * @LastEditors: 勿忘 208760845@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \vue-element-admin-master\src\api\user.js
 */
import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/auth/login",
    method: "post",
    data,
  });
}

export function logout() {
  return request({
    url: "/auth/logout",
    method: "get",
  });
}

export function getInfo() {
  return request({
    url: "/user_data/myself",
    method: "get",
  });
}

// 不分页获取用户信息列表
export function getAllUserData(data) {
  return request({
    url: "/user_data/get_all",
    method: "get",
    data,
  });
}

// 获取用户信息列表
export function getUserInfoList(data) {
  return request({
    url: "/user_data/list",
    method: "post",
    data,
  });
}

// 编辑用户信息
export function editUserInfo(data) {
  return request({
    url: "/user_data/save",
    method: "post",
    data,
  });
}

// 导入用户信息
export function user_data_batch_import(data) {
  return request({
    url: "/user_data/batch_import",
    method: "post",
    data,
  });
}
export function deleteUserAccount(data) {
  return request({
    url: "/user_data/delete",
    method: "post",
    data,
  });
}

export function changePassword(data) {
  return request({
    url: "/user_data/update_password",
    method: "post",
    data,
  });
}

export function getUser(query) {
  return request({
    url: "/user_data/get_by_id",
    method: "get",
    params: query,
  });
}

//获取用户配置
export function getUserConfig(query) {
  return request({
    url: "/user_data/config/get",
    method: "get",
    params: query,
  });
}

// 获取所有用户配置
export function getAllUserConfig(query) {
  return request({
    url: "/user_data/config/list_all",
    method: "get",
    params: query,
  });
}

// 更新配置项
export function updateConfig(data) {
  return request({
    url: "/user_data/config/update",
    method: "post",
    data,
  });
}

// 我的任务
export function my_todo_task(data) {
  return request({
    url: "/home_page/my_todo_task",
    method: "post",
    data,
  });
}
// 我的任务
export function my_todo_audit(data) {
  return request({
    url: "/home_page/my_todo_audit",
    method: "post",
    data,
  });
}

// 我的任务
export function my_project_task_record(data) {
  return request({
    url: "/home_page/my_project_task_record",
    method: "post",
    data,
  });
}

// 我的任务
export function my_audit_record(data) {
  return request({
    url: "/home_page/my_audit_record",
    method: "post",
    data,
  });
}
// report_work
// 报工
export function report_work(data) {
  return request({
    url: "/project_task/report_work",
    method: "post",
    data,
  });
}

// 统一审核接口
export function unified_audit_bill(data) {
  return request({
    url: "/sys/unified_audit_bill",
    method: "post",
    data,
  });
}

// 获取用户日志列表
export function getUserLogList(data) {
  return request({
    url: "/user_log/list",
    method: "post",
    data,
  });
}

export function recoverUser(data) {
  return request({
    url: "/user_data/update_is_delete",
    method: "post",
    data,
  });
}



// 根据部门获取用户
export function get_by_department(query) {
  return request({
    url: "/user_data/get_by_department",
    method: "get",
    params: query,
  });
}
// 重置用户密码
export function user_data_reset_pwd(data) {
  return request({
    url: "/user_data/reset_pwd",
    method: "post",
    data,
  });
}
