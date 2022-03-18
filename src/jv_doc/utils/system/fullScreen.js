/*
 * @Author: C.
 * @Date: 2021-09-28 13:22:51
 * @LastEditTime: 2021-09-29 08:52:06
 * @Description: file content
 */
import screenfull from 'screenfull'
import { Message } from 'element-ui';
 function fullScreen(ref){
  if (!screenfull.enabled) {
    Message({
      message: '你的浏览器没有此功能',
      type: 'warning'
    })
    return false
  }
  if(ref) {
    screenfull.toggle(ref)
  }else{
    screenfull.toggle()
  }
  
}

export default fullScreen