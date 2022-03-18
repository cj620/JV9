/*
 * @Author: C.
 * @Date: 2021-06-07 09:30:12
 * @LastEditTime: 2021-11-10 14:32:05
 * @Description: file content
 */
// import { IsBillCanEdited } from '@/api/Baseinfo/Edited'
import { editLock } from "@/api/basicApi/systemSettings/billEditLock";
class TableAPI {
  // function 表格更新回调 可传入form参数
emitCallBack =null
constructor(emit) {
  this.emitCallBack = emit
}
// 查 这个方法必须重写 返回值为一个promise
getData=(form) => {
  // return new Promise((r,e)=>{
  //   BackgroundGetArticleReportPageList(form).then(res=>{
  //     r(res)
  //   })
  // })
}
// 编辑单据的时候查看是否有人在编辑单据
editLock=editLock
}

export default TableAPI
