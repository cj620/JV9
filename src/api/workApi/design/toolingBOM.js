import request from "@/utils/request";
// 模具BOM列表
export function getPartBomById(query) {
  return request({
    url: "/tooling/get_part_bom_by_id",
    method: "get",
    params:query,
  });
}
//保存零件清单
export function savePartBom(data) {
  return request({
    url: "/tooling/save_part_bom",
    method: "post",
    data,
  });
}
//确认是否已提交过物料需求
export function confirmSubmitMaterialRequirement(data) {
  return request({
    url: "/tooling/confirm_submit_material_requirement",
    method: "post",
    data,
  });
}
//获取模具关联任务信息
export function toolingTaskInfoList(data) {
  return request({
    url: "/tooling/tooling_task_info_list",
    method: "post",
    data,
  });
}
//自动对照物料
export function autoMatchMaterials(data) {
  return request({
    url: "/tooling/auto_match_materials",
    method: "post",
    data
  });
}
//同步零件信息
export function synchronizePart(data) {
  return request({
    url: "/tooling/synchronize_part",
    method: "post",
    data
  });
}
//根据零件获取工艺信息
export function getPartProcess(query) {
  return request({
    url: "/tooling/get_part_process",
    method: "get",
    params:query,
  });
}
//保存零件获取工艺信息
export function savePartProcess(data) {
  return request({
    url: "/tooling/save_part_process",
    method: "post",
    data,
  });
}
//获取零件清单，电极清单
export function bomList(data) {
  return request({
    url: "/tooling/bom_list",
    method: "post",
    data,
  });
}
//修改级别
export function update_bom_part_level(data) {
  return request({
    url: "/tooling/update_bom_part_level",
    method: "post",
    data,
  });
}

// 快速创建生产订单
export function quickly_create_task(data) {
  return request({
    url: "/tooling/quickly_create_task",
    method: "post",
    data,
    loading: true,
  });
}

//修改级别
export function synchronize_material_state(data) {
  return request({
    url: "/tooling/synchronize_material_state",
    method: "post",
    data,
  });
}
