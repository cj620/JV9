/*
 * @Author: H.
 * @Date: 2021-12-06 08:47:16
 * @LastEditTime: 2021-12-06 08:48:33
 * @Description:
 */
import request from "@/utils/request";

// 结存汇总
export function getStockRecord(data) {
  return request({
    url: "/stock_record/list",
    method: "post",
    data,
  });
}
