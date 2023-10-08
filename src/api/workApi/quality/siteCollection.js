import request from "@/utils/request";

// 检验入站
export function processingInspectionInSite(data) {
  return request({
    url: "/site_collection/processing_inspection_in_site",
    method: "post",
    data,
  });
}
// 检验合格
export function processingInspectionQualified(data) {
  return request({
    url: "/site_collection/processing_inspection_qualified",
    method: "post",
    data,
  });
}
// 待检验列表
export function listInspectionTobechecked(data) {
  return request({
    url: "/site_collection/list_inspection_tobechecked",
    method: "post",
    data,
  });
}
// 免检
export function site_collection_inspection_arrival(data) {
  return request({
    url: "/site_collection/inspection_arrival",
    method: "post",
    data,
  });
}
//编辑工时报工
export function site_collection_programing_time_collection(data){
  return request({
    url: "/site_collection/programing_time_collection",
    method: "post",
    data,
  })
}
// 报工记录报表
export function site_collection_production_task_record(data){
  return request({
    url: "/site_collection/production_task_record",
    method: "post",
    data,
  })
}
