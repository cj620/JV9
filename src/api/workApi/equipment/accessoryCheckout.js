import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";

import request from "@/utils/request";
// 备件领用单
const API = apiGenPlugin("assets_accessory_checkout", apiType.COMMON);
export { API };

// 备件领用单明细列表
export function getAccessoryCheckOutDetails(data) {
    return request({
        url: "/assets_accessory_checkout/item_list",
        method: "post",
        data,
    });
}
