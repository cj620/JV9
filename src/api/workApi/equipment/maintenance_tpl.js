/*
 * @Author: C. cj6209577@sina.com
 * @Date: 2022-05-30 15:30:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-02 17:08:38
 * @FilePath: \jvmmsv9-1front\src\api\workApi\equipment\maintenance.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// assets_device_maintenance
import { apiGenPlugin, apiType } from "@/jv_doc/utils/system/apiGenPlugin";
import request from "@/utils/request";
// 维护单
const API = apiGenPlugin("assets_device_maintenance_tpl", apiType.CURD);
export { API };

export function set_maintenance_tpl(data) {
  return request({
    url: "/assets_device/set_maintenance_tpl",
    method: "post",
    data,
  });
}