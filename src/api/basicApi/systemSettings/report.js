/*
 * @Author: H.
 * @Date: 2022-01-18 10:44:29
 * @LastEditTime: 2022-01-18 10:44:29
 * @Description:
 */

import request from "@/utils/request";

// 保存打印模板
export function MoldProgressReport(data) {
  return request({
    url: "/data_report/tooling_progress",
    method: "post",
    data,
  });
}
