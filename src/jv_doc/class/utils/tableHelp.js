/*
 * @Author: C.
 * @Date: 2022-01-17 09:18:51
 * @LastEditTime: 2022-01-18 13:51:15
 * @Description: file content
 */
import { Form } from "../form";
import Pager from "../table/Pager";
import { setDefaultTableSchema,
  setDefaultTableProps,defaultTableSchemProp } from "./setDefaultProp";
  import { setLocalStorage, getLocalStorage,removeLocalStorage} from "../../utils/handleData/localCache";
  import { debounce } from "../../utils/optimization";
  import { deepClone } from "../../utils/object";
  import { Message } from 'element-ui';
  const cachePrefix='tableCache-'
  import i18n from "@/i18n/i18n.js";
  // localStorage.getItem("lang");

export function tablePropInit(tableObj,props){
  let cacheKey=getCacheId(props.printMod)
  let tableCache=getLocalStorage(cacheKey)
  // console.log(tableCache,1213232);
//    // 将props补充默认值
   const resultProps = setDefaultTableProps(deepClone(props));
   tableObj.setPropMap(resultProps)
       if(resultProps.pagination){
      tableObj.pager = new Pager(tableObj.getData);
      tableObj.pager.pageSize=tableCache?.pageSize|| tableObj.pager.pageSize
    }
    // console.log(tableCache,66666666666666);
if(props.printMod&&tableCache){
  resultProps.tableSchema&&mergeSchema(resultProps.tableSchema,tableCache.tableSchema)


}else{
  resultProps.tableSchema&&setDefaultTableSchema(resultProps.tableSchema)
}

// 创建Form对象
if(resultProps.formSchema){
  // 创建form对象
  tableObj.formObj = new Form({
    defaultForm:resultProps.pagination?{
      // 分页参数
      PageSize:tableObj.pager.pageSize,
      // 当前页
      CurrentPage: tableObj.pager.page
    }
    :{},
    formSchema:resultProps.formSchema,
    baseColProps: {
      span: 24,
    },
    gutter: 40,
    labelPosition: 'top',
  })

  // 备份表单
   tableObj.copyForm = JSON.stringify(tableObj.formObj.form);
}
   // 补充完毕 赋值给对象实例
   tableObj.props = resultProps;


}

export function setTableSchema(tableId,schema){
  if(!tableId) return
  debounce(()=>{
    _setTableSchema(tableId,schema)
  },2000,false)
}
function _setTableSchema(tableId,schema){
  let cacheKey=getCacheId(tableId)
  let tableCache=getLocalStorage(cacheKey)
  // let tableSchemaCache=tableCache.tableSchema
  setLocalStorage(cacheKey,{
    pageSize:tableCache?.pageSize||20,
    tableSchema:schema
   })
}
export function setPageSize(tableId,size){
  let cacheKey=getCacheId(tableId)
  let tableCache=getLocalStorage(cacheKey)
  setLocalStorage(cacheKey,{
    pageSize:size,
    tableSchema:tableCache.tableSchema
   })
}
export function resetCache(tableId){
  let cacheKey=getCacheId(tableId)
  removeLocalStorage(cacheKey)
}

function getCacheId(tableId){
  return `${i18n.locale}-tableCache-${tableId}`
}
function mergeSchema(n=[],c=[]){
  for(let key in n){
    for(let key2 in c){
      if(n[key].prop==c[key2].prop){
        n[key]=Object.assign({},defaultTableSchemProp,n[key],c[key])
      }
    }
}
}