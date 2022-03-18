/*
 * @Author: H.
 * @Date: 2021-12-22 15:36:15
 * @LastEditTime: 2021-12-22 15:42:25
 * @Description:
 */
export function transformData(data) {
  return data.map((item) => {
    return {
      value: item[Object.keys(item).toString()],
      name: Object.keys(item).toString(),
    };
  });
}
