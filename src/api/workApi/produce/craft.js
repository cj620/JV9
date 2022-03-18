import request from "@/utils/request";

// 工序列表
export function getCraftList(data) {
  return request({
    url: "/ba_craft_info/list",
    method: "post",
    data
  });
}

// 编辑工序
export function editCraft(data) {
  return request({
    url: "/ba_craft_info/save",
    method: "post",
    data
  });
}

// 删除工序
export function deleteCraft(data) {
  return request({
    url: "/ba_craft_info/delete",
    method: "post",
    data
  });
}

//获取工作中心
export function getWorkCenter() {
  return request({
    url: "/ba_craft_info/get_workCenter",
    method: "get"
  });
}

//获取工作中心
export function getCarftDetails(id) {
  return request({
    url: "/ba_craft_info/get_by_id?id=" + id,
    method: "get"
  });
}
