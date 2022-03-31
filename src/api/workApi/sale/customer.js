/*
 * @Author: H.
 * @Date: 2021-11-04 14:49:56
 * @LastEditTime: 2022-03-31 16:18:08
 * @Description:
 */
import request from "@/utils/request";

// 获取销售客户列表
export function getSalesCustomerList(data) {
  return request({
    url: "/sales_customer/list",
    method: "post",
    data,
  });
}
// 不分页获取销售客户列表
export function getAllSalesCustomer(data) {
  return request({
    url: "/sales_customer/get_all",
    method: "get",
    data,
  });
}
// 新增销售客户
export function addSalesCustomer(data) {
  return request({
    url: "/sales_customer/add",
    method: "post",
    data,
  });
}

// 修改销售客户
export function editSalesCustomer(data) {
  return request({
    url: "/sales_customer/update",
    method: "post",
    data,
  });
}
// 导入销售客户
export function sales_customer_batch_import(data) {
  return request({
    url: "/sales_customer/batch_import",
    method: "post",
    data,
  });
}

// 删除销售客户
export function deleteSalesCustomer(data) {
  return request({
    url: "/sales_customer/delete",
    method: "post",
    data,
  });
}

export function getCustomer(query) {
  return request({
    url: "/sales_customer/get_by_id",
    method: "get",
    params: query,
  });
}

// 获取销售客户联系人信息
export function get_contact_info(data) {
  return request({
    url: "/sales_customer/get_contact_info",
    method: "post",
    data,
  });
}
// 编辑销售客户联系人信息
export function save_contact_info(data) {
  return request({
    url: "/sales_customer/save_contact_info",
    method: "post",
    data,
  });
}