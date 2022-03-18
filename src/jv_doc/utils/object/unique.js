/*
 * @Author: your name
 * @Date: 2021-12-15 10:52:50
 * @LastEditTime: 2021-12-15 10:53:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\jv_doc\utils\object\unique.js
 */
// 数组的合并去重
export function uniqueMerge(oArr, nArr, prop) {
  // 合并去重
  let idArr = oArr.map((item) => item[prop]);
  let targetArr = [];
  nArr.forEach((item) => {
    if (idArr.indexOf(item[prop]) == -1) {
      targetArr.push(item);
    }
  });
  return targetArr;
}