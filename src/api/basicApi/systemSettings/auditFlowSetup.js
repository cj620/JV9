/*
 * @Author: H.
 * @Date: 2021-11-05 14:26:36
 * @LastEditTime: 2023-07-13 15:50:20
 * @Description:
 */

import request from "@/utils/request";

// 获取单据信息
export function getAuditList() {
  return request({
    url: "/sys/audit/list_bill_info",
    method: "get",
  });
}

// 设置审核流
export function setAudit(data) {
  return request({
    url: "/sys/audit/set_audit_flow",
    method: "post",
    data,
  });
}

// 根据单据类型获取审核流
export function getUser(query) {
  return request({
    url: "/sys/audit/get_audit_flow_by_bill_key",
    method: "get",
    params: query,
  });
}
// 根据单号获取详情
export function getAuditProcessById(query) {
  return request({
    url: "/sys/audit/get_audit_flow_by_bill_id",
    method: "get",
    params: query,
  });
}

// 根据单据类型获取审核流
export function get_audit_flow_by_bill_key(query) {
  return request({
    url: "/sys/audit/get_audit_flow_by_bill_key",
    method: "get",
    params: query,
  });
}