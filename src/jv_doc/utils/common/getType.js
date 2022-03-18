/*
 * @Author: C.
 * @Date: 2022-02-25 11:33:17
 * @LastEditTime: 2022-02-25 11:37:21
 * @Description: file content
 */
export function getType(obj){
  // let type  = typeof obj;
  // if (type !== "object") {    // 先进行typeof判断，如果是基础数据类型，直接返回
  //   return type;
  // }
  // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1'); 
}