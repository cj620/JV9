/*
 * @Author: H.
 * @Date: 2021-10-29 08:37:23
 * @LastEditTime: 2024-07-02 16:47:08
 * @Description:
 */
import request from "@/utils/request";

// 删除角色
export function type_content_list(data) {
  return request({
    url: "/type_content/list",
    method: "post",
    data,
  });
}
