import request from "@/utils/request";
//文件上传模块

//上传文件接口
export function uploadFiles(data) {
  return request({
    url: "/files/upload_files",
    method: "post",
    data,
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
    params: query
  });
}
