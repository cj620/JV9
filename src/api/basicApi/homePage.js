/*
 * @Author: H.
 * @Date: 2021-12-22 09:29:28
 * @LastEditTime: 2021-12-22 09:29:29
 * @Description:
 */
import request from "@/utils/request";

export function getBoardData() {
  return request({
    url: "/home_page/board_data",
    method: "get",
  });
}
