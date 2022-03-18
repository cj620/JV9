/*
 * @Author: your name
 * @Date: 2021-12-06 11:04:05
 * @LastEditTime: 2021-12-07 14:54:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\api\workApi\production\dataReport.js
 */
import request from "@/utils/request";

// 产能分析报表 {Month}
export function capacity_analysis(data) {
  return request({
    url: "/data_report/capacity_analysis",
    method: "post",
    data,
  });
}

// 产能分析报表-懒加载接口 {Month ProcessName}
export function capacity_analysis_items(data) {
  return request({
    url: "/data_report/capacity_analysis_items",
    method: "post",
    data,
  });
}

// 产能负荷报表 {Month}
export function load_analysis(data) {
  return request({
    url: "/data_report/load_analysis",
    method: "post",
    data,
  });
}

// 产能负荷报表-懒加载接口 {Month ProcessName}
export function load_analysis_items(data) {
  return request({
    url: "/data_report/load_analysis_items",
    method: "post",
    data,
  });
}

// 员工生产报表
export function getEmployeeWork(data) {
  return request({
    url: "/data_report/employee_work",
    method: "post",
    data,
  });
}

// 零件生产报表
export function getPartWork(data) {
  return request({
    url: "/data_report/part_work",
    method: "post",
    data,
  });
}
// 零件加工计划
export function partProcessingPlan(data) {
  return request({
    url: "/data_report/part_processing_plan",
    method: "post",
    data,
  });
}
