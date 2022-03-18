/*
 * @Author: C.
 * @Date: 2021-09-23 09:00:13
 * @LastEditTime: 2021-11-04 17:07:20
 * @Description: file content
 */
import { filterMaps } from "../../../maps";
export function export2Excel(exportObj,callBack){
  let {
    // 数据源
    checkData,
    // 选中的字段
    checkedFields,
    // 文件名
    fileName,
    // 保存类型
    saveType,
    // 数据来源
    sourceType
    }=exportObj
    // 表头
    const tHeader=[]
    checkedFields.forEach(field => {
      tHeader.push(field.label)
    });

    // console.log(checkData,1121654);
      import('@/vendor/Export2Excel').then(excel => {
        const data=formatData(checkData,checkedFields,sourceType)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename:fileName,
          bookType: saveType
        })
        callBack()
      })
}
// filterMaps
function formatData(data,fields,sourceType){
 return data.map(v=>fields.map(j=>{
  //  console.log(v,j);
    return dataFilter(v,j,sourceType)
  }))
}
function dataFilter(target,field,sourceType){
  // console.log(sourceType,454445454);
  if(sourceType=='default'){
    return filterMaps[field.filter].func(target[field.prop])
  }else if(sourceType=='editTable'){

    // console.log(target[field.prop].value,56465465456);
    return filterMaps[field.filter].func(target[field.prop].value)
  }
}
