/*
 * @Author: your name
 * @Date: 2021-10-28 16:06:04
 * @LastEditTime: 2021-11-03 13:11:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \V9_Dev\src\jv_doc\cpn\JvEditTable\utils\handleFunc.js
 */
// 根据类名获取当前序列
export function getCowIndex(colName){
  return Number(colName.split('_').pop())-1
}

// 将excel格式转换成编辑表格格式
export function excel2Edit(schema,source){
  // { 名字:name,}
  let  propsMap={}
  schema.forEach(item => {
    propsMap[item.label]=item.prop
  });
  let result=[]
  source.forEach(A=>{
    let valueItem={}
      Object.keys(A).forEach((key) => {
        valueItem[propsMap[key]]={
          value:A[key],
          edit:false,
        }
      })
      result.push(valueItem)
  })
  return result
}
// 将excel格式转换成原数据
export function excel2data(schema,source){
  // { 名字:name,}
  let  propsMap={}
  schema.forEach(item => {
    propsMap[item.label]=item.prop
  });
  let result=[]
  source.forEach(A=>{
    let valueItem={}
      Object.keys(A).forEach((key) => {
        valueItem[propsMap[key]]=A[key]
      })
      result.push(valueItem)
  })
  return result
}