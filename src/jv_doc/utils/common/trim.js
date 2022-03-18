/*
 * @Author: C.
 * @Date: 2021-07-21 09:45:18
 * @LastEditTime: 2021-09-26 13:18:19
 * @Description: file content
 */
// 去除空格
 function trim(str, pos = 'both') {
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, '')
  } else if (pos == 'left') {
    return str.replace(/^\s*/, '')
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, '')
  } else if (pos == 'all') {
    return str.replace(/\s+/g, '')
  } else {
    return str
  }
}
export default trim
