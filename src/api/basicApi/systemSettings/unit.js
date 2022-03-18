/*
 * @Author: your name
 * @Date: 2021-10-29 14:06:27
 * @LastEditTime: 2021-11-01 19:31:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JvMmsV9Front\src\api\basicApi\systemSettings\unit.js
 */
import request from '@/utils/request'
//单位模块的接口
//获取所有单位
export function getAllUnit(data) {
  return request({
    url: '/unit/get_all' ,
    method: 'post',
    data
  })
}
//编辑单位
export function saveUnit(data) {
  return request({
    url: '/unit/add',
    method: 'post',
    data: data
  })
}
//编辑单位
export function deleteUnit(data) {
  return request({
    url: '/unit/delete',
    method: 'post',
    data: data
  })
}
