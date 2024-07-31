/*
 * @Author: C.
 * @Date: 2021-12-28 14:42:59
 * @LastEditTime: 2024-07-31 13:35:46
 * @Description: file content
 */
import request from "@/utils/request";

// X
export function production_blanking_list(data) {
  return request({
    url: "/project_blanking/list",
    method: "post",
    data,
  });
}
export function project_blanking_state_change(data) {
  return request({
    url: "/project_blanking/state_change",
    method: "post",
    data,
  });
}
