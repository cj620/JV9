/*
 * @Author: C.
 * @Date: 2022-01-25 10:46:42
 * @LastEditTime: 2022-01-25 16:37:20
 * @Description: 接口锁
 */
import { Loading } from 'element-ui';
class RequestLock {
  // Loading 实例
  L_instance=null
  // 接口map
  reqMap=new Map()
  // 最近一次调用接口时间戳
  timestamp=0
  
  constructor(timeout=500){
    // 过渡时间
    this.timeout=timeout
  }
  // 创建任务
  put=(id)=>{
    
    if(this.reqMap.has(id))return false
    this._put(id)
    return true
  }
  _put=(id)=>{
    this.timestamp=new Date().getTime()
    this.reqMap.set(id,true)
     this.L_instance= Loading.service({
      fullscreen: true,
      background:'rgba(255, 255, 255, 0.1)',
      lock:true
    }) 
  }
  // 移除任务
  del=(id)=>{
    if(this.reqMap.has(id)){
      this.reqMap.delete(id)
       if(this.reqMap.size==0){
         this._closeLoading()
       }
    }
  }
  // 清空所有的任务
  clearTask=()=>{
    this.reqMap.clear()
    this.L_instance.close()
  }
  _closeLoading=()=>{
    let _timestamp= new Date().getTime()
    let settime=_timestamp-this.timestamp
    if(settime>this.timeout){
      this.L_instance?.close()
    }else{
      setTimeout(()=>{
        this.L_instance?.close()
      },this.timeout-settime)
    }

    
    
  }
}
export default RequestLock