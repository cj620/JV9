/*
 * @Author: C.
 * @Date: 2021-08-05 18:44:59
 * @LastEditTime: 2021-08-06 16:30:02
 * @Description: file content
 */
// 表格合计
export const tableSum=function(tableData,field){
  console.log(tableData,field,2222);
  if(checkAllFieldItem(tableData,field)) return ''
return tableData.reduce((pre,next)=>{
  return pre+next[field]
},0)
}
// 判断是否是任何形式的纯数字
function isNumOrStringNum(target){
  if(!target || typeof(target)=='boolean') return false
  let targetToNumber=Number(target)
  if(!isNaN(targetToNumber)){
  return true
  }else{
  return false
}
}

// 检测字段所有的项 查看是否有非数字
function checkAllFieldItem(tableData,field){
 return tableData.some(item=>
    !isNumOrStringNum(item[field])
  )
}