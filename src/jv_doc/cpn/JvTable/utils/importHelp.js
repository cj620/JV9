/*
 * @Author: your name
 * @Date: 2021-11-04 09:13:52
 * @LastEditTime: 2021-11-04 09:52:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \V9_Dev\src\jv_doc\cpn\JvTable\utils\importHelp.js
 */
export function checkImport(schema,source){
  // console.log(schema,source,sourceType);
  let propsMap=schema.map(item=>{
    return item.label
  })
let valid= Object.keys(source[0]).some(item=>{
    return !propsMap.includes(item)
  })

  
  return !valid
}