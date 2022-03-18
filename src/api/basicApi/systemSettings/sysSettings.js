/*
 * @Author: H.
 * @Date: 2021-11-25 16:04:18
 * @LastEditTime: 2022-02-19 14:29:36
 * @Description:系统设置
 */

import request from "@/utils/request";

//获取所有角色信息
export function getAllSysConfig() {
  return request({
    url: "/sys/config/list_all",
    method: "get",
  });
}

export function sysConfigUpdate(data) {
  return request({
    url: "/sys/config/update",
    method: "post",
    data,
  });
}

// 查询统一单据

export function unified_qery_bill(data) {
  return request({
    url: "/sys/unified_query_bill",
    method: "post",
    data,
    loading:true
  });
}

// 获取所有编号规则
export function getAllNumberRules() {
  return request({
    url: "/number_rule/get_all",
    method: "get",
  });
}
// 更新编号规则
export function updateNumberRule(data) {
  return request({
    url: "/number_rule/update",
    method: "post",
    data,
  });
}
// 查询系统配置

export function batch_get(data) {
  return request({
    url: "/sys/config/batch_get",
    method: "post",
    data,
  });
}

export function getConfigKey(data) {
  return request({
    url: "/sys/config/get",
    method: "get",
    params:data
  });
}