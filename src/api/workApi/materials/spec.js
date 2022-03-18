import request from '@/utils/request'
//规格模块的接口
//获取所有规格
export function specList(data) {
  return request({
    url: '/ba_material_spec_template/list',
    method: 'get',
    data: data
  })
}
//编辑规格
export function saveSpec(data) {
  return request({
    url: '/ba_material_spec_template/save',
    method: 'post',
    data: data
  })
}
//编辑规格
export function deleteSpec(data) {
  return request({
    url: '/ba_material_spec_template/delete',
    method: 'post',
    data: data
  })
}
//排序规格
export function updateOrderNoSpec(data) {
  return request({
    url: '/ba_material_spec_template/update_order_no',
    method: 'post',
    data: data
  })
}
