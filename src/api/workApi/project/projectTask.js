/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2022-01-05 10:16:18
 * @Description:
 */
// import request from "@/utils/request";
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
import request from "@/utils/request";
// 项目任务
const API = apiGenPlugin("project_task", apiType.COMMON);
export { API };

// 获取项目列表
export function getProject_task_log(data) {
  return request({
    url: "/project_task_log/list",
    method: "post",
    data,
  });
}

// 获取报工记录
export function getJobRecord(query) {
  return request({
    url: "/project_task_log/get",
    method: "get",
    params: query,
  });
}
// 完成项目任务
export function successProjectTask(data) {
  return request({
    url: "/project_task/completed",
    method: "post",
    data,
  });
}
