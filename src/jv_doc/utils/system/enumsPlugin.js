/*
 * @Author: your name
 * @Date: 2021-11-22 17:02:26
 * @LastEditTime: 2021-11-22 17:04:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\jv_doc\utils\system\enumsPlugin.js
 */
export function enumToList(map) {
  let typeArr = [];
  for (const key in map) {
    typeArr.push({
      label: map[key].name,
      value: map[key].value,
    });
  }
  return typeArr;
}
// 枚举过滤
export function enumFilter(value = undefined, enums = {}) {
  if (!value) return "--";
  return enums?.[value]?.name ?? value;
}
