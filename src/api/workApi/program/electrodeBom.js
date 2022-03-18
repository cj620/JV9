import request from "@/utils/request";
// 模具BOM列表
export function getPoleBomById(query) {
  return request({
    url: "/tooling/get_pole_bom_by_id",
    method: "get",
    params:query,
  });
}
// 模具BOM列表
export function savePoleBom(data) {
  return request({
    url: "/tooling/save_pole_bom",
    method: "post",
    data,
  });
}
