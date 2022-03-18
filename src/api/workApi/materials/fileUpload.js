import request from "@/utils/request";
//上传文件模块的接口
//上传图片
export function uploadImage(data) {
  return request({
    url: "/files/upload_image",
    method: "post",
    data: data
  });
}
//上传图片
export function uploadSingleFile(data) {
  return request({
    url: "/file_service/upload_single_file",
    method: "post",
    data: data
  });
}
