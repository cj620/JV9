import request from "@/utils/request";

// 检验入站
export function processingInspectionInSite(data) {
  return request({
    url: "/site_collection/processing_inspection_in_site",
    method: "post",
    data
  });
}
// 检验合格
export function processingInspectionQualified(data) {
  return request({
    url: "/site_collection/processing_inspection_qualified",
    method: "post",
    data
  });
}
// 待检验列表
export function listInspectionTobechecked(data) {
  return request({
    url: "/site_collection/list_inspection_tobechecked",
    method: "post",
    data
  });
}
