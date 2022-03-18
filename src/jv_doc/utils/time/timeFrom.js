/*
 * @Author: C.
 * @Date: 2021-09-26 10:38:50
 * @LastEditTime: 2022-01-13 10:02:09
 * @Description: file content
 */
import timeFormat from "./timeFormat";
// 动态时间显示  表示多久之前
function timeFrom(time, fmt = "yyyy-MM-dd") {
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  // 传入时间
  const d = new Date(time);
  // 当前
  const now = Date.now();

  const diff = (now - d) / 1000;
  // 3600 一个小时
  let tips = "";
  if (diff < 3600 * 24) {
    tips = timeFormat(d, "hh:mm");
  } else if (diff < 3600 * 24 * 7) {
    const week = ["日", "一", "二", "三", "四", "五", "六"];
    tips = i18n.t("Generality.Ge_Week") + week[new Date(d).getDay()];
  } else {
    tips = timeFormat(d, fmt);
  }
  return tips;
}
export default timeFrom;
