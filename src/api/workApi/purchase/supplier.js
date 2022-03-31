/*
 * @Author: H.
 * @Date: 2021-11-10 11:01:42
 * @LastEditTime: 2022-03-31 16:32:36
 * @Description:供应商
 */

import request from "@/utils/request";

// 获取供应商列表
export function getSupplierList(data) {
  return request({
    url: "/purchase_supplier/list",
    method: "post",
    data,
  });
}

// 获取所有供应商
export function getAllSupplier() {
  return request({
    url: "/purchase_supplier/get_all",
    method: "get",
  });
}

// 获取供应商详情
export function getSupplierDetails(query) {
  return request({
    url: "/purchase_supplier/get_by_id",
    method: "get",
    params: query,
  });
}

// 新增供应商
export function addSupplier(data) {
  return request({
    url: "/purchase_supplier/add",
    method: "post",
    data,
  });
}

// 修改供应商
export function purchase_supplier_batch_import(data) {
  return request({
    url: "/purchase_supplier/batch_import",
    method: "post",
    data,
  });
}
// 导入供应商
export function editSupplier(data) {
  return request({
    url: "/purchase_supplier/update",
    method: "post",
    data,
  });
}
// 删除供应商
export function deleteSupplier(data) {
  return request({
    url: "/purchase_supplier/delete",
    method: "post",
    data,
  });
}
