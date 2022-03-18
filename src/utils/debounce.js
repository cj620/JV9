/*
 * @Author: H.
 * @Date: 2021-11-30 17:20:28
 * @LastEditTime: 2021-12-01 09:55:04
 * @Description:
 */

export default function debounce(func, wait, immediate) {
  let time;
  let debounced = function () {
    let context = this;
    if (time) clearTimeout(time);
    if (immediate) {
      let callNow = !time;
      if (callNow) func.apply(context, arguments);
      time = setTimeout(() => {
        time = null;
      }, wait);
    } else {
      time = setTimeout(() => {
        func.apply(context, arguments);
      }, wait);
    }
  };
  debounced.cancel = function () {
    clearTimeout(time);
    time = null;
  };

  return debounced;
}
