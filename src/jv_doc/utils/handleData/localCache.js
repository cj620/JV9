/*
 * @Author: C.
 * @Date: 2022-01-17 10:08:09
 * @LastEditTime: 2022-01-18 09:10:44
 * @Description: file content
 */
export function setLocalStorage (key, value) {
  console.log('use localStorage');
  localStorage.setItem(key, JSON.stringify(value));
}
export function getLocalStorage (key) {
  return JSON.parse(localStorage.getItem(key));
}
export function removeLocalStorage (key) {
  localStorage.removeItem(key)
}
export function clearLocalStorage () {
  localStorage.clear()
}