/*
 * @Author: C.
 * @Date: 2021-09-27 10:59:10
 * @LastEditTime: 2023-08-02 10:59:29
 * @Description: file content
 */
/*
 * @Author: C.
 * @Date: 2021-08-10 08:54:34
 * @LastEditTime: 2021-08-10 14:33:24
 * @Description: file content
 */
import request from "@/utils/request";

// 保存打印模板
export function user_notification_list(data) {
  return request({
    url: "/user_notification/list",
    method: "post",
    data,
  });
}
