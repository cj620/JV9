/*
 * @Author: C.
 * @Date: 2021-09-27 10:59:10
 * @LastEditTime: 2021-12-20 16:17:32
 * @Description: file content
 */
/*
 * @Author: C.
 * @Date: 2021-08-10 08:54:34
 * @LastEditTime: 2021-08-10 14:33:24
 * @Description: file content
 */
import request from '@/utils/request'

// 保存打印模板
export function savePrintTemplate (data) {
  return request({
    url: '/print_template/save',
    method: 'post',
    data
  })
}
// 获取打印模板
export function ListByCategory (category) {
  return request({
    url: '/print_template/list?category='+category,
    method: 'get',
  })
}
// 删除打印模板/
export function DelById (templateId) {
  return request({
    url: '/print_template/del/?templateId='+templateId,
    method: 'get',
  })
}