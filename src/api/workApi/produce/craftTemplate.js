import request from "@/utils/request";

// 获取工艺模板列表
export function getCraftTemplateList(data) {
  return request({
    url: "/ba_craft_template/list",
    method: "post",
    data
  });
}

// 删除工艺模板
export function deleteCraftTemplateList(data) {
  return request({
    url: "/ba_craft_template/delete",
    method: "post",
    data
  });
}

// 编辑工艺模板
export function editCraftTemplateList(data) {
  return request({
    url: "/ba_craft_template/save",
    method: "post",
    data
  });
}

//获取工艺模板详情
export function getCarftTemplateDetails(id) {
  return request({
    url: "/ba_craft_template/get_by_id?id=" + id,
    method: "get"
  });
}
