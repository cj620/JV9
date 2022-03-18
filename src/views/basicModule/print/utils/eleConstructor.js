/*
 * @Author: C.
 * @Date: 2021-08-05 10:18:52
 * @LastEditTime: 2022-01-17 10:45:27
 * @Description: file content
 */
// import { uuid } from "@/jv_doc/utils";
import { uuid } from "./index";
import { defaultSize } from "../enums";
import i18n from "@/i18n/i18n.js";
const defaultParams={
  role:'label',
  label: i18n.t('Generality.Ge_NewField'),
}
// 元素构造器
export const FieldConstructor=function(fieldObj=defaultParams){
  let {role,label}=fieldObj
  return {
    role,
    label,
    prop: fieldObj.prop||'',
    filter:fieldObj.filter||'default',
    url:fieldObj.url||'',
    id: role+uuid(5)+new Date().getTime(),
    show: true,
    style:defaultStyle(role),
    filterOptions:'',
    options: defaultOptions(role),
  }
}
function defaultOptions(role) {
  if (['qrcode', 'barcode'].includes(role)) {
    return {
      prefix: '',
    }
  }
}
// 默认样式构造器
function defaultStyle (role) {
      let size = defaultSize[role]
      return {
        y: 0,
        x: 0,
        width: size[0], 
        height: size[1],
        fontFamily: 'inherit',
        fontSize: 16,
        fontStyle: [
        'normal',
        'normal',
        'none'
        ],
        textAlign: 'center',
        fontWeight: 'normal'
      }
}
// 表格元素构造器
export const TableConstructor=function(){
  return{
    id: 'table'+uuid(5)+new Date().getTime(),
    show: true,
    prop: '',
    showSum:false,
    title: FieldConstructor({
      role:'label',
      label:'',
    }),

    fields: []
  }
}

// 打印模板构造器
export const printTemConstructor=function(){

  return{
    meta:{
      name:'打印模板',
      version:'V8',
    },
    paperStyle:{
      // 纸张类型
      paperType:'A4',
      // 纸张方向
      direction:'portrait',
      // 左边距
      marginLeft:0,
      // 右边距
      marginRight:0,
      // 上边距
      marginTop:0,
      // 下边距
      marginBottom:0
  },
    header:{
      style:{
        width:794,
        height:100
      },
      nodes:[ ]
    },
    // body:{
    //   style:{
    //     width:794,
    //     height:100
    //   },
    //   nodes:[]
    // },
    // 表格设置
    table:[
    ],
  
  footer:{
    style:{
      width:794,
      height:100
    },
    nodes:[]
  }

  
  }
}