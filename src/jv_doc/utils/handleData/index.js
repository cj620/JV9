/*
 * @Author: C.
 * @Date: 2021-09-27 10:39:28
 * @LastEditTime: 2021-12-31 16:57:38
 * @Description: file content
 */

// import { string } from "_clipboard@2.0.4@clipboard";

// 金额过滤器
export const amountFormat = (val) => {
  if (String(val) == "") return "";
  //金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
  var str = Number(val).toFixed(2) + "";
  var intSum = str
    .substring(0, str.indexOf("."))
    .replace(/\B(?=(?:\d{3})+$)/g, ","); //取到整数部分
  var dot = str.substring(str.length, str.indexOf(".")); //取到小数部分搜索
  var ret = intSum + dot;
  return ret;
};

export const thousandthFormat = (val) => {
  if (String(val) == "") return "";
  //金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
  var str = Number(val).toFixed(2) + "";
  var intSum = str
    .substring(0, str.indexOf("."))
    .replace(/\B(?=(?:\d{3})+$)/g, ","); //取到整数部分
  var ret = intSum;
  return ret;
};
// 金额反解
export const amount2Number = (str) => {
  if (!str) return 0;
  return Number(str.replace(/,/g, ""));
};
/**
 * @description:  模板转换合并 将targetList中的数据项 转换成tem模板字段格式 剪除非模板的字段
 * @param {Object} tem
 * @param {Array} targetList
 * @return {Array}
 */
export function temMerge(tem, targetList) {
  if (targetList.length == 0) return [];
  let result = [];
  let propMap = Object.keys(tem);
  targetList.forEach((el) => {
    let obj = {};
    propMap.forEach((key) => {
      if (el[key]) {
        obj[key] = el[key];
      } else {
        obj[key] = tem[key];
      }
    });
    result.push(obj);
  });
  return result;
}

// 百分比转换
export const any2rate = (val) => {
  if (typeof val === "string" || typeof val == "number") {
    return Number(val).toFixed(2) + "%";
  } else {
    return "-";
  }
};
