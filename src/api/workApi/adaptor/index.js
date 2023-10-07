/*
 * @Author: DESKTOP-2CGOASQ\JvUser 208760845@qq.com
 * @Date: 2022-07-05 20:00:18
 * @LastEditors: DESKTOP-2CGOASQ\JvUser 208760845@qq.com
 * @LastEditTime: 2022-08-11 09:21:05
 * @FilePath: \jvmmsv9-1front\src\api\workApi\adaptor\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/utils/request";
// 获取物料
export function adaptor_synchronize_erp_material(data) {
  return request({
    url: "/adaptor/synchronize_erp_material",
    method: "post",
    loading:true,
    data
  });
}
// 对接威科贝的系统  获取标签
// export function adaptor_query_erp_in_item(data) {
//   return request({
//     url: "/vkbadaptor/query_erp_in_item",
//     method: "post",
//     data
//   });
// }
