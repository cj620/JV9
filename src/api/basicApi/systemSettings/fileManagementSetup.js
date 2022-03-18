import request from "@/utils/request";

// 获取文件权限设置
export function GetSy_DwgDefaultDirectory() {
  return request({
    url: "/user/GetSy_DwgDefaultDirectory",
    method: "get",
  });
}
// 编辑文件权限设置
export function SaveSy_DwgDefaultDirectory(data) {
  return request({
    url: "/user/SaveSy_DwgDefaultDirectory",
    method: "post",
    data
  });
}


// 删除文件权限设置
export function DeleteSy_DwgDefaultDirectoryByIds(data) {
  return request({
    url: "/user/DeleteSy_DwgDefaultDirectoryByIds",
    method: "post",
    data
  });
}
