/*
 * @Author: H.
 * @Date: 2021-11-09 15:40:31
 * @LastEditTime: 2022-01-05 09:31:13
 * @Description: 公司信息
 */

import request from "@/utils/request";

// 获取公司信息

export function getAll() {
  return request({
    url: "/company_info/get",
    method: "get",
  });
}

// 新增公司信息;
// export function addCompany(data) {
//   return request({
//     url: "/company_info/save",
//     method: "post",
//     data,
//   });
// }

// 编辑公司信息;
export function editCompany(data) {
  return request({
    url: "/company_info/save",
    method: "post",
    data,
  });
}
