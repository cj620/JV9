/*
 * @Author: your name
 * @Date: 2021-11-17 13:11:58
 * @LastEditTime: 2021-11-30 15:38:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleQuote\Add\utils.js
 */
import { deepClone } from "@/jv_doc/utils/object";
// 处理双列表格
export function pushDoubleCol(tableObj){
  let cur_row=tableObj.getEmptyRow()
    tableObj.push([cur_row])
    sortHelp(tableObj)
}
// 插入双列表格
export function insertDoubleCol(tableObj,pos){
  let cur_row=tableObj.getEmptyRow()
  tableObj.insert(pos,[cur_row])
  sortHelp(tableObj)
}
// 删除双列表格
export function delDoubleCol(tableObj,pos){
  tableObj.delItem(pos)
  sortHelp(tableObj)
}
// 对双列表格排序
function sortHelp(tableObj){
  let data=tableObj.tableData
  let len=tableObj.tableData.length
  for (let index in data) {
     data[index]['sort'].value=Number(index)+1
     data[index]['col_sort'].value=Number(index)+len+1
  }
}
let col_prefix='col_'

// 反解双列表格的数据 col_
export function doubleCol2data(source=[]){
  let len=source.length
  if(len==0) return source
  let resultArr=new Array(len*2).fill({})
  source.forEach((item,index)=>{
    let leftObj={}
    let rightObj={}
    Object.keys(item).forEach(key=>{
      console.log(key.slice(0,4),66666);
      if(key.slice(0,4)==col_prefix){
        rightObj[key.slice(4)]=item[key]
      }else{
        leftObj[key]=item[key]
      }
    })
    resultArr[index]=leftObj
    resultArr[len+index]=rightObj
  })
  return resultArr
}
// 表头单列转双列
export function single2Double(tableConfig){
  let targetConfig= deepClone(tableConfig).map(item=>{
    return Object.assign(item,{
      prop:col_prefix+item.prop
    })
  })
  return tableConfig.concat(targetConfig)
}
// 数据转双列
export   function data2doubleCol(data=[]){
  let len=data.length
  let resultArr=[]
  if(len>1){
    let rowCount=Math.round(len/2)
  let objTemp={}
  Object.keys(deepClone(data[0])).forEach(key=>{
    objTemp[key]=''
  })
    for (let i = 0; i < rowCount; i++) {
    // data[i] data[i+rowCount]
    let rightData=data[i+rowCount]
    let rightObj={}
     if(rightData){
      Object.keys(rightData).forEach(key=>{
        rightObj[col_prefix+key]=rightData[key]
      })
    }else{
        //这里写的有点问题，会导致数据是奇数的时候奇数项的数据出不来，所以把这个清空掉
      //rightObj=deepClone(objTemp)
      rightObj={}
    }
    resultArr[i]=Object.assign({},data[i],rightObj)
    }
  }else{
    resultArr=data
  }


  dataSortHelp(resultArr)
  return resultArr

}

// 对双列表格排序
function dataSortHelp(data){
  let len=data.length
  for (let index in data) {
     data[index]['sort']=Number(index)+1
     data[index]['col_sort']=Number(index)+len+1
  }
}
