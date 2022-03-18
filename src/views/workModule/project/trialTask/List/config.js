/*
 * @Author: your name
 * @Date: 2021-11-29 14:55:43
 * @LastEditTime: 2021-12-01 09:23:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\trialTask\List\config.js
 */
import {tableConfig,tableInstance,formSchema} from "../../projectTask/List/config";
// 引入表格表格类和表格API类
import { Table as BaseTable } from '@/jv_doc/class/table'
export class Table extends BaseTable {
  constructor() {
    super(Object.assign({},tableInstance,{
            // 表格配置
      tableSchema: handleSchema(tableConfig,'table'),
      // 表单配置
      formSchema:handleSchema(formSchema,'form'),
      title: i18n.t("menu.Pm_TestTask"),
    }))
  }
}

function handleSchema(schema,type){
  if(type="table"){
    return schema.filter(item=>{
      return item.prop!='TaskType'
    })
  }else{
     return  schema.map(item=>{
    if(item.prop=='TaskType'){
      return Object.assign(item,{hidden:true})
    }else{
      return item
    }
  })
  }

}
