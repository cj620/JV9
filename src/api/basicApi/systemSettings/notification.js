/*
 * @Author: C.
 * @Date: 2021-09-27 10:59:10
 * @LastEditTime: 2023-08-03 15:06:25
 * @Description: file content
 */
/*
 * @Author: C.
 * @Date: 2021-08-10 08:54:34
 * @LastEditTime: 2021-08-10 14:33:24
 * @Description: file content
 */
import request from "@/utils/request";

// 获取消息列表
export function user_notification_list(data) {
  return request({
    url: "/user_notification/list",
    method: "post",
    data,
  });
}
export function mark_as_read(data) {
  return request({
    url: "/user_notification/mark_as_read",
    method: "post",
    data,
  });
}
