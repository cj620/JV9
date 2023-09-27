/*
 * @Author: your name
 * @Date: 2021-11-23 17:10:14
 * @LastEditTime: 2021-11-23 17:12:17
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\api\workApi\design\designTask.js
 */
import request from "@/utils/request";
//从erp获取物料
export function adaptor_synchronize_erp_material(data) {
  return request({
    url: "/adaptor/synchronize_erp_material",
    method: "post",
    data,
    loading: true,
  });
}
//同步电极物料需求
export function adaptor_synchronize_electrode_demand(data) {
  return request({
    url: "/adaptor/synchronize_electrode_demand",
    method: "post",
    data,
  })
}
