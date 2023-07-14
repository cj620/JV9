/*
 * @Author: C.
 * @Date: 2021-09-26 13:12:24
 * @LastEditTime: 2021-09-26 13:13:57
 * @Description: file content
 */
import axios from "axios";
import { getToken } from "@/utils/auth";
import { Message } from "element-ui";
export function getFileSize(size){
  let value = Number(size);
      if (size && !isNaN(value)) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];
        let index = 0;
        let k = value;
        if (value >= 1024) {
          while (k > 1024) {
            k = k / 1024;
            index++;
          }
        }
        return `${(k).toFixed(2)}${units[index]}`;
      }
      return '-';
}
export function getExtensionName(fullName){
  return fullName.split('.').pop().toLowerCase()
 }
 
 export function downLoad(
  config = {
    params: {},
    url: "/files/down_file",
    data: {},
    fileName: "下载文件",
  }
) {
  const {
    params = {},
    url = "/files/down_file",
    data = {},
    fileName = "下载文件",
  } = config;
  axios({
    baseURL: window.global_config.Base_Url + url,
    method: "post",
    responseType: "blob", // 服务器返回的数据类型
    params: params,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Ba " + getToken(),
    },
    data: data,
  }).then((res) => {
    // 此处有个坑。这里用content保存文件流，最初是content=res，但下载的test.xls里的内容如下图1，
    // 检查了下才发现，后端对文件流做了一层封装，所以将content指向res.data即可
    // 另外，流的转储属于浅拷贝，所以此处的content转储仅仅是便于理解，并没有实际作用=_=
    const { data, headers, status } = res;
    if (Reflect.has(headers, "downloaderrmsg")) {
      Message.error(decodeURI(headers.downloaderrmsg));
      return;
    }
    if (status !== 200) {
      Message.error("请求失败！请重试！");
      return;
    }
    const blob = new Blob([data]); // 构造一个blob对象来处理数据
    const fileRealName = decodeURI(headers.filename) || fileName; // 导出文件名
    // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
    // IE10以上支持blob但是依然不支持download
    if ("download" in document.createElement("a")) {
      // 支持a标签download的浏览器
      const link = document.createElement("a"); // 创建a标签
      link.download = fileRealName; // a标签添加属性
      link.style.display = "none";
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click(); // 执行下载
      URL.revokeObjectURL(link.href); // 释放url
      document.body.removeChild(link); // 释放标签
    } else {
      // 其他浏览器
      navigator.msSaveBlob(blob, fileName);
    }
  });
  // .catch((err) => {
  //   // console.log(err);
  //   // { MsgType, Msg }
  //   // console.log(params.PartNo + "bu");
  //   // responseFilter({
  //   //   MsgType: "error",
  //   //   Msg: `零件号不存在：${params.PartNo}`,
  //   // });
  // });
}
