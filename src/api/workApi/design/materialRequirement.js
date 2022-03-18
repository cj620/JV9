import { apiGenPlugin,apiType } from "@/jv_doc/utils/system/apiGenPlugin";
import request from "@/utils/request";
// 获取物料需求明细
function designMaterialRequirementItemList(data) {
  return request({
    url: "/design_material_requirement/item_list",
    method: "post",
    data,
  });
}
// 修改物料需求明细状态
function designMaterialRequirementUpdateItemState(data) {
  return request({
    url: "/design_material_requirement/update_item_state",
    method: "post",
    data,
  });
}
/*w物料需求*/
const API=apiGenPlugin('design_material_requirement',apiType.COMMON)
export {
  API,
designMaterialRequirementItemList,
  designMaterialRequirementUpdateItemState,
}
