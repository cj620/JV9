/*
 * @Author: your name
 * @Date: 2021-10-29 10:22:04
 * @LastEditTime: 2022-01-17 15:07:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \V9_Dev\src\jv_doc\class\utils\dataFormat.js
 */
import { amountFormat } from "@/jv_doc/utils/handleData";
import i18n from "@/i18n/i18n";
// 编辑表格的数据转换
export function source2format(source) {
  let _data = [];
  source.forEach((A) => {
    let valueItem = {};
    Object.keys(A).forEach((key) => {
      valueItem[key] = {
        value: A[key],
        edit: false,
      };
    });
    _data.push(valueItem);
  });
  return _data;
}
export function format2source(formatSource) {
  // 脱离格式化
  let _data = [];
  formatSource.forEach((A) => {
    let valueItem = {};
    Object.keys(A).forEach((key) => {
      // 这里是对编辑表格做的兼容 忽略row_index
      if (key != "row_index") {
        valueItem[key] = A[key].value;
      }
    });
    _data.push(valueItem);
  });
  return _data;
}
// [0,1,2,3] =>[0,1,2,3,4]
export function insertCol(target, count) {
  let newArr = target.map((item) => {
    return item + count;
  });
  if (count == 1) {
    newArr.unshift(0);
  } else if (count == 2) {
    newArr.unshift(1);
    newArr.unshift(0);
  }
  return newArr;
}
export function getTableSummaries(param, map) {
  const { columns, data } = param;
  const sums = new Array(columns.length).fill("");
  sums[0] = i18n.t("sale.Sa_Sum");
  map.forEach((mapItem) => {
    let find_index = columns.findIndex((col) => {
      return col.property == mapItem.prop;
    });
    sums[find_index] = data.reduce((prev, curr) => {
      const value = curr[mapItem.prop]?.value ?? curr[mapItem.prop];
      if (!isNaN(value)) {
        return prev + Number(value);
      } else {
        return prev;
      }
    }, 0);
    sums[find_index] = amountFormat(sums[find_index]) + mapItem.unit;
  });
  return sums;
}
