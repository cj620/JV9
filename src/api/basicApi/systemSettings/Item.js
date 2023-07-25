/*
 * @Author: your name
 * @Date: 2021-10-29 14:06:27
 * @LastEditTime: 2022-10-27 17:24:43
 * @LastEditors: 勿忘 208760845@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \JvMmsV9Front\src\api\basicApi\systemSettings\Item.js
 */
import request from '@/utils/request'
//物料信息模块的接口
//获取所有物料信息
export function itemList(data) {
  return request({
    url: '/item/list',
    method: 'post',
    data: data
  })
}
//根据Id物料信息
export function getByIdItem(ItemId) {
  return request({
    url: '/item/get_by_id?ItemId='+ItemId,
    method: 'get',

  })
}
//编辑物料信息
export function saveItem(data) {
  return request({
    url: '/item/save',
    method: 'post',
    data: data
  })
}
//删除物料信息
export function deleteItem(data) {
  return request({
    url: '/item/delete',
    method: 'post',
    data: data
  })
}


//删除物料信息
export function updateStateItem(data) {
  return request({
    url: '/item/update_state',
    method: 'post',
    data: data
  })
}

//恢复物料信息
export function item_Recovery(data) {
  return request({
    url: '/item/Recovery',
    method: 'post',
    data: data
  })
}




//获取物料属性
export function materialInfoAttribute(data) {
  return request({
    url: '/ba_material_info/get_attribute',
    method: 'get',
    data: data
  })
}

//批量保存物料信息
export function batchInsertMaterialInfo(data) {
  return request({
    url: '/item/batch_add',
    method: 'post',
    data
  })
}

//获取库位信息
export function getInventoryUnit(query) {
  return request({
    url: '/ba_material_info/get_inventory_unit',
    method: 'get',
    params: query
  })
}
//获取供应商信息
export function getSupplier(query) {
  return request({
    url: '/ba_material_info/get_supplier',
    method: 'get',
    params: query
  })
}
//获取仓库信息
export function getWarehouse(query) {
  return request({
    url: '/ba_material_info/get_warehouse',
    method: 'get',
    params: query
  })
}
//获取计划策略信息
export function getPlanStrategy(query) {
  return request({
    url: '/ba_material_info/get_planStrategy',
    method: 'get',
    params: query
  })
}
// 编辑模具基础信息
export function saveToolingBasis(data) {
  return request({
    url: '/project_info/save_tooling_basis',
    method: 'post',
    data
  })
}