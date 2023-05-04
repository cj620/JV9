/*
 * @Author: C.
 * @Date: 2021-09-26 13:08:54
 * @LastEditTime: 2023-05-04 15:40:12
 * @Description: file content
 */
import timeFormat from "./timeFormat";
import timeFrom from "./timeFrom";
function time(value) {
  return timeFormat(value, "yyyy-MM-dd hh:mm");
}
export { timeFormat, timeFrom, time };
