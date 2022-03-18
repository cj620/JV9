/*
 * @Author: H.
 * @Date: 2021-11-30 15:05:33
 * @LastEditTime: 2021-11-30 15:07:07
 * @Description: 检验记录api
 */

import request from "@/utils/request";

// 获取品质检验报表
export function dataReportQc(data) {
  return request({
    url: "/data_report/qc",
    method: "post",
    data,
  });
}
