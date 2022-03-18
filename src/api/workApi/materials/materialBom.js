import request from '@/utils/request'
//物料清单的接口
//获取所有物料清单
export function bomList(data) {
  return request({
    url: '/ba_bom/list',
    method: 'post',
    data: data
  })
}
//保存物料清单
export function bomSave(data) {
  return request({
    url: '/ba_bom/save',
    method: 'post',
    data: data
  })
}
//根据Id获取物料清单
export function bomGetById(Id) {
  return request({
    url: '/ba_bom/get_by_id?id=' + Id,
    method: 'get'
  })
}
//获取所有规格
export function bomDelete(data) {
  return request({
    url: '/ba_bom/delete',
    method: 'post',
    data: data
  })
}
