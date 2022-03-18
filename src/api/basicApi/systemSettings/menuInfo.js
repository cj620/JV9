/*
 * @Author: your name
 * @Date: 2021-09-10 10:00:53
 * @LastEditTime: 2021-11-08 11:30:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-element-admin-master\src\api\menuInfo\index.js
 */
import request from '@/utils/request'

export function getMenuList() {
  return request({
    url: '/sys/menuFuntion',
    method: 'get'
  })
}
