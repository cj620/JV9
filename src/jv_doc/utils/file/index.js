/*
 * @Author: C.
 * @Date: 2021-09-26 13:12:24
 * @LastEditTime: 2021-09-26 13:13:57
 * @Description: file content
 */
export function getFileSize(size){
  let value = Number(size);
      if (size && !isNaN(value)) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];
        let index = 0;
        let k = value;
        if (value >= 1024) {
          while (k > 1024) {
            k = k / 1024;
            index++;
          }
        }
        return `${(k).toFixed(2)}${units[index]}`;
      }
      return '-';
}
export function getExtensionName(fullName){
  return fullName.split('.').pop().toLowerCase()
 }
 