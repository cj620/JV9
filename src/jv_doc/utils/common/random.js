/*
 * @Author: C.
 * @Date: 2021-07-21 09:46:19
 * @LastEditTime: 2021-07-21 09:59:41
 * @Description: file content
 */
/**
 * @description:  得到指定两个数之间的随机数
 * @param {*} min
 * @param {*} max
 * @return {*}
 */
  function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    const gab = max - min + 1
    return Math.floor(Math.random() * gab + min)
  } else {
    return 0
  }
}
export default random

