/*
 * @Author: your name
 * @Date: 2021-11-04 13:53:51
 * @LastEditTime: 2021-11-10 16:33:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \V9_Dev\src\jv_doc\class\utils\detailHelp.js
 */
 const defaultDetailProps={
  border: false,
  size: "medium",
  direction: "vertical",
  column: 3,
  baseColProps:{
    span:1
  },
  labelStyle:{
    fontSize:'14px',
    fontWeight:'bold'
  },
  contentStyle:{
    fontSize:'14px',
  }
}
const defaultSchemaItem={
  filter:'default',
    cpnProps:{
      // span
    }
}
// 在schema项中插入默认值
function setDefaultSchema(props){
let result=[]
props.schema.forEach(item => {
  result.push(Object.assign({},defaultSchemaItem,item))
});

return{
  schema:result
}
}

// 设置编辑表格的参数
export function setDefaultProps(props){
// console.log(setDefaultSchema(props),544848787);
  return Object.assign({},defaultDetailProps,props,setDefaultSchema(props))
}