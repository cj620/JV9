/*
 * @Author: your name
 * @Date: 2021-11-10 16:08:19
 * @LastEditTime: 2022-03-25 13:21:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\jv_doc\utils\system\auditPlugin.js
 */
import store from '@/store'
import { stateEnum } from '@/enum/workModule'
function auditState(data){
  let operationMap=stateEnum[data.State]?.operation
  console.log(operationMap.transform,88888);
  let {Creator,ShowButtonMode}=data
  return {
    submit:ShowButtonMode.includes(0),
    reject:ShowButtonMode.includes(3),
    audit:ShowButtonMode.includes(2),
    withdraw:ShowButtonMode.includes(1),
    edit:ShowButtonMode.includes(6),
    delete:ShowButtonMode.includes(7),
    transform:operationMap.transform
  }

}
export default auditState
