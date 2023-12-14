import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";

import request from "@/utils/request";
const API = apiGenPlugin("assets_device_maintenance_plan", apiType.COMMON);
export { API };

// 保养方案列表
export function assets_device_maintenance_plan_list(data) {
    return request({
        url: "/assets_device_maintenance_plan/list",
        method: "post",
        data,
    });
}
// 保养方案删除
export function assets_device_maintenance_plan_delete(data) {
    return request({
        url: "/assets_device_maintenance_plan/delete",
        method: "post",
        data,
    });
}

// 保养方案保存
export function assets_device_maintenance_plan_save(data) {
    return request({
        url: "/assets_device_maintenance_plan/save",
        method: "post",
        data,
    });
}

// 保养方案详情
export function assets_device_maintenance_plan_get(query) {
    return request({
        url: "/assets_device_maintenance_plan/get",
        method: "get",
        params: query,
    });
}

// 保养方案编辑状态
export function assets_device_maintenance_plan_update_state(data) {
    return request({
        url: "/assets_device_maintenance_plan/update_state",
        method: "post",
        data,
    })
}
