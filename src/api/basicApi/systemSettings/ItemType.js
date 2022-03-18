/*
 * @Author: your name
 * @Date: 2021-10-29 14:06:27
 * @LastEditTime: 2021-11-23 10:37:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JvMmsV9Front\src\api\basicApi\systemSettings\ItemType.js
 */
import request from "@/utils/request";
//物料类别的接口
//分页获取所有物料类别
export function itemTypeList(data) {
  return request({
    url: "/item_type/list",
    method: "post",
    data: data,
  });
}
//不分页获取所有物料类别
export function getAllItemType(data) {
  return request({
    url: "/item_type/get_all",
    method: "post",
    data: data,
  });
}
//编辑物料类别
export function addItemType(data) {
  return request({
    url: "/item_type/add",
    method: "post",
    data: data,
  });
}
//编辑物料类别
export function deleteMaterialCategory(data) {
  return request({
    url: "/item_type/delete",
    method: "post",
    data: data,
  });
}
