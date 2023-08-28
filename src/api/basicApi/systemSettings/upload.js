/*
 * @Author: 勿忘 208760845@qq.com
 * @Date: 2022-06-03 10:59:34
 * @LastEditors: 勿忘 208760845@qq.com
 * @LastEditTime: 2022-12-01 15:54:36
 * @FilePath: \jv-mms-v9-front\src\api\basicApi\systemSettings\upload.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/utils/request";
//文件上传模块

//上传文件接口
export function uploadFiles(data) {
  return request({
    url: "/files/upload_files",
    method: "post",
    data,
    loading:true
  });
}


//根据单据编号获取附件列表
export function getBillFile(query) {
  return request({
    url: "/file_attachment/get",
    method: "get",
    params: query
  });
}
//下载附件
export function DownFile(query) {
  return request({
    url: "/files/Down_file",
    method: "post",
    params: query,
    loading:true
  });
}

//修改文件所有者
export function update_file_owner(data) {
  return request({
    url: "/sys/update_file_owner",
    method: "post",
    data
  });
}
