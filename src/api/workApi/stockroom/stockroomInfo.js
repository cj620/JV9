import request from "@/utils/request";
/*基础数据仓库*/

// 仓库列表
export function getStockroomList(data) {
  return request({
    url: "/stockroom/get_all",
    method: "get",
    data,
  });
}
// 新增仓库
export function addStockroom(data) {
  return request({
    url: "/stockroom/add",
    method: "post",
    data,
  });
}
// 删除仓库
export function deleteStockroom(data) {
  return request({
    url: "/stockroom/delete",
    method: "post",
    data,
  });
}
