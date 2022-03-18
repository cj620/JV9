/*
 * @Author: C.
 * @Date: 2021-08-13 10:12:18
 * @LastEditTime: 2021-11-08 09:31:37
 * @Description: file content
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      tableHeaderShow:false,
    });
  }
}
export const tableConfig = [
  {
    id: '665487545',
    prop: 'id',
    label: '编号',
    cpn:'Link',
    cpnProps:{
      // 路由名称
      routeName:'Dashboard',
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods:'query',
      // 传参的键名，值为当前数据
      parameterKey:'BillId',
      // 补充参数 
      moreparameters:{
        type:1
      }
    }
  },
  {
    id: '665487545',
    prop: 'name',
    label: '名字',
  },
  {
    id: '6654875455',
    prop: 'age',
    label: '年龄',
  },
  {
    id: '66548754566574',
    prop: 'date',
    label: '时间',
    filter: 'date',
  },
]
export const detailConfig=[
  {
    prop:'id',
    label:'编号',
    cpnProps:{
      // 按需配置
      // span 列的数量
      // labelClassName 自定义标签类名
      // contentClassName 自定义内容类名
      // labelStyle 自定义标签样式
      // contentStyle 自定义内容样式
    }
  },
  {
    prop:'name',
    label:'名称',
  },
  {
    prop:'sex',
    label:'性别',
    custom:true,
  },
  {
    prop:'date',
    label:'日期',
    filter:'date'
  },
  {
    prop:'state',
    label:'状态',

  },
  {
    prop:'phone',
    label:'手机',
  },
  {
    prop:'id',
    label:'编号',
  },
]