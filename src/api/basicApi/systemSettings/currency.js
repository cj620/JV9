/*
 * @Author: your name
 * @Date: 2021-11-01 15:54:15
 * @LastEditTime: 2021-11-01 16:52:53
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \JvMmsV9Front\src\api\basicApi\systemSettings\currency.js
 */
import request from "@/utils/request";

// 获取所有货币信息
export function getAll(data) {
  return request({
    url: "/currency/get_all",
    method: "get",
    data
  });
}
// 编辑所有货币信息
export function addCurrency(data) {
  return request({
    url: "/currency/add",
    method: "post",
    data,

  });
}
// 删除货币信息
export function deleteCurrency(data) {
  return request({
    url: "/currency/delete",
    method: "post",
    data,
       
  });
}
