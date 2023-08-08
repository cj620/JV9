/*
 * @Author: C.
 * @Date: 2021-09-26 10:37:38
 * @LastEditTime: 2021-09-26 10:37:38
 * @Description: file content
 */
// 通用日期处理
 function timeFormat(date, fmt = 'yyyy-MM-dd') {
  if (!date) return '--'
  // if(!(isNaN(date) && !isNaN(Date.parse(date)))) return '--'
  var currentDate = new Date(date)
  var o = {
    'M+': currentDate.getMonth() + 1, // 月份
    'd+': currentDate.getDate(), // 日
    'h+': currentDate.getHours(), // 小时
    'm+': currentDate.getMinutes(), // 分
    's+': currentDate.getSeconds(), // 秒
    'q+': Math.floor((currentDate.getMonth() + 3) / 3), // 季度
    'S': currentDate.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }

  return fmt
}
export default timeFormat