/*
 * @Author: your name
 * @Date: 2021-11-23 17:10:14
 * @LastEditTime: 2021-11-23 17:12:17
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\api\workApi\design\designTask.js
 */
import request from "@/utils/request";
//获取变成或者设变任务
export function design_or_program_task_list(data) {
  return request({
    url: "/design_or_program_task/list",
    method: "post",
    data,
    loading: true,
  });
}
